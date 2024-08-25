import menuStore from "../../mobx/asyncDataStore/AsyncMenuStore";
import dataStore from "../../mobx/DataStore";
import linkStore from "../../mobx/asyncDataStore/AsyncLinkStore";
import articleStore from "../../mobx/asyncDataStore/AsyncArticleStore";
import authStore from "../../mobx/AuthStore";
import logicStore from "../../mobx/LogicStore";
import { isObject, isArray } from "../../otherFunction/functions";

export const OtherAction = () => {
  menuStore.updateMenu(authStore?.user?.id, dataStore?.dataMain).then(() => {
    logicStore.toggleUpdateDataMain(); // Restart
  });
  handleCloseModal();
};

export const handlerSetSelectAction = (
  select: string,
  setSelectAction: React.Dispatch<React.SetStateAction<string>>,
  setName: React.Dispatch<React.SetStateAction<string>>,
  key: string
) => {
  setSelectAction(select);
  if (select === "rename") setName(key);
};

export const handleSetText = (
  value: string,
  setName: React.Dispatch<React.SetStateAction<string>>
) => {
  const regex = /^[a-zA-Z_0-9]*$/;
  if (regex.test(value)) {
    setName(value);
  }
};

export const handleRenameMenu = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  name: string,
  dataMenu: any,
  key: string,
  setName: React.Dispatch<React.SetStateAction<string>>
) => {
  event.preventDefault();

  if (!name.length) {
    logicStore.setError("Add name Link");
    return;
  }

  dataMenu[name] = dataMenu[key];
  delete dataMenu[key];
  key = name;
  OtherAction();
  setName(name);
};

export const handleDeleteMenu = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  dataMenu: any,
  key: string,
  prevDataMenu: any,
  prevKey: string
) => {
  event.preventDefault();
  delete dataMenu[key];
  if (prevDataMenu && Object.keys(prevDataMenu[prevKey]).length === 0) {
    console.log("add null");
    prevDataMenu[prevKey] = null;
  }

  OtherAction();
  logicStore.setAddCategoryOther(false);
};

export const handleAddSubMenu = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  name: string,
  dataMenu: any,
  key: string,
  setName: React.Dispatch<React.SetStateAction<string>>
) => {
  event.preventDefault();
  if (!name.length) {
    logicStore.setError("Add name Link");
    return;
  }
  if (dataMenu[key] === null) dataMenu[key] = {};
  if (isObject(dataMenu[key])) dataMenu[key][name] = null;
  OtherAction();
  setName("");
};

export const handleAddMenu = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  name: string,
  dataMenu: any,
  setName: React.Dispatch<React.SetStateAction<string>>
) => {
  event.preventDefault();

  if (!name.length) {
    logicStore.setError("Add name Link");
    return;
  }

  dataMenu[name] = null;
  OtherAction();
  setName("");
};

export const handleAddLink = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  name: string,
  link: string,
  dataMenu: any,
  key: string,
  setName: React.Dispatch<React.SetStateAction<string>>
) => {
  event.preventDefault();
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  if (!name.length) {
    logicStore.setError("Add name Link");
    return;
  }

  if (!urlPattern.test(link)) {
    logicStore.setError("Error syntax link");
    return;
  }

  linkStore
    .addLink(link)
    .then((resId) => {
      if (dataMenu[key] === null) dataMenu[key] = [];
      if (isArray(dataMenu[key]))
        dataMenu[key].push({
          name: name,
          link: resId,
        });
      OtherAction();
      setName("");
      logicStore.toggleUpdateListLink();
    })
    .catch((error) => {
      console.error("Error, failed to add link. Please try again later", error);
      throw error;
    });
};

export const handleAddArticle = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  name: string,
  article: string,
  dataMenu: any,
  key: string,
  setName: React.Dispatch<React.SetStateAction<string>>
) => {
  event.preventDefault();

  if (!name.length) {
    logicStore.setError("Add name Link");
    return;
  }

  articleStore
    .addArticle(article)
    .then((resId) => {
      if (dataMenu[key] === null) dataMenu[key] = [];
      if (isArray(dataMenu[key]))
        dataMenu[key].push({
          name: name,
          article: resId,
        });
      OtherAction();
      setName("");
      logicStore.toggleUpdateListLink();
    })
    .catch((error) => {
      console.error("Error, failed to add article. Please try again later", error);
      throw error;
    });
};

export const handleCloseModal = () => {
  logicStore.setModal(false);
  logicStore.setAddCategoryOther(false);
};
