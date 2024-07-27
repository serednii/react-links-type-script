import "./ChangeLinks.scss";
import { useContext, useState } from "react";
import Context from "../../Context";

import { svgIconClose } from "../../icon";
import { URL_SERVER } from "../App";

interface LinkData {
  name: string;
  link: string;
}

const ChangeLinks: React.FC = () => {
  const {
    listLinkData,
    setDataMain,
    outDataServer,
    dataMain,
    isModal,
    setIsModal,
    setIsChangeLinks,
  } = useContext(Context);
  const { dataMenu, key } = listLinkData;
  const [selectAction, setSelectAction] = useState("add-link");
  const [selectActionLink, setSelectActionLink] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [textCode, setTextCode] = useState("");

  function OtherAction() {
    setDataMain({ ...dataMain });
    outDataServer(URL_SERVER, "PUT", dataMain);
    setName("");
    setLink("");
  }

  const handlerSetSelectAction = (select: string) => {
    setSelectActionLink(select);
    setName(dataMenu[key][+select].name);
    setLink(dataMenu[key][+select].link);
  };

  const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (textCode === "text code") {
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      if (name.length > 2 && urlPattern.test(link)) {
        dataMenu[key].push({ name, link });
        OtherAction();
      }
    }
  };

  const changeLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (textCode === "text code") {
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      if (name.length > 2 && urlPattern.test(link)) {
        dataMenu[key][+selectActionLink] = { name, link };
        OtherAction();
      }
    }
  };

  const deleteLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (textCode === "text code") {
      dataMenu[key].splice(+selectActionLink, 1);
      if (dataMenu[key].length === 0) {
        delete dataMenu[key];
      }
      OtherAction();
    }
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
          type="text"
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
            <option value="change">Change Link</option>
            <option value="delete">Delete Link</option>
          </select>

          {selectAction !== "add-link" && (
            <div>
              <label htmlFor="action">Select link:</label>
              <select
                name="links"
                id="action"
                onChange={(event) => handlerSetSelectAction(event.target.value)}
              >
                <option value="">Select link</option>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Add Name link"
                  type="text"
                />
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Add link"
                  type="text"
                />
                <button className="add-other__btn" onClick={addLink}>
                  Add New Link
                </button>
              </div>
            )}

            {selectAction === "change" && (
              <div className="action-type">
                <input
                  disabled={selectActionLink === ""}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Add Name link"
                  type="text"
                />
                <input
                  disabled={selectActionLink === ""}
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Add link"
                  type="text"
                />
                <button
                  disabled={selectActionLink === ""}
                  className="add-other__btn"
                  onClick={changeLink}
                >
                  Add New Link
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
                    dataMenu[key][+selectActionLink].name}
                </p>
                <button
                  disabled={selectActionLink === ""}
                  className="add-other__btn"
                  onClick={deleteLink}
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
