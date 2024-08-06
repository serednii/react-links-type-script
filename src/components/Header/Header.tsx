import ButtonsAdd from "./ButtonsAdd/ButtonsAdd";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <header className="header mb-5  bg-success bg-gradient bg-opacity-75 rounded-4 p-3">
      <div className="row md-3">
        <div className="col-12">
          <h1 className="header__title text-uppercase ">Useful links</h1>
        </div>
      </div>
      <div className="row ">
        <div className="col-12">
          <ButtonsAdd></ButtonsAdd>
        </div>
      </div>
    </header>
  );
};

export default Header;
