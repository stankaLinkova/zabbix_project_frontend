import React, { Component } from "react";
import DataTable from "react-data-table-component";

import { getHostGroups } from "../services/authService";

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
    ];

    this.handleChange = this.handleChange.bind(this);
    this.handleGetHosts = this.handleGetHosts.bind(this);
  }


  
  async componentDidMount() {
    try {
      const { data: post } = await getHostGroups();
      this.setState({ items: post });
      this.setState({ isLoaded: true });
      this.props.onSetLoaded();
    } catch (error) {
      this.props.history.push("/");
    }
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
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
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
