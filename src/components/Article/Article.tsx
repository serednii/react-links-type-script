import { useEffect, useState } from "react";
import graphQLArticleController from "../../controller/graphQL/graphql-ArticleController";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../redux/uiSlice";
import { svgIconClose } from "../../icon";
import { RootState } from "../../redux/rootReducer"; // Убедитесь, что путь правильный
import { setIdArticle } from "../../redux/dataSlice";

import "./article.scss";

const Article: React.FC = () => {
  const dispatch = useDispatch();
  const { idArticle } = useSelector((state: RootState) => state.data);
  const [html, setHtml] = useState("");
  const [loadingArticle, setLoadingArticle] = useState(true);

  useEffect(() => {
    setLoadingArticle(true);
    graphQLArticleController
      .getDataArticle(idArticle)
      .then((res) => {
        console.log(res);
        setHtml(res.article);
      })
      .catch((error) => {
        console.error("Error download Article", error);
        dispatch(setError("Error download Article"));
      })
      .finally(() => setLoadingArticle(false));
    console.log(idArticle);
  }, [idArticle]);

  if (loadingArticle) {
    return (
      <div className="article">
        <h1>Loading...</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="article">
      <div className="article__close">
        <button onClick={() => dispatch(setIdArticle(""))}>
          {" "}
          {svgIconClose}
        </button>
      </div>
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};
export default Article;
