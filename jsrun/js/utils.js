function getLocalStorageValue(key) {
    if (!window.localStorage || !window.localStorage.getItem(key)) return null;
    try {
        return JSON.parse(window.localStorage.getItem(key));
    } catch(ex) {
        return null;
    }
    
}

function setLocalStorageValue(key, val) {
    if (!window.localStorage || !window.localStorage.setItem) return;
    window.localStorage.setItem(key, JSON.stringify(val));
}
