// Valeur par défaut
let invidiousInstance = "https://yewtu.be";

// Charger l’instance depuis le stockage
chrome.storage.sync.get("instance", (data) => {
  if (data.instance) {
    invidiousInstance = data.instance;
    console.log("[YT->Invidious] instance chargée:", invidiousInstance);
  }
});

// Écouter les changements depuis options.js
chrome.storage.onChanged.addListener((changes) => {
  if (changes.instance) {
    invidiousInstance = changes.instance.newValue;
    console.log("[YT->Invidious] instance mise à jour:", invidiousInstance);
  }
});

// Créer le menu clic droit
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "ytToInvidious",
    title: "Ouvrir dans Invidious",
    contexts: ["page", "link"]
  });
});

// Gestion du clic
chrome.contextMenus.onClicked.addListener((info, tab) => {
  let url = null;

  if (info.linkUrl && info.linkUrl.includes("youtube.com/watch")) {
    url = info.linkUrl;
  } else if (tab.url && tab.url.includes("youtube.com/watch")) {
    url = tab.url;
  }

  if (url) {
    const videoId = new URL(url).searchParams.get("v");
    if (videoId) {
      const invUrl = `${invidiousInstance}/watch?v=${videoId}`;
      chrome.tabs.create({ url: invUrl });
    }
  }
});

