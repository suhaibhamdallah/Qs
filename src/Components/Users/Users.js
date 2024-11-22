import * as React from 'react';
import PropTypes from 'prop-types';
import {DataGridPro, GridToolbar} from '@mui/x-data-grid-pro';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {makeStyles} from '@material-ui/styles';
import {createTheme} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {useDispatch, useSelector} from "react-redux";
import "react-h5-audio-player/lib/styles.css";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import AlertDialogSlide from "../UI/Modal/Modal";
import User from "./User/User";
import AddUser from "./AddUser/AddUser";

const defaultTheme = createTheme();
const useStylesAntDesign = makeStyles((theme) => ({
    root: {
        border: `1px solid ${theme.palette.type === 'light' ? '#f0f0f0' : '#303030'}`,
        color: theme.palette.type === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
        fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"',].join(','),
        WebkitFontSmoothing: 'auto',
        letterSpacing: 'normal',
        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: theme.palette.type === 'light' ? '#fafafa' : '#1d1d1d',
        },
        '& .MuiDataGrid-iconSeparator': {
            display: 'none',
        },
        '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
            borderRight: `1px solid ${theme.palette.type === 'light' ? '#f0f0f0' : '#303030'}`,
        },
        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
            borderBottom: `1px solid ${theme.palette.type === 'light' ? '#f0f0f0' : '#303030'}`,
        },
        '& .MuiDataGrid-cell': {
            color: theme.palette.type === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
            fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"',].join(','),
            WebkitFontSmoothing: 'auto',
            letterSpacing: 'normal',
            '& .MuiDataGrid-columnsContainer': {
                backgroundColor: theme.palette.type === 'light' ? '#fafafa' : '#1d1d1d',
            },
            '& .MuiDataGrid-iconSeparator': {
                display: 'none',
            },
            '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
                borderRight: `1px solid ${theme.palette.type === 'light' ? '#f0f0f0' : '#303030'}`,
            },
            '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
                borderBottom: `1px solid ${theme.palette.type === 'light' ? '#f0f0f0' : '#303030'}`,
            },
            '& .MuiDataGrid-cell': {
                color: theme.palette.type === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
            },
            '& .MuiPaginationItem-root': {
                borderRadius: 0,
            },
            '& .MuiCheckbox-root svg': {
                width: 16,
                height: 16,
                backgroundColor: 'transparent',
                border: `1px solid ${theme.palette.type === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'}`,
                borderRadius: 2,
            },
            '& .MuiCheckbox-root svg path': {
                display: 'none',
            },
            '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
                backgroundColor: '#1890ff', borderColor: '#1890ff',
            },
            '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
                position: 'absolute',
                display: 'table',
                border: '2px solid #fff',
                borderTop: 0,
                borderLeft: 0,
                transform: 'rotate(45deg) translate(-50%,-50%)',
                opacity: 1,
                transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
                content: '""',
                top: '50%',
                left: '39%',
                width: 5.71428571,
                height: 9.14285714,
            },
            '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
                width: 8, height: 8, backgroundColor: '#1890ff', transform: 'none', top: '39%', border: 0,
            },
        },
    },
}), {defaultTheme},);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex', flexDirection: 'column', height: 750, width: '100%', '& .MuiFormGroup-options': {
            alignItems: 'center', paddingBottom: theme.spacing(1), '& > div': {
                minWidth: 100, margin: theme.spacing(2, 2, 2, 0),
            },
        },
    }, root_pro: {
        '& > div:nth-child(2) > div:nth-child(3)': {
            display: "none !important"
        }, '& > div:nth-child(2) > div:nth-child(4)': {
            display: "none !important"
        }
    }
}), {defaultTheme},);

function SettingsPanel(props) {
    const {onApply, type, size, theme} = props;
    const [sizeState, setSize] = React.useState(size);
    const [typeState, setType] = React.useState(type);
    const [selectedPaginationValue, setSelectedPaginationValue] = React.useState(-1);
    const [activeTheme, setActiveTheme] = React.useState(theme);

    const handleSizeChange = React.useCallback((event) => {
        setSize(Number(event.target.value));
    }, []);

    const handleDatasetChange = React.useCallback((event) => {
        setType(event.target.value);
    }, []);

    const handlePaginationChange = React.useCallback((event) => {
        setSelectedPaginationValue(event.target.value);
    }, []);

    const handleThemeChange = React.useCallback((event) => {
        setActiveTheme(event.target.value);
    }, []);

    const handleApplyChanges = React.useCallback(() => {
        onApply({
            size: sizeState, type: typeState, pagesize: selectedPaginationValue, theme: activeTheme,
        });
    }, [sizeState, typeState, selectedPaginationValue, activeTheme, onApply]);

    return (<FormGroup className="MuiFormGroup-options" row>
        <FormControl variant="standard">
            <InputLabel>Dataset</InputLabel>
            <Select value={typeState} onChange={handleDatasetChange}>
                <MenuItem value="Employee">Employee</MenuItem>
                <MenuItem value="Commodity">Commodity</MenuItem>
            </Select>
        </FormControl>
        <FormControl variant="standard">
            <InputLabel>Rows</InputLabel>
            <Select value={sizeState} onChange={handleSizeChange}>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
                <MenuItem value={10000}>{Number(10000).toLocaleString()}</MenuItem>
                <MenuItem value={100000}>{Number(100000).toLocaleString()}</MenuItem>
            </Select>
        </FormControl>
        <FormControl variant="standard">
            <InputLabel>Page Size</InputLabel>
            <Select value={selectedPaginationValue} onChange={handlePaginationChange}>
                <MenuItem value={-1}>off</MenuItem>
                <MenuItem value={0}>auto</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
            </Select>
        </FormControl>
        <FormControl variant="standard">
            <InputLabel>Theme</InputLabel>
            <Select value={activeTheme} onChange={handleThemeChange}>
                <MenuItem value="default">Default Theme</MenuItem>
                <MenuItem value="ant">Ant Design</MenuItem>
            </Select>
        </FormControl>
        <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={handleApplyChanges}
        >
            <KeyboardArrowRightIcon fontSize="small"/> Apply
        </Button>
    </FormGroup>);
}

