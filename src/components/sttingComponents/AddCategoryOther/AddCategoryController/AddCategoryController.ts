// useAddCategoryController.ts
import { useState } from "react";
import { isObject, isArray } from "../../../otherFunction/functions";
import menuStore from "../../../mobx/asyncDataStore/AsyncMenuStore";
import dataStore from "../../../mobx/DataStore";
import linkStore from "../../../mobx/asyncDataStore/AsyncLinkStore";
import articleStore from "../../../mobx/asyncDataStore/AsyncArticleStore";
import authStore from "../../../mobx/AuthStore";
import logicStore from "../../../mobx/LogicStore";

const useAddCategoryController = () => {
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [selectAction, setSelectAction] = useState<string>("");
  const [article, setArticle] = useState("");

  let { dataMenu, prevDataMenu, key, arrayKeys } = dataStore?.sluice || {};
  if (!dataMenu || !key || !arrayKeys) {
    return {
      dataMenu: null,
      key: null,
      arrayKeys: null,
      isArr: false,
      isObj: false,
      setName,
      setLink,
      setSelectAction,
      setArticle,
    };
  }

  dataMenu = dataMenu[0];
  const prevKey = arrayKeys[0];

  const isArr = isArray(dataMenu[key]);
  const isObj = isObject(dataMenu[key]);

  const OtherAction = () => {
    menuStore.updateMenu(authStore?.user?.id, dataStore?.dataMain).then(() => {
      logicStore.toggleUpdateDataMain();
    });
    logicStore.setModal(false);
    logicStore.setAddCategoryOther(false);
  };

  const handleSetText = (value: string) => {
    const regex = /^[a-zA-Z_0-9]*$/;
    if (regex.test(value)) {
      setName(value);
    }
  };

  const handleRenameMenu = () => {
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

  const handleDeleteMenu = () => {
    delete dataMenu[key];
    if (prevDataMenu && Object.keys(prevDataMenu[prevKey]).length === 0) {
      prevDataMenu[prevKey] = null;
    }
    OtherAction();
  };

  const handleAddSubMenu = () => {
    if (!name.length) {
      logicStore.setError("Add name Link");
      return;
    }

    if (dataMenu[key] === null) dataMenu[key] = {};
    if (isObject(dataMenu[key])) dataMenu[key][name] = null;
    OtherAction();
    setName("");
  };

  const handleAddMenu = () => {
    if (!name.length) {
      logicStore.setError("Add name Link");
      return;
    }

    dataMenu[name] = null;
    OtherAction();
    setName("");
  };

  const handleAddLink = () => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    if (!name.length) {
      logicStore.setError("Add name Link");
      return;
    }

    if (!urlPattern.test(link)) {
      logicStore.setError("Error synaxsys link");
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
      });
  };

  const handleAddArticle = () => {
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
        console.error("Error, failed to add link. Please try again later", error);
      });
  };

  const handleCloseModal = () => {
    logicStore.setModal(false);
    logicStore.setAddCategoryOther(false);
  };

  return {
    name,
    link,
    article,
    selectAction,
    dataMenu,
    key,
    arrayKeys,
    isArr,
    isObj,
    setName,
    setLink,
    setSelectAction,
    setArticle,
    handleSetText,
    handleRenameMenu,
    handleDeleteMenu,
    handleAddSubMenu,
    handleAddMenu,
    handleAddLink,
    handleAddArticle,
    handleCloseModal,
  };
};

export default useAddCategoryController;
