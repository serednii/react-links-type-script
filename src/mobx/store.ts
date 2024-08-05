import { makeAutoObservable } from "mobx";

class DataStore {
    dataMain:  any;
    listLinkData: any;
    sluice: any;
    constructor(){
        makeAutoObservable(this)
    }

    setDataMain(dataMain: any) {
        this.dataMain = dataMain;
    }
    setListLinkData(listLinkData: any) {
        this.listLinkData = listLinkData
    }
    setSluice(sluice: any) {
        this.sluice = sluice;
    }

}

const dataStore = new DataStore();
export default dataStore;