SettingsPanel.propTypes = {
    onApply: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    theme: PropTypes.oneOf(['ant', 'default']).isRequired,
    type: PropTypes.oneOf(['Commodity', 'Employee']).isRequired,
};

export default function FullFeaturedDemo() {
    const dispatchExt = useDispatch();
    const classes = useStyles();
    const antDesignClasses = useStylesAntDesign();
    const [isAntDesign, setIsAntDesign] = React.useState(false);
    const [type, setType] = React.useState('Commodity');
    const [size, setSize] = React.useState(100);
    const baseSetup = useSelector((state) => state);
    let rowsData = baseSetup.user.users;

    const [popupProps, setPopupProps] = React.useState({
        content: "", type: "", audio: "", active: false, title: ""
    });
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
            let _row = baseSetup.user.users.filter((key) => (key.id === cellValues.row.id));
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
    React.useEffect(() => {
        // setRows(baseSetup.extension.extensions);
        rowsData = baseSetup.user.users;
        if (baseSetup.user.updatedUser || baseSetup.user.addedUser) {
            hidePopup();
        }
    }, [baseSetup.user.addedUser, baseSetup.user.updatedUser]);

    const showPopup = (props) => setPopupProps({...popupProps, active: true, ...props});
    const hidePopup = () => setPopupProps({...popupProps, active: false, audio: ""});
    // const { loading, data, setRowLength, loadNewData } = useDemoData({
    //     dataSet: type,
    //     rowLength: size,
    //     maxColumns: 40,
    //     editable: true,
    // });


    const [pagination, setPagination] = React.useState({
        pagination: false, autoPageSize: false, pageSize: undefined,
    });

    const getActiveTheme = () => {
        return isAntDesign ? 'ant' : 'default';
    };

    const handleApplyClick = (settings) => {
        if (size !== settings.size) {
            setSize(settings.size);
        }

        if (type !== settings.type) {
            setType(settings.type);
        }

        if (getActiveTheme() !== settings.theme) {
            setIsAntDesign(!isAntDesign);
        }

        // if (size !== settings.size || type !== settings.type) {
        //     setRowLength(settings.size);
        //     loadNewData();
        // }

        const newPaginationSettings = {
            pagination: settings.pagesize !== -1,
            autoPageSize: settings.pagesize === 0,
            pageSize: settings.pagesize > 0 ? settings.pagesize : undefined,
        };

        setPagination((currentPaginationSettings) => {
            if (currentPaginationSettings.pagination === newPaginationSettings.pagination && currentPaginationSettings.autoPageSize === newPaginationSettings.autoPageSize && currentPaginationSettings.pageSize === newPaginationSettings.pageSize) {
                return currentPaginationSettings;
            }
            return newPaginationSettings;
        });
    };
    const classesGridPrp = [isAntDesign ? antDesignClasses.root : undefined, classes.root_pro];
    const popupContent = () => {
        const _didsArr = [];
        switch (popupProps.component) {
            case "update":
                const _item = baseSetup.user.users.filter((el) => el.id == popupProps.id)[0];
                let _jsx = <User onCanceled={hidePopup} item={_item} dids={_didsArr} toggleFormValid={(status) => {
                }} updateHandler={(data) => {
                    const roles = baseSetup.baseSetup().roles;
                }}/>;
                if (typeof _item == "undefined") {
                    _jsx = null;
                }
                return _jsx;
            case "add":
                const roles = baseSetup.baseSetup().roles;
                return (<AddUser roles={roles} dids={_didsArr} onCanceled={hidePopup} addHandler={(data) => {
                }}/>)
        }
        return null;
    };
    return (

        <div className={classes.root}>
            <div className="page_title">
                Users Settings
            </div>
            <div>
                <Button variant="contained" size="medium" color="primary" style={{marginBottom: "20px"}}
                        onClick={() => showPopup({
                            title: "Add User", component: "add"
                        })}>
                    Add User
                </Button>
            </div>
            <SettingsPanel
                onApply={handleApplyClick}
                size={size}
                type={type}
                theme={getActiveTheme()}
            />
            <DataGridPro
                className={classesGridPrp.join(" ")}
                columns={_columns}
                rows={rowsData}
                components={{
                    Toolbar: GridToolbar,
                }}
                loading={baseSetup.user.loading}
                checkboxSelection
                disableSelectionOnClick
                {...pagination}
            />
            <AlertDialogSlide onCanceled={hidePopup} content={popupContent} active={popupProps.active}
                              title={popupProps.title}/>
        </div>
    );
}