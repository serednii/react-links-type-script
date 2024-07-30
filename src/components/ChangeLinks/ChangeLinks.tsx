import "./ChangeLinks.scss";
import { useContext, useRef, useState } from "react";
import { MyContext } from "../../MyContext";
import {
  addDataGraphQLLink,
  postDataGraphQLMenu,
  addDataGraphQLArticle,
  deleteDataGraphQLLink,
  deleteDataGraphQLArticle,
  getDataGraphQLArticle,
  getDataGraphQLLink,
  updateDataGraphQLLink,
  updateDataGraphQLArticle,
} from "../../functions/requestHelpersGraphQL";
import { svgIconClose } from "../../icon";
import MyJoditEditor from "../MyJoditEditor/MyJoditEditor";

interface LinkData {
  name: string;
  link: string;
}

const ChangeLinks: React.FC = () => {
  const {
    URL_SERVER,
    listLinkData,
    setDataMain,
    dataMain,
    isModal,
    setIsModal,
    setIsChangeLinks,
    setError,
    setInfo,
  } = useContext(MyContext);
  const { dataMenu, key } = listLinkData;
  const [selectAction, setSelectAction] = useState("add-link");
  const [selectActionLink, setSelectActionLink] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [textCode, setTextCode] = useState("");
  const [text, setText] = useState<string>("");
  const [article, setArticle] = useState("");
  const isTypeSelect = useRef<string | null>(null);
  const selectId = useRef<string>("");
  function OtherAction() {
    setDataMain({ ...dataMain });
    postDataGraphQLMenu(dataMain);
    setName("");
    setLink("");
    setSelectActionLink("");
    setArticle("");
  }

  const handleSetText = (value: string) => {
    // value = value.trim().replaceAll(" ", "_");
    const regex = /^[a-zA-Z_0-9]*$/;
    if (regex.test(value)) {
      setText(value);
    }
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
      getDataGraphQLLink(dataMenu[key][+select].link)
        .then((res) => {
          setLink(res.link);
        })
        .catch(() => {
          setError("Error get Link");
        });
    }

    if (dataMenu[key][+select].article) {
      isTypeSelect.current = "article";
      selectId.current = dataMenu[key][+select].article;
      getDataGraphQLArticle(dataMenu[key][+select].article)
        .then((res) => {
          setArticle(res.article);
        })
        .catch(() => {
          setError("Error get Article");
        });
    }
    setText(dataMenu[key][+select].name);
  };

  const handleAddLink = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    if (textCode !== "text code") {
      setError("Error control code");
      return;
    }

    if (!text.length) {
      setError("Add name Link");
      return;
    }

    if (!urlPattern.test(link)) {
      setError("Error synaxsys url");
      return;
    }

    addDataGraphQLLink(link)
      .then((resId) => {
        dataMenu[key].push({ name: text, link: resId });
        OtherAction();
      })
      .catch((error) => {
        console.error(
          "Error, failed to add link. Please try again later",
          error
        );
        setError("Error, failed to add link. Please try again later");
      });
  };

  function handleAddArticle(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();

    if (textCode !== "text code") {
      setError("Error control code");
      return;
    }

    if (!text.length) {
      setError("Add name Link");
      return;
    }

    addDataGraphQLArticle(article)
      .then((resId) => {
        dataMenu[key].push({ name: text, article: resId });
        OtherAction();
        setText("");
      })
      .catch((error) => {
        console.error(
          "Error, failed to add link. Please try again later",
          error
        );
        setError("Error, failed to add Article. Please try again later");
      });
  }

  const handleSaveChang = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (textCode !== "text code") {
      setError("Error control code");
      return;
    }
    if (!text.length) {
      setError("Add name Link");
      return;
    }

    if (isTypeSelect.current === "link") {
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      if (!urlPattern.test(link)) {
        setError("Error synaxsys url");
        return;
      }
      updateDataGraphQLLink(selectId.current, link)
        .then((res) => {
          dataMenu[key][+selectActionLink] = {
            name: text,
            link: selectId.current,
          };
          setInfo("Update link");
        })
        .catch((error) => {
          console.error("Error, update link Please try again later", error);
          setError("Error  update link. Please try again later");
        });
    }

    if (isTypeSelect.current === "article") {
      updateDataGraphQLArticle(selectId.current, article)
        .then((res) => {
          dataMenu[key][+selectActionLink] = {
            name: text,
            article: selectId.current,
          };
          setInfo("Update Article");
        })
        .catch((error) => {
          console.error("Error, update article. Please try again later", error);
          setError("Error, update Article. Please try again later");
        });
    }

    OtherAction();
  };

  const handleDeleteLink = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (textCode !== "text code") {
      setError("Error control code");
      return;
    }

    const deletedLink = dataMenu[key].splice(+selectActionLink, 1);

    if (deletedLink[0].link) {
      deleteDataGraphQLLink(deletedLink[0].link)
        .then((res) => {
          setInfo("Successful Deleted Link");
        })
        .catch((error) => {
          setError("Error Deleted Link", error);
        });
    }

    if (deletedLink[0].article) {
      deleteDataGraphQLArticle(deletedLink[0].article)
        .then((res) => {
          setInfo("Successful Deleted Article");
        })
        .catch((error) => {
          setError("Error Deleted Link", error);
        });
    }

    if (dataMenu[key].length === 0) {
      delete dataMenu[key];
    }
    OtherAction();
  };

  const handleCloseModal = () => {
    setIsModal(false);
    setTimeout(() => setIsChangeLinks(false), 1000);
  };

  return (
    <div className="change-links modal-window">
      <div
        className={`change-links__wrapper modal-window__wrapper ${
          isModal ? "open" : ""
        }`}
      >
        <input
          className="add-category__text-code"
          value={textCode}
          onChange={(e) => setTextCode(e.target.value)}
          type="password"
        />
        <button className="add-category__btn-close" onClick={handleCloseModal}>
          {svgIconClose}
        </button>

        <form className="add-other-form">
          <label htmlFor="action">Select an action:</label>

          <select
            name="action"
            id="action"
            onChange={(event) => setSelectAction(event.target.value)}
          >
            <option value="add-link">Add Link</option>
            <option value="add-article">Add Article</option>
            <option value="change">Change</option>
            <option value="delete">Delete</option>
          </select>

          {selectAction !== "add-link" && (
            <div>
              <label htmlFor="action">Select link:</label>
              <select
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
            </div>
          )}

          <div className="action">
            {selectAction === "add-link" && (
              <div className="action-type">
                <input
                  value={text}
                  onChange={(e) => handleSetText(e.target.value)}
                  placeholder="Add Name link"
                  type="text"
                />
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Add link"
                  type="text"
                />
                <button className="add-other__btn" onClick={handleAddLink}>
                  Add New Link
                </button>
              </div>
            )}

            {selectAction === "add-article" && (
              <>
                <input
                  // value={text}
                  onChange={(e) => handleSetText(e.target.value)}
                  placeholder="Add Name Article"
                  type="text"
                />
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
              </>
            )}

            {selectAction === "change" && (
              <div className="action-type">
                <input
                  disabled={selectActionLink === ""}
                  value={text}
                  onChange={(e) => handleSetText(e.target.value)}
                  placeholder="Add Name link"
                  type="text"
                />
                {isTypeSelect.current === "link" && (
                  <input
                    disabled={selectActionLink === ""}
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Add link"
                    type="text"
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
                  className="add-other__btn"
                  onClick={handleSaveChang}
                >
                  {isTypeSelect.current === "link" && "Change link"}
                  {isTypeSelect.current === "article" && "Change Article"}
                </button>
              </div>
            )}

            {selectAction === "delete" && (
              <div className="action-type">
                <p>
                  Are you sure you want to delete the menu item{" "}
                  {selectActionLink !== "" &&
                    dataMenu[key] &&
                    dataMenu[key].length > 0 &&
                    dataMenu[key][+selectActionLink]?.name}
                </p>
                <button
                  disabled={selectActionLink === ""}
                  className="add-other__btn"
                  onClick={handleDeleteLink}
                >
                  Delete menu
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeLinks;
