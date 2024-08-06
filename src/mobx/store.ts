import { makeAutoObservable } from "mobx";
import graphQLQuery from  '../functions/requestGraphQLClass'
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

    async getMenu() {
        try {
          const response = await graphQLQuery.getDataGraphQLMenu();
          this.dataMain = response
        } catch (error) {
          console.log(error);
          throw error
        }
      }

      async updateMenu(menu: object) {
        try {
          const response = await graphQLQuery.updateDataGraphQLMenu(menu);
          return  response
        } catch (error) {
          console.log(error);
          throw error
        }
      }

      async getLink(id: string) {
        try {
          const response = await graphQLQuery.getDataGraphQLLink(id);
          return  response
        } catch (error) {
          console.log(error);
          throw error
        }
      }

      async addLink(link: string) {
        try {
          const response = await graphQLQuery.addDataGraphQLLink(link);
          return  response
        } catch (error) {
          console.log(error);
          throw error
        }
      }

      async updateLink(id: string, link: string) {
        try {
          const response = await graphQLQuery.updateDataGraphQLLink(id, link);
          return  response
        } catch (error) {
          console.log(error);
          throw error
        }
      }

      async deleteLink(id: string) {
        try {
          const response = await graphQLQuery.deleteDataGraphQLLink(id);
          return  response
        } catch (error) {
          console.log(error);
          throw error
        }
      }

      async getArticle(id: string) {
        try {
          const response = await graphQLQuery.getDataGraphQLLink(id);
          return  response
        } catch (error) {
          console.log(error);
          throw error
        }
      }

      async addArticle(article: string) {
        try {
          const response = await graphQLQuery.addDataGraphQLArticle(article);
          return  response
        } catch (error) {
          console.log(error);
          throw error
        }
      }

      async updateArticle(id: string, article: string) {
        try {
          const response = await graphQLQuery.updateDataGraphQLArticle(id, article);
          return  response
        } catch (error) {
          console.log(error);
          throw error
        }
      }

      async deleteArticle(id: string) {
        try {
          const response = await graphQLQuery.deleteDataGraphQLLink(id);
          return  response
        } catch (error) {
          console.log(error);
          throw error
        }
      }

}

const dataStore = new DataStore();
export default dataStore;