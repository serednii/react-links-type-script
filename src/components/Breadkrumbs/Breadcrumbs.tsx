import Breadcrumb from "react-bootstrap/Breadcrumb";
import dataStore from "../../mobx/DataStore";

function BreadcrumbExample() {
  console.log("BreadcrumbExample");
  return (
    <Breadcrumb>
      {dataStore.breadcrumbs.map((breadcrumb) => (
        <Breadcrumb.Item key={breadcrumb}>{breadcrumb}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default BreadcrumbExample;
