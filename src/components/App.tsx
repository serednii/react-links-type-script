import { useRef, useEffect, useContext } from "react";
import Header from "./Header/Header";
import UsefulLinks from "./UsefulLinks/UsefulLinks";
import AddCategoryOther from "./AddCategoryOther/AddCategoryOther";
import ChangeLinks from "./ChangeLinks/ChangeLinks";
import { MyContext } from "../MyContext";
import {
  getDataGraphQLMenu,
  getDataGraphQLLink,
  postDataGraphQLLink,
} from "../functions/requestHelpersGraphQL";
import { Footer } from "./Footer/Footer";
import "../App.css";

const App: React.FC = () => {
  const {
    URL_SERVER,
    isLoading,
    setIsLoading,
    setDataMain,
    dataMain,
    isAddCategoryOther,
    isChangeLinks,
  } = useContext(MyContext);
  const tempDataRef = useRef<{ test: string } | null>(null);

  // const handlerGetDate = (): void => {
  //   getData(URL_SERVER, setIsLoading)
  //     .then((data: any) => {
  //       tempDataRef.current = data;
  //       console.log(tempDataRef.current);
  //     })
  //     .catch((error: Error) => {
  //       console.error("Error fetching data:", error);
  //       // throw new Error(String(error));
  //     });
  // };

  useEffect(() => {
    postDataGraphQLLink("kjdhseirhseoigshei")
      .then((res) => {
        console.log("link ", res);
      })
      .catch((error) => console.error("Error fetching menu data:", error));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataGraphQLMenu();
        console.log(data);
        setDataMain(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   getData(URL_SERVER, setIsLoading)
  //     .then((data: any) => {
  //       // data = { data: { menu: [{ menu: data }] } };
  //       console.log("REST -- ", data);
  //       const pole = "Typscript";

  //       // console.log(`-----${pole}------ `, data[pole]);
  //       // setDataMain(data);
  //       // makeRequest(mutationMenu(data))
  //       //   // makeRequest(mutationMenu({ [pole]: data[pole] }))
  //       //   .then((_data) => console.log("Query result:", _data))
  //       //   .catch((error) => console.error("Query error:", error));
  //     })
  //     .catch((error: Error) => {
  //       console.error("Error fetching data:", error);
  //       // throw new Error(String(error));
  //     });
  // }, []);

  return (
    <div className="App vh-100 container-xxl d-flex flex-column justify-content-between">
      <main className="flex-grow-1 d-flex flex-column">
        {isLoading && <h1>Loading...</h1>}
        <Header />
        <UsefulLinks />
        {isAddCategoryOther && <AddCategoryOther />}
        {isChangeLinks && <ChangeLinks />}
        {/* <Button onClick={handlerGetDate}>Get Data</Button>
        <Button onClick={handlerPostDate}>Put Data</Button> */}
      </main>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default App;

// const { ApolloServer, gql } = require('apollo-server');

// // Схема GraphQL
// const typeDefs = gql`
//   type Query {
//     getMenu: Menu
//   }

//   type Menu {
//     level: Int
//     type: String
//     menu: [MenuItem]
//     idLinks: [LinkItem]
//   }

//   type MenuItem {
//     level: Int
//     nameMenu: String
//     type: String
//     menu: [MenuItem]
//     idLinks: [LinkItem]
//   }

//   type LinkItem {
//     link: String
//     name: String
//     idArticle: Int
//   }
// `;

// // Дані
// const data = {
//     level: 0,
//     type: "menu",
//     menu: [
//         {
//             level: 1,
//             nameMenu: "java",
//             type: null
//         },
//         {
//             level: 1,
//             nameMenu: "js",
//             type: 'menu',
//             menu: [
//                 {
//                     level: 2,
//                     nameMenu: "java",
//                     type: null
//                 },
//                 {
//                     level: 2,
//                     nameMenu: "js",
//                     type: null
//                 }
//             ]
//         },
//         {
//             level: 1,
//             nameMenu: "java",
//             type: "idLinks",
//             idLinks: [
// {
//     "link": "https://vertex-academy.com/tutorials/ru/sozdanie-peremennyx-i-tipy-peremenny/",
//         "name": "Переменные в Java"
// },
// {
//     "link": "https://javarush.com/groups/posts/peremennie-v-java",
//         "name": "Переменные в Java и константы"
// },
// {
//     "link": "https://metanit.com/java/tutorial/2.1.php",
//         "name": "Переменные и константы"
// },
// {
//     "idArticle": 1,
//         "name": "Переменные и константы"
//                 },
// {
//     "idArticle": 1,
//         "name": "Переменные и константы"
//                 }
//             ]
//         }
//     ]
// };
