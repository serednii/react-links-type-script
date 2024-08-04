import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../../MyContext";
import { svgIconChange } from "../../../icon";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  setModal,
  setAddCategoryOther,
  setChangeLinks,
  setButtonPlus,
} from "../../../redux/uiSlice";
import { setIdArticle } from "../../../redux/dataSlice";
import { RootState } from "../../../redux/rootReducer"; // Убедитесь, что путь правильный
import { getDataGraphQLLink } from "../../../functions/requestHelpersGraphQL";

import "./ListLinks.scss";

interface ILink {
  id: string;
  link: string;
}

const ListLinks: React.FC = () => {
  const {
    listLinkData,
    setIdArticle,
    update,
  } = useContext(MyContext);

  const dispatch = useDispatch();
  const { isChangeLinks } = useSelector((state: RootState) => state.ui);
  // const { listLinkData, update } = useSelector(
  //   (state: RootState) => state.data
  // );

  const { dataMenu, key } = listLinkData;
  const [dataArrayElements, setDataArrayElements] = useState<any>([]);
  const [loadingList, setLoadingList] = useState(true);

  function plusOther() {}

  function handlerChangeLink() {
    dispatch(setModal(true));
    dispatch(setChangeLinks(!isChangeLinks));
    dispatch(setAddCategoryOther(false));
    dispatch(setButtonPlus(false));
  }

  useEffect(() => {
    const fetchLinks = async () => {
      if (dataMenu && key && dataMenu[key]) {
        setLoadingList(true);
        const elements = await Promise.all(
          dataMenu[key].map(async (obj: any) => {
            let resLink: ILink | null = null;
            console.log("obj ", obj);
            let id: string = "";
            let link: string = "";

            if (obj.link) {
              const res = await getDataGraphQLLink(obj.link);
              id = obj.link;
              link = res.link;
            } else if (obj.article) {
              id = obj.article;
            }

            console.log("resLink ------ ", resLink);
            console.log("ListLinks.js id", id);

            return (
              <li key={id} className="list-group-item  rounded-3 mb-2">
                {isChangeLinks && (
                  <span className="link-plus" onClick={() => plusOther()}>
                    {svgIconChange}
                  </span>
                )}

                {obj.link && (
                  <a
                    onClick={() => setIdArticle("")}
                    className="active link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                    target="_blank"
                    href={link}
                    rel="noopener noreferrer"
                  >
                    {obj.name}
                  </a>
                )}
                {obj.article ? (
                  <button onClick={() => setIdArticle(id)}>{obj.name}</button>
                ) : null}
              </li>
            );
          })
        );
        setDataArrayElements(elements);
        setLoadingList(false);
      } else {
        setDataArrayElements(<p>No data available</p>);
      }
      setLoadingList(false);
    };

    fetchLinks();
  }, [dataMenu, key, update]);

  if (loadingList) {
    return (
      <div className="list_links">
        <h1>Loading...</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="list_links">
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        {dataArrayElements && dataArrayElements.length > 0 && (
          <Button
            className="btn btn-primary me-md-2 mb-3 btn-lg"
            onClick={handlerChangeLink}
          >
            Change links
          </Button>
        )}
      </div>

      <ul className="list-group list-group-flush">{dataArrayElements}</ul>
    </div>
  );
};
export default ListLinks;
