import { useContext, useRef, useState } from "react";
import "./AddCategoryOther.scss";
import { MyContext } from "../../MyContext";
import { svgIconClose } from "../../icon";
import { isObject, isArray } from "../../functions/functions";
import MyJoditEditor from "../MyJoditEditor/MyJoditEditor";
import {
  postDataGraphQLMenu,
  addDataGraphQLLink,
  addDataGraphQLArticle,
} from "../../functions/requestHelpersGraphQL";
import MyInput from "../formComponents/MyInput/MyInput";

const AddCategory: React.FC = () => {
  const {
    sluice,
    dataMain,
    setDataMain,
    setIsAddCategoryOther,
    isModal,
    setIsModal,
    setError,
    password,
  } = useContext(MyContext);

  const [text, setText] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const tempRef = useRef<any>([]);
  const [selectAction, setSelectAction] = useState<string>("");
  const [textCode, setTextCode] = useState<string>("");
  const [article, setArticle] = useState("");

  let { dataMenu, key } = sluice;
  console.log("sluice", sluice);
  const isArr = isArray(dataMenu[key]);
  const isObj = isObject(dataMenu[key]);

  const OtherAction = () => {
    tempRef.current.push(dataMain);
    setDataMain((prev: any) => {
      return { ...prev };
    });
    setTimeout(() => {
      setDataMain(tempRef.current.pop());
    });
    postDataGraphQLMenu(dataMain);
    handleCloseModal();
  };

  const handlerSetSelectAction = (select: string) => {
    setSelectAction(select);
    if (select === "rename") setText(key);
  };

  const handleSetText = (value: string) => {
    const regex = /^[a-zA-Z_0-9]*$/;
    if (regex.test(value)) {
      setText(value);
    }
  };

  const handleRenameMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (textCode !== password) {
      setError("Error control code");
      return;
    }

    if (!text.length) {
      setError("Add name Link");
      return;
    }

    dataMenu[text] = dataMenu[key];
    delete dataMenu[key];
    key = text;
    OtherAction();
    setText(text);
  };

  const handleDeleteMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (textCode !== password) {
      setError("Error control code");
      return;
    }

    delete dataMenu[key];
    if (Object.keys(dataMenu).length === 0) {
      dataMenu = null;
    }
    OtherAction();
    setIsAddCategoryOther(false);
  };

  const handleAddSubMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (textCode !== password) {
      setError("Error control code");
      return;
    }

    if (!text.length) {
      setError("Add name Link");
      return;
    }

    if (dataMenu[key] === null) dataMenu[key] = {};
    if (isObject(dataMenu[key])) dataMenu[key][text] = null;
    OtherAction();
    setText("");
  };

  const handleAddMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (textCode !== password) {
      setError("Error control code");
      return;
    }

    if (!text.length) {
      setError("Add name Link");
      return;
    }

    sluice.dataMenu[text] = null;
    OtherAction();
    setText("");
  };

  const handleAddLink = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (textCode !== password) {
      setError("Error control code");
      return;
    }

    if (!text.length) {
      setError("Add name Link");
      return;
    }

    if (!urlPattern.test(link)) {
      setError("Error synaxsys link");
      return;
    }

    addDataGraphQLLink(link)
      .then((resId) => {
        if (dataMenu[key] === null) dataMenu[key] = [];
        if (isArray(dataMenu[key]))
          dataMenu[key].push({
            name: text,
            link: resId,
          });
        OtherAction();
        setText("");
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

    if (textCode !== password) {
      setError("Error control code");
      return;
    }

    if (!text.length) {
      setError("Add name Link");
      return;
    }

    addDataGraphQLArticle(article)
      .then((resId) => {
        if (dataMenu[key] === null) dataMenu[key] = [];
        if (isArray(dataMenu[key]))
          dataMenu[key].push({
            name: text,
            article: resId,
          });
        OtherAction();
        setText("");
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
    setIsModal(false);
    setTimeout(() => setIsAddCategoryOther(false), 1000);
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
        <MyInput
          value={textCode}
          type="password"
          callbackFunction={setTextCode}
        />
        {/* <input
          className="add-category__text-code form-control"
          value={textCode}
          onChange={(e) => setTextCode(e.target.value)}
          type="password"
        /> */}

        <button className="add-category__btn-close" onClick={handleCloseModal}>
          {svgIconClose}
        </button>

        <form className="add-other-form">
          <label htmlFor="action-select">Select an action:</label>
          <select
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
            <form className="add-other-form ">
              <p>a-zA-Z_</p>
              <MyInput
                value={text}
                type="text"
                callbackFunction={handleSetText}
              />
              {/* <input
                className="form-control"
                value={text}
                onChange={(e) => handleSetText(e.target.value)}
                type="text"
              /> */}
              <button
                className="add-other__btn"
                onClick={(event) => handleRenameMenu(event)}
              >
                Rename menu
              </button>
            </form>
          )}
          {selectAction === "delete" && (
            <form className="add-other-form ">
              <p>Ви дійсно хочете видалити пункт меню {key}</p>
              <button
                className="add-other__btn"
                onClick={(event) => handleDeleteMenu(event)}
              >
                Delete menu
              </button>
              <button
                className="add-other__btn"
                onClick={() => setIsAddCategoryOther(false)}
              >
                No
              </button>
            </form>
          )}
          {selectAction === "add-menu" && (
            <form className="add-other-form ">
              <p>a-zA-Z_</p>
              <MyInput
                value={text}
                type="text"
                placeholder="Add menu"
                callbackFunction={handleSetText}
              />
              {/* <input
                className="form-control"
                value={text}
                onChange={(e) => handleSetText(e.target.value)}
                placeholder="Add  menu"
                type="text"
              /> */}
              <button
                className="add-other__btn"
                onClick={(event) => handleAddMenu(event)}
              >
                Add menu
              </button>
            </form>
          )}
          {selectAction === "add-sub-menu" && (
            <form className="add-other-form ">
              <p>a-zA-Z_</p>
              <MyInput
                value={text}
                type="text"
                placeholder="Add sub menu"
                callbackFunction={handleSetText}
              />
              {/* <input
                className="form-control"
                value={text}
                onChange={(e) => handleSetText(e.target.value)}
                placeholder="Add sub menu"
                type="text"
              /> */}
              <button
                className="add-other__btn"
                onClick={(event) => handleAddSubMenu(event)}
              >
                Add sub menu
              </button>
            </form>
          )}
          {selectAction === "add-link" && (
            <form className="add-other-form ">
              <MyInput
                value={text}
                type="text"
                placeholder="Add Name link"
                callbackFunction={handleSetText}
              />
              {/* <input
                className="form-control"
                value={text}
                onChange={(e) => handleSetText(e.target.value)}
                placeholder="Add Name link"
                type="text"
              /> */}
              <MyInput
                value={link}
                type="text"
                placeholder="Add link"
                callbackFunction={setLink}
              />
              {/* <input
                className="form-control"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Add link"
                type="text"
              /> */}
              <button
                className="add-other__btn"
                onClick={(event) => handleAddLink(event)}
              >
                Add New Link
              </button>
            </form>
          )}
          {selectAction === "add-article" && (
            <form className="add-other-form ">
              <MyInput
                value={text}
                type="text"
                placeholder="Add Name Article"
                callbackFunction={handleSetText}
              />
              {/* <input
                className="form-control"
                value={text}
                onChange={(e) => handleSetText(e.target.value)}
                placeholder="Add Name Article"
                type="text"
              /> */}
              <MyJoditEditor
                placeholder={"Вставте свій текст"}
                article={article}
                setArticle={setArticle}
              />

              <button
                className="add-other__btn"
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

export default AddCategory;
