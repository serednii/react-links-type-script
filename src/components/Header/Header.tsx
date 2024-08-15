import AuthUser from "../../AuthUser/components/AuthUser/AuthUser";
import ButtonsAdd from "./ButtonsAdd/ButtonsAdd";
import authStore from "../../mobx/AuthStore";
import AuthForms from "../../AuthUser/components/AuthForms/AuthForms";
import usefulLinksImg from "../../images/5326787.png";
import usefulLinksTitle from "../../images/Useful+Links.png";

import "./Header.scss";

const Header: React.FC = () => {
  const isAdmin = authStore?.user?.roles?.includes("admin");
  console.log(isAdmin);

  return (
    <header className="header mb-5   bg-opacity-75 rounded-4 p-3">
      {/* <div className="row md-3">
        <div className="col-12">
          <h1 className="header__title text-uppercase ">Useful links</h1>
        </div>
      </div> */}
      <div className="header__top">
        <img src={usefulLinksImg} className="logo" alt="useful_links" />

        {/* <div>
          <img src={usefulLinksTitle} className="title" alt="useful_links" />
        </div> */}
        <h1 className="header__title text-uppercase ">Useful links</h1>
        {!authStore.isAuth ? <AuthForms /> : <AuthUser />}
      </div>
    </header>
  );
};

export default Header;
