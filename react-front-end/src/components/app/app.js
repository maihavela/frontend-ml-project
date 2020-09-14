import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from '../appRouter/appRouter';
import SearchBox from '../searchBox/searchBox'

const App = () => ( 
  <Router >      
      <SearchBox />
      <AppRouter />
  </Router>
)

export default App;
