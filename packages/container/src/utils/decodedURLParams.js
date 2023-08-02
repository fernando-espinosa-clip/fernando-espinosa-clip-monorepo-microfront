export class DecodedURLParams {
    /**
     *
     * @param search the search string of your URL
     */
    constructor(search) {
        this.queryString = search;
        this.params = {};
        this.parseQueryString();
    }

    parseQueryString() {
        this.queryString.split('&').reduce((a, b) => {
            let [key, value] = b.split('=');
            a[key] = value;
            return a;
        }, this.params);
    }

    get(key) {
        return this.params[key];
    }
}
