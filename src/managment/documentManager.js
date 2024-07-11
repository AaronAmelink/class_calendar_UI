import httpHelper from './httpHelper';

const { v4: uuidv4 } = require('uuid');
const stateManager = require('./stateManager');
class DocumentManager{
    constructor() {
        if (!DocumentManager.instance) {
            DocumentManager.instance = this;
            this.pages = [];
            this.selectedContentID = null;
            this.currentPage = {};
            this.updates={
                page_id : null,
                content : {
                    dirty : false,
                    changes : null //would be an array if changes :D
                },
                properties : {
                    dirty : false,
                    changes : null,
                },
                name : {
                    dirty : false,
                    newName : null
                }
            }

        }
        return DocumentManager.instance;
    }

    //Need to find a way to effectivly update backend.
    //this.updates is current way of doing that
    //every minute or so updates should be sent to backend
    //backend will parse through and update accordingly
    async maintainChanges() {//should be called whenever changes should be saved. ie. page change or roughly every 3 seconds
        console.log(this.updates);
        this.updates.page_id = this.currentPage._id;
        if (this.updates.content.dirty) {
            this.updates.content.changes = this.currentPage.content;
        }
        if (this.updates.properties.dirty) {
            this.updates.properties.changes = this.currentPage.properties;
        }

        this.updates.name.newName = this.currentPage.page_name;


        if (this.updates.content.dirty || this.updates.properties.dirty || this.updates.name.dirty){
            let res = await httpHelper.submitChanges(this.updates);
            console.log(res);
            stateManager.saved = true;
            this.setUpdatesLocally();
        }
        Object.values(this.updates).forEach((update) => {
            if (update.dirty){
                update.dirty = false;
            }
            if (update.changes){
                update.changes = null;
            }
        });
    }

    setUpdatesLocally(){//this function should be accompanied by a sister function that calls backend to set changes.


        let match = this.pages.find((page) => page._id === this.updates.page_id);
        if (this.updates.content.dirty){
            match.content = this.updates.content.changes;
            //this.updates.content.dirty = false;
        }
        if (this.updates.properties.dirty){
            match.properties = this.updates.properties.changes;
            //this.updates.properties.dirty = false;
        }
        if (this.updates.name.dirty){
            match.name = this.updates.name.newName;
        }

    }

    getRootPage(){
        for (let i = 0; i < this.pages.length; i++){
            if (this.pages[i]?.parent_id === "null"){
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
        this.updates.properties.dirty = true;
        stateManager.saved = false;
    }

    editPagePropertyValue(id, newPropertyValue){
        this.currentPage.properties.forEach(prop => {
            if (prop.id === id) {
                prop.value = newPropertyValue;
            }
        });
        this.updates.properties.dirty = true;
        stateManager.saved = false;
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
        this.updates.content.dirty = true;
        stateManager.saved = false;
    }

    getSelectedContentID(){
        return this.selectedContentID;
    }

    addTextContentByID(referralID){
        let index = this.getContentIndex(referralID);
        this.currentPage.content.splice(index+1, 0,{
            type:"text", value:" ", id: uuidv4()
        } );
        this.updates.content.dirty = true;
        stateManager.saved = false;
    }

    addTextContentByIndex(referralIndex){
        this.currentPage.content.splice(referralIndex+1, 0,{
            type:"text", value:" ", id: uuidv4()
        } );
        this.updates.content.dirty = true;
        stateManager.saved = false;
    }



    async addNewPageByIndex(referralIndex, parentID){
        let newPageID = uuidv4();
        this.currentPage.content.splice(referralIndex+1, 0,{
            type:"page", value:"New Page", id: uuidv4(), linkedPageID : newPageID
        } );

        this.pages.push({
            _id : newPageID,
            page_name:"New Page",
            user_id: window.sessionStorage.getItem("user_id"),
            content: [{type:"text",value:" ",id:0}],
            parent_id : parentID,
            properties : []
        })
        let res = await httpHelper.addNewPage(parentID, newPageID);
        console.log(res);
        this.updates.content.dirty = true;
        stateManager.saved = false;
    }

    addDividerContentByID(referralID){
        let index = this.getContentIndex(referralID);
        this.currentPage.content.splice(index+1, 0,{
            type:"divider", id: uuidv4()
        } );
        this.updates.content.dirty = true;
        stateManager.saved = false;
    }

    addDividerContentByIndex(referralIndex){
        this.currentPage.content.splice(referralIndex+1, 0,{
            type:"divider", id: uuidv4()
        } );
        this.updates.content.dirty = true;
        stateManager.saved = false;
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
        this.updates.content.dirty = true;
        stateManager.saved = false;
        this.insertedContentID = nId;
        return nId
    }


    getCurrentPageName(){
        return this.currentPage.page_name;
    }

    getPageName(pageID){
        console.log(this.pages);
        return this.pages.find(page => page._id === pageID)?.page_name;
    }

    updatePageName(newName) {
        this.currentPage.page_name = newName;
        this.updates.name.dirty = true;
        stateManager.saved = false;
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
        this.updates.content.dirty = true;
        stateManager.saved = false;
    }

    removeContent(id) {
        for (let i = 0; i<this.currentPage.content.length; i++){
            if (this.currentPage.content[i].id === id){
                this.currentPage.content.splice(i, 1);
            }
        }
        console.log(this.currentPage.content);
        this.updates.content.dirty = true;
        stateManager.saved = false;
    }

    removeProperty(id){
        for (let i = 0; i<this.currentPage.properties.length; i++){
            if (this.currentPage.properties[i].id === id){
                this.currentPage.properties.splice(i, 1);
            }
        }
        this.updates.properties.dirty = true;
        stateManager.saved = false;
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
export default instance;