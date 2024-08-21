import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import linkStore from "../../../mobx/asyncDataStore/AsyncLinkStore";
import dataStore from "../../../mobx/dataStore/DataStore";
import Breadcrumbs from "../../Breadkrumbs/Breadcrumbs";
import { useSelector, useDispatch } from "react-redux";
import {
  setModal,
  setAddCategoryOther,
  setChangeLinks,
  setButtonPlus,
} from "../../../redux/uiSlice";
import { setIdArticle } from "../../../redux/dataSlice";
import { RootState } from "../../../redux/rootReducer";

import "./ListLinks.scss";
import MySpinner from "../../MySpinner/MySpinner";

interface ILink {
  id: string;
  link: string;
}

const ListLinks: React.FC = () => {
  const dispatch = useDispatch();
  const { isChangeLinks } = useSelector((state: RootState) => state.ui);
  const { updateListLink } = useSelector((state: RootState) => state.data);
  const { dataMenu, key, arrayKeys } = dataStore?.listLinkData || {};
  dataStore.setBreadcrumbs([...(arrayKeys || []), key]);
  const [dataArrayElements, setDataArrayElements] = useState<any>([]);
  const [loadingList, setLoadingList] = useState(false);

  console.log("ListLinks");
  function handlerChangeLink() {
    dispatch(setModal(true));
    dispatch(setChangeLinks(!isChangeLinks));
    dispatch(setAddCategoryOther(false));
    dispatch(setButtonPlus(false));
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchLinks = async () => {
      if (dataMenu && key && dataMenu[key]) {
        setLoadingList(true);
        try {
          const elements = await Promise.all(
            dataMenu[key].map(async (obj: any) => {
              let resLink: ILink | null = null;
              let id: string = "";
              let link: string = "";

              if (obj.link) {
                const res = await linkStore.getLink(obj.link);
                id = obj.link;
                link = res.link;
              } else if (obj.article) {
                id = obj.article;
              }

              return (
                <React.Fragment key={id}>
                  {obj.link && (
                    <li className="list-group-item color-link rounded-3 mb-2">
                      <a
                        onClick={() => dispatch(setIdArticle(""))}
                        className="active link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                        target="_blank"
                        href={link}
                        rel="noopener noreferrer"
                      >
                        {obj.name}
                      </a>
                    </li>
                  )}

                  {obj.article && (
                    <li
                      key={id}
                      className="list-group-item color-article rounded-3 mb-2"
                    >
                      <button onClick={() => dispatch(setIdArticle(id))}>
                        {obj.name}
                      </button>
                    </li>
                  )}
                </React.Fragment>
              );
            })
          );

          if (!signal.aborted) {
            setDataArrayElements(elements);
          }
        } catch (e) {
          if (!signal.aborted) {
            console.error("Error fetching links:", e);
          }
        } finally {
          if (!signal.aborted) {
            setLoadingList(false);
          }
        }
      } else {
        setDataArrayElements(<p>No data available</p>);
      }
    };

    fetchLinks();

    return () => {
      controller.abort(); // Скасування запиту при розмонтуванні компонента
    };
  }, [key, updateListLink]);

  // if (loadingList) {
  //   return (
  //     <div className="article">
  //       <MySpinner />
  //     </div>
  //   );
  // }

  return (
    <div className="list-links">
      {loadingList && <MySpinner />}
      {!loadingList && (
        <>
          <div className="list-links__header">
            {dataArrayElements && dataArrayElements.length > 0 && (
              <>
                <Breadcrumbs />
                <Button
                  className="btn btn-primary me-md-2 mb-3 btn-lg"
                  onClick={handlerChangeLink}
                >
                  Change links
                </Button>
              </>
            )}
          </div>
          <ul className="list-group list-group-flush">{dataArrayElements}</ul>
        </>
      )}
    </div>
  );
};

export default observer(ListLinks);
