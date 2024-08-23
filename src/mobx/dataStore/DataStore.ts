import { makeAutoObservable, action } from "mobx";

class DataStore {
  dataMain: any;
  listLinkData: any;
  sluice: any;
  breadcrumbs: string[];
  idArticle: string;

  constructor() {

    makeAutoObservable(this, {
      setDataMain: action,
      setListLinkData: action,
      setSluice: action,
      setBreadcrumbs: action,
      setIdArticle: action
    });

    this.breadcrumbs = [];
    this.idArticle = ""
  }

  setDataMain(dataMain: any) {
    this.dataMain = dataMain;
  }

  setListLinkData(listLinkData: any) {
    this.listLinkData = listLinkData;
  }

  setSluice(sluice: any) {
    this.sluice = sluice;
  }

  setBreadcrumbs(breadcrumbs: string[]){
    this.breadcrumbs = breadcrumbs;
  }
  setIdArticle(idArticle: string){
    this.idArticle = idArticle;
  }

  clearStore(){
    this.dataMain ={}
    this.listLinkData = {}
    this.sluice = []
    this.breadcrumbs = []
    
  }

}

const dataStore = new DataStore();
export default dataStore;
