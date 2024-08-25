// UsefulLinks.tsx

import React, { useRef } from "react";
import ListLinks from "./ListLinks/ListLinks";
import MenuLinks from "./MenuLinks/MenuLinks";
import Article from "../ArticleWrapper/Article/Article";
import { observer } from "mobx-react-lite";
import { svgIoSettings } from "../../icon";
import "./UsefulLinks.scss";
import { ActiveMenuType } from "./MenuLinks/type";
import dataStore from "../../mobx/DataStore";
import { useUsefulLinksController } from "../../controller/UsefulLinksController";
import logicStore from "../../mobx/LogicStore";

const UsefulLinks: React.FC = () => {
  const activesMenu = useRef<ActiveMenuType[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const arrayKeysStart = useRef([]);

  const { handlerOpenPopup } = useUsefulLinksController(activesMenu, menuRef);

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
