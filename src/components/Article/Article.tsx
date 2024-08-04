import { useEffect, useState, useContext } from "react";
import { getDataGraphQLArticle } from "../../functions/requestHelpersGraphQL";
import { MyContext } from "../../MyContext";

import "./article.scss";
const Article: React.FC = () => {
  const { setError, idArticle } = useContext(MyContext);
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
        setError("Error download Article", error);
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
