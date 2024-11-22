import React from "react";
import classes from "./Input.module.css"
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const Input = (props) => {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
    const checkedIcon = <CheckBoxIcon fontSize="small"/>;

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1), minWidth: 120,
        }, selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const classes2 = useStyles();
    // const InputElementClasses = [classes.InputElement];
    const InputElementClasses = [classes.InputElement];
    if (!props.valid && props.shouldValidate && props.touched) {
        InputElementClasses.push(classes.Invalid);
    }
    if (props.noMargin) {
        InputElementClasses.push(classes.n_m);
    }

    let inputElement = null;
    switch (props.elementType) {
        case "input":
            inputElement = props.err ? <TextField value={props.value} onChange={props.changed} {...props.elementConfig}
                                                  className={InputElementClasses.join(" ")} id="outlined-basic"
                                                  label={props.label} error
                                                  variant="outlined" helperText={props.err}/> :
                <TextField value={props.value} onChange={props.changed} {...props.elementConfig}
                           className={InputElementClasses.join(" ")} id="outlined-basic" label={props.label}
                           variant="outlined"/>

            // <input className={InputElementClasses.join(" ")} onChange={props.changed} {...props.elementConfig}
            //        value={props.value}/>;
            break;
        case "textarea":
            inputElement =
                <textarea className={InputElementClasses.join(" ")} onChange={props.changed}  {...props.elementConfig}
                          value={props.value}/>;
            break;
        case "select":
            inputElement = <Autocomplete
                id="combo-box-demo"
                options={props.elementConfig.options}
                getOptionLabel={(option) => option.key}
                style={{width: 300}}
                onInputChange={(event, newInputValue) => event ? props.changed(event, newInputValue) : null}
                label="test"
                value={{key: props.value, value: props.value}}
                renderInput={(params) => props.err ?
                    <TextField {...params} label={props.label} variant="outlined" helperText={props.err} error/> :
                    <TextField {...params} label={props.label} variant="outlined"/>}
            />
            break;
        case "switch":
            inputElement = <FormControlLabel
                control={<Switch
                    checked={props.value}
                    onChange={props.changed}
                    name="checkedB"
                    color="primary"
                    value={props.value}
                />}
                label={props.label}
            />
            break;
        case "dummy":
            inputElement = null
            break;
        case "multible_select":
            const _ext_values = props.value ? props.value.map((ex) => ex.value) : [];
            const filtered_arr = props.value ? props.elementConfig.options.filter((el) => _ext_values.includes(el.value)) : []
            inputElement = <Autocomplete
                multiple
                options={props.elementConfig.options}
                onChange={(event, newInputValue) => event ? props.changed(event, newInputValue) : null}
                disableCloseOnSelect
                defaultValue={filtered_arr}
                getOptionLabel={(option) => option.key}
                getoptionselected={(option, value) => option.id === value.id}
                renderOption={(props, option, {selected}) => (<li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{marginRight: 8}}
                        checked={selected}
                    />
                    {option.key}
                </li>)}
                style={{width: 500}}
                renderInput={(params) => (<TextField {...params} label={props.label} placeholder={props.label}/>)}
            />
            break;
            case "multible_select_2":
            const _ext_values_2 = props.value ? props.value.map((ex) => ex.value) : [];
            const filtered_arr_2 = props.value ? props.elementConfig.options.filter((el) => _ext_values_2.includes(el.value)) : []
            inputElement = <Autocomplete
                multiple
                options={props.elementConfig.options}
                onChange={(event, newInputValue) => event ? props.changed(event, newInputValue) : null}
                disableCloseOnSelect
                defaultValue={filtered_arr_2}
                getOptionLabel={(option) => option.key}
                getoptionselected={(option, value) => option.id === value.id}
                renderOption={(props, option, {selected}) => (<li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{marginRight: 8}}
                        checked={selected}
                    />
                    {option.key}
                </li>)}
                style={{width: 500}}
                renderInput={(params) => (<TextField {...params} label={props.label} placeholder={props.label}/>)}
            />
            break;
        default:
            inputElement =
                <input className={InputElementClasses.join(" ")} onChange={props.changed}  {...props.elementConfig}
                       value={props.value}/>;
            break;
    }
    const InputElementClassesWrapper = [classes.input_wrapper]
    switch (props.width) {
        case "full":
            InputElementClassesWrapper.push(classes.full_width);
            break;
        case "half":
            InputElementClassesWrapper.push(classes.half_width);
            break;
    }
    if (props.m_b) {
        InputElementClassesWrapper.push(classes.m_b);
    }
    if (props.n_m_l) {
        InputElementClassesWrapper.push(classes.n_m_l);
    }
    if (props.p_l_n) {
        InputElementClassesWrapper.push(classes.p_l_n);
    }
    let _labelBefore = null;
    if (props.elementConfig.labelBefore) {
        InputElementClassesWrapper.push(classes.with_label);
        _labelBefore=<div className={classes.label_before}>
            {props.elementConfig.labelBefore}
        </div>
    }

    return (

        inputElement ? <div className={InputElementClassesWrapper.join(" ")}>

            {/*<label className={classes.Label} htmlFor="">{props.label}</label>*/}
            {/*{props.label ? <InputLabel htmlFor="age-native-simple">{props.label}</InputLabel> : null}*/}
            {_labelBefore}
            {inputElement}
            {props.children}
        </div> : null


    );


};

export default Input;
