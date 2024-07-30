import ListLinks from "./ListLinks/ListLinks";
import MenuLinks from "./MenuLinks/MenuLinks";
import { Routes, Route } from "react-router-dom";

import "./UsefulLinks.scss";
import { MyContext } from "../../MyContext";
import { useContext } from "react";
import { ArticlePage } from "../../pages/ArticlePage";
import { Homepage } from "../../pages/Homepage";
import { Notfoundpage } from "../../pages/Notfoundpage";

function UsefulLinks() {
  const { dataMain } = useContext(MyContext);
  return (
    //bg-success bg-gradient
    <section className="useFull_links flex-grow-1 d-flex flex-column  p-3 rounded-4">
      <div className="row px-3">
        <MenuLinks key={Math.random()} dataMenu={dataMain} firstMenu={true} />
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
