

export const url = "http://localhost:3040/graphql/";
const queryGetMenu = `
query getMenu {
  menu {
    menu
}
}
`;



const queryGetArticle = `
query getMenu {
  menu {
    menu
}
}
`;

const formatObjectForGraphQL = (obj: any) => {
  if (typeof obj !== "object" || obj === null) {
    return JSON.stringify(obj);
  }

  if (Array.isArray(obj)) {
    const arrayItems: any = obj
      .map((item) => formatObjectForGraphQL(item))
      .join(",");
    return `[${arrayItems}]`;
  }

  const fields: any = Object.entries(obj)
    .map(([key, value]) => `${key}: ${formatObjectForGraphQL(value)}`)
    .join(",");
  return `{${fields}}`;
};




const mutationMenu = (menu: any = {}) => {
  const menuString: any = formatObjectForGraphQL(menu);

  const mutation = `
  mutation{
    updateMenu(id: "669d548bebe914267a8679ed", menu :${menuString}) {
  menu
}
  }
`;
  return mutation;
};

const mutationLinkId = (id: string) => {
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

const mutationLinkLink = (link: string) => {
  const queryGetLink = `
  mutation getLink {
    addLink(link: "${link}") {
      id
  }
  }
  `;
  return queryGetLink;
};

const makeRequest = async (query: string) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const getDataGraphQLMenu = async () => {
  try {
    const data = await makeRequest(queryGetMenu);
    const menuData =data.data.menu[0].menu;
    console.log("GRAPHQL -- ", menuData);
    return menuData;
  } catch (error) {
    console.error("Query error:", error);
    throw error;
  }
};

export const postDataGraphQLMenu = async (menu: object)=> {

  try{
    const mut = mutationMenu(menu)
    const data = await makeRequest(mutationMenu(menu));
    console.log(data)
  }catch(error){
    console.error("Mutation Menu error:", error);
    throw error;
  }

}

export const getDataGraphQLLink = async (id:string) => {
    try{
      const resMutation = mutationLinkId(id)
     let result = await makeRequest(resMutation)
     result = result.data.link
     return result
    }catch(error){
      console.error("Query link error:", error);
      throw error;
    }
}

export const postDataGraphQLLink = async (link:string) => {
  try{
    const resMutation = mutationLinkLink(link)
    console.log('resMutation post link ', resMutation)
   let result = await makeRequest(resMutation)
   result = result.data.addLink.id
   return result
  }catch(error){
    console.error("Query link error:", error);
    throw error;
  }
}
