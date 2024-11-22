import * as React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {
    DataGrid, GridToolbarDensitySelector, GridToolbarFilterButton, GridOverlay
} from '@mui/x-data-grid';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import {createTheme} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/styles';
import AlertDialogSlide from "../UI/Modal/Modal"
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {useSelector, useDispatch} from 'react-redux'
import * as userActions from '../../store/actions/user'
import * as pbxSetupActions from '../../store/actions/pbxSetup'
import {updateExtension} from "../../store/actions/extension";
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import AddUser from "./AddUser/AddUser";
import User from "./User/User";

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const defaultTheme = createTheme();
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    }, textField: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }, margin: theme.spacing(1, 0.5, 1.5), '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(0.5),
        }, '& .MuiInput-underline:before': {
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
    },
}), {defaultTheme});


function QuickSearchToolbar(props) {
    const classes = useStyles();

    return (<div className={classes.root}>
        <div>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
        </div>
        <TextField
            variant="standard"
            value={props.value}
            onChange={props.onChange}
            placeholder="Search…"
            className={classes.textField}
            InputProps={{
                startAdornment: <SearchIcon fontSize="small"/>, endAdornment: (<IconButton
                    title="Clear"
                    aria-label="Clear"
                    size="small"
                    style={{visibility: props.value ? 'visible' : 'hidden'}}
                    onClick={props.clearSearch}
                >
                    <ClearIcon fontSize="small"/>
                </IconButton>),
            }}
        />
    </div>);
}

QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired, onChange: PropTypes.func.isRequired, value: PropTypes.string.isRequired,
};
let rowsData = null;
export default function QuickFilteringGrid() {
    const dispatchExt = useDispatch();
    const pbxSetup = useSelector((state) => state);
    const [rows, setRows] = React.useState([]);
    const [searchText, setSearchText] = React.useState('');
    const [formValid, setFormValid] = React.useState(false);
    const [popupProps, setPopupProps] = React.useState({
        content: "", type: "", audio: "", active: false, title: "", id: "", component: ""
    });
    const hidePopup = () => setPopupProps({...popupProps, active: false, audio: ""});
    const showPopup = (props) => setPopupProps({...popupProps, active: true, ...props});
    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');

        const filteredRows = pbxSetup.user.users.filter((row) => {

            return Object.keys(row).some((field) => {
                return row[field] ? searchRegex.test(row[field].toString()) : "";
            });
        });
        !searchValue ? setRows({rowsData:rowsData,search:0}) : setRows({rowsData:filteredRows,search:1})

    };
    React.useEffect(() => {
        // setRows(pbxSetup.extension.extensions);
        dispatchExt(userActions.usersInit(pbxSetup.auth.token));
        dispatchExt(pbxSetupActions.rolesInit(pbxSetup.auth.token));
        rowsData = pbxSetup.user.users;
        if (pbxSetup.user.updatedUser || pbxSetup.user.addedUser) {
            hidePopup();
        }
    }, [pbxSetup.user.addedUser, pbxSetup.user.updatedUser]);
    // const _extensions = useSelector((state) => state.setupPbx)
    let _columns = [{
        field: "id", headerName: "id", width: "200", hide: true
    }, {
        field: "status", headerName: "Status", width: "200",
    }, {
        field: "username", headerName: "Name", width: "150",
    }, {
        field: "role", headerName: "Role Name", width: "150",
    }, {
        field: "f_name", headerName: "First Name", width: "170",
    }, {
        field: "l_name", headerName: "Last Name", hide: false,
    }, {
        field: "email", headerName: "Email", hide: false, width: "170",
    }, {
        field: "actions", headerName: "Actions", renderCell: (cellValues) => {
            let _row = pbxSetup.user.users.filter((key) => (key.id === cellValues.row.id));
            return (<div>
                <IconButton
                    color="inherit"
                    // className={classes.textPrimary}
                    size="small"
                    aria-label="edit"
                    onClick={() => showPopup({
                        title: `Edit User  ${_row[0].username}`, id: _row[0].id, component: "update"
                    })}
                >
                    <EditIcon fontSize="small"/>
                </IconButton>
                {/*<IconButton*/}
                {/*    color="inherit"*/}
                {/*    size="small"*/}
                {/*    aria-label="delete"*/}
                {/*    // onClick={handleDeleteClick}*/}
                {/*>*/}
                {/*    <DeleteIcon fontSize="small"/>*/}
                {/*</IconButton>*/}
            </div>);
        }
    }]

    function CustomLoadingOverlay() {
        return (<GridOverlay>
            <div style={{position: 'absolute', top: 0, width: '100%'}}>
                <LinearProgress/>
            </div>
        </GridOverlay>);
    }

    const popupContent = () => {
        const _didsArr = [];
        pbxSetup.setupPbx.dids.map((_item) => {
            _didsArr.push({value: _item.did, key: _item.did});
        })
        switch (popupProps.component) {
            case "update":
                const _item = pbxSetup.user.users.filter((el) => el.id == popupProps.id)[0];
                let _jsx = <User onCanceled={hidePopup} item={_item} dids={_didsArr} toggleFormValid={(status) => {
                }} updateHandler={(data) => {
                    const roles = pbxSetup.setupPbx.roles;
                    dispatchExt(userActions.updateUser(data, roles,pbxSetup.auth.token));
                }}/>;
                if (typeof _item == "undefined") {
                    _jsx = null;
                }
                return _jsx;
            case "add":
                const roles = pbxSetup.setupPbx.roles;
                return (<AddUser roles={roles} dids={_didsArr} onCanceled={hidePopup} addHandler={(data) => {
                    dispatchExt(userActions.addUser(data, roles,pbxSetup.auth.token));
                }}/>)
        }
        return null;
    };
    return (<div className="table_wrapper">
        <Button variant="contained" size="medium" color="primary" style={{marginBottom: "20px"}}
                onClick={() => showPopup({
                    title: "Add User", component: "add"
                })}>
            Add User
        </Button>
        <DataGrid
            components={{Toolbar: QuickSearchToolbar, LoadingOverlay: CustomLoadingOverlay}}
            rows={rows.search?rows.rowsData:pbxSetup.user.users}
            autoPageSize={50}
            columns={_columns}
            componentsProps={{
                toolbar: {
                    value: searchText,
                    onChange: (event) => requestSearch(event.target.value),
                    clearSearch: () => requestSearch(''),
                },
            }}
        />
        <AlertDialogSlide max_width="md" onCanceled={hidePopup} content={popupContent} active={popupProps.active}
                          title={popupProps.title}/>
    </div>);
}