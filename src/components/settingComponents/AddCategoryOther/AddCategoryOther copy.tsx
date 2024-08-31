import { useState } from "react";
import "./AddCategoryOther.scss";
import { svgIconClose } from "../../../icon";
import { isObject, isArray } from "../../../otherFunction/functions";
import MyJoditEditor from "../../MyJoditEditor/MyJoditEditor";
import { observer } from "mobx-react-lite";
import menuStore from "../../../mobx/asyncDataStore/AsyncMenuStore";
import dataStore from "../../../mobx/DataStore";
import linkStore from "../../../mobx/asyncDataStore/AsyncLinkStore";
import articleStore from "../../../mobx/asyncDataStore/AsyncArticleStore";
import MyInput from "../../formComponents/MyInput/MyInput";
import authStore from "../../../mobx/AuthStore";
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

  const OtherAction = () => {
    menuStore.updateMenu(authStore?.user?.id, dataStore?.dataMain).then(() => {
      logicStore.toggleUpdateDataMain(); //restart
    });
    setName("");
    setLink("");
    setArticle("");
    handleCloseModal();
  };

  const handlerSetSelectAction = (select: string) => {
    setSelectAction(select);
    if (select === "rename") setName(key);
  };

  const handleSetText = (value: string) => {
    const regex = /^[a-zA-Z_0-9]*$/;
    if (regex.test(value)) {
      setName(value);
    }
  };

  const handleRenameMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!name.length) {
      logicStore.setError("Add name Link");
      return;
    }

    dataMenu[name] = dataMenu[key];
    delete dataMenu[key];
    key = name;
    OtherAction();
    setName(name);
  };

  const handleDeleteMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    delete dataMenu[key];
    if (prevDataMenu && Object.keys(prevDataMenu[prevKey]).length === 0) {
      console.log("add null");
      prevDataMenu[prevKey] = null;
    }

    OtherAction();
    logicStore.setAddCategoryOther(false);
  };

  const handleAddSubMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!name.length) {
      logicStore.setError("Add name Link");
      return;
    }
    // console.log(dataMenu);
    if (dataMenu[key] === null) dataMenu[key] = {};
    if (isObject(dataMenu[key])) dataMenu[key][name] = null;
    OtherAction();
    setName("");
  };

  const handleAddMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!name.length) {
      logicStore.setError("Add name Link");
      return;
    }

    dataMenu[name] = null;
    OtherAction();
    setName("");
  };

  const handleAddLink = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    if (!name.length) {
      logicStore.setError("Add name Link");
      return;
    }

    if (!urlPattern.test(link)) {
      logicStore.setError("Error synaxsys link");
      return;
    }

    linkStore
      .addLink(link)
      .then((resId) => {
        if (dataMenu[key] === null) dataMenu[key] = [];
        if (isArray(dataMenu[key]))
          dataMenu[key].push({
            name: name,
            link: resId,
          });
        OtherAction();
        setName("");
        logicStore.toggleUpdateListLink();
      })
      .catch((error) => {
        console.error(
          "Error, failed to add link. Please try again later",
          error
        );
        throw error;
      });
  };

  const handleAddArticle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!name.length) {
      logicStore.setError("Add name Link");
      return;
    }

    articleStore
      .addArticle(article)
      .then((resId) => {
        if (dataMenu[key] === null) dataMenu[key] = [];
        if (isArray(dataMenu[key]))
          dataMenu[key].push({
            name: name,
            article: resId,
          });
        OtherAction();
        setName("");
        logicStore.toggleUpdateListLink();
      })
      .catch((error) => {
        console.error(
          "Error, failed to add link. Please try again later",
          error
        );
        throw error;
      });
  };

  const handleCloseModal = () => {
    logicStore.setModal(false);
    logicStore.setAddCategoryOther(false);
  };

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
            onChange={(event) => handlerSetSelectAction(event.target.value)}
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
                callbackFunction={setLink}
                placeholder="Add link"
              />

              <button
                className="add-other__btn btn btn-secondary"
                onClick={(event) => handleAddLink(event)}
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
                onClick={(event) => handleAddArticle(event)}
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
                onClick={(event) => handleDeleteMenu(event)}
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
                callbackFunction={handleSetText}
              />
              <button
                className="add-other__btn btn btn-secondary"
                onClick={(event) => handleRenameMenu(event)}
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
                callbackFunction={handleSetText}
              />
              <button
                className="add-other__btn btn btn-secondary"
                onClick={(event) => handleAddMenu(event)}
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
                onClick={(event) => handleAddSubMenu(event)}
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
