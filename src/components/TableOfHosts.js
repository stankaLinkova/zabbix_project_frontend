import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { getHosts } from "../services/authService";

class TableOfHosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      rowsSelected: [],
      isLoaded: false,
      errorMessage: "",
    };

    this.columns = [
      {
        name: "Host",
        selector: "host",
        sortable: true,
      },
      {
        name: "The Map",
        selector: "map_link",
        sortable: true,
        cell: (row) => <a href={row.map_link}>{row.map_link}</a>,
      },
      {
        name: "Name",
        selector: "name",
        sortable: true,
      },
    ];

    this.handleChange = this.handleChange.bind(this);
    this.handleMaps = this.handleMaps.bind(this);
  }

  async componentDidMount() {
    try {
      const { data: post } = await getHosts(this.props.groupsId);
      this.setState({ items: post });
      this.setState({ isLoaded: true });
    } catch (error) {
      this.props.history.push("/");
    }
  }

  handleChange = (selectedRows) => {
    this.setState({ rowsSelected: selectedRows });
  };

  handleMaps = () => {
    if (this.state.rowsSelected.length === 0) {
      this.setState({
        errorMessage: "You didn't choose any host or there are no records!",
      });
    } else {
      this.props.history.push("/maps");
      this.props.onGetMap(this.state.rowsSelected);
    }
  };

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <DataTable
            columns={this.columns}
            data={this.state.items}
            selectableRows
            onSelectedRowsChange={(state) =>
              this.handleChange(state.selectedRows)
            }
            highlightOnHover
          />

          {this.state.errorMessage && (
            <div className="alert alert-warning mt-3" role="alert">
              {this.state.errorMessage}
            </div>
          )}

          <div className="container mt-5">
            <div className="row">
              <div className="col"></div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={this.handleMaps}
                >
                  GET A MAP
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

export default TableOfHosts;
