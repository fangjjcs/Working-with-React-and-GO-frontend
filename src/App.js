import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Footer from './shared/components/Footer/Footer';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const APP_CONFIG = {
  headerName: "Template Header",
  
}
const App = () => {
  return (
    <Router>
      <MainNavigation config={APP_CONFIG}/>
      <main>
        <Switch>
          <Route></Route>
        </Switch> 
      </main>
      
    </Router>
  )
}

export default App;