import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './appRouter.css';
import SearchResults from '../searchResults/searchResults.js';
import ProductDetail from '../productDetail/productDetail.js';

const AppRouter = () => (
    <div className="router-container"> 
      <Route exact path="/items" component={SearchResults} />
      <Route exact path="/items/:id" component={ProductDetail} />
    </div>
)

export default AppRouter
