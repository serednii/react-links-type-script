// linkHelpers.ts

import React from "react";
import linkStore from "../../../mobx/asyncDataStore/AsyncLinkStore";
import logicStore from "../../../mobx/LogicStore";

// Handles change link action
export const handlerChangeLink = () => {
  logicStore.setModal(true);
  logicStore.toggleChangeLinks();
  logicStore.setAddCategoryOther(false);
  logicStore.setButtonPlus(false);
};

// Fetch links and update state
export const fetchLinks = async (
  dataMenu: any,
  key: string,
  signal: AbortSignal,
  setLoadingList: (state: boolean) => void,
  setDataArrayElements: (elements: React.ReactNode) => void
) => {
  if (dataMenu && key && dataMenu[key]) {
    setLoadingList(true);
    try {
      const elements = await fetchLinkElements(dataMenu[key], signal);
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

// Fetch individual link elements and return them as React nodes
export const fetchLinkElements = async (
  items: any[],
  signal: AbortSignal
): Promise<React.ReactNode[]> => {
  return Promise.all(
    items.map(async (obj: any) => {
      let id: string = "";
      let link: string = "";

      if (obj.link) {
        const res = await linkStore.getLink(obj.link);
        id = obj.link;
        link = res.link;
      } else if (obj.article) {
        id = obj.article;
      }

      return renderLinkItem(obj, id, link);
    })
  );
};

// Render a single link or article item
export const renderLinkItem = (obj: any, id: string, link: string) => {
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
        <li className="list-group-item color-article rounded-3 mb-2">
          <button onClick={() => logicStore.setIdArticle(id)}>
            {obj.name}
          </button>
        </li>
      )}
    </React.Fragment>
  );
};
