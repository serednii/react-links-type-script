import AuthUser from "../../AuthUser/components/AuthUser/AuthUser";
import ButtonsAdd from "./ButtonsAdd/ButtonsAdd";
import { svgAdmin } from "../../icon";
import authStore from "../../mobx/AuthStoreFile";
import adminController from "../../controller/admin-Controller";
import "./Header.scss";

const Header: React.FC = () => {
  const isAdmin = authStore?.user?.roles?.includes("admin");
  console.log(isAdmin);

  return (
    <header className="header mb-5  bg-success bg-gradient bg-opacity-75 rounded-4 p-3">
      <div className="row md-3">
        <div className="col-12">
          <h1 className="header__title text-uppercase ">Useful links</h1>
        </div>
      </div>
      <div className="row ">
        <div className="col-12">
          <button onClick={() => adminController.openAdminPanel(true)}>
            {svgAdmin}
          </button>
          <ButtonsAdd></ButtonsAdd>
          <AuthUser></AuthUser>
        </div>
      </div>
    </header>
  );
};

export default Header;
