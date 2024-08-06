import "./ChangeLinks.scss";
import { useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import todoStore from "../../mobx/store";
import { svgIconClose } from "../../icon";
import MyJoditEditor from "../MyJoditEditor/MyJoditEditor";
import MyInput from "../formComponents/MyInput/MyInput";
import { PASSWORD } from "../../const";
import { useSelector, useDispatch } from "react-redux";
import {
  setModal,
  setChangeLinks,
  setError,
  setInfo,
} from "../../redux/uiSlice";
import { toggleUpdateListLink } from "../../redux/dataSlice";
import { RootState } from "../../redux/rootReducer"; // Убедитесь, что путь правильный

interface LinkData {
  name: string;
  link: string;
}

const ChangeLinks: React.FC = () => {
  const dispatch = useDispatch();
  const { isModal } = useSelector((state: RootState) => state.ui);

  const { dataMenu, key } = todoStore.listLinkData;
  console.log("listLinkData", todoStore.listLinkData);

  const [selectAction, setSelectAction] = useState("add-link");
  const [selectActionLink, setSelectActionLink] = useState("");
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState("");
  const [textCode, setTextCode] = useState("");
  const [article, setArticle] = useState("");
  const isTypeSelect = useRef<string | null>(null);
  const selectId = useRef<string>("");

  const OtherAction = () => {
    todoStore.setDataMain({ ...todoStore.dataMain });
    todoStore.updateMenu(todoStore.dataMain);
    setName("");
    setLink("");
    setArticle("");
    setSelectActionLink("");
  };

  // const handleSetText = (value: string) => {
  //   // value = value.trim().replaceAll(" ", "_");
  //   const regex = /^[a-zA-Z_0-9]*$/;
  //   if (regex.test(value)) {
  //     setName(value);
  //   }
  // };

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
      todoStore
        .getLink(dataMenu[key][+select].link)
        .then((res) => {
          setLink(res.link);
        })
        .catch(() => {
          dispatch(setError("Error get Link"));
        });
    }

    if (dataMenu[key][+select].article) {
      isTypeSelect.current = "article";
      selectId.current = dataMenu[key][+select].article;
      todoStore
        .getArticle(dataMenu[key][+select].article)
        .then((res) => {
          setArticle(res.article);
        })
        .catch(() => {
          dispatch(setError("Error get Article"));
        });
    }
    setName(dataMenu[key][+select].name);
  };

  const handleAddLink = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    if (textCode !== PASSWORD) {
      dispatch(setError("Error control code"));
      return;
    }

    if (!name.length) {
      dispatch(setError("Add name Link"));
      return;
    }

    if (!urlPattern.test(link)) {
      dispatch(setError("Error synaxsys url"));
      return;
    }

    todoStore
      .addLink(link)
      .then((resId) => {
        dataMenu[key].push({ name, link: resId });
        dispatch(toggleUpdateListLink());
        OtherAction();
      })
      .catch((error) => {
        console.error(
          "Error, failed to add link. Please try again later",
          error
        );
        dispatch(setError("Error, failed to add link. Please try again later"));
      });
  };

  const handleAddArticle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (textCode !== PASSWORD) {
      dispatch(setError("Error control code"));
      return;
    }

    if (!name.length) {
      dispatch(setError("Add name Link"));
      return;
    }

    todoStore
      .addArticle(article)
      .then((resId) => {
        dataMenu[key].push({ name, article: resId });
        dispatch(toggleUpdateListLink());
        OtherAction();
      })
      .catch((error) => {
        console.error(
          "Error, failed to add link. Please try again later",
          error
        );
        dispatch(
          setError("Error, failed to add Article. Please try again later")
        );
      });
  };

  const handleSaveChang = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (textCode !== PASSWORD) {
      dispatch(setError("Error control code"));
      return;
    }
    if (!name.length) {
      dispatch(setError("Add name Link"));
      return;
    }

    if (isTypeSelect.current === "link") {
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      if (!urlPattern.test(link)) {
        dispatch(setError("Error synaxsys url"));
        return;
      }
      todoStore
        .updateLink(selectId.current, link)
        .then((res) => {
          dataMenu[key][+selectActionLink] = {
            name,
            link: selectId.current,
          };
          dispatch(toggleUpdateListLink());
          dispatch(setInfo("Update link"));
        })
        .catch((error) => {
          console.error("Error, update link Please try again later", error);
          dispatch(setError("Error  update link. Please try again later"));
        });
    }

    if (isTypeSelect.current === "article") {
      todoStore
        .updateArticle(selectId.current, article)
        .then((res) => {
          dataMenu[key][+selectActionLink] = {
            name,
            article: selectId.current,
          };
          dispatch(toggleUpdateListLink());
          dispatch(setInfo("Update Article"));
        })
        .catch((error) => {
          console.error("Error, update article. Please try again later", error);
          dispatch(setError("Error, update Article. Please try again later"));
        });
    }

    OtherAction();
  };

  const handleDeleteLink = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (textCode !== PASSWORD) {
      dispatch(setError("Error control code"));
      return;
    }

    const deletedLink = dataMenu[key].splice(+selectActionLink, 1);

    if (deletedLink[0].link) {
      todoStore
        .deleteLink(deletedLink[0].link)
        .then((res) => {
          dispatch(toggleUpdateListLink());
          dispatch(setInfo("Successful Deleted Link"));
        })
        .catch((error) => {
          dispatch(setError("Error Deleted Link"));
        });
    }

    if (deletedLink[0].article) {
      todoStore
        .deleteArticle(deletedLink[0].article)
        .then((res) => {
          dispatch(toggleUpdateListLink());
          dispatch(setInfo("Successful Deleted Article"));
        })
        .catch((error) => {
          dispatch(setError("Error Deleted Link"));
        });
    }
    console.log(dataMenu);
    console.log(dataMenu[key]);

    if (dataMenu[key].length === 0) {
      dataMenu[key] = null;
    }
    OtherAction();
  };

  const handleCloseModal = () => {
    dispatch(setModal(false));
    setTimeout(() => dispatch(setChangeLinks(false), 1000));
  };

  return (
    <div className="change-links modal-window">
      <div
        className={`change-links__wrapper modal-window__wrapper ${
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
        <button className="add-category__btn-close" onClick={handleCloseModal}>
          {svgIconClose}
        </button>

        <form className="add-other-form">
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
            <form className="add-other-form ">
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
              <form className="add-other-form">
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
              <form className="add-other-form">
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
              <form className="add-other-form">
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
              <form className="add-other-form">
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
