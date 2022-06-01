import "./App.css";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios("http://localhost:3000/employees").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };
  const dateFormatter = (data, row) => {
    return <>Date={data}</>;
  };
  const columns = [
    {
      dataField: "created",
      text: "Created Date",
      sort: true,
      formatter: dateFormatter,
    },
    {
      dataField: "identifier",
      text: "Identifier",
      filter: textFilter(),
      sort: true,
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "Invalid",
          };
        }
        return true;
      },
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "display_count",
      text: "Display Count",
      sort: true,
    },
    {
      dataField: "offer_type",
      text: "Offer Type",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
    },
  ];
  return (
    <div className="App">
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
        striped
        hover
        condensed
        pagination={paginationFactory()}
        cellEdit={cellEditFactory({
          mode: "click",
        })}
        filter={filterFactory()}
      />
    </div>
  );
}

export default App;
