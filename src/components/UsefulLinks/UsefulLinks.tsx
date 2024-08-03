import ListLinks from "./ListLinks/ListLinks";
import MenuLinks from "./MenuLinks/MenuLinks";
import { Routes, Route } from "react-router-dom";

import "./UsefulLinks.scss";
import { MyContext } from "../../MyContext";
import { useContext, useRef } from "react";
import { ArticlePage } from "../../pages/ArticlePage";
import { Homepage } from "../../pages/Homepage";
import { Notfoundpage } from "../../pages/Notfoundpage";

type MenuFunctionType = (value: string) => void;

type ActiveMenuType = {
  setIsOpenCloseSubMenu: MenuFunctionType;
  isOpenCloseSubMenu: string;
  level: number;
};

function UsefulLinks() {
  const { dataMain } = useContext(MyContext);
  const activesMenu = useRef<ActiveMenuType[]>([]);
  return (
    //bg-success bg-gradient
    <section className="useFull_links flex-grow-1 d-flex flex-column  p-3 rounded-4">
      <div className="row px-3">
        <button
          style={{ color: "white", backgroundColor: "black" }}
          onClick={() => console.log(activesMenu.current)}
        >
          kkk
        </button>
        <MenuLinks
          key={"MenuLinks"}
          dataMenu={dataMain}
          firstMenu={true}
          level={0}
          activesMenu={activesMenu.current}
        />
        <Routes>
          <Route path="/" element={<ListLinks />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="*" element={<Notfoundpage />} />
        </Routes>
      </div>
    </section>
  );
}

export default UsefulLinks;
