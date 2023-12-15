const { v4: uuidv4 } = require('uuid');

class DocumentManager{
    constructor() {
        if (!DocumentManager.instance) {
            DocumentManager.instance = this;
            this.pages = []
            this.currentPage = {}
            this.currentPageContentDirty = false;
            this.currentPagePropsDirty = false;
            this.currentPageNameDirty = false;
            this.updates=[]

        }
        return DocumentManager.instance;
    }

    //Need to find a way to effectivly update backend.
    //this.updates is current way of doing that
    //every minute or so updates should be sent to backend
    //backend will parse through and update accordingly
    maintainChanges() {
        if (this.currentPagePropsDirty) {
            this.updates.push({
                type: "properties",
                newValue : this.currentPage.properties,
                page_id : this.currentPage._id
            });
            this.currentPagePropsDirty = false;
        }
        if (this.currentPageContentDirty) {
            this.updates.push({
                type: "content",
                newValue : this.currentPage.content,
                page_id : this.currentPage._id
            });
            this.currentPageContentDirty = false;
        }
        if (this.currentPageNameDirty) {
            this.updates.push({
                type: "name",
                newValue : this.currentPage.name,
                page_id : this.currentPage._id
            });
            this.currentPageNameDirty = false;
        }
        this.pages.forEach(page => {
            if (page._id === this.currentPage._id){
                page.content = this.currentPage.content;
                page.properties = this.currentPage.properties;
                page.page_name = this.currentPage.page_name;
            }
        });
    }

    loadPages(pages){
        pages.forEach(page => {
            this.pages.push(page);
        })
    }

    setCurrentPage(newPageID){
        //this.maintainChanges();
        this.pages.forEach(page => {
            if (page._id == newPageID) {
                this.currentPage = page;
            }
        });
    }

    getProperty(id){
        for (let i = 0; i < this.currentPage.properties.length; i++){
            if (this.currentPage.properties[i].id === id){
                return this.currentPage.properties[i];
            }
        }
        return null;
    }

    editPagePropertyName(id, newPropertyName){
        this.currentPage.properties.forEach(prop => {
            if (prop.id === id) {
                prop.name = newPropertyName;
            }
        });
        this.currentPagePropsDirty = true;
    }

    editPagePropertyValue(id, newPropertyValue){
        this.currentPage.properties.forEach(prop => {
            if (prop.id === id) {
                prop.value = newPropertyValue;
            }
        });
        this.currentPagePropsDirty = true;
        return null;
    }

    getPageProperties(){
        return this.currentPage.properties;
    }


    addTextProperty() {
        this.currentPage.properties.push({
         type:"text", name:"", value:"", id: uuidv4()
        });
        this.currentPagePropsDirty = true;
    }


    getCurrentPageName(){
        return this.currentPage.page_name;
    }

    updatePageName(pageID, newName) {
        this.pages.forEach(page => {
            if (pageID === page.id){
                page.name = newName;
            }
        });
        this.currentPage.name = newName;
        this.currentPageNameDirty = true;
    }

    updateContent(id, contentObject){
        for (let i = 0; i<this.currentPage.content.length; i++){

            if (this.currentPage.content[i].id === id){
                this.currentPage.content[i] = contentObject;
            }
        }
        this.currentPageContentDirty = true;
    }

    removeContent(id) {
        for (let i = 0; i<this.currentPage.content.length; i++){
            if (this.currentPage.content[i].id === id){
                this.currentPage.content.splice(i, 1);
            }
        }
        console.log(this.currentPage.content);
        this.currentPageContentDirty = true;
    }

    removeProperty(id){
        for (let i = 0; i<this.currentPage.properties.length; i++){
            if (this.currentPage.properties[i].id === id){
                this.currentPage.properties.splice(i, 1);
            }
        }
        console.log(this.currentPage.properties);
        this.currentPagePropsDirty = true;
    }

    getContentIndex(id){
        for (let i = 0; i<this.currentPage.content.length; i++){
            if (this.currentPage.content[i].id === id){
                return i;
            }
        }
        return null;
    }

    getPropertyIndex(id){
        for (let i = 0; i<this.currentPage.properties.length; i++){
            if (this.currentPage.properties[i].id === id){
                return i;
            }
        }
        return null;
    }
}

const instance = new DocumentManager();
module.exports = instance;