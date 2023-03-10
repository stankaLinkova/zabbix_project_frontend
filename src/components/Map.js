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
        name: "THE LINKS TO THE MAPS",
        cell: (row) => row.map_link ? <div>{row.map_name} <a href={row.map_link}>{row.map_link}</a></div> : <a>{row}</a>
      },
    ];

    this.handleMapExists = this.handleMapExists.bind(this);
  }

  async componentDidMount() {
    try {
      let { data: post } = await getMaps(this.props.hostsId);
      const test = post[0].error;
      this.setState({ items: post });
      this.setState({ isLoaded: true });


    } catch (err) {
      this.props.history.push("/");
    }
  }


  handleMapExists() {
    this.props.history.push("/hosts");
  }

  handleItems() {
    let maps = [];
    let items = this.state.items;
    for (let index = 0; index < items.length; index++) {
      if (items[index].error === undefined) {
        maps.push(items[index]);
      } else {
        maps.push(items[index].error.on_rpc.params.name + "; " + items[index].error.message + "; " + items[index].error.on_rpc.method);
      }
    }
    return maps;
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <DataTable
            columns={this.columns}
            data={this.handleItems()}
            highlightOnHover
          />
        </div>
      );
    }
  }
}

export default Map;
