import MakeRequest from './MakeRequest';

class GraphQLLinkController extends MakeRequest {
  constructor() {
    super();
  }


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


  getDataLink = async (id: string) => {
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

  addDataLink = async (link: string) => {
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

  updateDataLink = async (id: string, link: string) => {
    try {
      const resMutation = this.mutationUpdateLink(id, link);
      let result = await this.request(resMutation);
      return result;
    } catch (error) {
      console.error("error update Link:", error);
      throw error;
    }
  };

  deleteDataLink = async (id: string) => {
    try {
      const resMutation = this.mutationDeleteLink(id);
      let result = await this.request(resMutation);
      return result;
    } catch (error) {
      console.error("Error Deleted Link:", error);
      throw error;
    }
  };

}

const graphQLLinkController  = new GraphQLLinkController() 
export default graphQLLinkController;
