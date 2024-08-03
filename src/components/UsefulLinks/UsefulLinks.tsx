import ListLinks from "./ListLinks/ListLinks";
import MenuLinks from "./MenuLinks/MenuLinks";
import { Routes, Route } from "react-router-dom";
import "./UsefulLinks.scss";
import { MyContext } from "../../MyContext";
import { useContext, useEffect, useRef, useCallback } from "react";
import { ArticlePage } from "../../pages/ArticlePage";
import { NotFoundPage } from "../../pages/NotFoundPage";

type MenuFunctionType = (value: string) => void;

type ActiveMenuType = {
  setIsOpenCloseSubMenu: MenuFunctionType;
  isOpenCloseSubMenu: string;
  level: number;
};

function UsefulLinks() {
  const { dataMain } = useContext(MyContext);
  const activesMenu = useRef<ActiveMenuType[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  const clearClickMenu = useCallback(() => {
    activesMenu.current.forEach((e) => e.setIsOpenCloseSubMenu(""));
    activesMenu.current.splice(0);
  }, []);

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
    <section className="useFull_links flex-grow-1 d-flex flex-column  p-3 rounded-4">
      <div className="row px-3">
        <div ref={menuRef} className="menu-wrapper">
          <MenuLinks
            key={"MenuLinks"}
            dataMenu={dataMain}
            firstMenu={true}
            level={0}
            activesMenu={activesMenu.current}
          />
        </div>
        <Routes>
          <Route path="/" element={<ListLinks />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </section>
  );
}

export default UsefulLinks;
