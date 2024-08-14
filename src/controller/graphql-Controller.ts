import { URL } from '../const';

class MakeRequest {
  isLoading = false;
  data: { method: string; headers: { "Content-Type": string }; body?: string };
  url: string;

  constructor() {
    this.url = URL;
    this.data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  request = async (query: string) => {
    this.data.body = JSON.stringify({ query });

    try {
      this.isLoading = true;
      const response = await fetch(this.url, { ...this.data });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  };

  isLoadingStatus() {
    return this.isLoading;
  }
}

class GraphQLQuery extends MakeRequest {
  private queryGetMenu = `
    query getMenu {
      menus {
        menu
        idUser
      }
    }
  `;

  constructor() {
    super();
  }

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

  private mutationMenu = (idUser: string, menu: any = {}) => {
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

  private mutationGetLinkById = (id: string) => {
    const queryGetLink = `
    query getLink {
      link(id: "${id}") {
        link
        id
      }
    }
    `;
    return queryGetLink;
  };

  private mutationAddLink = (link: string) => {
    const queryGetLink = `
    mutation {
      addLink(link: "${link}") {
        id
      }
    }
    `;
    return queryGetLink;
  };

  private mutationUpdateLink = (id: string, link: string) => {
    const queryGetLink = `
    mutation {
      updateLink(id: "${id}", link: "${link}") {
        id
        link
      }
    }
    `;
    return queryGetLink;
  };

  private mutationDeleteLink = (id: string) => {
    const queryGetLink = `
    mutation {
      deleteLink(id: "${id}") {
        id
        link
      }
    }
    `;
    return queryGetLink;
  };

  private mutationGetArticle = (id: string) => {
    const queryGetLink = `
    query getArticle {
      article(id: "${id}") {
        article
        id
      }
    }
    `;
    return queryGetLink;
  };

  private mutationAddArticle = (article: string) => {
    const queryGetArticle = `
    mutation {
      addArticle(article: "${article}") {
        id
      }
    }
    `;
    return queryGetArticle;
  };

  private mutationUpdateArticle = (id: string, article: string) => {
    const queryGetArticle = `
    mutation {
      updateArticle(id: "${id}", article: "${article}") {
        id
        article
      }
    }
    `;
    return queryGetArticle;
  };

  private mutationDeleteArticle = (id: string) => {
    const queryGetArticle = `
    mutation {
      deleteArticle(id: "${id}") {
        id
        article
      }
    }
    `;
    return queryGetArticle;
  };

  getDataGraphQLMenus = async () => {
    try {
      const data = await this.request(this.queryGetMenu);
      const menuData = data?.data?.menuByUserId[0]?.menu;
      return menuData;
    } catch (error) {
      console.error("Error get Menu:", error);
      throw error;
    }
  };

  getDataGraphQLMenuByIdUser = async (idUser: string) => {
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

  createDataGraphQLMenuByIdUser = async (idUser: string) => {
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

  updateDataGraphQLMenu = async (idUser: string, menu: object) => {
    try {
      const resMutation = this.mutationMenu(idUser, menu);
      const data = await this.request(resMutation);
    } catch (error) {
      console.error("Error mutation Menu:", error);
      throw error;
    }
  };

  deleteDataGraphQLMenu = async (idUser: string) => {
    try {
      const resMutation = this.mutationDeleteMenu(idUser);
      const data = await this.request(resMutation);
    } catch (error) {
      console.error("Error mutation Menu:", error);
      throw error;
    }
  };


  getDataGraphQLLink = async (id: string) => {
    try {
      const resMutation = this.mutationGetLinkById(id);
      let result = await this.request(resMutation);
      result = result.data.link;
      return result;
    } catch (error) {
      console.error("Error get Link:", error);
      throw error;
    }
  };

  addDataGraphQLLink = async (link: string) => {
    try {
      const resMutation = this.mutationAddLink(link);
      let result = await this.request(resMutation);
      result = result.data.addLink.id;
      return result;
    } catch (error) {
      console.error("error post Link:", error);
      throw error;
    }
  };

  updateDataGraphQLLink = async (id: string, link: string) => {
    try {
      const resMutation = this.mutationUpdateLink(id, link);
      let result = await this.request(resMutation);
      return result;
    } catch (error) {
      console.error("error update Link:", error);
      throw error;
    }
  };

  deleteDataGraphQLLink = async (id: string) => {
    try {
      const resMutation = this.mutationDeleteLink(id);
      let result = await this.request(resMutation);
      return result;
    } catch (error) {
      console.error("Error Deleted Link:", error);
      throw error;
    }
  };

  getDataGraphQLArticle = async (id: string) => {
    try {
      const resMutation = this.mutationGetArticle(id);
      let result = await this.request(resMutation);
      result = result.data.article;
      return result;
    } catch (error) {
      console.error("Error get Article:", error);
      throw error;
    }
  };

  addDataGraphQLArticle = async (article: string) => {
    try {
      article = article.replaceAll('"', "'");
      const resMutation = this.mutationAddArticle(article);
      let result = await this.request(resMutation);
      result = result.data.addArticle.id;
      return result;
    } catch (error) {
      console.error("Error post Article:", error);
      throw error;
    }
  };

  updateDataGraphQLArticle = async (id: string, article: string) => {
    try {
      article = article.replaceAll('"', "'");
      const resMutation = this.mutationUpdateArticle(id, article);
      let result = await this.request(resMutation);
      return result;
    } catch (error) {
      console.error("Error post Article:", error);
      throw error;
    }
  };

  deleteDataGraphQLArticle = async (id: string) => {
    try {
      const resMutation = this.mutationDeleteArticle(id);
      let result = await this.request(resMutation);
      return result;
    } catch (error) {
      console.error("Error delete Article:", error);
      throw error;
    }
  };
}

const graphQLQuery  = new GraphQLQuery() 
export default graphQLQuery;
