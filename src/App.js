import React, {useState} from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import MainNavigation from './shared/components/Navigation/MainNavigation';

import HomePage from './views/HomePage/HomePage';
import Page1 from './views/Page1/Page1';
import Page2 from './views/Page2/Page2';
import Page3 from './views/Page3/Page3';
import Page4 from './views/Page4/Page4';

const APP_CONFIG = {
  headerName: "Dashboard Name",
}

const links = [
  {to: "/", name: "Home Page", group: "Main"},
  {to: "/page1", name: "Page 1", group: "Main"},
  {to: "/page2", name: "Page 2", group: "Main"},
  {to: "/page3", name: "Page 3", group: "Others"},
  {to: "/page4", name: "Page 4", group: "Others"}
]

const App = () => {

  const route = window.location.hash.split("#")[1]
  const [selectedHeader, setSelectedHeader] = useState(links.find( link => link.to === route).name)
  
  const getHeaderHandler = (header) => {
    setSelectedHeader(links.find( link => link.to === header).name)
  }
  
  return (
    <Router>
      <MainNavigation config={APP_CONFIG} links={links} getHeader={getHeaderHandler} header={selectedHeader}/>
      <main>
        <Switch>
          <Route exact path="/">
            <HomePage title={`Home`} getHeader={getHeaderHandler}/>
          </Route>
          <Route exact path="/page1">
            <Page1 title={`Page 1`} getHeader={getHeaderHandler}/>
          </Route>
          <Route exact path="/page2">
            <Page2 title={`Page 2`} getHeader={getHeaderHandler}/>
          </Route>
          <Route exact path="/page3">
            <Page3 title={`Page 3`} getHeader={getHeaderHandler}/>
          </Route>
          <Route exact path="/page4">
            <Page4 title={`Page 4`} getHeader={getHeaderHandler}/>
          </Route>
          <Redirect to="/" />
        </Switch> 
      </main>
    </Router>
  )
}

export default App;