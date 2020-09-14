import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Col, Row, Container } from "react-bootstrap";
import { searchProductById } from "../../actions/ProductsActions";
import { Ellipsis } from "react-css-spinners";
import "./productDetail.css";
import BreadcrumbCategories  from '../breadCrumb/breadCrumb';

class ProductDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProductById(id);
  }

  renderPrice = () => {
    const { product } = this.props;
    if (product) {
      let decimal =
        product.price.decimals < 10
          ? `0${product.price.decimals}`
          : `${product.price.decimals}`;
      return `$ ${product.price.amount}.${decimal}`;
    } else {
      return "";
    }
  };

  render() {
    const { loading, error, product } = this.props;
    if (loading) {
      return (
        <div className="spinner-container d-flex align-items-center justify-content-center">
          <Ellipsis color="#9c9c9c" size={35} />
        </div>
      );
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    if (product) {
      return (
        <Container>
          <div><BreadcrumbCategories /></div>
          <div className="product-container">
            <Row className="first-row">
              <Col className="first-col" lg={{ span: 8, offset: 2 }}>
                <img className="product-img" src={product.picture} />
              </Col>
              <Col className="thrid-col" lg={{ span: 3, offset: 1 }}>
                <p className="header-row">{`${product.condition} - ${product.sold_quantity} vendidos`}</p>
                <h3 className="title-row">{product.title}</h3>
                <h1 className="price-row">{this.renderPrice()}</h1>
                <Col className="button-col" lg={{ span: 12 }} md={{ span: 6 }}>
                  <Button className="button-row" variant="primary">
                    Comprar
                  </Button>
                </Col>
              </Col>
            </Row>
            <Row className="second-row">
              <Col className="thrid-col" lg={{ span: 7, offset: 2 }}>
                <h3 className="description-title">Descripcion del producto</h3>
                <p className="description-text">{product.description}</p>
              </Col>
            </Row>
          </div>
        </Container>
      );
    } else {
      return <div> No item </div>;
    }
  }
}

const mapStateToProps = (state) => ({
  loading: state.productsData.loading,
  error: state.productsData.error,
  product: state.productsData.product,
});

const mapDispatchToProps = (dispatch) => ({
  getProductById: (id) => dispatch(searchProductById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
