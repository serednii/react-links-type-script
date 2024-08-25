// ChangeLinks.tsx

import React, { useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  handlerSetSelectAction,
  handleAddLink,
  handleAddArticle,
  handleSaveChang,
  handleDeleteLink,
  handleCloseModal,
} from "./changeLinksUtils"; // Імпорт функцій
import dataStore from "../../../mobx/DataStore";
import { svgIconClose } from "../../../icon";
import MyJoditEditor from "../../MyJoditEditor/MyJoditEditor";
import MyInput from "../../formComponents/MyInput/MyInput";
import "./ChangeLinks.scss";
import logicStore from "../../../mobx/LogicStore";

interface LinkData {
  name: string;
  link: string;
}

const ChangeLinks: React.FC = () => {
  const { dataMenu, key } = dataStore.listLinkData;
  const [selectAction, setSelectAction] = useState("add-link");
  const [selectActionLink, setSelectActionLink] = useState("");
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState("");
  const [article, setArticle] = useState("");
  const isTypeSelect = useRef<string | null>(null);
  const selectId = useRef<string | null>("");

  return (
    <div className="change-links modal-window">
      <div
        className={`change-links__wrapper modal-window__wrapper ${
          logicStore.isModal ? "open" : ""
        }`}
        style={{
          maxWidth: selectAction === "add-article" ? "1200px" : "500px",
        }}
      >
        <button className="add-category__btn-close" onClick={handleCloseModal}>
          {svgIconClose}
        </button>

        <form className="change-links__action">
          <label className="form-label" htmlFor="action">
            Select an action:
          </label>

          <select
            className="form-select select-action"
            aria-label="Default select example"
            name="action"
            id="action"
            onChange={(event) => setSelectAction(event.target.value)}
          >
            <option value="add-link">Add Link</option>
            <option value="add-article">Add Article</option>
            <option value="change">Change</option>
            <option value="delete">Delete</option>
          </select>
        </form>

        {selectAction !== "add-link" && selectAction !== "add-article" && (
          <div>
            <form className="change-links__links">
              <label className="form-label" htmlFor="action">
                Select link:
              </label>
              <select
                className="form-select select-action"
                name="links"
                id="action"
                onChange={(event) =>
                  handlerSetSelectAction(
                    event.target.value,
                    setName,
                    setLink,
                    setArticle,
                    setSelectActionLink,
                    isTypeSelect.current || "",
                    selectId.current || ""
                  )
                }
              >
                <option value="Empty">Empty</option>
                {dataMenu[key]?.map((e: LinkData, i: number) => {
                  return (
                    <option key={i} value={i}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>
        )}

        <div className="action">
          {selectAction === "add-link" && (
            <div className="action-type">
              <form className="change-links__links">
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
                  onClick={(e) =>
                    handleAddLink(
                      e,
                      name,
                      link,
                      setName,
                      setLink,
                      setArticle,
                      setSelectActionLink,
                      handleCloseModal
                    )
                  }
                >
                  Add New Link
                </button>
              </form>
            </div>
          )}

          {selectAction === "add-article" && (
            <div>
              <form className="change-links__links">
                <MyInput
                  value={name}
                  type="text"
                  callbackFunction={setName}
                  placeholder="Add Name Article"
                />
                <MyJoditEditor
                  placeholder={"Вставте свій текст"}
                  article={article}
                  setArticle={setArticle}
                />
                <button
                  className="add-other__btn btn btn-secondary"
                  onClick={(event) =>
                    handleAddArticle(
                      event,
                      name,
                      article,
                      setName,
                      setLink,
                      setArticle,
                      setSelectActionLink,
                      handleCloseModal
                    )
                  }
                >
                  Add New Article
                </button>
              </form>
            </div>
          )}

          {selectAction === "delete" && (
            <div className="action-type">
              <form className="change-links__links">
                <div className="alert alert-danger" role="alert">
                  Are you sure you want to delete the menu item{" "}
                  {selectActionLink !== "" &&
                    dataMenu[key] &&
                    dataMenu[key].length > 0 &&
                    dataMenu[key][+selectActionLink]?.name}
                </div>
                <button
                  disabled={selectActionLink === ""}
                  className="add-other__btn btn btn-secondary"
                  onClick={(e) =>
                    handleDeleteLink(
                      e,
                      selectActionLink,
                      setName,
                      setLink,
                      setArticle,
                      setSelectActionLink,
                      handleCloseModal
                    )
                  }
                >
                  Delete menu
                </button>
              </form>
            </div>
          )}

          {selectAction === "change" && (
            <div className="action-type">
              <form className="change-links__links">
                <MyInput
                  value={name}
                  type="text"
                  disabled={selectActionLink === ""}
                  callbackFunction={setName}
                  placeholder="Add Name link"
                />

                {isTypeSelect.current === "link" && (
                  <MyInput
                    value={link}
                    type="text"
                    disabled={selectActionLink === ""}
                    callbackFunction={setLink}
                    placeholder="Add link"
                  />
                )}
                {isTypeSelect.current === "article" && (
                  <MyJoditEditor
                    placeholder={"Вставте свій текст"}
                    article={article}
                    setArticle={setArticle}
                  />
                )}
                <button
                  disabled={selectActionLink === ""}
                  className="add-other__btn btn btn-secondary"
                  onClick={(e) =>
                    handleSaveChang(
                      e,
                      name,
                      link,
                      article,
                      selectActionLink,
                      isTypeSelect.current || "",
                      selectId.current || "",
                      setName,
                      setLink,
                      setArticle,
                      setSelectActionLink,
                      handleCloseModal
                    )
                  }
                >
                  {isTypeSelect.current === "link" && "Change link"}
                  {isTypeSelect.current === "article" && "Change Article"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(ChangeLinks);
