let cache = null;
function logMessage(msg) {
  document.getElementById("log").innerText = msg;
}

function createCache() {
  const cap = Number(document.getElementById("capacity").value);
  cache = new LRUCache(cap);
  logMessage(`Cache created with capacity ${cap}.`);
  render();
}


function put() {
  if (!cache) return alert("Create cache first");

  const key = Number(document.getElementById("key").value);
  const value = Number(document.getElementById("value").value);

  const removedKey = cache.put(key, value);

  if (removedKey !== null) {
    logMessage(
      `PUT(${key}) → Cache full. Removed LRU key (${removedKey}), Inserted/Updated in cache.`
    );
  } else {
    logMessage(`PUT(${key}) → Inserted/Updated in cache.`);
  }

  render();
}


function get() {
  if (!cache) return alert("Create cache first");
  const key = Number(document.getElementById("key").value);
  const res = cache.get(key);

  if (res === -1) {
    logMessage(`GET(${key}) → Key not found.`);
    alert("Cache Miss");
  } else {
    logMessage(`GET(${key}) → Accessed and moved to MRU.`);
    alert("Value = " + res);
  }

  render();
}


function render() {
  const container = document.getElementById("cache");
  container.innerHTML = "";

  if (!cache) return;

  cache.getCacheState().forEach(item => {
    const box = document.createElement("div");
    box.className = "box";
    box.innerText = `${item.key}:${item.value}`;
    container.appendChild(box);
  });
}
