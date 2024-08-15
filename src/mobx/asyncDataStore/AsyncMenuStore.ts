import { makeAutoObservable, action, runInAction } from "mobx";
import graphQLMenuController from "../../controller/graphQL/graphql-MenuController";
import dataStore  from "../dataStore/DataStore";

class MenuStore{

  constructor() {
    makeAutoObservable(this, {
      getMenu: action.bound,
    });
  }

  async getMenu(idUser: string) {
    console.log('**********', idUser)
    try {
      const response = await graphQLMenuController.getDataMenuByIdUser(idUser);
      runInAction(() => {
        dataStore.dataMain = response;
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createMenu(idUser: string) {
    console.log('**********', idUser)
    try {
      const response = await graphQLMenuController.createDataMenuByIdUser(idUser);
      runInAction(() => {
        dataStore.dataMain = response;
      });
    } catch (error) {
      console.log('mobx/store-69',error);
      throw error;
    }
  }

  async updateMenu(idUser: string,menu: object) {
    try {
      const response = await graphQLMenuController.updateDataMenu(idUser, menu);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteMenu(idUser: string) {
    try {
      const response = await graphQLMenuController.deleteDataMenu(idUser);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


}

const menuStore = new MenuStore();
export default menuStore;
