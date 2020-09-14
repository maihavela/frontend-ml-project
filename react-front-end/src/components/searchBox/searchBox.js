import React, { Component } from "react";
import { Navbar, FormControl, Button } from "react-bootstrap";
import logoML from "../../assets/Logo_ML.png";
import logoSearch from "../../assets/ic_Search.png";
import "./searchBox.css";
import { withRouter } from "react-router-dom";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
  }

  onFormControlChange = (event) => {
    this.setState({ query: event.target.value });
  };

  onSearch = () => {    
    this.props.history.push(`/items?search=${this.state.query}`);
    this.props.history.go()
  }

  handleKeypress = e => {
    if (e.key === 'Enter') {
      this.onSearch();
    }
  };

  render() {
    return (
      <Navbar className="searchBar" bg="container">
        <div className="container d-inline-flex align-items-center">
        <Navbar.Brand href="/">
          <img
            src={logoML}
            className="d-inline-block LogoML"
            alt="React Bootstrap logo"
          />  
        </Navbar.Brand>
        <FormControl
          className="searchTextBot"
          placeholder="Nunca dejes de buscar"
          onKeyPress={this.handleKeypress}
          value={this.state.query || ''}
          onChange={this.onFormControlChange}          
        />
        <Button
          className="searchButton"
          variant="light"          
          onClick={this.onSearch}>
          <img src={logoSearch} className="" alt="React Bootstrap logo" />
        </Button>
        </div>
      </Navbar>
    );
  }
}

export default withRouter(SearchBox);