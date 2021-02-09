import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { getMaps } from "../services/authService";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      mapExists: false,
    };

    this.columns = [
      {
        name: "The links to the maps",
        cell: (row) => <a href={row.link}>{row.link}</a>,
      },
    ];

    this.handleMapExists = this.handleMapExists.bind(this);
  }

  async componentDidMount() {
    try {
      let { data: post } = await getMaps(this.props.hostsId);
      const test = post[0].error;
      if (test === undefined) {
        post = post.map((str) => ({ link: str }));
        this.setState({ items: post });
        this.setState({ isLoaded: true });
      } else {
        this.setState({ mapExists: true });
      }
    } catch (err) {
      this.props.history.push("/");
    }
  }

  handleMapExists() {
    this.props.history.push("/hosts");
  }

  render() {
    if (this.state.mapExists) {
      return (
        <div>
          <div> THE MAP ALREADY EXISTS!</div>
          <button
            type="button"
            className="btn btn-secondary m-2"
            onClick={this.handleMapExists}
          >
            Go back!
          </button>
        </div>
      );
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <DataTable
            columns={this.columns}
            data={this.state.items}
            highlightOnHover
          />
        </div>
      );
    }
  }
}

export default Map;
