import React, { useEffect, useState } from "react";
import { isObject, isArray } from "../../../otherFunction/functions";
import { svgIconPencil, svgIconArrowRight } from "../../../icon";
import { observer } from "mobx-react-lite";
import dataStore from "../../../mobx/DataStore";
import { IMenuLinks, IMenuLinksProps } from "./Interface";
import "./MenuLinks.scss";
import logicStore from "../../../mobx/LogicStore";

const MenuLinks: React.FC<IMenuLinksProps> = ({
  dataMenu,
  firstMenu,
  level = 0,
  activesMenu,
  arrayKeys,
}) => {
  firstMenu && (dataMenu = [dataMenu]);
  // const dataMenuRef = useRef(dataMenu);
  // const firstMenuRef = useRef(firstMenu);
  // const levelRef = useRef(level);
  // const activesMenuRef = useRef(activesMenu);
  // const arrayKeysRef = useRef(arrayKeys);

  // console.log(dataMenuRef.current === dataMenu);
  // console.log(firstMenuRef.current === firstMenu);
  // console.log(levelRef.current === level);
  // console.log(activesMenuRef.current === activesMenu);
  // console.log(arrayKeysRef.current === arrayKeys);

  const [isOpenCloseSubMenu, setIsOpenCloseSubMenu] = useState<string>("");
  console.log("MenuLinks");

  //Друкуємо ссилки
  const handlePrintLinks = (obj: IMenuLinks): void => {
    const findIndex = activesMenu.findIndex((e) => e.level === level);
    const slice = activesMenu.slice(findIndex);

    if (findIndex >= 0) {
      activesMenu.splice(findIndex);
      slice.forEach((e) => e.setIsOpenCloseSubMenu(""));
    }

    // console.log("activesMenu", activesMenu);
    dataStore.setListLinkData(obj);
  };

  // const plusOther = useCallback(
  //   (data: IMenuLinks): void => {
  //     dispatch(setModal(true));
  //     dispatch(setAddCategoryOther(true));
  //     dataStore.setSluice(data); // передаємо ссилку на об'єкт, який будемо змінювати
  //   },
  //   [dispatch, dataStore.setSluice]
  // );

  const handleOpenSettingMenu = (data: IMenuLinks): void => {
    logicStore.setModal(true);
    logicStore.setAddCategoryOther(true);
    dataStore.setSluice(data); // передаємо ссилку на об'єкт, який будемо змінювати
  };

  useEffect(() => {
    if (isOpenCloseSubMenu) {
      activesMenu.push({
        setIsOpenCloseSubMenu,
        isOpenCloseSubMenu,
        level,
      });
    }
  }, [isOpenCloseSubMenu, activesMenu, level]);

  const handleSetIsOpenCloseSubMenu = (key: string) => {
    const findIndex = activesMenu.findIndex((e) => e.level === level);
    const menuLevel = activesMenu[findIndex]?.isOpenCloseSubMenu;
    const slice = activesMenu.slice(findIndex);

    if (findIndex >= 0) {
      activesMenu.splice(findIndex);
      slice.forEach((e) => e.setIsOpenCloseSubMenu(""));
    }

    if (findIndex !== level) {
      setIsOpenCloseSubMenu((prev) => (prev ? (prev === key ? "" : key) : key));
    }

    if (findIndex === level && menuLevel !== key) {
      setIsOpenCloseSubMenu(key);
    }
  };

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
          {logicStore.isButtonPlus && (
            <span
              className="svg-plus"
              onClick={() =>
                handleOpenSettingMenu({
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
