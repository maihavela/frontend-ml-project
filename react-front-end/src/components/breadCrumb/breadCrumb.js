import React, { Component } from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import './breadCrumb.css'

class BreadcrumbCategories extends Component {
  render() {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="">Library</Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}
export default BreadcrumbCategories;
