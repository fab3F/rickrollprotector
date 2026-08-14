import { browser } from 'wxt/browser';

export default defineContentScript({
  matches: ['*://fab3f.github.io/rickrollprotector/*'],
  runAt: 'document_idle',
  main() {
    const currentVersion = browser.runtime.getManifest().version;
    window.dispatchEvent(
      new CustomEvent('RickRollProtectorPing', {
        detail: { version: currentVersion }
      })
    );
  },
});