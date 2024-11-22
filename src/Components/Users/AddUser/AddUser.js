import React from "react";
import {Component} from "react";
import Input from "../../UI/Input/Input";
import {inputChangeHandler} from "../../../shared/utility";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import {users} from "../../../baseAxios"

class AddUser extends Component {
    state = {
        isFormValid: false, updateForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', placeholder: 'Username'
                },
                validation: {
                    required: true,
                },
                isValid: false,
                touched: false,
                value: "",
                forLogin: false,
                label: "Username",
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
                isValid: false,
                touched: false,
                value: "",
                forLogin: false,
                label: "First Name",
                validationErr: "",
                noMargin: true,
                margin_b: "15px",
                width: "half",
                m_b: true
            }, groups: {
                withoutLabel: true,
                elementType: 'multible_select',
                elementConfig: {
                    options: this.getGroupsArr(),
                }, // validation: {
                //     required: true,
                // },
                isValid: false,
                touched: false,
                value: [],
                forLogin: false,
                label: "Groups",
                validationErr: "",
                margin_b: "15px",
                width: "half"
            }, l_name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', placeholder: 'Last Name'
                },
                validation: {
                    required: true,
                },
                isValid: false,
                touched: false,
                value: "",
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
                isValid: false,
                touched: false,
                value: "",
                forLogin: false,
                label: "Email",
                validationErr: "",
                noMargin: true,
                margin_b: "15px",
                width: "half",
                m_b: true
            }, role: {
                withoutLabel: true,
                elementType: 'select',
                elementConfig: {
                    options: this.props.roles,
                },
                validation: {
                    required: true,
                },
                isValid: false,
                touched: false,
                value: "",
                forLogin: false,
                label: "Role",
                validationErr: "",
                margin_b: "15px",
                width: "half"
            }, status: {
                elementType: 'switch',
                elementConfig: {},
                isValid: true,
                touched: false,
                value: "",
                forLogin: false,
                label: "Active",
                validationErr: "",
                width: "full"
            }

        }

    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {

        return true;

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    // componentDidMount() {
    //     console.log(this.props.token)
    // }
    // componentdidUnMount() {
    //     console.log(this.props.token)
    // }

    changeHandler = (event, id, newInputValue = null, eleType = null) => {
        const _form_state = inputChangeHandler(event, id, this.state.updateForm, newInputValue, eleType);
        this.setState({updateForm: _form_state.updatedControls, isFormValid: _form_state.isFormValid});
        // this.props.toggleFormValid(this.state.isFormValid);
    }


    componentWillMount() {
        // this.props.fetchGroups(this.props.token);
    }

    render() {
        const elements = [];
        for (let key in this.state.updateForm) {
            elements.push({
                id: key, config: this.state.updateForm[key]
            })
        }
        return (<div>
            {elements.map((ele) => (<Input elementType={ele.config.elementType} elementConfig={ele.config.elementConfig}
                                           err={ele.config.validationErr}
                                           changed={(event, newInputValue = null) => this.changeHandler(event, ele.id, newInputValue, ele.config.elementType)}
                                           {...ele.config}>
            </Input>))}
            <DialogActions style={{marginLeft: "auto"}}>
                {/*<Button  color="primary" disabled={!this.props.btnValid}>*/}
                <Button color="primary" onClick={() => this.props.addHandler(elements)}
                        disabled={!this.state.isFormValid}>
                    Add
                </Button>
                <Button onClick={this.props.onCanceled} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </div>)


    }
}

const mapStateToprops = (state) => {
    return {
        roles: state.baseSetup.roles, groups: state.group.groups, token: state.auth.token
    }
}
const mapDispatchToprops = (dispatch) => ({


})

export default connect(mapStateToprops, mapDispatchToprops)(WithErrorHandler(AddUser,users));