import React, { useEffect, useRef, useCallback } from "react";
import ListLinks from "./ListLinks/ListLinks";
import MenuLinks from "./MenuLinks/MenuLinks";
import Article from "../Article/Article";
import { observer } from "mobx-react-lite";
import dataStore from "../../mobx/dataStore/DataStore";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { setButtonPlus, setChangeLinks } from "../../redux/uiSlice";
import { svgIoSettings } from "../../icon";
import "./UsefulLinks.scss";

type MenuFunctionType = (value: string) => void;

type ActiveMenuType = {
  setIsOpenCloseSubMenu: MenuFunctionType;
  isOpenCloseSubMenu: string;
  level: number;
};

const UsefulLinks: React.FC = () => {
  const activesMenu = useRef<ActiveMenuType[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const { idArticle } = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch();
  const { isButtonPlus } = useSelector((state: RootState) => state.ui);

  console.log("UsefulLinks");

  function handlerOpenPopup(): void {
    dispatch(setButtonPlus(!isButtonPlus));
    dispatch(setChangeLinks(false));
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
  }, []);

  return (
    <section className="useFull_links flex-grow-1 d-flex flex-column rounded-4">
      <main className="main">
        <div ref={menuRef} className="menu-wrapper">
          <button onClick={handlerOpenPopup}>{svgIoSettings}</button>

          <MenuLinks
            key={"MenuLinks"}
            arrayKeys={[]}
            dataMenu={[dataStore.dataMain]}
            firstMenu={true}
            level={0}
            activesMenu={activesMenu.current}
          />
        </div>

        <ListLinks />
        {idArticle && <Article />}
      </main>
    </section>
  );
};

export default React.memo(observer(UsefulLinks));
