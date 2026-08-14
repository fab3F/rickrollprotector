import { browser } from 'wxt/browser';

document.title = browser.i18n.getMessage("errorTitle");
document.querySelectorAll('[data-i18n]').forEach(element => {
  const key = element.getAttribute('data-i18n');
  element.innerHTML = browser.i18n.getMessage(key);
  element.style.visibility = 'visible';
});

const params = new URLSearchParams(window.location.search);
const originalUrl = params.get("url");
const videoId = params.get("id");

document.getElementById("btn-back").addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "about:blank";
  }
});

document.getElementById("btn-once").addEventListener("click", async () => {
  if (videoId && originalUrl) {
    await browser.storage.local.set({ [videoId]: 'once' });
    location.replace(originalUrl);
  }
});

document.getElementById("btn-permanent").addEventListener("click", async () => {
  if (videoId && originalUrl) {
    await browser.storage.local.set({ [videoId]: 'permanent' });
    location.replace(originalUrl);
  }
});