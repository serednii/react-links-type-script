// ListLinksController.ts
import React from "react";
import { useState, useEffect } from "react";
import linkStore from "../mobx/asyncDataStore/AsyncLinkStore";
import dataStore from "../mobx/DataStore";
import logicStore from "../mobx/LogicStore";
import adminController from "./admin-Controller";

interface ILink {
  id: string;
  link: string;
}

export const useListLinksController = () => {
  const [dataArrayElements, setDataArrayElements] = useState<any>([]);
  const [loadingList, setLoadingList] = useState(false);
  const { dataMenu, key, arrayKeys } = dataStore?.listLinkData || {};

  const handlerChangeLink = () => {
    if (
      !adminController.accessUserActivated() ||
      !adminController.accessUserAddedContent()
    ) {
      return;
    }
    logicStore.setModal(true);
    logicStore.toggleChangeLinks();
    logicStore.setAddCategoryOther(false);
    logicStore.setButtonPlus(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchLinks = async () => {
      if (dataMenu && key && dataMenu[key]) {
        setLoadingList(true);
        try {
          const elements = await Promise.all(
            dataMenu[key].map(async (obj: any) => {
              let id: string = "";
              let link: string = "";

              if (obj.link) {
                const res = await linkStore.getLink(obj.link);
                id = obj.link;
                link = res.link;
              } else if (obj.article) {
                id = obj.article;
              }

              return (
                <React.Fragment key={id}>
                  {obj.link && (
                    <li className="list-group-item color-link rounded-3 mb-2">
                      <a
                        onClick={() => logicStore.setIdArticle("")}
                        className="active link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                        target="_blank"
                        href={link}
                        rel="noopener noreferrer"
                      >
                        {obj.name}
                      </a>
                    </li>
                  )}

                  {obj.article && (
                    <li
                      key={id}
                      className="list-group-item color-article rounded-3 mb-2"
                    >
                      <button onClick={() => logicStore.setIdArticle(id)}>
                        {obj.name}
                      </button>
                    </li>
                  )}
                </React.Fragment>
              );
            })
          );

          if (!signal.aborted) {
            setDataArrayElements(elements);
          }
        } catch (e) {
          if (!signal.aborted) {
            console.error("Error fetching links:", e);
          }
        } finally {
          if (!signal.aborted) {
            setLoadingList(false);
          }
        }
      } else {
        setDataArrayElements(<p>No data available</p>);
      }
    };

    fetchLinks();

    return () => {
      controller.abort(); // Скасування запиту при розмонтуванні компонента
    };
  }, [key, logicStore.updateListLink]);

  dataStore.setBreadcrumbs([...(arrayKeys || []), key]);

  return {
    dataArrayElements,
    loadingList,
    handlerChangeLink,
  };
};
