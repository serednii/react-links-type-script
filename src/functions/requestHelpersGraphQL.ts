const url = "http://localhost:3040/graphql/";

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

const makeRequest = async (query: string,) => {
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





const queryGetMenu = `
query getMenu {
  menu {
    menu
}
}
`;

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







const mutationGetLink = (id: string) => {
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

const mutationAddLink = (link: string) => {
  const queryGetLink = `
  mutation getLink {
    addLink(link: "${link}") {
      id
  }
  }
  `;
  return queryGetLink;
};

const mutationUpdateLink = (id:string, link: string) => {
  const queryGetLink = `
  mutation getLink {
    updateLink(id: "${id}", link: "${link}") {
      id
      link
  }
  }
  `;
  return queryGetLink;
};

const mutationDeleteLink = (id: string) => {
  const queryGetLink = `
  mutation getLink {
    deleteLink(id: "${id}") {
      id
      link
  }
  }
  `;
  return queryGetLink;
};







const mutationGetArticle = (id: string) => {
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

const mutationAddArticle = (article: string) => {
  const queryGetArticle = `
  mutation getArticle {
    addArticle(article: "${article}") {
      id
  }
  }
  `;
  return queryGetArticle;
};

const mutationUpdateArticle = (id: string, article: string) => {
  console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
  console.log(id);
  console.log(article);
  const queryGetArticle = `
  mutation getArticle {
    updateArticle(id: "${id}", article: "${article}") {
      id,
      article
  }
  }
  `;
  return queryGetArticle;
};

const mutationDeleteArticle = (id: string) => {
  const queryGetArticle = `
  mutation getArticle {
    deleteArticle(id: "${id}") {
      id
      article
  }
  }
  `;
  return queryGetArticle;
};








export const getDataGraphQLMenu = async () => {
  try {
    const data = await makeRequest(queryGetMenu);
    const menuData =data.data.menu[0].menu;
    console.log("GRAPHQL -- ", menuData);
    return menuData;
  } catch (error) {
    console.error("Error get Menu:", error);
    throw error;
  }
};

export const postDataGraphQLMenu = async (menu: object)=> {

  try{
    const mut = mutationMenu(menu)
    const data = await makeRequest(mut);
    console.log(data)
  }catch(error){
    console.error("Error mutation Menu:", error);
    throw error;
  }
}



export const getDataGraphQLLink = async (id:string) => {
    try{
      const resMutation = mutationGetLink(id)
    console.log(resMutation)

     let result = await makeRequest(resMutation)
     result = result.data.link
     return result
    }catch(error){
      console.error("Error get Link:", error);
      throw error;
    }
}

export const addDataGraphQLLink = async (link:string) => {
  try{
    const resMutation = mutationAddLink(link)
    console.log('resMutation post link ', resMutation)
   let result = await makeRequest(resMutation)
   result = result.data.addLink.id
   return result
  }catch(error){
    console.error("error post Link:", error);
    throw error;
  }
}

export const updateDataGraphQLLink = async (id: string, link:string) => {
  try{
    const resMutation = mutationUpdateLink(id, link)
    console.log('resMutation post link ', resMutation)
   let result = await makeRequest(resMutation)
  //  result = result.data.addLink.id
   return result
  }catch(error){
    console.error("error update Link:", error);
    throw error;
  }
}

export const deleteDataGraphQLLink = async (id:string) => {
  try{
    const resMutation = mutationDeleteLink(id)
   let result = await makeRequest(resMutation)
   return result
  }catch(error){
    console.error("Error Deleted Link :", error);
    throw error;
  }
}








export const getDataGraphQLArticle = async (id:string) => {
  try{
    const resMutation = mutationGetArticle(id)
    console.log(resMutation)
   let result = await makeRequest(resMutation)
   result = result.data.article
   return result
  }catch(error){
    console.error("Error get Article:", error);
    throw error;
  }
}

export const addDataGraphQLArticle = async (article:string) => {
try{
  article = article.replaceAll('"', "'")
  const resMutation = mutationAddArticle(article)
  console.log('resMutation post Article ', resMutation)
  let result = await makeRequest(resMutation)
  result = result.data.addArticle.id
 return result
}catch(error){
  console.error("Error post Article:", error);
  throw error;
}
}

export const updateDataGraphQLArticle = async (id: string, article:string) => {
  try{
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log(id);
    console.log(article);
    article = article.replaceAll('"', "'")
    const resMutation = mutationUpdateArticle(id, article)
    console.log('resMutation update Article ', resMutation)
    let result = await makeRequest(resMutation)
    // result = result.data.addArticle.id
   return result
  }catch(error){
    console.error("Error post Article:", error);
    throw error;
  }
  }

export const deleteDataGraphQLArticle = async (article:string) => {
  try{
    const resMutation = mutationDeleteArticle(article)
    console.log('resMutation post Article ', resMutation)
    let result = await makeRequest(resMutation)
    result = result.data.addArticle.id
   return result
  }catch(error){
    console.error("Error delete  Article:", error);
  }
  }


