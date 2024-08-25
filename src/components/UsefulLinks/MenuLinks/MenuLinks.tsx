import React, { useEffect, useState } from "react";
import { isObject, isArray } from "../../../otherFunction/functions";
import { svgIconPencil, svgIconArrowRight } from "../../../icon";
import { observer } from "mobx-react-lite";
import { IMenuLinks, IMenuLinksProps } from "./Interface";
import "./MenuLinks.scss";
import {
  handleSubMenuState,
  updateDataStoreWithLink,
  openSettingsMenu,
} from "../../../controller/menuLinksController"; // Importing model functions
import logicStore from "../../../mobx/LogicStore";

const MenuLinks: React.FC<IMenuLinksProps> = ({
  dataMenu,
  firstMenu,
  level = 0,
  activesMenu,
  arrayKeys,
}) => {
  firstMenu && (dataMenu = [dataMenu]);

  const [isOpenCloseSubMenu, setIsOpenCloseSubMenu] = useState<string>("");
  console.log("MenuLinks");

  useEffect(() => {
    if (isOpenCloseSubMenu) {
      activesMenu.push({
        setIsOpenCloseSubMenu,
        isOpenCloseSubMenu,
        level,
      });
    }
  }, [isOpenCloseSubMenu, activesMenu, level]);

  // Generate the menu items based on data
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
                openSettingsMenu({
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
                updateDataStoreWithLink({
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
                onClick={() =>
                  handleSubMenuState(
                    key,
                    level,
                    activesMenu,
                    setIsOpenCloseSubMenu
                  )
                }
              >
                {key}
                <span className="svg-arrow-right">{svgIconArrowRight}</span>
              </button>

              <MenuLinks
                key={key}
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
