import MakeRequest from './MakeRequest';

class GraphQLArticleController extends MakeRequest {

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


  getDataArticle = async (id: string) => {
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

  addDataArticle = async (article: string) => {
    try {
      article = article.replaceAll('"', "'").replace(/\n/g, ' ');
      const resMutation = this.mutationAddArticle(article);
      console.log(resMutation)
      let result = await this.request(resMutation);
      result = result.data.addArticle.id;
      return result;
    } catch (error) {
      console.error("Error post Article:", error);
      throw error;
    }
  };
  
  updateDataArticle = async (id: string, article: string) => {
    try {
      article = article.replaceAll('"', "'").replace(/\n/g, ' ');
      // article = article.replace(/\n/g, ' ');
      const resMutation = this.mutationUpdateArticle(id, article);
      let result = await this.request(resMutation);
      return result;
    } catch (error) {
      console.error("Error post Article:", error);
      throw error;
    }
  };

  deleteDataArticle = async (id: string) => {
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

const graphQLArticleController  = new GraphQLArticleController() 
export default graphQLArticleController;
