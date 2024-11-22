import React from "react";
import {Component} from "react";
import Input from "../../UI/Input/Input";
import {inputChangeHandler} from "../../../shared/utility";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import * as authActions from "../../../store/actions/auth";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import {authInstance} from "../../../baseAxios";

class AccountEdit extends Component {

    getGroupsArr = () => {
        let groupArr = [];
        if (this.props.groups) {
            groupArr = this.props.groups.map((group) => ({value: group.id, key: group.name}));
        }
        return groupArr;
    }

    state = {
        isFormValid: false, updateForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', placeholder: 'name'
                },
                validation: {
                    required: true,
                },
                isValid: true,
                touched: true,
                value: this.props.user.username,
                forLogin: false,
                label: "Name",
                validationErr: "",
                noMargin: true,
                margin_b: "15px",
                width: "half",
                m_b: true
            }, f_name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', placeholder: 'First Name'
                },
                validation: {
                    required: true,
                },
                isValid: true,
                touched: true,
                value: this.props.user.f_name,
                forLogin: false,
                label: "First Name",
                validationErr: "",
                noMargin: true,
                margin_b: "15px",
                width: "half",
                m_b: true
            }, l_name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', placeholder: 'Last Name'
                },
                validation: {
                    required: true,
                },
                isValid: true,
                touched: true,
                value: this.props.user.l_name,
                forLogin: false,
                label: "Last Name",
                validationErr: "",
                noMargin: true,
                margin_b: "15px",
                width: "half",
                m_b: true
            }, email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email', placeholder: 'Email'
                },
                validation: {
                    required: true, isEmail: true
                },
                isValid: true,
                touched: true,
                value: this.props.user.email,
                forLogin: false,
                label: "Email",
                validationErr: "",
                noMargin: true,
                margin_b: "15px",
                width: "half",
                m_b: true
            }, password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password', placeholder: 'Enter Your password'
                },
                validation: {
                    required: true, minLength: 8
                },
                width: "half",
                isValid: true,
                touched: true,
                value: '',
                forLogin: true,
                label: "Password",
                validationErr: "",
                n_m_l: true
            }, password_confirmation: {
                elementType: 'input',
                elementConfig: {
                    type: 'password', placeholder: 'Re-enter Your password'
                },
                validation: {
                    repeatPass: true,
                },
                width: "half",
                isValid: true,
                touched: true,
                value: '',
                forLogin: false,
                label: "Repeat-password",
                validationErr: ""
            },

        }

    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {

        return true;

    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }

    changeHandler = (event, id, newInputValue = null, eleType = null) => {
        const _form_state = inputChangeHandler(event, id, this.state.updateForm, newInputValue, eleType);
        this.setState({updateForm: _form_state.updatedControls, isFormValid: _form_state.isFormValid});
        // this.props.toggleFormValid(this.state.isFormValid);
    }

    componentDidMount() {
        // this.props.fetchGroups(this.props.token);
    }

    submitHandler = (elements) => {
        const data = {};
        elements.map((el) => data[el.id] = el.config.value)
        this.props.updateAccount(this.props.token, data)
    }


    render() {

        const elements = [];
        for (let key in this.state.updateForm) {
            elements.push({
                id: key, config: this.state.updateForm[key]
            })
        }
        return (<div style={{marginTop: "45px"}}>
            {/*<div style={{marginBottom:"25px",fontWeight:"bold",fontSize:"25px"}}>*/}
            {/*    Account Settings*/}
            {/*</div>*/}
            <div className="page_title">
                Edit Account
            </div>
            <div>
                {elements.map((ele) => {
                    return <Input elementType={ele.config.elementType} elementConfig={ele.config.elementConfig}
                                  err={ele.config.validationErr}
                                  changed={(event, newInputValue = null) => this.changeHandler(event, ele.id, newInputValue, ele.config.elementType)}
                                  {...ele.config}>
                    </Input>
                })}
                <DialogActions style={{marginLeft: "auto"}}>
                    {/*<Button  color="primary" disabled={!this.props.btnValid}>*/}
                    <Button color="primary" onClick={() => {
                        this.submitHandler(elements)
                    }} disabled={!this.state.isFormValid}>
                        Update
                    </Button>
                </DialogActions>
            </div>
        </div>)


    }
}

const mapStateToprops = (state) => {
    return {
        user: state.auth.user, token: state.auth.token,
    }
}
const mapDispatchToprops = (dispatch) => ({

    updateAccount: (token, data) => dispatch(authActions.updateAcccount(token, data))

})

export default connect(mapStateToprops, mapDispatchToprops)(WithErrorHandler(AccountEdit,authInstance));