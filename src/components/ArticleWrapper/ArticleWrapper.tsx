import { observer } from "mobx-react-lite";
import { ReactElement } from "react";
import logicStore from "../../mobx/LogicStore";
import "./ArticleWrapper.scss";

const ArticleWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <div className="article-wrapper">{logicStore.idArticle && children}</div>
  );
};

export default observer(ArticleWrapper);
