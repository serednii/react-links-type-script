// ChangeLinks.tsx

import { useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import dataStore from "../../mobx/DataStore";
import { svgIconClose } from "../../icon";
import MyJoditEditor from "../MyJoditEditor/MyJoditEditor";
import MyInput from "../formComponents/MyInput/MyInput";
import logicStore from "../../mobx/LogicStore";
import {
  OtherAction,
  handleAddLink,
  // Імпортуємо інші функції за потреби
} from "./changeLinksUtils";

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

  const handleCloseModal = (
    event: React.MouseEvent<HTMLButtonElement> | null
  ) => {
    event?.preventDefault();
    logicStore.setModal(false);
    logicStore.setChangeLinks(false);
  };

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
                onClick={(e) =>
                  handleAddLink(
                    e,
                    name,
                    link,
                    dataMenu,
                    key,
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

        {/* Інші умови та компоненти форми */}
      </div>
    </div>
  );
};

export default observer(ChangeLinks);
