// changeLinksHandlers.ts

import { RefObject } from "react";
import dataStore from "../../../mobx/DataStore";
import menuStore from "../../../mobx/asyncDataStore/AsyncMenuStore";
import linkStore from "../../../mobx/asyncDataStore/AsyncLinkStore";
import articleStore from "../../../mobx/asyncDataStore/AsyncArticleStore";
import authStore from "../../../mobx/AuthStore";
import logicStore from "../../../mobx/LogicStore";

export const OtherAction = (
  setName: (value: string) => void,
  setLink: (value: string) => void,
  setArticle: (value: string) => void,
  setSelectActionLink: (value: string) => void,
  handleCloseModal: (event: React.MouseEvent<HTMLButtonElement> | null) => void
) => {
  menuStore.updateMenu(authStore?.user?.id, dataStore?.dataMain).then(() => {
    logicStore.toggleUpdateDataMain(); // restart
  });
  setName("");
  setLink("");
  setArticle("");
  setSelectActionLink("");
  handleCloseModal(null);
};

export const handlerSetSelectAction = (
  select: string,
  setName: (value: string) => void,
  setLink: (value: string) => void,
  setArticle: (value: string) => void,
  setSelectActionLink: (value: string) => void,
  setTypeSelect: (value: string) => void,
  selectId: string
) => {
  const { dataMenu, key } = dataStore.listLinkData;

  if (select === "Empty") {
    setName("");
    setLink("");
    setArticle("");
    setSelectActionLink("");
    return;
  }

  setSelectActionLink(select);

  if (dataMenu[key][+select].link) {
    setTypeSelect("link");
    selectId = dataMenu[key][+select].link;
    linkStore
      .getLink(dataMenu[key][+select].link)
      .then((res) => {
        setLink(res.link);
      })
      .catch(() => {
        logicStore.setError("Error get Link");
      });
  }

  if (dataMenu[key][+select].article) {
    setTypeSelect("article");
    selectId = dataMenu[key][+select].article;
    articleStore
      .getArticle(dataMenu[key][+select].article)
      .then((res) => {
        setArticle(res.article);
      })
      .catch(() => {
        logicStore.setError("Error get Article");
      });
  }

  setName(dataMenu[key][+select].name);
};

export const handleAddLink = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  name: string,
  link: string,
  setName: (value: string) => void,
  setLink: (value: string) => void,
  setArticle: (value: string) => void,
  setSelectActionLink: (value: string) => void,
  handleCloseModal: (event: React.MouseEvent<HTMLButtonElement> | null) => void
) => {
  e.preventDefault();
  const { dataMenu, key } = dataStore.listLinkData;
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  if (!name.length) {
    logicStore.setError("Add name Link");
    return;
  }

  if (!urlPattern.test(link)) {
    logicStore.setError("Error syntax url");
    return;
  }

  linkStore
    .addLink(link)
    .then((resId) => {
      dataMenu[key].push({ name, link: resId });
      logicStore.toggleUpdateListLink();
      OtherAction(
        setName,
        setLink,
        setArticle,
        setSelectActionLink,
        handleCloseModal
      );
    })
    .catch((error) => {
      console.error("Error, failed to add link. Please try again later", error);
      logicStore.setError("Error, failed to add link. Please try again later");
    });
};

export const handleAddArticle = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  name: string,
  article: string,
  setName: (value: string) => void,
  setLink: (value: string) => void,
  setArticle: (value: string) => void,
  setSelectActionLink: (value: string) => void,
  handleCloseModal: (event: React.MouseEvent<HTMLButtonElement> | null) => void
) => {
  event.preventDefault();
  const { dataMenu, key } = dataStore.listLinkData;

  if (!name.length) {
    logicStore.setError("Add name Link");
    return;
  }

  articleStore
    .addArticle(article)
    .then((resId) => {
      dataMenu[key].push({ name, article: resId });
      logicStore.toggleUpdateListLink();
      OtherAction(
        setName,
        setLink,
        setArticle,
        setSelectActionLink,
        handleCloseModal
      );
    })
    .catch((error) => {
      console.error(
        "Error, failed to add article. Please try again later",
        error
      );
      logicStore.setError(
        "Error, failed to add article. Please try again later"
      );
    });
};

export const handleSaveChang = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  name: string,
  link: string,
  article: string,
  selectActionLink: string,
  selectId: string,
  isTypeSelect: string,
  setName: (value: string) => void,
  setLink: (value: string) => void,
  setArticle: (value: string) => void,
  setSelectActionLink: (value: string) => void,
  handleCloseModal: (event: React.MouseEvent<HTMLButtonElement> | null) => void
) => {
  e.preventDefault();
  const { dataMenu, key } = dataStore.listLinkData;

  if (!name.length) {
    logicStore.setError("Add name Link");
    return;
  }

  if (isTypeSelect === "link") {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(link)) {
      logicStore.setError("Error syntax url");
      return;
    }
    linkStore
      .updateLink(selectId, link)
      .then((res) => {
        dataMenu[key][+selectActionLink] = {
          name,
          link: selectId,
        };
        logicStore.toggleUpdateListLink();
        logicStore.setInfo("Update link");
      })
      .catch((error) => {
        console.error("Error, update link Please try again later", error);
        logicStore.setError("Error  update link. Please try again later");
      });
  }

  if (isTypeSelect === "article") {
    articleStore
      .updateArticle(selectId, article)
      .then((res) => {
        dataMenu[key][+selectActionLink] = {
          name,
          article: selectId,
        };
        logicStore.toggleUpdateListLink();
        logicStore.setInfo("Update Article");
      })
      .catch((error) => {
        console.error("Error, update article. Please try again later", error);
        logicStore.setError("Error, update Article. Please try again later");
      });
  }

  OtherAction(
    setName,
    setLink,
    setArticle,
    setSelectActionLink,
    handleCloseModal
  );
};

export const handleDeleteLink = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  selectActionLink: string,
  setName: (value: string) => void,
  setLink: (value: string) => void,
  setArticle: (value: string) => void,
  setSelectActionLink: (value: string) => void,
  handleCloseModal: (event: React.MouseEvent<HTMLButtonElement> | null) => void
) => {
  e.preventDefault();
  const { dataMenu, key } = dataStore.listLinkData;

  const deletedLink = dataMenu[key].splice(+selectActionLink, 1);

  if (deletedLink[0].link) {
    linkStore
      .deleteLink(deletedLink[0].link)
      .then((res) => {
        logicStore.toggleUpdateListLink();
        logicStore.setInfo("Successful Deleted Link");
      })
      .catch((error) => {
        logicStore.setError("Error Deleted Link");
      });
  }

  if (deletedLink[0].article) {
    articleStore
      .deleteArticle(deletedLink[0].article)
      .then((res) => {
        logicStore.toggleUpdateListLink();
        logicStore.setInfo("Successful Deleted Article");
      })
      .catch((error) => {
        logicStore.setError("Error Deleted Link");
      });
  }

  if (dataMenu[key].length === 0) {
    dataMenu[key] = null;
  }

  OtherAction(
    setName,
    setLink,
    setArticle,
    setSelectActionLink,
    handleCloseModal
  );
};

export const handleCloseModal = (
  event: React.MouseEvent<HTMLButtonElement> | null
) => {
  event?.preventDefault();
  logicStore.setModal(false);
  logicStore.setChangeLinks(false);
};
