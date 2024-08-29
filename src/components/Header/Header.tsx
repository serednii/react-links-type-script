import AuthUser from "../../AuthUser/components/AuthUser/AuthUser";
import authStore from "../../mobx/AuthStore";
import AuthForms from "../../AuthUser/components/AuthForms/AuthForms";

import "./Header.scss";

const Header: React.FC = () => {
  const isAdmin = authStore?.user?.roles?.includes("admin");
  console.log("Header");

  return (
    <header className="header mb-5   bg-opacity-75 rounded-4 p-3">
      {/* <div className="row md-3">
        <div className="col-12">
          <h1 className="header__title text-uppercase ">Useful links</h1>
        </div>
      </div> */}
      <div className="header__top">
        <img src="/images/5326787.png" className="logo" alt="useful_links" />

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
