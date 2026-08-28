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
  console.log(`Prüfe Upload-Status für UUID: ${uuid}...`);
  const url = `${API_BASE}/addons/upload/${uuid}/`;
  for (let i = 0; i < 24; i++) {
    const res = await fetch(url, { headers: { Authorization: `jwt ${token}` } });
    const data = await res.json();
    if (data.processed) {
      if (data.valid) {
        console.log('Upload wurde von Mozilla erfolgreich validiert!');
        return; 
      } else {
        console.error('Validierung fehlgeschlagen:', JSON.stringify(data.validation, null, 2));
        process.exit(1);
      }
    }
    console.log('Add-on wird noch geprüft... warte 5 Sekunden.');
    await new Promise(r => setTimeout(r, 5000));
  }
  console.error('Timeout beim Warten auf die Validierung.');
  process.exit(1);
}
async function main() {
  try {
    console.log('Starte Upload zu Mozilla AMO...');
    const token = generateToken();
    const headers = { Authorization: `jwt ${token}` };
    console.log(`Lade XPI hoch: ${XPI_PATH}`);
    const xpiData = new FormData();
    xpiData.append('upload', new Blob([fs.readFileSync(XPI_PATH)]), 'extension.zip');
    xpiData.append('channel', 'listed');
    const uploadRes = await fetch(`${API_BASE}/addons/upload/`, {
      method: 'POST',
      headers,
      body: xpiData
    });
    if (!uploadRes.ok) throw new Error(`XPI Upload Fehler: ${await uploadRes.text()}`);
    const uuid = (await uploadRes.json()).uuid;
    console.log(`Upload erfolgreich. UUID: ${uuid}`);
    await pollUpload(uuid, token);
    console.log('Erstelle neue Version, hänge Source Code und Notes an...');
    const versionData = new FormData();
    versionData.append('upload', uuid);
    if (SRC_PATH && fs.existsSync(SRC_PATH)) {
        console.log(`Lade Source-Code hoch: ${SRC_PATH}`);
        versionData.append('source', new Blob([fs.readFileSync(SRC_PATH)]), 'source.zip');
    }
    if (APPROVAL_NOTES && APPROVAL_NOTES.trim() !== '') {
        versionData.append('approval_notes', APPROVAL_NOTES);
    }
    if (RELEASE_NOTES && RELEASE_NOTES.trim() !== '') {
        versionData.append('release_notes', JSON.stringify({ "en-US": RELEASE_NOTES }));
    }
    const createRes = await fetch(`${API_BASE}/addons/addon/${ADDON_ID}/versions/`, {
      method: 'POST',
      headers,
      body: versionData
    });
    if (!createRes.ok) throw new Error(`Fehler beim Erstellen der Version: ${await createRes.text()}`);
    const createJson = await createRes.json();
    console.log(`Erfolg! Version ${createJson.version} wurde vollständig mit Source Code und Notes eingereicht!`);
  } catch (err) {
    console.error('Ein Fehler ist aufgetreten:', err.message);
    process.exit(1);
  }
}

main();