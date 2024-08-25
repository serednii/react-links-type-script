// changeLinksUtils.ts

import logicStore from "../../mobx/LogicStore";
import menuStore from "../../mobx/asyncDataStore/AsyncMenuStore";
import linkStore from "../../mobx/asyncDataStore/AsyncLinkStore";
import articleStore from "../../mobx/asyncDataStore/AsyncArticleStore";
import authStore from "../../mobx/AuthStore";
import dataStore from "../../mobx/DataStore";

interface LinkData {
  name: string;
  link?: string;
  article?: string;
}

export const OtherAction = (
  setName: React.Dispatch<React.SetStateAction<string>>,
  setLink: React.Dispatch<React.SetStateAction<string>>,
  setArticle: React.Dispatch<React.SetStateAction<string>>,
  setSelectActionLink: React.Dispatch<React.SetStateAction<string>>,
  handleCloseModal: (event: React.MouseEvent<HTMLButtonElement> | null) => void
) => {
  menuStore.updateMenu(authStore.user.id, dataStore.dataMain);
  setName("");
  setLink("");
  setArticle("");
  setSelectActionLink("");
  handleCloseModal(null);
};

export const handleAddLink = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  name: string,
  link: string,
  dataMenu: any,
  key: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  setLink: React.Dispatch<React.SetStateAction<string>>,
  setArticle: React.Dispatch<React.SetStateAction<string>>,
  setSelectActionLink: React.Dispatch<React.SetStateAction<string>>,
  handleCloseModal: (event: React.MouseEvent<HTMLButtonElement> | null) => void
) => {
  e.preventDefault();
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  if (!name.length) {
    logicStore.setError("Add name Link");
    return;
  }

  if (!urlPattern.test(link)) {
    logicStore.setError("Error synaxsys url");
    return;
  }

  linkStore
    .addLink(link)
    .then((resId) => {
      dataMenu[key].push({ name, link: resId });
      logicStore.toggleUpdateListLink();
      OtherAction(setName, setLink, setArticle, setSelectActionLink, handleCloseModal);
    })
    .catch((error) => {
      console.error("Error, failed to add link. Please try again later", error);
      logicStore.setError("Error, failed to add link. Please try again later");
    });
};

// Аналогічно винесіть інші функції...
