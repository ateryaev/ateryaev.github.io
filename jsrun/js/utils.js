function getLocalStorageValue(key) {
    try {
        if (!window.localStorage || !window.localStorage.getItem(key)) return null;
        return JSON.parse(window.localStorage.getItem(key));
    } catch(ex) {
        return null;
    }
    
}

function setLocalStorageValue(key, val) {
    try {
    if (!window.localStorage || !window.localStorage.setItem) return;
    window.localStorage.setItem(key, JSON.stringify(val));
    } catch(ex) {}
}
