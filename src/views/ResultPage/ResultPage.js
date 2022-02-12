import { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom/";
import { Box, Button, Paper } from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
// import VisibilityIcon from "@material-ui/icons/Visibility";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { AccountCircle } from "@material-ui/icons";
import Password from "@material-ui/icons/VpnKey";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import "./ResultPage.css";
import { useHttpClient } from "../../shared/hook/http-hook";
import AuthContext from "../../shared/context/auth-context";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#005566",
      darker: "#005566",
    },
  },
});

const LoginPage = (props) => {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const { isLoading, error, sendRequest } = useHttpClient();
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const header = new Headers();
  header.append("Content-Type", "application/json");
  header.append("Authorization", "Bearer " + authContext.token);

  useEffect(() => {
    fetchResult();
  }, []);

  useEffect(() => {
    console.log(rowData)
  }, [rowData]);

  const fetchResult = () => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4000/get-all-order",
          "POST",
          JSON.stringify({}),
          header
        );

        console.log(responseData);
        if (responseData.status !== 200) {
          authContext.setSuccess("有地方出錯了!");
          history.replace("/");
        } else {
          setRowData([...responseData.orders,{
              id: 100,
              menuId: 100,
              name: "--",
              type: "--",
              item: "--",
              sugar: "--",
              ice: "--",
              price: sumAllSum(responseData.orders)[0],
              memo: "--",
              count: sumAllSum(responseData.orders)[1],
              user: "總價",
              updated_at: "--"
          } ]);
        }
      } catch (err) {
        // done in http-hook.js
      }
    };
    fetchData();
  };

  const sumAllSum = (orders) => {
    let sumPrice = 0
    let sumCount = 0
    for(let i = 0 ; i < orders.length ; i++) {
        sumPrice += parseInt(orders[i].price)
        sumCount += parseInt(orders[i].count)
    }
    return [sumPrice, sumCount]
  }

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };
  const onBtnExport = () => {
    gridApi.exportDataAsCsv();
  };

  const [columnDefs, setColumnDefs] = useState([
    { field: "user", width: 120 },
    { field: "name", width: 120 },
    { field: "item", minWidth: 120, maxWidth: 150 },
    { field: "sugar", width: 120 },
    { field: "ice", width: 120 },
    { field: "memo", width: 120 },
    { field: "count", width: 120 },
    { field: "price", width: 120 },
  ]);

  const cellRender = (props) => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    const buttonClicked = () => {
        alert(`${cellValue} medals won!`)
    }
    return(
        <span>
            <a href="/">{cellValue}</a>&nbsp;
            <Button onClick={() => buttonClicked()}><EditRoundedIcon/></Button>
        </span>
    )
}

const rowClass = 'my-ag-row';

  return (
    <header className="result-page-header">
      <ThemeProvider theme={theme}>
        <Box className="result-page-box">
          <Paper elevation={3} className="paper">
            <div
              className="ag-theme-material"
              style={{ height:1000, width: 1000 }}
            >
              <Button onClick={() => onBtnExport()}>
                {" "}
                <CloudDownloadIcon />{" "}
              </Button>
              <AgGridReact
                pagination={true}
                paginationPageSize={15}
                rowData={rowData}
                rowSelection="multiple"
                ref={gridRef}
                onGridReady={onGridReady}
                frameworkComponents={{
                    cellRender: cellRender
                }}
                rowClass={rowClass}
              >
                <AgGridColumn sortable={ true } filter={true} field="user" width={100}></AgGridColumn>
                <AgGridColumn sortable={ true } filter={true} field="name" width={120}></AgGridColumn>
                <AgGridColumn sortable={ true } filter={true} field="item" minWidth={130} maxWidth={150}></AgGridColumn>
                <AgGridColumn sortable={ true } filter={true} field="sugar" width={100}></AgGridColumn>
                <AgGridColumn sortable={ true } filter={true} field="ice" width={100}></AgGridColumn>
                <AgGridColumn sortable={ true } filter={true} field="memo" width={120}></AgGridColumn>
                <AgGridColumn sortable={ true } filter={true} field="count" width={120}></AgGridColumn>
                <AgGridColumn sortable={ true } filter={true} field="price" width={100}></AgGridColumn>
                <AgGridColumn field="編輯" width={150} cellRenderer="cellRender"></AgGridColumn>
              </AgGridReact>
            </div>
          </Paper>
        </Box>
      </ThemeProvider>
    </header>
  );
};

export default LoginPage;
