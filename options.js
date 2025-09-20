document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("instance");
  const status = document.getElementById("status");

  // Charger la valeur existante
  chrome.storage.sync.get("instance", (data) => {
    if (data.instance) {
      input.value = data.instance;
    }
  });

  document.getElementById("save").addEventListener("click", () => {
    const instance = input.value.trim();
    if (instance) {
      chrome.storage.sync.set({ instance }, () => {
        status.textContent = "Instance enregistrée : " + instance;
        setTimeout(() => status.textContent = "", 2000);
      });
    }
  });
});

