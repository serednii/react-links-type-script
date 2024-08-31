// ChangeLinks.tsx

import React from "react";
import { observer } from "mobx-react-lite";
import { useChangeLinksController } from "./ChangeLinksController/ChangeLinksController";
import { svgIconClose } from "../../../icon";
import MyJoditEditor from "../../MyJoditEditor/MyJoditEditor";
import MyInput from "../../formComponents/MyInput/MyInput";
import dataStore from "../../../mobx/DataStore";
import logicStore from "../../../mobx/LogicStore";
import { LinkData } from "./ChangeLinksTypes";
import "./ChangeLinks.scss";

const ChangeLinks: React.FC = () => {
  const {
    selectAction,
    setSelectAction,
    selectActionLink,
    handlerSetSelectAction,
    name,
    setName,
    link,
    setLink,
    article,
    setArticle,
    handleAddLink,
    handleAddArticle,
    handleSaveChange,
    handleDeleteLink,
    handleCloseModal,
  } = useChangeLinksController();

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
            value={selectAction}
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
              <label className="form-label" htmlFor="selectLink">
                Select link:
              </label>
              <select
                className="form-select select-action"
                name="links"
                id="selectLink"
                value={selectActionLink}
                onChange={(event) => handlerSetSelectAction(event.target.value)}
              >
                <option value="Empty">Empty</option>
                {dataStore.listLinkData.dataMenu[
                  dataStore.listLinkData.key
                ]?.map((e: LinkData, i: number) => (
                  <option key={i} value={i}>
                    {e.name}
                  </option>
                ))}
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
                  callbackFunction={setName}
                  placeholder="Add Name link"
                />

                <MyInput
                  value={link}
                  type="text"
                  callbackFunction={setLink}
                  placeholder="Add link"
                />
                <button
                  className="add-other__btn btn btn-secondary"
                  onClick={handleAddLink}
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
                  onClick={handleAddArticle}
                >
                  Add New Article
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

                {dataStore.listLinkData.isTypeSelect.current === "link" && (
                  <MyInput
                    value={link}
                    type="text"
                    disabled={selectActionLink === ""}
                    callbackFunction={setLink}
                    placeholder="Add link"
                  />
                )}
                {dataStore.listLinkData.isTypeSelect.current === "article" && (
                  <MyJoditEditor
                    placeholder={"Вставте свій текст"}
                    article={article}
                    setArticle={setArticle}
                  />
                )}
                <button
                  disabled={selectActionLink === ""}
                  className="add-other__btn btn btn-secondary"
                  onClick={handleSaveChange}
                >
                  {dataStore.listLinkData.isTypeSelect.current === "link" &&
                    "Change link"}
                  {dataStore.listLinkData.isTypeSelect.current === "article" &&
                    "Change Article"}
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
                    dataStore.listLinkData.dataMenu[
                      dataStore.listLinkData.key
                    ] &&
                    dataStore.listLinkData.dataMenu[dataStore.listLinkData.key]
                      .length > 0 &&
                    dataStore.listLinkData.dataMenu[dataStore.listLinkData.key][
                      +selectActionLink
                    ]?.name}
                </div>
                <button
                  disabled={selectActionLink === ""}
                  className="add-other__btn btn btn-secondary"
                  onClick={handleDeleteLink}
                >
                  Delete menu
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
