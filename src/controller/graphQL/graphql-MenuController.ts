import MakeRequest from './MakeRequest';

class GraphQLMenuController extends MakeRequest {


  constructor() {
    super();
  }

  private queryGetMenu = `
  query getMenu {
    menus {
      menu
      idUser
    }
  }
`;

  private formatObjectForGraphQL = (obj: any) => {
    if (typeof obj !== "object" || obj === null) {
      return JSON.stringify(obj);
    }

    if (Array.isArray(obj)) {
      const arrayItems: any = obj
        .map((item) => this.formatObjectForGraphQL(item))
        .join(",");
      return `[${arrayItems}]`;
    }

    const fields: any = Object.entries(obj)
      .map(([key, value]) => `${key}: ${this.formatObjectForGraphQL(value)}`)
      .join(",");
    return `{${fields}}`;
  };

  private mutationUpdateMenu = (idUser: string, menu: any = {}) => {
    const menuString: any = this.formatObjectForGraphQL(menu);
    const mutation = `
    mutation {
      updateMenu(idUser: "${idUser}", menu: ${menuString}) {
        menu
      }
    }
  `;
    return mutation;
  };

  private mutationDeleteMenu = (idUser: string) => {
    const mutation = `
    mutation {
      deleteMenu(idUser: "${idUser}") {
        id
      }
    }
  `;
    return mutation;
  };

  private mutationGetMenuById = (idUser: string) => {
    const queryGetMenu = `
    query menuByUserId {
      menuByUserId(idUser: "${idUser}") {
        id
        idUser
        menu
      }
    }
    `;
    return queryGetMenu;
  };

  private mutationCreateMenuById = (idUser: string) => {
    const queryCreateMenu = `
    mutation menuByUserId {
      createMenu(idUser: "${idUser}") {
        id
        idUser
        menu
      }
    }
    `;
    return queryCreateMenu;
  };


  getDataMenus = async () => {
    try {
      const data = await this.request(this.queryGetMenu);
      const menuData = data?.data?.menuByUserId[0]?.menu;
      return menuData;
    } catch (error) {
      console.error("Error get Menu:", error);
      throw error;
    }
  };

  getDataMenuByIdUser = async (idUser: string) => {
    try {
      const resMutation = this.mutationGetMenuById(idUser);
      console.log('resMutation', resMutation)
      const data = await this.request(resMutation);
      console.log(data)
      const menuData = data?.data?.menuByUserId[0]?.menu;
      return menuData;
    } catch (error) {
      console.error("Error get Menu:", error);
      throw error;
    }
  };  

  createDataMenuByIdUser = async (idUser: string) => {
    try {
      const resMutation = this.mutationCreateMenuById(idUser);
      console.log('resMutation', resMutation)
      const data = await this.request(resMutation);
      console.log(data)
      const menuData = data?.createMenu?.menuByUserId[0]?.menu || {}
      return menuData;
    } catch (error) {
      console.error("Error get Menu:", error);
      throw error;
    }
  };  

  updateDataMenu = async (idUser: string, menu: object) => {
    try {
      const resMutation = this.mutationUpdateMenu(idUser, menu);
      const data = await this.request(resMutation);
    } catch (error) {
      console.error("Error mutation Menu:", error);
      throw error;
    }
  };

  deleteDataMenu = async (idUser: string) => {
    try {
      const resMutation = this.mutationDeleteMenu(idUser);
      const data = await this.request(resMutation);
    } catch (error) {
      console.error("Error mutation Menu:", error);
      throw error;
    }
  };

}

const graphQLMenuController  = new GraphQLMenuController() 
export default graphQLMenuController;
