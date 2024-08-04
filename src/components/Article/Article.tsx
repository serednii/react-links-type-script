import { useEffect, useState, useContext } from "react";
import { getDataGraphQLArticle } from "../../functions/requestHelpersGraphQL";
import { MyContext } from "../../MyContext";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../redux/uiSlice";
import { RootState } from "../../redux/rootReducer"; // Убедитесь, что путь правильный

import "./article.scss";
const Article: React.FC = () => {
  const { idArticle } = useContext(MyContext);
  const dispatch = useDispatch();
  // const { idArticle } = useSelector((state: RootState) => state.data);
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getDataGraphQLArticle(idArticle)
      .then((res) => {
        console.log(res);
        setHtml(res.article);
      })
      .catch((error) => {
        console.error("Error download Article", error);
        dispatch(setError("Error download Article"));
      })
      .finally(() => setLoading(false));
    console.log(idArticle);
  }, [idArticle]);

  console.log("HTML", html);
  if (loading) {
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
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};
export default Article;
