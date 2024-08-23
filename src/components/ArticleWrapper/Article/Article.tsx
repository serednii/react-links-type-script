import { useEffect, useState } from "react";
import graphQLArticleController from "../../../controller/graphQL/graphql-ArticleController";
import { useDispatch } from "react-redux";
import { setError } from "../../../redux/uiSlice";
import { svgIconClose } from "../../../icon";
import dataStore from "../../../mobx/dataStore/DataStore";
import MySpinner from "../../MySpinner/MySpinner";
import { observer } from "mobx-react-lite";
import "./article.scss";

const Article: React.FC = () => {
  const dispatch = useDispatch();
  const [html, setHtml] = useState("");
  const [loadingArticle, setLoadingArticle] = useState(true);
  console.log("Article");
  console.log(dataStore.idArticle);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoadingArticle(true);
    graphQLArticleController
      .getDataArticle(dataStore.idArticle)
      .then((res) => {
        // console.log(res);
        if (!signal.aborted) {
          setHtml(res.article);
        }
      })
      .catch((error) => {
        console.error("Error download Article", error);
        dispatch(setError("Error download Article"));
      })
      .finally(() => {
        if (!signal.aborted) {
          setLoadingArticle(false);
        }
      });
    // console.log(idArticle);
    return () => {
      controller.abort();
    };
  }, [dataStore.idArticle]);

  if (loadingArticle) {
    return (
      <div className="article">
        <MySpinner />;
      </div>
    );
  }

  return (
    <div className="article">
      <div className="article__close">
        <button onClick={() => dataStore.setIdArticle("")}>
          {" "}
          {svgIconClose}
        </button>
      </div>
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};
export default observer(Article);
