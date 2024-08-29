import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import dataStore from "../../../mobx/DataStore";
import Breadcrumbs from "../../Breadkrumbs/Breadcrumbs";
import MySpinner from "../../MySpinner/MySpinner";
import logicStore from "../../../mobx/LogicStore";
import { handlerChangeLink, fetchLinks } from "./linkHelpers"; 

import "./ListLinks.scss";

const ListLinks: React.FC = () => {
  const { dataMenu, key, arrayKeys } = dataStore?.listLinkData || {};
  dataStore.setBreadcrumbs([...(arrayKeys || []), key]);
  const [dataArrayElements, setDataArrayElements] = useState<any>([]);
  const [loadingList, setLoadingList] = useState(false);

  console.log("ListLinks");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchLinks(dataMenu, key, signal, setLoadingList, setDataArrayElements);

    return () => {
      controller.abort(); // Cancel the request when the component unmounts
    };
  }, [key, logicStore.updateListLink]);

  return (
    <div className="list-links">
      {loadingList && <MySpinner />}
      {!loadingList && (
        <React.Fragment key="ListLinks">
          {dataArrayElements && dataArrayElements.length > 0 && (
            <div className="list-links__header">
              <Breadcrumbs />
              <Button
                className="btn btn-primary me-md-2 mb-3 btn-lg"
                onClick={handlerChangeLink}
              >
                Change links
              </Button>
            </div>
          )}
          <ul className="list-group list-group-flush">{dataArrayElements}</ul>
        </React.Fragment>
      )}
    </div>
  );
};

export default observer(ListLinks);
