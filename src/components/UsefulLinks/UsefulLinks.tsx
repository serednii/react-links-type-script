import React, { useEffect, useRef } from "react";
import ListLinks from "./ListLinks/ListLinks";
import MenuLinks from "./MenuLinks/MenuLinks";
import Article from "../ArticleWrapper/Article/Article";
import { observer } from "mobx-react-lite";
import logicStore from "../../mobx/LogicStore";
import { svgIoSettings } from "../../icon";
import "./UsefulLinks.scss";
import { ActiveMenuType } from "./MenuLinks/type";
import dataStore from "../../mobx/DataStore";
import {
  handlerOpenPopup,
  clearClickMenu,
  handleClickOutside,
  handleEscapePress,
} from "./usefulLinksUtils"; // Importing the utility functions

const UsefulLinks: React.FC = () => {
  const activesMenu = useRef<ActiveMenuType[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const arrayKeysStart = useRef([]);

  useEffect(() => {
    const handleClickOutsideEvent = (event: MouseEvent) =>
      handleClickOutside(event, menuRef, activesMenu.current);
    const handleEscapePressEvent = (event: KeyboardEvent) =>
      handleEscapePress(event, activesMenu.current);

    document.addEventListener("mousedown", handleClickOutsideEvent);
    document.addEventListener("keydown", handleEscapePressEvent);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEvent);
      document.removeEventListener("keydown", handleEscapePressEvent);
    };
  }, []);

  return (
    <section className="useFull_links flex-grow-1 d-flex flex-column rounded-4">
      <main className="main">
        <div ref={menuRef} className="menu-wrapper">
          <button onClick={handlerOpenPopup}>{svgIoSettings}</button>

          <MenuLinks
            key={"MenuLinks"}
            arrayKeys={arrayKeysStart.current}
            dataMenu={dataStore.dataMain}
            firstMenu={true}
            level={0}
            activesMenu={activesMenu.current}
          />
        </div>

        <ListLinks />
        {logicStore.idArticle && <Article />}
      </main>
    </section>
  );
};

export default observer(UsefulLinks);
