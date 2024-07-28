import { useContext, useRef, useState } from "react";
import "./AddCategoryOther.scss";
import { MyContext } from "../../MyContext";
import { svgIconClose } from "../../icon";
import { isObject, isArray } from "../../functions/functions";
import {
  postDataGraphQLMenu,
  postDataGraphQLLink,
} from "../../functions/requestHelpersGraphQL";
const AddCategory: React.FC = () => {
  const {
    sluice,
    dataMain,
    setDataMain,
    setIsAddCategoryOther,
    isModal,
    setIsModal,
  } = useContext(MyContext);

  const [text, setText] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const tempRef = useRef<any>([]);

  const [selectAction, setSelectAction] = useState<string>("");
  const [textCode, setTextCode] = useState<string>("");

  console.log(sluice);

  let { key } = sluice;
  const isArr = isArray(sluice.dataMenu[key]);
  const isObj = isObject(sluice.dataMenu[key]);
  console.log(sluice.dataMenu);

  const OtherAction = () => {
    tempRef.current.push(dataMain);
    setDataMain((prev: any) => {
      return { ...prev };
    });
    setTimeout(() => {
      setDataMain(tempRef.current.pop());
    });
    // console.log(valueContext.dataMain);
    postDataGraphQLMenu(dataMain);
    console.log(key);
  };

  const handlerSetSelectAction = (select: string) => {
    setSelectAction(select);
    if (select === "rename") setText(key);
  };

  const handleSetText = (value: string) => {
    // value = value.trim().replaceAll(" ", "_");
    const regex = /^[a-zA-Z_0-9]*$/;
    if (regex.test(value)) {
      console.log(value);
      setText(value);
    }
  };

  const renameMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (textCode === "text code") {
      sluice.dataMenu[text] = sluice.dataMenu[key];
      delete sluice.dataMenu[key];
      // valueContext.sluice = { dataMenu, key: text };
      // key = text;
      sluice.key = text;
      // valueContext.sluice.dataMenu = dataMenu;
      OtherAction();
      setText(text);
    }
  };

  function deleteMenu(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    if (textCode === "text code") {
      delete sluice.dataMenu[key];
      if (Object.keys(sluice.dataMenu).length === 0) {
        sluice.dataMenu = null;
        console.log("delete null");
      }
      console.log(sluice.dataMenu);
      OtherAction();
      setIsAddCategoryOther(false);
    }
  }

  function addSubMenu(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    if (textCode === "text code") {
      if (text.length > 2) {
        if (sluice.dataMenu[key] === null) sluice.dataMenu[key] = {};
        if (isObject(sluice.dataMenu[key])) sluice.dataMenu[key][text] = null;
        console.log(sluice.dataMenu);
        OtherAction();
        setText("");
      }
    }
  }

  function addMenu(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    if (textCode === "text code") {
      if (text.length > 2) {
        sluice.dataMenu[text] = null;
        // if (valueContext.sluice.dataMenu[key] === null) valueContext.sluice.dataMenu[key] = {}
        // if (isObject(valueContext.sluice.dataMenu[key])) valueContext.sluice.dataMenu[key][text] = null
        console.log(sluice.dataMenu);
        OtherAction();
        setText("");
      }
    }
  }

  function addLink(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    if (textCode === "text code") {
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      if (text.length > 2 && urlPattern.test(url)) {
        postDataGraphQLLink(url)
          .then((resId) => {
            if (sluice.dataMenu[key] === null) sluice.dataMenu[key] = [];
            if (isArray(sluice.dataMenu[key]))
              sluice.dataMenu[key].push({
                name: text,
                link: resId,
              });
            console.log(sluice.dataMenu);
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
      }
    }
  }

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
      >
        <input
          className="add-category__text-code"
          value={textCode}
          onChange={(e) => setTextCode(e.target.value)}
          type="text"
        />

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
          </select>

          {/* <button className='add-other__btn' onClick={() => handlerClosePopup()}>Add</button> */}

          <div className="action">
            {selectAction === "rename" && (
              <div>
                <p>a-zA-Z_</p>
                <input
                  value={text}
                  onChange={(e) => handleSetText(e.target.value)}
                  type="text"
                />
                <button
                  className="add-other__btn"
                  onClick={(event) => renameMenu(event)}
                >
                  Rename menu
                </button>
              </div>
            )}
            {selectAction === "delete" && (
              <div>
                <p>Ви дійсно хочете видалити пункт меню {key}</p>
                <button
                  className="add-other__btn"
                  onClick={(event) => deleteMenu(event)}
                >
                  Delete menu
                </button>
                <button
                  className="add-other__btn"
                  onClick={() => setIsAddCategoryOther(false)}
                >
                  No
                </button>
              </div>
            )}
            {selectAction === "add-menu" && (
              <div>
                <p>a-zA-Z_</p>
                <input
                  value={text}
                  onChange={(e) => handleSetText(e.target.value)}
                  placeholder="Add sub menu"
                  type="text"
                />
                <button
                  className="add-other__btn"
                  onClick={(event) => addMenu(event)}
                >
                  Add menu
                </button>
              </div>
            )}
            {selectAction === "add-sub-menu" && (
              <div>
                <p>a-zA-Z_</p>
                <input
                  value={text}
                  onChange={(e) => handleSetText(e.target.value)}
                  placeholder="Add sub menu"
                  type="text"
                />
                <button
                  className="add-other__btn"
                  onClick={(event) => addSubMenu(event)}
                >
                  Add menu
                </button>
              </div>
            )}
            {selectAction === "add-link" && (
              <div>
                <input
                  value={text}
                  onChange={(e) => handleSetText(e.target.value)}
                  placeholder="Add Name link"
                  type="text"
                />
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Add link"
                  type="text"
                />
                <button
                  className="add-other__btn"
                  onClick={(event) => addLink(event)}
                >
                  Add New Link
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
