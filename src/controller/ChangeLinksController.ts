// ChangeLinksController.ts

import { useState, useRef } from "react";
import dataStore from "../mobx/DataStore";
import menuStore from "../mobx/asyncDataStore/AsyncMenuStore";
import linkStore from "../mobx/asyncDataStore/AsyncLinkStore";
import articleStore from "../mobx/asyncDataStore/AsyncArticleStore";
import authStore from "../mobx/AuthStore";
import logicStore from "../mobx/LogicStore";

export const useChangeLinksController = () => {
  const { dataMenu, key } = dataStore.listLinkData;
  const [selectAction, setSelectAction] = useState("add-link");
  const [selectActionLink, setSelectActionLink] = useState("");
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState("");
  const [article, setArticle] = useState("");
  const isTypeSelect = useRef<string | null>(null);
  const selectId = useRef<string>("");

  const OtherAction = () => {
    menuStore.updateMenu(authStore.user.id, dataStore.dataMain);
    setName("");
    setLink("");
    setArticle("");
    setSelectActionLink("");
    handleCloseModal(null);
  };

  const handlerSetSelectAction = (select: string) => {
    if (select === "Empty") {
      setName("");
      setLink("");
      setArticle("");
      setSelectActionLink("");
      return;
    }
    setSelectActionLink(select);

    const selectedItem = dataMenu[key][+select];
    if (selectedItem.link) {
      isTypeSelect.current = "link";
      selectId.current = selectedItem.link;
      linkStore
        .getLink(selectedItem.link)
        .then((res) => {
          setLink(res.link);
        })
        .catch(() => {
          logicStore.setError("Error get Link");
        });
    }

    if (selectedItem.article) {
      isTypeSelect.current = "article";
      selectId.current = selectedItem.article;
      articleStore
        .getArticle(selectedItem.article)
        .then((res) => {
          setArticle(res.article);
        })
        .catch(() => {
          logicStore.setError("Error get Article");
        });
    }
    setName(selectedItem.name);
  };

  const handleAddLink = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    if (!name.length) {
      logicStore.setError("Add name Link");
      return;
    }

    if (!urlPattern.test(link)) {
      logicStore.setError("Error syntax URL");
      return;
    }

    try {
      const resId = await linkStore.addLink(link);
      dataMenu[key].push({ name, link: resId });
      logicStore.toggleUpdateListLink();
      OtherAction();
    } catch (error) {
      console.error(
        "Error, failed to add link. Please try again later",
        error
      );
      logicStore.setError(
        "Error, failed to add link. Please try again later"
      );
    }
  };

  const handleAddArticle = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!name.length) {
      logicStore.setError("Add name Link");
      return;
    }

    try {
      const resId = await articleStore.addArticle(article);
      dataMenu[key].push({ name, article: resId });
      logicStore.toggleUpdateListLink();
      OtherAction();
    } catch (error) {
      console.error(
        "Error, failed to add article. Please try again later",
        error
      );
      logicStore.setError(
        "Error, failed to add Article. Please try again later"
      );
    }
  };

  const handleSaveChange = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!name.length) {
      logicStore.setError("Add name Link");
      return;
    }

    try {
      if (isTypeSelect.current === "link") {
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        if (!urlPattern.test(link)) {
          logicStore.setError("Error syntax URL");
          return;
        }
        await linkStore.updateLink(selectId.current, link);
        dataMenu[key][+selectActionLink] = {
          name,
          link: selectId.current,
        };
        logicStore.toggleUpdateListLink();
        logicStore.setInfo("Update link");
      }

      if (isTypeSelect.current === "article") {
        await articleStore.updateArticle(selectId.current, article);
        dataMenu[key][+selectActionLink] = {
          name,
          article: selectId.current,
        };
        logicStore.toggleUpdateListLink();
        logicStore.setInfo("Update Article");
      }

      OtherAction();
    } catch (error) {
      if (isTypeSelect.current === "link") {
        console.error("Error, update link. Please try again later", error);
        logicStore.setError("Error updating link. Please try again later");
      } else if (isTypeSelect.current === "article") {
        console.error("Error, update article. Please try again later", error);
        logicStore.setError("Error updating Article. Please try again later");
      }
    }
  };

  const handleDeleteLink = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const deletedLink = dataMenu[key].splice(+selectActionLink, 1)[0];

    try {
      if (deletedLink.link) {
        await linkStore.deleteLink(deletedLink.link);
        logicStore.setInfo("Successfully Deleted Link");
      }

      if (deletedLink.article) {
        await articleStore.deleteArticle(deletedLink.article);
        logicStore.setInfo("Successfully Deleted Article");
      }

      logicStore.toggleUpdateListLink();

      if (dataMenu[key].length === 0) {
        dataStore.listLinkData.dataMenu[key] = null;
      }

      OtherAction();
    } catch (error) {
      if (deletedLink.link) {
        logicStore.setError("Error Deleted Link");
      }
      if (deletedLink.article) {
        logicStore.setError("Error Deleted Article");
      }
    }
  };

  const handleCloseModal = (
    event: React.MouseEvent<HTMLButtonElement> | null
  ) => {
    if (event) event.preventDefault();
    logicStore.setModal(false);
    logicStore.setChangeLinks(false);
  };

  // Встановлюємо Breadcrumbs
  dataStore.setBreadcrumbs([...(dataStore.listLinkData.arrayKeys || []), key]);

  return {
    selectAction,
    setSelectAction,
    selectActionLink,
    setSelectActionLink,
    name,
    setName,
    link,
    setLink,
    article,
    setArticle,
    handlerSetSelectAction,
    handleAddLink,
    handleAddArticle,
    handleSaveChange,
    handleDeleteLink,
    handleCloseModal,
  };
};
