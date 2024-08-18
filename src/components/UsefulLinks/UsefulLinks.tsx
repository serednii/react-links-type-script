import ListLinks from "./ListLinks/ListLinks";
import MenuLinks from "./MenuLinks/MenuLinks";
import { useEffect, useRef, useCallback } from "react";
import Article from "../Article/Article";
import { observer } from "mobx-react-lite";
import dataStore from "../../mobx/dataStore/DataStore";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import ButtonsAdd from "../Header/ButtonsAdd/ButtonsAdd";
import { setButtonPlus, setChangeLinks } from "../../redux/uiSlice";
import { svgIoSettings } from "../../icon";
import "./UsefulLinks.scss";

type MenuFunctionType = (value: string) => void;

type ActiveMenuType = {
  setIsOpenCloseSubMenu: MenuFunctionType;
  isOpenCloseSubMenu: string;
  level: number;
};

function UsefulLinks() {
  const activesMenu = useRef<ActiveMenuType[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const { idArticle } = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch();
  const { isButtonPlus } = useSelector((state: RootState) => state.ui);

  function handlerOpenPopup(): void {
    dispatch(setButtonPlus(!isButtonPlus));
    dispatch(setChangeLinks(false));
  }
  const clearClickMenu = useCallback(() => {
    activesMenu.current.forEach((e) => e.setIsOpenCloseSubMenu(""));
    activesMenu.current.splice(0);
  }, []);

  //закриваємо вложені меню
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        clearClickMenu();
      }
    },
    [clearClickMenu]
  );

  const handleEscapePress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearClickMenu();
      }
    },
    [clearClickMenu]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapePress);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [handleClickOutside, handleEscapePress]);

  return (
    <section className="useFull_links flex-grow-1 d-flex flex-column rounded-4">
      <main className="main">
        <div ref={menuRef} className="menu-wrapper">
          {/* <ButtonsAdd></ButtonsAdd> */}
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
}

export default observer(UsefulLinks);
