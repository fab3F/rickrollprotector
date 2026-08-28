import fs from 'fs';

async function updateStats() {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const links = JSON.parse(fs.readFileSync('data/rickrolls.json', 'utf8'));
  
  const stats = {
    github: pkg.version,
    blockedLinks: links.length,
    firefox: pkg.version,
    chrome: pkg.version
  };
  try {
    const ffRes = await fetch('https://addons.mozilla.org/api/v5/addons/addon/rickrollprotector/');
    const ffData = await ffRes.json();
    if (ffData.current_version) stats.firefox = ffData.current_version.version;
  } catch (e) { console.warn("Firefox Fetch failed"); }
  try {
    const crRes = await fetch('https://chromewebstore.google.com/detail/rickrollprotector/canjopdiolhgekkdoibphhiggfdphhco', {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    });
    const crHtml = await crRes.text();
    const match = crHtml.match(/<meta itemprop="version" content="([^"]+)"/);
    if (match) stats.chrome = match[1];
  } catch (e) { console.warn("Chrome Fetch failed"); }
  fs.writeFileSync('data/stats.json', JSON.stringify(stats, null, 2));
}

updateStats();