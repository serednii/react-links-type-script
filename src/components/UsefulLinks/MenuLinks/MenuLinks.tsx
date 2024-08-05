import React, { useContext, useEffect, useState, useCallback } from "react";
import { MyContext } from "../../../MyContext";
import { isObject, isArray } from "../../../functions/functions";
import { svgIconPencil, svgIconArrowRight } from "../../../icon";
import { observer } from "mobx-react-lite";
import todoStore from "../../../mobx/store";
import { useSelector, useDispatch } from "react-redux";
import { setModal, setAddCategoryOther } from "../../../redux/uiSlice";
import { RootState } from "../../../redux/rootReducer"; // Убедитесь, что путь правильный
import "./MenuLinks.scss";

type MenuFunctionType = (value: string) => void;
type ActiveMenuType = {
  setIsOpenCloseSubMenu: MenuFunctionType;
  isOpenCloseSubMenu: string;
  level: number;
};

interface IMenuLinksProps {
  dataMenu: Record<string, any>;
  firstMenu: boolean;
  level: number;
  activesMenu: ActiveMenuType[];
}

interface IMenuLinks {
  dataMenu: Record<string, any>;
  key: string;
}

const MenuLinks: React.FC<IMenuLinksProps> = ({
  dataMenu = {},
  firstMenu,
  level = 0,
  activesMenu,
}) => {
  const dispatch = useDispatch();
  const { isButtonPlus } = useSelector((state: RootState) => state.ui);
  const [isOpenCloseSubMenu, setIsOpenCloseSubMenu] = useState<string>("");

  const handlePrintLinks = useCallback(
    (obj: IMenuLinks): void => {
      const findIndex = activesMenu.findIndex((e) => e.level === level);
      const slice = activesMenu.slice(findIndex);

      if (findIndex >= 0) {
        activesMenu.splice(findIndex);
        slice.forEach((e) => e.setIsOpenCloseSubMenu(""));
      }
      console.log("activesMenu", activesMenu);
      todoStore.setListLinkData(obj);
    },
    [activesMenu, level]
  );

  const plusOther = useCallback(
    (data: IMenuLinks): void => {
      dispatch(setModal(true));
      dispatch(setAddCategoryOther(true));
      todoStore.setSluice(data); // передаємо ссилку на об'єкт, який будемо змінювати
    },
    [dispatch, todoStore.setSluice]
  );

  useEffect(() => {
    if (isOpenCloseSubMenu) {
      activesMenu.push({
        setIsOpenCloseSubMenu,
        isOpenCloseSubMenu,
        level,
      });
    }
  }, [isOpenCloseSubMenu, activesMenu, level]);

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

  const menuItems = () => {
    if (!dataMenu) return null;

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
  };

  return (
    <div
      className={
        !firstMenu ? "submenu-links__links " : "submenu-links__parent "
      }
    >
      <ul className="submenu-list">{menuItems()}</ul>
    </div>
  );
};

export default observer(MenuLinks);
