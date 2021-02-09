import React, { Component } from "react";
import { logout } from "../services/authService";

class ZabbixNavbar extends Component {
  constructor(props) {
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleGetHosts = this.handleGetHosts.bind(this);
  }

  handleLogOut = async () => {
    await logout();
    this.props.history.push("/");
  };

  handleGetHosts() {
    this.props.history.push("/hostGroups");
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand">Zabbix</a>

        {this.props.history.location.pathname !== "/" &&
          this.props.history.location.pathname !== "/hostGroups" && (
            <button
              type="button"
              className="btn btn-light"
              onClick={this.handleGetHosts}
            >
              Host Groups
            </button>
          )}

        {this.props.history.location.pathname !== "/" && (
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={this.handleLogOut}
          >
            Log out
          </button>
        )}
      </nav>
    );
  }
}

export default ZabbixNavbar;
