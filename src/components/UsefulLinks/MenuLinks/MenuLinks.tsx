import React, { useEffect, useState, useCallback } from "react";
import { isObject, isArray } from "../../../otherFunction/functions";
import { svgIconPencil, svgIconArrowRight } from "../../../icon";
import { observer } from "mobx-react-lite";
import todoStore from "../../../mobx/dataStore/DataStore";
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
  dataMenu: Record<string, any>[];
  arrayKeys: string[];
  firstMenu: boolean;
  level: number;
  activesMenu: ActiveMenuType[];
}

interface IMenuLinks {
  dataMenu: Record<string, any>;
  prevDataMenu?: Record<string, any>;
  arrayKeys?: string[];
  key: string;
}

const MenuLinks: React.FC<IMenuLinksProps> = ({
  dataMenu = [],
  firstMenu,
  level = 0,
  activesMenu,
  arrayKeys,
}) => {
  const dispatch = useDispatch();
  const { isButtonPlus } = useSelector((state: RootState) => state.ui);
  const [isOpenCloseSubMenu, setIsOpenCloseSubMenu] = useState<string>("");
  console.log("dataMenu", dataMenu);

  //Друкуємо ссилки
  const handlePrintLinks = (obj: IMenuLinks): void => {
    const findIndex = activesMenu.findIndex((e) => e.level === level);
    const slice = activesMenu.slice(findIndex);

    if (findIndex >= 0) {
      activesMenu.splice(findIndex);
      slice.forEach((e) => e.setIsOpenCloseSubMenu(""));
    }

    console.log("activesMenu", activesMenu);
    todoStore.setListLinkData(obj);
  };

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
    if (!dataMenu[0]) return null;

    return Object.keys(dataMenu[0]).map((key: string) => {
      return (
        <li
          key={key}
          className={`submenu-links 
          ${isObject(dataMenu[0][key]) && "color-object"} 
          ${isArray(dataMenu[0][key]) && "color-array"}
          ${isOpenCloseSubMenu === key && "open-click"}`}
        >
          {isButtonPlus && (
            <span
              className="svg-plus"
              onClick={() =>
                plusOther({
                  dataMenu,
                  prevDataMenu: dataMenu && dataMenu[1],
                  key,
                  arrayKeys,
                })
              }
            >
              {svgIconPencil}
            </span>
          )}

          {isArray(dataMenu[0][key]) && (
            <button
              className="submenu-links__menu"
              onClick={() =>
                handlePrintLinks({
                  dataMenu: dataMenu[0],
                  key,
                  arrayKeys,
                })
              }
            >
              {key}
            </button>
          )}

          {isObject(dataMenu[0][key]) && (
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
                //передаємо в масив список послідовних лінків, добавляємо в початок масиву
                dataMenu={[dataMenu[0][key], ...dataMenu]}
                firstMenu={false}
                level={level + 1}
                activesMenu={activesMenu}
                arrayKeys={[key, ...arrayKeys]}
              />
            </>
          )}

          {dataMenu[0][key] === null && (
            <span className="submenu-links__null">{key}</span>
          )}
        </li>
      );
    });
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
