import httpHelper from './httpHelper';

const {v4: uuidv4} = require('uuid');

/*
HUGE NOTE
Singleton classes are NOT a good idea in react. They mess with the reactivity and all that. However, for this use case, it makes it alot easier to handle
document transitions and such.
Never ever read from currentPage as it gets actively updated (so that it can be put back into a read-only state later) NON transactional
*/
class DocumentManager {
    constructor() {
        if (!DocumentManager.instance) {
            DocumentManager.instance = this;
            this.pages = {};// {pageID: page, pageID: page}
            this.currentPage = null;
            this.updates = {
                page_id: null,
                content: {
                    dirty: false,
                    changes: null //would be an array if changes :D
                },
                properties: {
                    dirty: false,
                    changes: null,
                },
                name: {
                    dirty: false,
                    newName: null
                }
            }

        }
        return DocumentManager.instance;
    }

    async changePage(pageID) {
        if (this.currentPage?._id === pageID) return this.currentPage;
        if (this.currentPage) {
            await this.maintainChanges();
            this.pages[this.currentPage._id] = this.currentPage;
        }
        this.currentPage = await this.getPage(pageID);
        return this.currentPage;
    }

    async getPage(pageID) {
        let newPage = this.pages[pageID];
        if (!newPage) {
            newPage = await httpHelper.getPage(pageID);
            if (!newPage) return null;
        }
        for (const content of newPage.content) {
            if (content.type === "page") {
                let linkedPage = this.pages[content.linkedPageID];
                if (!linkedPage) {
                    let linkedPage = await httpHelper.getPage(content.linkedPageID);
                    this.pages[content.linkedPageID] = linkedPage;
                }
            }
        }
        this.currentPage = newPage;
        return newPage;
    }

    async maintainChanges() {//should be called whenever changes should be saved. ie. page change or roughly every 3 seconds
        console.log('saving...')
        this.updates.page_id = this.currentPage._id;
        if (this.updates.content.dirty) {
            this.updates.content.changes = this.currentPage.content;
        }
        if (this.updates.properties.dirty) {
            this.updates.properties.changes = this.currentPage.properties;
        }

        this.updates.name.newName = this.currentPage.page_name;


        if (this.updates.content.dirty || this.updates.properties.dirty || this.updates.name.dirty) {
            let res = await httpHelper.submitChanges(this.updates);
        }
        Object.values(this.updates).forEach((update) => {
            if (update.dirty) {
                update.dirty = false;
            }
            if (update.changes) {
                update.changes = null;
            }
        });
    }


    getDirectoryOfDocument(pageID) {
        let directory = [];
        let currentID = pageID;
        while (currentID != null) {
            directory.push(currentID);
            let parent = this.pages[currentID]?.parent_id;
            currentID = parent;
        }
        return directory;
    }


    getProperty(id) {
        for (let i = 0; i < this.currentPage.properties.length; i++) {
            if (this.currentPage.properties[i].id === id) {
                return this.currentPage.properties[i];
            }
        }
        return null;
    }

    editPagePropertyName(id, newPropertyName) {
        this.currentPage.properties.forEach(prop => {
            if (prop.id === id) {
                prop.name = newPropertyName;
            }
        });
        this.updates.properties.dirty = true;
    }

    editPagePropertyValue(id, newPropertyValue) {
        this.currentPage.properties.forEach(prop => {
            if (prop.id === id) {
                prop.value = newPropertyValue;
            }
        });
        this.updates.properties.dirty = true;
        return null;
    }

    getCurrentPageProperties() {
        return this.currentPage.properties;
    }

    getPageProperties(id) {
        return this.pages[id].properties ? this.pages[id].properties : [];
    }


    addTextProperty() {
        this.currentPage.properties.push({
            type: "text", value: " ", id: uuidv4()
        });
        this.updates.content.dirty = true;
    }

    addTextContentByID(referralID) {
        let index = this.getContentIndex(referralID);
        this.currentPage.content.splice(index + 1, 0, {
            type: "text", value: " ", id: uuidv4()
        });
        this.updates.content.dirty = true;
    }

    addTextContentByIndex(referralIndex) {
        this.currentPage.content.splice(referralIndex + 1, 0, {
            type: "text", value: " ", id: uuidv4()
        });
        this.updates.content.dirty = true;
    }


    async addNewPageByIndex(referralIndex, parentID) {
        let newPageID = uuidv4();
        this.currentPage.content.splice(referralIndex + 1, 0, {
            type: "page", value: "New Page", id: uuidv4(), linkedPageID: newPageID
        });

        this.pages[newPageID] = {
            _id: newPageID,
            page_name: "New Page",
            user_id: window.sessionStorage.getItem("user_id"),
            content: [{type: "text", value: " ", id: 0}],
            parent_id: parentID,
            properties: []
        };
        let res = await httpHelper.addNewPage(parentID, newPageID);
        console.log(res);
        this.updates.content.dirty = true;
    }

    addDividerContentByID(referralID) {
        let index = this.getContentIndex(referralID);
        this.currentPage.content.splice(index + 1, 0, {
            type: "divider", id: uuidv4()
        });
        this.updates.content.dirty = true;
    }

    addDividerContentByIndex(referralIndex) {
        this.currentPage.content.splice(referralIndex + 1, 0, {
            type: "divider", id: uuidv4()
        });
        this.updates.content.dirty = true;
    }

    addCheckBoxByIndex(referralIndex) {
        let nId = uuidv4();
        this.currentPage.content.splice(referralIndex + 1, 0, {
            type: "checkbox",
            id: nId,
            value: "",
            checked: false,
            indent: 0
        });
        this.updates.content.dirty = true;
        this.insertedContentID = nId;
        return nId
    }


    getCurrentPageName() {
        return this.currentPage.page_name;
    }

    getPageName(pageID) {
        return this.pages[pageID]?.page_name;
    }

    updatePageName(newName) {
        this.currentPage.page_name = newName;
        this.updates.name.dirty = true;
    }


    updateContent(id, contentObject) {
        for (let i = 0; i < this.currentPage.content.length; i++) {

            if (this.currentPage.content[i].id === id) {
                this.currentPage.content[i] = contentObject;
            }
        }
        this.updates.content.dirty = true;
    }

    removeContent(id) {
        for (let i = 0; i < this.currentPage.content.length; i++) {
            if (this.currentPage.content[i].id === id) {
                this.currentPage.content.splice(i, 1);
            }
        }
        console.log(this.currentPage.content);
        this.updates.content.dirty = true;
    }

    removeProperty(id) {
        for (let i = 0; i < this.currentPage.properties.length; i++) {
            if (this.currentPage.properties[i].id === id) {
                this.currentPage.properties.splice(i, 1);
            }
        }
        this.updates.properties.dirty = true;
    }

    getContentIndex(id) {
        for (let i = 0; i < this.currentPage.content.length; i++) {
            if (this.currentPage.content[i].id === id) {
                return i;
            }
        }
        return null;
    }

    getPropertyIndex(id) {
        for (let i = 0; i < this.currentPage.properties.length; i++) {
            if (this.currentPage.properties[i].id === id) {
                return i;
            }
        }
        return null;
    }


}

const instance = new DocumentManager();
export default instance;