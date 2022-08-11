export default class StorageService {
    static set(key, obj) {
        // eslint-disable-next-line no-unused-expressions
        window.localStorage && window.localStorage.setItem(key, JSON.stringify(obj));
    }

    static get(key, defaultValue = null) {
        let data = defaultValue;
        const objJSON = window.localStorage && window.localStorage.getItem(key);
        if (typeof objJSON === "string") {
            try {
                data = JSON.parse(objJSON);
                // eslint-disable-next-line no-empty
            } catch (e) {
            }
        }
        return data;
    }

    static remove(key) {
        // eslint-disable-next-line no-unused-expressions
        window.localStorage && window.localStorage.removeItem(key);
    }
}
