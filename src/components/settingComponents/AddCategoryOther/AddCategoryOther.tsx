import React, { useState } from "react";
import "./AddCategoryOther.scss";
import { svgIconClose } from "../../../icon";
import MyJoditEditor from "../../MyJoditEditor/MyJoditEditor";
import MyInput from "../../formComponents/MyInput/MyInput";
import { observer } from "mobx-react-lite";
import dataStore from "../../../mobx/DataStore";
import {
  handlerSetSelectAction,
  handleSetText,
  handleRenameMenu,
  handleDeleteMenu,
  handleAddSubMenu,
  handleAddMenu,
  handleAddLink,
  handleAddArticle,
  handleCloseModal,
} from "./AddCategoryUtils";

import { isArray, isObject } from "../../../otherFunction/functions";
import logicStore from "../../../mobx/LogicStore";

const AddCategory: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [selectAction, setSelectAction] = useState<string>("");
  const [article, setArticle] = useState("");

  let { dataMenu, prevDataMenu, key, arrayKeys } = dataStore?.sluice || {};
  if (!dataMenu || !key || !arrayKeys) {
    return <></>;
  }

  dataMenu = dataMenu[0];
  const prevKey = arrayKeys[0];

  const isArr = isArray(dataMenu[key]);
  const isObj = isObject(dataMenu[key]);
  console.log("AddCategory");

  return (
    <div className="add-category modal-window">
      <div
        className={`add-category__wrapper modal-window__wrapper ${
          logicStore.isModal ? "open" : ""
        }`}
        style={{
          maxWidth: selectAction === "add-article" ? "1200px" : "500px",
        }}
      >
        <button className="add-category__btn-close" onClick={handleCloseModal}>
          {svgIconClose}
        </button>

        <form className="add-other__action">
          <label htmlFor="action-select">Select an action:</label>
          <select
            className="form-select"
            name="action"
            id="action-select"
            onChange={(event) =>
              handlerSetSelectAction(
                event.target.value,
                setSelectAction,
                setName,
                key
              )
            }
          >
            <option value="">Select an action</option>
            <option value="rename">Rename menu</option>
            <option value="delete">Delete menu</option>
            {!isArr && <option value="add-sub-menu">Add sub menu</option>}
            <option value="add-menu">Add menu</option>
            {!isObj && <option value="add-link">Add link</option>}
            {!isObj && <option value="add-article">Add Article</option>}
          </select>
        </form>

        <div className="action">
          {selectAction === "add-link" && (
            <form className="add-other__links">
              <MyInput
                value={name}
                type="text"
                placeholder="Add Name link"
                callbackFunction={setName}
              />
              <MyInput
                value={link}
                type="text"
                placeholder="Add link"
                callbackFunction={setLink}
              />

              <button
                className="add-other__btn btn btn-secondary"
                onClick={(event) =>
                  handleAddLink(event, name, link, dataMenu, key, setName)
                }
              >
                Add New Link
              </button>
            </form>
          )}
          {selectAction === "add-article" && (
            <form className="add-other__links">
              <MyInput
                value={name}
                type="text"
                placeholder="Add Name Article"
                callbackFunction={setName}
              />
              <MyJoditEditor
                placeholder={"Insert your text"}
                article={article}
                setArticle={setArticle}
              />
              <button
                className="add-other__btn btn btn-secondary"
                onClick={(event) =>
                  handleAddArticle(event, name, article, dataMenu, key, setName)
                }
              >
                Add New Article
              </button>
            </form>
          )}
          {selectAction === "delete" && (
            <form className="add-other__links">
              <div className="alert alert-danger" role="alert">
                Are you sure you want to delete the menu item {key}
              </div>
              <button
                className="add-other__btn btn btn-secondary"
                onClick={(event) =>
                  handleDeleteMenu(event, dataMenu, key, prevDataMenu, prevKey)
                }
              >
                Delete menu
              </button>
              <button
                className="add-other__btn btn btn-secondary"
                onClick={() => logicStore.setAddCategoryOther(false)}
              >
                No
              </button>
            </form>
          )}
          {selectAction === "rename" && (
            <form className="add-other__links">
              <p>a-zA-Z_</p>
              <MyInput
                value={name}
                type="text"
                callbackFunction={(value) => handleSetText(value, setName)}
              />
              <button
                className="add-other__btn btn btn-secondary"
                onClick={(event) =>
                  handleRenameMenu(event, name, dataMenu, key, setName)
                }
              >
                Rename menu
              </button>
            </form>
          )}

          {selectAction === "add-menu" && (
            <form className="add-other__links">
              <p>a-zA-Z_</p>
              <MyInput
                value={name}
                type="text"
                placeholder="Add menu"
                callbackFunction={(value) => handleSetText(value, setName)}
              />
              <button
                className="add-other__btn btn btn-secondary"
                onClick={(event) =>
                  handleAddMenu(event, name, dataMenu, setName)
                }
              >
                Add menu
              </button>
            </form>
          )}
          {selectAction === "add-sub-menu" && (
            <form className="add-other__links">
              <p>a-zA-Z_</p>
              <MyInput
                value={name}
                type="text"
                placeholder="Add sub menu"
                callbackFunction={(value) => handleSetText(value, setName)}
              />
              <button
                className="add-other__btn btn btn-secondary"
                onClick={(event) =>
                  handleAddSubMenu(event, name, dataMenu, key, setName)
                }
              >
                Add sub menu
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(AddCategory);
