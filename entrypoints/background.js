import { browser } from 'wxt/browser';

export default defineBackground(() => {
  const LIST_URL = "https://fab3F.github.io/rickrollprotector/rickrolls.json";

  async function fetchLatestRickRolls() {
    try {
      const response = await fetch(LIST_URL);
      const blockedIds = await response.json(); 
      
      if (Array.isArray(blockedIds) && blockedIds.length > 0) {
        await browser.storage.local.set({ blockedVideoIds: blockedIds });
        console.log(browser.i18n.getMessage("updateMessage"));
      } else {
        console.warn(browser.i18n.getMessage("updateMessageWarn"));
      }

    } catch (error) {
      console.error(browser.i18n.getMessage("updateMessageError"), error);
    }
  }

  browser.runtime.onStartup.addListener(fetchLatestRickRolls);
  browser.runtime.onInstalled.addListener(fetchLatestRickRolls);
});