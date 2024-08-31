import { useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import dataStore from "../../../mobx/DataStore";
import menuStore from "../../../mobx/asyncDataStore/AsyncMenuStore";
import linkStore from "../../../mobx/asyncDataStore/AsyncLinkStore";
import articleStore from "../../../mobx/asyncDataStore/AsyncArticleStore";

import { svgIconClose } from "../../../icon";
import MyJoditEditor from "../../MyJoditEditor/MyJoditEditor";
import MyInput from "../../formComponents/MyInput/MyInput";

import authStore from "../../../mobx/AuthStore";
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
  const selectId = useRef<string>("");

  console.log("ChangeLinks");

  const OtherAction = () => {
    menuStore.updateMenu(authStore.user.id, dataStore.dataMain);
    setName("");
    setLink("");
    setArticle("");
    setSelectActionLink("");
    handleCloseModal(null);
  };

  const handlerSetSelectAction = (select: string) => {
    if (select === "Empty") {
      setName("");
      setLink("");
      setArticle("");
      setSelectActionLink("");
      return;
    }
    setSelectActionLink(select);

    if (dataMenu[key][+select].link) {
      isTypeSelect.current = "link";
      selectId.current = dataMenu[key][+select].link;
      linkStore
        .getLink(dataMenu[key][+select].link)
        .then((res) => {
          setLink(res.link);
        })
        .catch(() => {
          logicStore.setError("Error get Link");
        });
    }

    if (dataMenu[key][+select].article) {
      isTypeSelect.current = "article";
      selectId.current = dataMenu[key][+select].article;
      articleStore
        .getArticle(dataMenu[key][+select].article)
        .then((res) => {
          setArticle(res.article);
        })
        .catch(() => {
          logicStore.setError("Error get Article");
        });
    }
    setName(dataMenu[key][+select].name);
  };

  const handleAddLink = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    if (!name.length) {
      logicStore.setError("Add name Link");
      return;
    }

    if (!urlPattern.test(link)) {
      logicStore.setError("Error synaxsys url");
      return;
    }

    linkStore
      .addLink(link)
      .then((resId) => {
        dataMenu[key].push({ name, link: resId });
        logicStore.toggleUpdateListLink();
        OtherAction();
      })
      .catch((error) => {
        console.error(
          "Error, failed to add link. Please try again later",
          error
        );
        logicStore.setError(
          "Error, failed to add link. Please try again later"
        );
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
        dataMenu[key].push({ name, article: resId });
        logicStore.toggleUpdateListLink();
        OtherAction();
      })
      .catch((error) => {
        console.error(
          "Error, failed to add link. Please try again later",
          error
        );
        logicStore.setError(
          "Error, failed to add Article. Please try again later"
        );
      });
  };

  const handleSaveChang = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!name.length) {
      logicStore.setError("Add name Link");
      return;
    }

    if (isTypeSelect.current === "link") {
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      if (!urlPattern.test(link)) {
        logicStore.setError("Error synaxsys url");
        return;
      }
      linkStore
        .updateLink(selectId.current, link)
        .then((res) => {
          dataMenu[key][+selectActionLink] = {
            name,
            link: selectId.current,
          };
          logicStore.toggleUpdateListLink();
          logicStore.setInfo("Update link");
        })
        .catch((error) => {
          console.error("Error, update link Please try again later", error);
          logicStore.setError("Error  update link. Please try again later");
        });
    }

    if (isTypeSelect.current === "article") {
      articleStore
        .updateArticle(selectId.current, article)
        .then((res) => {
          dataMenu[key][+selectActionLink] = {
            name,
            article: selectId.current,
          };
          logicStore.toggleUpdateListLink();
          logicStore.setInfo("Update Article");
        })
        .catch((error) => {
          console.error("Error, update article. Please try again later", error);
          logicStore.setError("Error, update Article. Please try again later");
        });
    }

    OtherAction();
  };

  const handleDeleteLink = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const deletedLink = dataMenu[key].splice(+selectActionLink, 1);

    if (deletedLink[0].link) {
      linkStore
        .deleteLink(deletedLink[0].link)
        .then((res) => {
          logicStore.toggleUpdateListLink();
          logicStore.setInfo("Successful Deleted Link");
        })
        .catch((error) => {
          logicStore.setError("Error Deleted Link");
        });
    }

    if (deletedLink[0].article) {
      articleStore
        .deleteArticle(deletedLink[0].article)
        .then((res) => {
          logicStore.toggleUpdateListLink();
          logicStore.setInfo("Successful Deleted Article");
        })
        .catch((error) => {
          logicStore.setError("Error Deleted Link");
        });
    }
    // console.log(dataMenu);
    // console.log(key);
    // console.log(dataMenu[key].length);

    if (dataMenu[key].length === 0) {
      // console.log("***********delete");
      dataMenu[key] = null;
    }

    OtherAction();
  };

  const handleCloseModal = (
    event: React.MouseEvent<HTMLButtonElement> | null
  ) => {
    event?.preventDefault();
    logicStore.setModal(false);
    logicStore.setChangeLinks(false);
  };

  return (
    // <h1>djfgnfdjgn;sdfkjgngkljsdgf</h1>
    // <button
    //   className="add-category__btn-close"
    //   onClick={(event) => handleCloseModal(event)}
    // >
    //   {svgIconClose}
    // </button>
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
                onChange={(event) => handlerSetSelectAction(event.target.value)}
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
                  onClick={(e) => handleAddLink(e)}
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
                  onClick={(event) => handleAddArticle(event)}
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
                  onClick={handleSaveChang}
                >
                  {isTypeSelect.current === "link" && "Change link"}
                  {isTypeSelect.current === "article" && "Change Article"}
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
