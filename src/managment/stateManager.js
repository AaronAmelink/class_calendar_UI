class stateManager {
    constructor() {
        if (!stateManager.instance) {
            stateManager.instance = this;
            this.saved = true;
            this.tab = 'document';
        }
        return stateManager.instance;
    }
}

const instance = new stateManager();
module.exports = instance;