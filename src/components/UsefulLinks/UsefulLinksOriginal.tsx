import React, { useEffect, useRef } from "react";
import ListLinks from "./ListLinks/ListLinks";
import MenuLinks from "./MenuLinks/MenuLinks";
import { observer } from "mobx-react-lite";
import logicStore from "../../mobx/LogicStore";
import { svgIoSettings } from "../../icon";
import "./UsefulLinks.scss";
import { ActiveMenuType } from "./MenuLinks/type";
// import ArticleWrapper from "../ArticleWrapper/ArticleWrapper";
import dataStore from "../../mobx/DataStore";
import Article from "../ArticleWrapper/Article/Article";

// type MenuFunctionType = (value: string) => void;

// type ActiveMenuType = {
//   setIsOpenCloseSubMenu: MenuFunctionType;
//   isOpenCloseSubMenu: string;
//   level: number;
// };

const UsefulLinks: React.FC = () => {
  const activesMenu = useRef<ActiveMenuType[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  // const { idArticle } = useSelector((state: RootState) => state.data);

  console.log("UsefulLinks");
  const arrayKeysStart = useRef([]);

  function handlerOpenPopup(): void {
    logicStore.setButtonPlus(!logicStore.isButtonPlus);
    logicStore.setChangeLinks(false);
  }

  const clearClickMenu = () => {
    activesMenu.current.forEach((e) => e.setIsOpenCloseSubMenu(""));
    activesMenu.current.splice(0);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      clearClickMenu();
    }
  };

  const handleEscapePress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      clearClickMenu();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapePress);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePress);
    };
    // eslint-disable-next-line
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
