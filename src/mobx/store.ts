import { makeAutoObservable, action, runInAction } from "mobx";
import graphQLQuery from '../controller/graphql-Controller';

class DataStore {
  dataMain: any;
  listLinkData: any;
  sluice: any;

  constructor() {
    makeAutoObservable(this, {
      setDataMain: action,
      setListLinkData: action,
      setSluice: action,
      getMenu: action.bound,
    });
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

  async getMenu(idUser: string) {
    console.log('**********', idUser)
    try {
      const response = await graphQLQuery.getDataGraphQLMenuByIdUser(idUser);
      runInAction(() => {
        this.dataMain = response;
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createMenu(idUser: string) {
    console.log('**********', idUser)
    try {
      const response = await graphQLQuery.createDataGraphQLMenuByIdUser(idUser);
      runInAction(() => {
        this.dataMain = response;
      });
    } catch (error) {
      console.log('mobx/store-69',error);
      throw error;
    }
  }

  async updateMenu(idUser: string,menu: object) {
    try {
      const response = await graphQLQuery.updateDataGraphQLMenu(idUser, menu);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteMenu(idUser: string) {
    try {
      const response = await graphQLQuery.deleteDataGraphQLMenu(idUser);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getLink(id: string) {
    try {
      const response = await graphQLQuery.getDataGraphQLLink(id);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addLink(link: string) {
    try {
      const response = await graphQLQuery.addDataGraphQLLink(link);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateLink(id: string, link: string) {
    try {
      const response = await graphQLQuery.updateDataGraphQLLink(id, link);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteLink(id: string) {
    try {
      const response = await graphQLQuery.deleteDataGraphQLLink(id);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getArticle(id: string) {
    try {
      const response = await graphQLQuery.getDataGraphQLArticle(id);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addArticle(article: string) {
    try {
      const response = await graphQLQuery.addDataGraphQLArticle(article);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateArticle(id: string, article: string) {
    try {
      const response = await graphQLQuery.updateDataGraphQLArticle(id, article);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteArticle(id: string) {
    try {
      const response = await graphQLQuery.deleteDataGraphQLLink(id);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const dataStore = new DataStore();
export default dataStore;
