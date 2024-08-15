import { useState } from "react";
import "./AddCategoryOther.scss";
import { svgIconClose } from "../../icon";
import { isObject, isArray } from "../../controller/functions";
import MyJoditEditor from "../MyJoditEditor/MyJoditEditor";
// import { PASSWORD } from "../../const";
import { observer } from "mobx-react-lite";
import menuStore from "../../mobx/asyncDataStore/AsyncMenuStore";
import dataStore from "../../mobx/dataStore/DataStore";
import linkStore from "../../mobx/asyncDataStore/AsyncLinkStore";
import articleStore from "../../mobx/asyncDataStore/AsyncArticleStore";

import { useSelector, useDispatch } from "react-redux";
import { setError, setModal, setAddCategoryOther } from "../../redux/uiSlice";
import {
  toggleUpdateListLink,
  toggleUpdateDataMain,
} from "../../redux/dataSlice";
import { RootState } from "../../redux/rootReducer"; // Убедитесь, что путь правильный
import MyInput from "../formComponents/MyInput/MyInput";
import authStore from "../../mobx/AuthStore";

const AddCategory: React.FC = () => {
  const dispatch = useDispatch();
  const { isModal } = useSelector((state: RootState) => state.ui);

  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [selectAction, setSelectAction] = useState<string>("");
  // const [textCode, setTextCode] = useState<string>("");
  const [article, setArticle] = useState("");

  let { dataMenu, key } = dataStore.sluice || {};

  const isArr = isArray(dataMenu[key]);
  const isObj = isObject(dataMenu[key]);

  const OtherAction = () => {
    menuStore.updateMenu(authStore.user.id, dataStore.dataMain).then(() => {
      dispatch(toggleUpdateDataMain()); //restart
    });
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

    // if (textCode !== PASSWORD) {
    //   dispatch(setError("Error control code"));
    //   return;
    // }

    if (!name.length) {
      dispatch(setError("Add name Link"));
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

    // if (textCode !== PASSWORD) {
    //   dispatch(setError("Error control code"));
    //   return;
    // }
    console.log(dataMenu[key]);
    console.log(dataMenu);
    console.log(key);
    delete dataMenu[key];
    console.log(dataMenu);

    if (Object.keys(dataMenu).length === 0) {
      console.log("add null");
    }

    OtherAction();
    dispatch(setAddCategoryOther(false));
  };

  const handleAddSubMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    // if (textCode !== PASSWORD) {
    //   dispatch(setError("Error control code"));
    //   return;
    // }

    if (!name.length) {
      dispatch(setError("Add name Link"));
      return;
    }
    console.log(dataMenu);
    if (dataMenu[key] === null) dataMenu[key] = {};
    if (isObject(dataMenu[key])) dataMenu[key][name] = null;
    OtherAction();
    setName("");
  };

  const handleAddMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    // if (textCode !== PASSWORD) {
    //   dispatch(setError("Error control code"));
    //   return;
    // }

    if (!name.length) {
      dispatch(setError("Add name Link"));
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
    // if (textCode !== PASSWORD) {
    //   dispatch(setError("Error control code"));
    //   return;
    // }

    if (!name.length) {
      dispatch(setError("Add name Link"));
      return;
    }

    if (!urlPattern.test(link)) {
      dispatch(setError("Error synaxsys link"));
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
        dispatch(toggleUpdateListLink());
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

    // if (textCode !== PASSWORD) {
    //   dispatch(setError("Error control code"));
    //   return;
    // }

    if (!name.length) {
      dispatch(setError("Add name Link"));
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
        dispatch(toggleUpdateListLink());
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
    dispatch(setModal(false));
    setTimeout(() => dispatch(setAddCategoryOther(false), 1000));
  };

  return (
    <div className="add-category modal-window">
      <div
        className={`add-category__wrapper modal-window__wrapper ${
          isModal ? "open" : ""
        }`}
        style={{
          maxWidth: selectAction === "add-article" ? "1200px" : "500px",
        }}
      >
        {/* <MyInput
          value={textCode}
          type="password"
          callbackFunction={setTextCode}
        /> */}
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
                onClick={() => dispatch(setAddCategoryOther(false))}
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
        </div>
      </div>
    </div>
  );
};

export default observer(AddCategory);
