import React, {Component} from "react";
import {connect} from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
class Home extends Component {
    render() {

        const rows = [
            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 ,enable:"yes"},
            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 ,enable:"yes"},
            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 ,enable:"yes"},
            { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 ,enable:"yes"},
            { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null ,enable:"yes"},
            { id: 6, lastName: 'Melisandre', firstName: null, age: 150 ,enable:"yes"},
            { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, enable:"yes" },
            { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, enable:"yes" },
            { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, enable:"yes" },
        ];

        const columns = [
            { field: 'firstName', headerName: 'Full Name', width: 130 },
            { field: 'lastName', headerName: 'Display Name', width: 130 },
            { field: 'age', headerName: 'Short Name', width: 130 },
            { field: 'id', headerName: 'Code', width: 130 },
            { field: 'enable', headerName: 'Enabled', width: 130 },
        ];
        const paginationModel = { page: 0, pageSize: 5 };

        return (
            <Paper sx={{ height: 'auto', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>
        )
    }

    componentWillMount() {

    }
}

const mapStateToprops = (state) => {
    return {

    }
}
const mapDispatchToprops = (dispatch) => {
    return {

    }
}
export default connect(mapStateToprops, mapDispatchToprops)(Home);