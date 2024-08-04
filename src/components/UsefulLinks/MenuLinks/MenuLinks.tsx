import { MyContext } from "../../../MyContext";
import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { isObject, isArray } from "../../../functions/functions";
import { svgIconPencil, svgIconArrowRight } from "../../../icon";
import { useSelector, useDispatch } from "react-redux";
import { setModal, setAddCategoryOther } from "../../../redux/uiSlice";
// import { setSluice, setListLinkData } from "../../../redux/dataSlice";
import { RootState } from "../../../redux/rootReducer"; // Убедитесь, что путь правильный
import "./MenuLinks.scss";

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
  const { setListLinkData, setSluice } = useContext(MyContext);

  const dispatch = useDispatch();
  const { isButtonPlus } = useSelector((state: RootState) => state.ui);
  const [isOpenCloseSubMenu, setIsOpenCloseSubMenu] = useState<string>("");
  const handlePrintLinks = useCallback(
    (obj: IMenuLInks): void => {
      const findIndex = activesMenu.findIndex((e) => e.level === level);
      const slice = activesMenu.slice(findIndex);

      if (findIndex >= 0) {
        activesMenu.splice(findIndex);
        slice.forEach((e) => e.setIsOpenCloseSubMenu(""));
      }
      console.log("activesMenu", activesMenu);
      setListLinkData(obj);
    },
    [activesMenu, level, setListLinkData]
  );

  const plusOther = useCallback(
    (data: IMenuLInks): void => {
      dispatch(setModal(true));
      dispatch(setAddCategoryOther(true));
      setSluice(data); //передаємо ссилку на бєкт який будемо міняти
    },
    [setSluice]
  );

  useEffect(() => {
    // Оновлюємо activesMenu після зміни isOpenCloseSubMenu
    if (isOpenCloseSubMenu) {
      activesMenu.push({
        setIsOpenCloseSubMenu: setIsOpenCloseSubMenu,
        isOpenCloseSubMenu,
        level,
      });
    }
  }, [isOpenCloseSubMenu, activesMenu, level]);

  //Closes nested menus
  const handleSetIsOpenCloseSubMenu = useCallback(
    (key: string) => {
      const findIndex = activesMenu.findIndex((e) => e.level === level);
      const menuLevel = activesMenu[findIndex]?.isOpenCloseSubMenu;
      const slice = activesMenu.slice(findIndex);

      if (findIndex >= 0) {
        activesMenu.splice(findIndex);
        slice.forEach((e) => e.setIsOpenCloseSubMenu(""));
      }

      if (findIndex !== level) {
        setIsOpenCloseSubMenu((prev) =>
          prev ? (prev === key ? "" : key) : key
        );
      }

      if (findIndex === level && menuLevel !== key) {
        setIsOpenCloseSubMenu(key);
      }
    },
    [activesMenu, level]
  );

  const menuItems = useMemo(() => {
    return Object.keys(dataMenu).map((key: string) => (
      <li
        key={key}
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
          <span className="submenu-links__null">{key}</span>
        )}
      </li>
    ));
  }, [
    dataMenu,
    isButtonPlus,
    isOpenCloseSubMenu,
    handlePrintLinks,
    handleSetIsOpenCloseSubMenu,
    activesMenu,
    level,
    plusOther,
  ]);

  return (
    <div
      className={
        !firstMenu ? "submenu-links__links " : "submenu-links__parent "
      }
    >
      <ul className="submenu-list">{menuItems}</ul>
    </div>
  );
};

export default MenuLinks;
