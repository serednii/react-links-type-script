import { observer } from "mobx-react-lite";
import { ReactElement } from "react";
import dataStore from "../../mobx/dataStore/DataStore";
import "./ArticleWrapper.scss";

const ArticleWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <div className="article-wrapper">{dataStore.idArticle && children}</div>
  );
};

export default observer(ArticleWrapper);
