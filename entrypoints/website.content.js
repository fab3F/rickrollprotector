import { browser } from 'wxt/browser';

export default defineContentScript({
  matches: ['*://fab3f.github.io/rickrollprotector/*'],
  runAt: 'document_idle',
  async main() {
    const currentVersion = browser.runtime.getManifest().version;
    const data = await browser.storage.local.get(["counter", "exceptions"]);
    
    const count = data.counter || 0;
    const exceptions = data.exceptions || {};
    
    const exceptionsCount = Object.values(exceptions).filter(val => val === 'permanent').length;

    window.dispatchEvent(
      new CustomEvent('RickRollProtectorPing', {
        detail: JSON.stringify({ 
          version: currentVersion,
          amountSaved: count,
          amountExceptions: exceptionsCount
        })
      })
    );
  },
});