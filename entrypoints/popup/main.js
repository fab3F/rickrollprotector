import { browser } from 'wxt/browser';

document.documentElement.lang = browser.i18n.getUILanguage();

document.querySelectorAll('[data-i18n]').forEach(element => {
  const key = element.getAttribute('data-i18n');
  element.textContent = browser.i18n.getMessage(key);
  element.style.visibility = 'visible';
});

async function renderList() {
  const listContainer = document.getElementById('list');
  listContainer.textContent = '';
  
  const data = await browser.storage.local.get(["exceptions", "counter"]);
  
  document.getElementById('saved-counter').textContent = data.counter || 0; // counter in popup html

  const exceptions = data.exceptions || {};
  
  const videoIds = Object.keys(exceptions).filter(key => typeof exceptions[key] !== 'number');

  if (videoIds.length === 0) {
    const emptyMsgDiv = document.createElement('div');
    emptyMsgDiv.className = 'empty-msg';
    emptyMsgDiv.textContent = browser.i18n.getMessage("popupEmpty"); 
    listContainer.appendChild(emptyMsgDiv);
    return;
  }

  videoIds.forEach(id => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'exception-item';
    const span = document.createElement('span');
    span.className = 'video-id';
    span.title = 'Video ID';
    span.textContent = id;
    const btn = document.createElement('button');
    btn.className = 'delete-btn';
    btn.dataset.id = id;
    btn.textContent = browser.i18n.getMessage("btnDelete");
    
    btn.addEventListener('click', async (event) => {
      const idToRemove = event.target.getAttribute('data-id');
      const currentData = await browser.storage.local.get("exceptions");
      const currentExceptions = currentData.exceptions || {};
      
      delete currentExceptions[idToRemove];
      await browser.storage.local.set({ exceptions: currentExceptions });
      renderList();
    });
    
    itemDiv.appendChild(span);
    itemDiv.appendChild(btn);
    listContainer.appendChild(itemDiv);
  });
}

document.getElementById('reset-btn').addEventListener('click', async () => {
  await browser.storage.local.set({ exceptions: {} });
  renderList();
});

renderList();