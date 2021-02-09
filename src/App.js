import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';


import Login from './components/Login';
import TableOfHostGroups from './components/TableOfHostGroups';
import Home from './components/Home';
import TableOfHosts from './components/TableOfHosts';
import Map from './components/Map';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';

import http from "./services/httpService";


function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [groupsId, setgroupsId] = useState([])
  const [hostsId, sethostsId] = useState([])

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

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  const handleHosts = (groups) => {
    let idsSelected = [];
    console.log(idsSelected);
    groups.map((group) => {
      return idsSelected.push(Number(group[Object.keys(group)[0]]));
    });
    setgroupsId(idsSelected);
  };

  const handleMap = (hosts) => {
    let idsSelected = [];
    console.log(idsSelected);
    hosts.map((host) => {
      return idsSelected.push(host[Object.keys(host)[0]]);
    });
    sethostsId(idsSelected);
  };





  return (
    <div className="App">

      <BrowserRouter>

        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* <a class="navbar-brand" href="#">Navbar</a> */}

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <div className="nav-link"><NavLink style={{ color: 'white' }} exact activeClassName="active" to="/">Home</NavLink></div>
                </li>
                <li className="nav-item">
                  <div className="nav-link"><NavLink style={{ color: 'white' }} activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small></div>
                </li>
                <li className="nav-item">
                  <div className="nav-link"><NavLink style={{ color: 'white' }} activeClassName="active" to="/host_groups">Host Groups</NavLink><small>(Access with token only)</small></div>
                </li>
              </ul>
            </div>
          </nav>




          <div className="container-fluid">
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/host_groups" component={(props) => (
                <TableOfHostGroups
                  {...props}
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
