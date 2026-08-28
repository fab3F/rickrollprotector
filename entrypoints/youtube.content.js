import { browser } from 'wxt/browser';

export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  runAt: 'document_start',
  async main() {
    const data = await browser.storage.local.get(["blockedVideoIds", "exceptions", "counter"]);
    const rickrolls = data.blockedVideoIds || ["dQw4w9WgXcQ"];
    const matchedId = rickrolls.find(id => location.href.includes(id));

    if (matchedId) {
      const exceptions = data.exceptions || {};
      const permission = exceptions[matchedId];
      
      if (permission === 'permanent') {
        return;
      }

      if (typeof permission === 'number') {
        if (Date.now() < permission) {
          return; 
        } else {
          delete exceptions[matchedId];
          await browser.storage.local.set({ exceptions });
        }
      }
      
      const count = (data.counter || 0) + 1;
      await browser.storage.local.set({ counter: count });

      const errorUrl = new URL(browser.runtime.getURL("error.html"));
      errorUrl.searchParams.set("url", location.href);
      errorUrl.searchParams.set("id", matchedId);
      location.replace(errorUrl.toString());
    }
  },
});