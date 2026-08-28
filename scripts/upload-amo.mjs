import fs from 'fs';
import jwt from 'jsonwebtoken';

const {
  AMO_JWT_ISSUER,
  AMO_JWT_SECRET,
  ADDON_ID,
  XPI_PATH,
  SRC_PATH,
  RELEASE_NOTES,
  APPROVAL_NOTES
} = process.env;

const API_BASE = 'https://addons.mozilla.org/api/v5';

function generateToken() {
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = {
    iss: AMO_JWT_ISSUER,
    jti: Math.random().toString(),
    iat: issuedAt,
    exp: issuedAt + 300,
  };
  return jwt.sign(payload, AMO_JWT_SECRET, { algorithm: 'HS256' });
}

async function pollUpload(uuid, token) {
  console.log(`Checking upload status for UUID: ${uuid}...`);
  const url = `${API_BASE}/addons/upload/${uuid}/`;

  for (let i = 0; i < 24; i++) {
    const res = await fetch(url, { headers: { Authorization: `jwt ${token}` } });
    const data = await res.json();

    if (data.processed) {
      if (data.valid) {
        console.log('Upload successfully validated by Mozilla!');
        return;
      } else {
        console.error('Validation failed:', JSON.stringify(data.validation, null, 2));
        process.exit(1);
      }
    }

    console.log('Add-on is still being checked... waiting 10 seconds.');
    await new Promise(r => setTimeout(r, 10000));
  }
  console.error('Timeout while waiting for validation.');
  process.exit(1);
}

async function main() {
  try {
    console.log('Starting upload to Mozilla AMO...');
    const token = generateToken();
    const headers = { Authorization: `jwt ${token}` };

    console.log(`Uploading XPI: ${XPI_PATH}`);
    const xpiData = new FormData();
    xpiData.append('upload', new Blob([fs.readFileSync(XPI_PATH)]), 'extension.zip');
    xpiData.append('channel', 'listed');

    const uploadRes = await fetch(`${API_BASE}/addons/upload/`, {
      method: 'POST',
      headers,
      body: xpiData
    });

    if (!uploadRes.ok) throw new Error(`XPI upload error: ${await uploadRes.text()}`);
    const uuid = (await uploadRes.json()).uuid;
    console.log(`Upload successful. UUID: ${uuid}`);

    await pollUpload(uuid, token);

    console.log('Creating new version (attaching source code and approval notes)...');
    const versionData = new FormData();
    versionData.append('upload', uuid);

    if (SRC_PATH && fs.existsSync(SRC_PATH)) {
      console.log(`Uploading source code: ${SRC_PATH}`);
      versionData.append('source', new Blob([fs.readFileSync(SRC_PATH)]), 'source.zip');
    }

    if (APPROVAL_NOTES && APPROVAL_NOTES.trim() !== '') {
      versionData.append('approval_notes', APPROVAL_NOTES);
    }

    const createRes = await fetch(`${API_BASE}/addons/addon/${ADDON_ID}/versions/`, {
      method: 'POST',
      headers,
      body: versionData
    });

    if (!createRes.ok) throw new Error(`Error creating version: ${await createRes.text()}`);

    const createJson = await createRes.json();
    const versionStr = createJson.version;
    console.log(`Version ${versionStr} successfully created!`);

    let finalReleaseNotes = RELEASE_NOTES || '';
    if (fs.existsSync('release_notes.md')) {
      console.log('Reading release notes directly from release_notes.md...');
      finalReleaseNotes = fs.readFileSync('release_notes.md', 'utf8');
    }

    if (finalReleaseNotes.trim() !== '') {
      console.log('Updating version with release notes (PATCH request)...');

      const patchRes = await fetch(`${API_BASE}/addons/addon/${ADDON_ID}/versions/${versionStr}/`, {
        method: 'PATCH',
        headers: {
          Authorization: `jwt ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          release_notes: {
            "en-US": finalReleaseNotes
          }
        })
      });

      if (!patchRes.ok) throw new Error(`Error setting release notes: ${await patchRes.text()}`);
      console.log('Release notes successfully added to version!');
    }

    console.log('Upload completely finished!');

  } catch (err) {
    console.error('An error occurred:', err.message);
    process.exit(1);
  }
}

main();