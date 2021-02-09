import React, { Component } from "react";
import DataTable from "react-data-table-component";

import { getHostGroups } from "../services/authService";

import {  logoutUser } from '../Utils/Common';


import {  removeUserSession } from '../Utils/Common';

class TableOfHostGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      rowsSelected: [],
      isLoaded: false,
    };

    this.columns = [
      {
        name: "Name",
        selector: "name",
        sortable: true,
      },
      {
        name: "Internal",
        selector: "internal",
        sortable: true,
      },
      {
        name: "Flags",
        selector: "flags",
        sortable: true,
      },
    ];

    this.handleChange = this.handleChange.bind(this);
    this.handleGetHosts = this.handleGetHosts.bind(this);
  }


  
  async componentDidMount() {
    try {
      const { data: post } = await getHostGroups();
      this.setState({ items: post });
      this.setState({ isLoaded: true });
    } catch (error) {
      this.props.history.push("/");
    }
  }

    // handle click event of logout button
    handleLogout = async() => {
      await logoutUser();
      removeUserSession();
      this.props.history.push('/login');
    }
  

  handleChange = (selectedRows) => {
    this.setState({ rowsSelected: selectedRows });
  };

  handleGetHosts = () => {
    this.props.history.push("/hosts");
    this.props.onGetHosts(this.state.rowsSelected);
  };

  render() {
    if (!this.state.isLoaded) {
      return <div><input type="button" onClick={this.handleLogout} value="Logout" />Loading...</div>;
    } else {
      return (
        <div className="container">
          <input type="button" onClick={this.handleLogout} value="Logout" />
          <DataTable
            title={"HOST GROUPS"}
            columns={this.columns}
            data={this.state.items}
            selectableRows
            onSelectedRowsChange={(state) =>
              this.handleChange(state.selectedRows)
            }
            highlightOnHover
          />

          <div className="container mt-5 mb-2">
            <div className="row">
              <div className="col"></div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={this.handleGetHosts}
                >
                  GET HOSTS
                </button>
              </div>
              <div className="col"></div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default TableOfHostGroups;
