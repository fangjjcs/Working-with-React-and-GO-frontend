import React,{ useState, useEffect, useRef } from "react";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { Button, Card, Paper} from "@material-ui/core";

import './HomePage.css';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import VisibilityIcon from '@material-ui/icons/Visibility';

const HomePage = (props) => {

    const [rowData, setRowData] = useState([]);
    const gridRef = useRef(null);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    useEffect(() => {
        const route = window.location.hash.split("#")[1]
        props.getHeader(route)
        fetchData()
    }, [])

    const fetchData = () => {
        fetch('https://www.ag-grid.com/example-assets/row-data.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData))
    }

    const onButtonClick = e => {
        console.log(gridRef)
        const selectedNodes = gridRef.current.api.getSelectedNodes()
        const selectedData = selectedNodes.map( node => node.data )
        const selectedDataStringPresentation = selectedData.map( node => `${node.make} ${node.model}`).join(', ')
        alert(`Selected nodes: ${selectedDataStringPresentation}`)
    }

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
      };

    const onBtnExport = () => {
        gridApi.exportDataAsCsv();
    };

    const cellRender = (props) => {
        const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
        const buttonClicked = () => {
            alert(`${cellValue} medals won!`)
        }
        return(
            <span>
                <a href="/">{cellValue}</a>&nbsp;
                <Button onClick={() => buttonClicked()}><VisibilityIcon/></Button>
            </span>
        )
    }

    return (
        <div>
            <header>
                <div className="title">{props.title}</div>
                <Paper elevation={3} className="paper" >
                    <div className="ag-theme-material" style={{height: 400, width: 600}}>
                        <Button onClick={onButtonClick}><CheckBoxIcon /></Button>
                        <Button onClick={() => onBtnExport()}> <CloudDownloadIcon/> </Button>
                        <AgGridReact
                            pagination={true}
                            paginationPageSize={10}
                            rowData={rowData} 
                            rowSelection="multiple" 
                            ref={gridRef} 
                            onGridReady={onGridReady}
                            frameworkComponents={{
                                cellRender: cellRender
                            }}>
                            <AgGridColumn checkboxSelection={true} sortable={ true } field="make"></AgGridColumn>
                            <AgGridColumn filter={ true } field="model"></AgGridColumn>
                            <AgGridColumn sortable={ true } field="price" cellRenderer="cellRender"></AgGridColumn>
                        </AgGridReact>
                    </div>
                </Paper>
            </header>
        </div>
    )
}

export default HomePage;