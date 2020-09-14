import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./productCard.css";
import { withRouter } from "react-router-dom";

class ProductCard extends Component {

  clickHandler = () => {    
    this.props.history.push(`/items/${this.props.id}`);    
  }

  render() {
    return (
      <Container className="productcard-container">
        <Row>
          <Col lg={{ span: 3 }}>
            <img
              onClick={this.clickHandler}
              className="img-item"
              src={this.props.img}
              alt="Mercado Libre"
            />
          </Col>
          <Col lg={{ span: 6 }}>
            <p className="price-text">${this.props.price}</p>
            <p className="title-text" onClick={this.clickHandler}>{this.props.description}</p>
          </Col>
          <Col lg={{ span: 2, offset: 1 }} className="location-text">
            <p>Capital federal</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(ProductCard);
