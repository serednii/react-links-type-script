import "./MenuLinks.scss";
import { MyContext } from "../../../MyContext";
import { useContext, useEffect, useState } from "react";
import { isObject, isArray } from "../../../functions/functions";
import { svgIconPencil, svgIconArrowRight } from "../../../icon";

type MenuFunctionType = (value: string) => void;
type ActiveMenuType = {
  setIsOpenCloseSubMenu: MenuFunctionType;
  isOpenCloseSubMenu: string;
  level: number;
};

interface IMenuLInksProps {
  dataMenu: Record<string, any>;
  firstMenu: boolean;
  level: number;
  activesMenu: ActiveMenuType[];
}

interface IMenuLInks {
  dataMenu: Record<string, any>;
  key: string;
}

const MenuLinks: React.FC<IMenuLInksProps> = ({
  dataMenu,
  firstMenu,
  level = 0,
  activesMenu,
}) => {
  const {
    setListLinkData,
    setIsAddCategoryOther,
    isButtonPlus,
    setSluice,
    setIsModal,
  } = useContext(MyContext);
  const [isOpenCloseSubMenu, setIsOpenCloseSubMenu] = useState<string>("");

  const handlePrintLinks = (obj: IMenuLInks): void => {
    console.log(obj);
    const findIndex = activesMenu.findIndex((e) => e.level === level);
    const slice = activesMenu.slice(findIndex);

    if (findIndex >= 0) {
      activesMenu.splice(findIndex);
      console.log("activesMenu", activesMenu);
      slice.forEach((e) => e.setIsOpenCloseSubMenu(""));
    }
    console.log("activesMenu", activesMenu);
    setListLinkData(obj);
  };

  function plusOther(data: IMenuLInks): void {
    setIsModal(true);
    setIsAddCategoryOther(true);
    setSluice(data); //передаємо ссилку на бєкт який будемо міняти
  }

  useEffect(() => {
    // Оновлюємо activesMenu після зміни isOpenCloseSubMenu
    if (isOpenCloseSubMenu) {
      activesMenu.push({
        setIsOpenCloseSubMenu: setIsOpenCloseSubMenu,
        isOpenCloseSubMenu,
        level,
      });
      console.log("activesMenu", activesMenu);
    }
  }, [isOpenCloseSubMenu]);

  const handleSetIsOpenCloseSubMenu = (key: string) => {
    const findIndex = activesMenu.findIndex((e) => e.level === level);
    const menuLevel = activesMenu[findIndex]?.isOpenCloseSubMenu;
    console.log(menuLevel);
    const slice = activesMenu.slice(findIndex);
    console.log("slice", slice);
    console.log("level", level);
    console.log("key", key);

    if (findIndex >= 0) {
      activesMenu.splice(findIndex);
      console.log("activesMenu", activesMenu);
      slice.forEach((e) => e.setIsOpenCloseSubMenu(""));
    }

    console.log("findIndex", findIndex);
    if (findIndex !== level) {
      setIsOpenCloseSubMenu((prev) => (prev ? (prev === key ? "" : key) : key));
    }
    if (findIndex === level && menuLevel !== key) {
      setIsOpenCloseSubMenu(key);
    }

    // if(level===0){

    // }

    console.log("**********************************");
    // console.log(slice);
    // console.log(findIndex);
    console.log("key", key);
    console.log("isOpenCloseSubMenu", isOpenCloseSubMenu);
    console.log("level", level);
    console.log("**********************************");
  };

  return (
    <div
      className={
        !firstMenu
          ? "submenu-links__links col-0 col-md-4"
          : "submenu-links__parent col-0 col-md-4"
      }
    >
      <ul className="submenu-list">
        {Object.keys(dataMenu).map((key: string) => {
          return (
            <li
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
                  onClick={() => handlePrintLinks({ dataMenu, key })}
                >
                  {key}
                </button>
              )}

              {isObject(dataMenu[key]) && (
                <>
                  <button
                    className="submenu-links__menu"
                    onClick={() => handleSetIsOpenCloseSubMenu(key)}
                  >
                    {key}
                    <span className="svg-arrow-right">{svgIconArrowRight}</span>
                  </button>

                  <MenuLinks
                    key={key}
                    dataMenu={dataMenu[key]}
                    firstMenu={false}
                    level={level + 1}
                    activesMenu={activesMenu}
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
