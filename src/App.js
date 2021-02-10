import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';


import Login from './components/Login';
import TableOfHostGroups from './components/TableOfHostGroups';
import Home from './components/Home';
import TableOfHosts from './components/TableOfHosts';
import Map from './components/Map';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';

import http from "./services/httpService";
import {  logoutUser } from './Utils/Common';

import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Button} from 'reactstrap';


function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [groupsId, setgroupsId] = useState([])
  const [hostsId, sethostsId] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoaded, setIsLoaded ] = useState(false)

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    http.get(`http://localhost:3000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);



  const handleHosts = (groups) => {
    let idsSelected = [];
    groups.map((group) => {
      return idsSelected.push(Number(group[Object.keys(group)[0]]));
    });
    setgroupsId(idsSelected);
  };

  const handleMap = (hosts) => {
    let idsSelected = [];
    hosts.map((host) => {
      return idsSelected.push(host[Object.keys(host)[0]]);
    });
    sethostsId(idsSelected);
  };

  const handleLogout = async() => {
    await logoutUser();
    removeUserSession();
    return (
      window.location.reload(false)
    )
  }

  const toggle = () => {
    if(isOpen){
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  const handleLoaded = () => {    
    setIsLoaded(true);
  }

  return (
    <div className="App">

      <BrowserRouter>

        <div>
          <Navbar color="dark"  light expand="md">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
                <NavLink style={{ color: 'white' }} exact activeClassName="active" className="m-2" to="/">Home</NavLink>
                <NavLink style={{ color: 'white' }} activeClassName="active" className="m-2" to="/login">Login</NavLink>
                <NavLink style={{ color: 'white' }} activeClassName="active" className="m-2" to="/host_groups">Host Groups</NavLink>
                
                
                <Nav className="ml-auto" navbar>
                    <NavItem>
                      {isLoaded && <Button className="btn btn-light" onClick={() => handleLogout()}>Logout</Button>}
                    </NavItem>
                  </Nav>
            </Collapse>
          </Navbar>
          
          

          <div className="container-fluid">
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/host_groups" component={(props) => (
                <TableOfHostGroups
                  {...props}
                  onSetLoaded={handleLoaded}
                  onGetHosts={handleHosts}
                ></TableOfHostGroups>
              )}
              />
              <PrivateRoute path="/hosts" component={(props) => (
                <TableOfHosts
                  {...props}
                  groupsId={groupsId}
                  onGetMap={handleMap}
                ></TableOfHosts>
              )}
              />
              <PrivateRoute path="/maps" component={(props) => (
                <Map {...props}
                  hostsId={hostsId}>
                </Map>
              )}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
