import { useEffect, useState } from "react";
import graphQLArticleController from "../../../controller/graphQL/graphql-ArticleController";
import { svgIconClose } from "../../../icon";
import logicStore from "../../../mobx/LogicStore";
import MySpinner from "../../MySpinner/MySpinner";
import { observer } from "mobx-react-lite";
import "./article.scss";

const Article: React.FC = () => {
  const [html, setHtml] = useState("");
  const [loadingArticle, setLoadingArticle] = useState(true);
  console.log("Article");
  console.log(logicStore.idArticle);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoadingArticle(true);
    graphQLArticleController
      .getDataArticle(logicStore.idArticle)
      .then((res) => {
        // console.log(res);
        if (!signal.aborted) {
          setHtml(res.article);
        }
      })
      .catch((error) => {
        console.error("Error download Article", error);
        logicStore.setError("Error download Article");
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
  }, [logicStore.idArticle]);

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
        <button onClick={() => logicStore.setIdArticle("")}>
          {" "}
          {svgIconClose}
        </button>
      </div>
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};
export default observer(Article);
