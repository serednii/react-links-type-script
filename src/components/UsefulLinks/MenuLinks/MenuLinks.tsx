import "./MenuLinks.scss";
import { MyContext } from "../../../MyContext";
import { useContext, useState } from "react";
import { isObject, isArray } from "../../../functions/functions";
import { svgIconPencil, svgIconArrowRight } from "../../../icon";

interface IMenuLInksProps {
  dataMenu: Record<string, any>;
  firstMenu: boolean;
}

interface IMenuLInks {
  dataMenu: Record<string, any>;
  key: string;
}

const MenuLinks: React.FC<IMenuLInksProps> = ({ dataMenu, firstMenu }) => {
  const {
    setListLinkData,
    setIsAddCategoryOther,
    isButtonPlus,
    setSluice,
    setIsModal,
  } = useContext(MyContext);
  const [isOpenCloseSubMenu, setIsOpenCloseSubMenu] = useState("");

  const printLinks = (obj: IMenuLInks): void => {
    console.log(obj);
    setListLinkData(obj);
  };

  function plusOther(data: IMenuLInks): void {
    console.log(data);
    setIsModal(true);
    setIsAddCategoryOther(true);
    setSluice(data); //передаємо ссилку на бєкт який будемо міняти
  }

  return (
    <div
      className={
        !firstMenu
          ? "submenu-links__links col-0 col-md-4"
          : "submenu-links__parent col-0 col-md-4"
      }
    >
      <ul className="submenu-list" key={Math.random()}>
        {Object.keys(dataMenu).map((key: string) => {
          return (
            <li
              key={Math.random()}
              className={`submenu-links ${
                isOpenCloseSubMenu === key && "open-click"
              }`}
            >
              {isButtonPlus && (
                <span
                  className="svg-plus"
                  onClick={() => plusOther({ dataMenu, key })}
                >
                  {svgIconPencil}
                </span>
              )}

              {isArray(dataMenu[key]) && (
                <button
                  className="submenu-links__menu"
                  onClick={() => printLinks({ dataMenu, key })}
                >
                  {key}
                </button>
              )}

              {isObject(dataMenu[key]) && (
                <>
                  <button
                    className="submenu-links__menu"
                    onClick={() =>
                      setIsOpenCloseSubMenu((prev) =>
                        prev ? (prev === key ? "" : key) : key
                      )
                    }
                  >
                    {key}
                    <span className="svg-arrow-right">{svgIconArrowRight}</span>
                  </button>

                  <MenuLinks
                    key={Math.random()}
                    dataMenu={dataMenu[key]}
                    firstMenu={false}
                  />
                </>
              )}

              {dataMenu[key] === null && (
                <>
                  <span className="submenu-links__null">{key}</span>{" "}
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MenuLinks;
