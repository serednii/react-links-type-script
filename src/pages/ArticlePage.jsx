import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getDataGraphQLArticle } from "../functions/requestHelpersGraphQL";
import { MyContext } from "../MyContext";
import "./articlePage.scss";
const ArticlePage = () => {
  const { setError } = useContext(MyContext);
  const { id } = useParams();
  const [html, setHtml] = useState("");
  useEffect(() => {
    getDataGraphQLArticle(id)
      .then((res) => {
        console.log(res);
        setHtml(res.article);
      })
      .catch((error) => {
        console.error("Error download Article", error);
        // throw error;
        setError("Error download Article", error);
      });
    console.log(id);
  }, [id]);

  console.log("HTML", html);
  return (
    <div className="article col-0 col-md-4">
      <Link to="/">Home</Link>
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};
export { ArticlePage };
