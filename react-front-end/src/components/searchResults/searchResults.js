import React, { Component } from "react";
import { Container } from "react-bootstrap";
import ProductCard from "../productCard/productCard";
import { connect } from "react-redux";
import { searchProducts } from "../../actions/ProductsActions";
import BreadcrumbCategories  from '../breadCrumb/breadCrumb';
import { Ellipsis } from "react-css-spinners";
import "./searchResults.css";
const queryString = require("query-string");

class SearchResult extends Component {
  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    this.props.getProducts(parsed.search);
  }

  renderProducts = () => {
    const { products } = this.props;
    if (products.length > 0) {
      return products.map((product) => (
        <ProductCard
          id={product.id}
          img={product.picture}
          price={product.price.amount}
          description={product.title}
          location={product.location}
        ></ProductCard>
      ));
    }
  };

  render() {
    const { loading, error } = this.props;
    
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

    return (
      <Container className="first-container">
        <div><BreadcrumbCategories /></div>
        <div className="searchresult-container">{this.renderProducts()}</div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.productsData.loading,
  error: state.productsData.error,
  products: state.productsData.products,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: (query) => dispatch(searchProducts(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
