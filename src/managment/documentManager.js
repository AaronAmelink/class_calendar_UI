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
        this.setUpdatesLocally();
    }

    setUpdatesLocally(){//this function should be accompanied by a sister function that calls backend to set changes.
        // call other function
        for (let i = 0; i < this.updates.length; i++){
            let match = this.pages.find((page) => page._id === this.updates[i].page_id);
            if (this.updates[i].type === "content"){
                match.content = this.updates[i].newValue;
            }
            if (this.updates[i].type === "properties"){
                match.properties = this.updates[i].newValue;
            }
            if (this.updates[i].type === "name"){
                match.name = this.updates[i].newValue;
            }
        }
        this.updates = [];
        console.log(this.pages);
    }

    getRootPage(){
        for (let i = 0; i < this.pages.length; i++){
            if (this.pages[i].parent_id === "null"){
                return this.pages[i];
            }
        }
        return ("no page found");
    }



    loadPages(pages){
        this.pages = [];
        pages.forEach(page => {
            this.pages.push(page);
        })
    }

    getDirectoryOfDocument(pageID){
        let directory = [];
        let currentID = pageID;
        while (currentID != null){
            directory.splice(0,0, currentID);
            let parent = this.getPage(currentID).parent_id;
            currentID = parent;


        }
        console.log(directory);
        return directory;
    }

    setCurrentPage(newPageID){
        //this.maintainChanges();
        this.pages.forEach(page => {
            if (page._id === newPageID) {
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

    getCurrentPageProperties(){
        return this.currentPage.properties;
    }

    getPageProperties(id){
        let match = this.pages.find((page) => page._id === id);
        return (match.properties);
    }


    addTextProperty() {
        this.currentPage.properties.push({
         type:"text", value:" ", id: uuidv4()
        });
        this.currentPagePropsDirty = true;
    }

    addTextContentByID(referralID){
        let index = this.getContentIndex(referralID);
        this.currentPage.content.splice(index+1, 0,{
            type:"text", value:" ", id: uuidv4()
        } );
        this.currentPageContentDirty = true;
    }

    addTextContentByIndex(referralIndex){
        this.currentPage.content.splice(referralIndex+1, 0,{
            type:"text", value:" ", id: uuidv4()
        } );
        this.currentPageContentDirty = true;
    }



    addNewPageByIndex(referralIndex, parentID){
        let newPageID = uuidv4();
        this.currentPage.content.splice(referralIndex+1, 0,{
            type:"page", value:"New Page", id: uuidv4(), linkedPageID : newPageID
        } );

        this.pages.push({
            _id : newPageID,
            page_name:"New Page",
            user_id: window.sessionStorage.getItem("user_id"), //need to change
            content: [{type:"text",value:" ",id:0}],
            parent_id : parentID,
            properties : []
        })
        this.currentPageContentDirty = true;
    }

    addDividerContentByID(referralID){
        let index = this.getContentIndex(referralID);
        this.currentPage.content.splice(index+1, 0,{
            type:"divider", id: uuidv4()
        } );
        this.currentPageContentDirty = true;
    }

    addDividerContentByIndex(referralIndex){
        this.currentPage.content.splice(referralIndex+1, 0,{
            type:"divider", id: uuidv4()
        } );
        this.currentPageContentDirty = true;
    }

    addCheckBoxByIndex(referralIndex) {
        let nId = uuidv4();
        this.currentPage.content.splice(referralIndex+1, 0,{
            type:"checkbox",
            id: nId,
            value: " ",
            checked: false,
            indent: 0
        } );
        this.currentPageContentDirty = true;
        return nId
    }


    getCurrentPageName(){
        return this.currentPage.page_name;
    }

    getPageName(pageID){
        let value;
        this.pages.forEach((page) => {
            if (page._id === pageID){

                value = page.page_name;
            }
        })

        return value;
    }

    updatePageName(newName) {
        this.currentPage.page_name = newName;
        this.currentPageNameDirty = true;
    }

    getPage(pageID){
        return this.pages.find((page) => page._id === pageID);
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