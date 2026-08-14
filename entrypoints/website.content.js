export default defineContentScript({
  matches: ['*://fab3f.github.io/rickrollprotector/*'],
  main() {
    const currentVersion = browser.runtime.getManifest().version;
    const event = new CustomEvent('RickRollProtectorPing', {
      detail: { version: currentVersion }
    });
    window.dispatchEvent(event);
  },
});