// ListLinks.tsx

import React from "react";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Breadcrumbs from "../../Breadkrumbs/Breadcrumbs";
import MySpinner from "../../MySpinner/MySpinner";
import { useListLinksController } from "./ListLinksController/ListLinksController";
import "./ListLinks.scss";

const ListLinks: React.FC = () => {
  const { dataArrayElements, loadingList, handlerChangeLink } =
    useListLinksController();

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
