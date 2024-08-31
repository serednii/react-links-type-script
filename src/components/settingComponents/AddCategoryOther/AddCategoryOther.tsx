import React from "react";
import { observer } from "mobx-react-lite";
import useAddCategoryController from "./AddCategoryController/AddCategoryController";
import MyJoditEditor from "../../MyJoditEditor/MyJoditEditor";
import MyInput from "../../formComponents/MyInput/MyInput";
import { svgIconClose } from "../../../icon";
import logicStore from "../../../mobx/LogicStore";

const AddCategory: React.FC = () => {
  const {
    name,
    link,
    article,
    selectAction,
    isArr,
    isObj,
    setName,
    setLink,
    setSelectAction,
    setArticle,
    handleSetText,
    handleRenameMenu,
    handleDeleteMenu,
    handleAddSubMenu,
    handleAddMenu,
    handleAddLink,
    handleAddArticle,
    handleCloseModal,
    dataMenu,
    key,
    arrayKeys,
  } = useAddCategoryController();

  if (!dataMenu || !key || !arrayKeys) {
    return null;
  }

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
            onChange={(event) => setSelectAction(event.target.value)}
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
          {selectAction === "rename" && (
            <form className="add-other__links">
              <p>a-zA-Z_</p>
              <MyInput
                value={name}
                type="text"
                callbackFunction={handleSetText}
              />
              <button
                className="add-other__btn btn btn-secondary"
                onClick={(event) => {
                  event.preventDefault();
                  handleRenameMenu();
                }}
              >
                Rename menu
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
                onClick={(event) => {
                  event.preventDefault();
                  handleDeleteMenu();
                }}
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
          {selectAction === "add-menu" && (
            <form className="add-other__links">
              <p>a-zA-Z_</p>
              <MyInput
                value={name}
                type="text"
                placeholder="Add menu"
                callbackFunction={handleSetText}
              />
              <button
                className="add-other__btn btn btn-secondary"
                onClick={(event) => {
                  event.preventDefault();
                  handleAddMenu();
                }}
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
                callbackFunction={handleSetText}
              />

              <button
                className="add-other__btn btn btn-secondary"
                onClick={(event) => {
                  event.preventDefault();
                  handleAddSubMenu();
                }}
              >
                Add sub menu
              </button>
            </form>
          )}
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
                onClick={(event) => {
                  event.preventDefault();
                  handleAddLink();
                }}
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
                placeholder={"Вставте свій текст"}
                article={article}
                setArticle={setArticle}
              />
              <button
                className="add-other__btn btn btn-secondary"
                onClick={(event) => {
                  event.preventDefault();
                  handleAddArticle();
                }}
              >
                Add New Article
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(AddCategory);
