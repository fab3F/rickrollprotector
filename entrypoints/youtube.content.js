export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  runAt: 'document_start',
  async main() {
    const data = await browser.storage.local.get("blockedVideoIds");
    const rickrolls = data.blockedVideoIds || ["dQw4w9WgXcQ"];
    const matchedId = rickrolls.find(id => location.href.includes(id));

    if (matchedId) {
      const storageData = await browser.storage.local.get(matchedId);
      const permission = storageData[matchedId];

      if (permission === 'once') {
        await browser.storage.local.remove(matchedId);
        return;
      } else if (permission === 'permanent') {
        return;
      }

      const errorUrl = new URL(browser.runtime.getURL("error.html"));
      errorUrl.searchParams.set("url", location.href);
      errorUrl.searchParams.set("id", matchedId);
      location.replace(errorUrl.toString());
    }
  },
});