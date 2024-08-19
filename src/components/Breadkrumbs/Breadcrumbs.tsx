import Breadcrumb from "react-bootstrap/Breadcrumb";
import dataStore from "../../mobx/dataStore/DataStore";

function BreadcrumbExample() {
  return (
    <Breadcrumb>
      {dataStore.breadcrumbs.map((breadcrumb) => (
        <Breadcrumb.Item key={breadcrumb}>{breadcrumb}</Breadcrumb.Item>
      ))}
      {/* <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
        Library
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item> */}
    </Breadcrumb>
  );
}

export default BreadcrumbExample;
