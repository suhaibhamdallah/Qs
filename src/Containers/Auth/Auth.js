import React, {Component} from "react";
import classes from './Auth.module.css'
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import {updateObject} from "../../shared/utility";
import {checkValidity} from "../../shared/utility";
import * as axiosBased from '../../baseAxios';
import * as actions from '../../store/actions/auth';
import {connect} from "react-redux";
import Wrap from "../../hoc/Wrap/Wrap";
import WrapWithClass from "../../hoc/WrapWithClass/WrapWithClass";
import Label from "../../Components/UI/Label/Label";
import {Navigate, Redirect, Route} from "react-router-dom";
import warn from "../../images/warn-icon.png"
class Auth extends Component {
    state = {
        controls: {
            full_name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', placeholder: 'Enter Your Full Name'
                },
                validation: {
                    required: true,
                },
                isValid: false,
                touched: false,
                value: '',
                forLogin: false,
                label: "Full Name",
                validationErr: "",
                n_m_l: true
            }, email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email', placeholder: 'Enter Your Email'
                },
                validation: {
                    required: true, isEmail: true,
                },
                isValid: false,
                touched: false,
                value: '',
                forLogin: true,
                label: "Email",
                validationErr: "",
                n_m_l: true
            }, username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', placeholder: 'Enter Your Username'
                },
                validation: {
                    required: true,
                },
                isValid: false,
                touched: false,
                value: '',
                forLogin: false,
                label: "Username",
                validationErr: "",
                n_m_l: true
            }, company_id: {
                elementType: 'input',
                elementConfig: {
                    type: 'number', placeholder: 'Enter Your Company Number'
                },
                validation: {
                    required: true,
                },
                isValid: false,
                touched: false,
                value: '',
                forLogin: false,
                label: "Company Number",
                validationErr: "",
                n_m_l: true
            }, mobile: {
                elementType: 'input', elementConfig: {
                    type: 'number', placeholder: 'Enter Your Mobile Number'
                }, validation: {
                    required: true, type: 'number', length: 12
                }, touched: false, isValid: false, value: '', forLogin: false, label: "Mobile", validationErr: ""
            }, password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password', placeholder: 'Enter Your password'
                },
                validation: {
                    required: true, minLength: 8
                },
                isValid: false,
                touched: false,
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
                isValid: false,
                touched: false,
                value: '',
                forLogin: false,
                label: "Repeat-password",
                validationErr: ""
            }, // terms_and_condition: {
            //     elementType: 'input',
            //     elementConfig: {
            //         type: 'checkbox',
            //     },
            //     validation: {
            //         required: true,
            //         isEmail: true,
            //     },
            //     isValid: false,
            //     touched: false,
            //     value: '',
            //     forLogin: false,
            // },
        }, signUpMode: false, isFormValid: false, apiStatus: true, apiMessage: '',
    }

    submitForm = (event) => {
        event.preventDefault();
        let formObj = {};
        if (this.state.signUpMode) {
            for (let key in this.state.controls) {
                formObj[key] = this.state.controls[key].value;
            }
            axiosBased.authInstance.post('/register', formObj).then((response) => {
                this.setState((prevState) => ({
                        signUpMode: !prevState,
                        apiMessage: response.data.message,
                        apiStatus: true
                    }))
            }).catch((error) => {
                let updatedControls = {};
                for (let ctrlName in error.response.data.errors) {
                    const updatedControl = updateObject(this.state.controls[ctrlName], {
                        isValid: false, validationErr: error.response.data.errors[ctrlName], touched: true
                    });
                    updatedControls = updateObject(this.state.controls, {[ctrlName]: updatedControl});
                }
                this.setState({
                    controls: updatedControls,
                    apiStatus: false,
                    apiMessage: error.response.data.message,
                    isFormValid: false
                })
            })
        } else {
            for (let key in this.state.controls) {
                if (this.state.controls[key].forLogin) {
                    formObj[key] = this.state.controls[key].value;
                }

            }
            this.props.onAuth(formObj)

        }
    }
    inputChangeHandler = (event, ctrlName) => {
        let extraValues = {};
        if (ctrlName === 'password_confirmation') {
            extraValues = {password: this.state.controls.password.value}
        }
        const updatedControl = updateObject(this.state.controls[ctrlName], {
            isValid: checkValidity(event.target.value, this.state.controls[ctrlName].validation, extraValues).isValid,
            value: event.target.value,
            touched: true
        });
        updatedControl['validationErr'] = !updatedControl.isValid ? this.state.controls[ctrlName].label + " " + checkValidity(event.target.value, this.state.controls[ctrlName].validation, extraValues).validationArr.join(" and " + this.state.controls[ctrlName].label + " ") : ""
        const updatedControls = updateObject(this.state.controls, {[ctrlName]: updatedControl});
        let isFormValid = true;
        for (let key in updatedControls) {
            if (!this.state.signUpMode) {
                if (updatedControls[key].forLogin) {
                    isFormValid = isFormValid && updatedControls[key].isValid;
                }
            } else {
                isFormValid = isFormValid && updatedControls[key].isValid;
            }
        }
        this.setState({
            controls: updatedControls, isFormValid: isFormValid
        })
    };
    switchHandler = (event) => {
        event.preventDefault()
        this.setState((prevState) => ({
            signUpMode: !prevState.signUpMode
        }))
    }

    render() {
        if (this.props.isAuth) {
            let  _path  = "/";
            if(typeof this.props.redirectPath !=="undefined"){
                _path=this.props.redirectPath;
            }
            return (<Navigate to={_path} replace={true}/>)
        }
        const elements = [];
        for (let key in this.state.controls) {
            elements.push({
                id: key, config: this.state.controls[key]
            })
        }
        const formElements = elements.map((ele) => {
            if (!this.state.signUpMode) {
                if (ele.config.forLogin) {
                    return (<WrapWithClass class_name="m_b_15">
                            <div className={classes.auth_wrapper_input}>
                                <Input elementType={ele.config.elementType} elementConfig={ele.config.elementConfig}
                                       changed={(event) => this.inputChangeHandler(event, ele.id)}
                                       {...ele.config}>
                                    {ele.config.validationErr ?
                                        <Label type="error">{ele.config.validationErr}</Label> : null}

                                </Input>
                            </div>


                        </WrapWithClass>)
                }
            } else {
                return (<WrapWithClass class_name="m_b_15">
                        <Input elementType={ele.config.elementType} elementConfig={ele.config.elementConfig}
                               changed={(event) => this.inputChangeHandler(event, ele.id)}
                               valid={ele.config.isValid} touched={ele.config.touched}
                               shouldValidate={ele.config.validation}
                               value={ele.config.value} label={ele.config.label}>
                        </Input>
                        {ele.config.validationErr ? <Label type="error">{ele.config.validationErr}</Label> : null}
                    </WrapWithClass>)
            }
        })
        return (<div className=" reg-container">
                <div className={(classes.auth_wrapper)}>
                    <div className={classes.auth_form_head}>
                    </div>
                    <form onSubmit={this.submitForm}>
                        {this.props.error?  <div className={classes.err_message}>
                            <img src={warn} alt=""/>
                            <Label custom_class="aut_msg" type="error">{this.props.error}</Label>
                        </div>:null}


                        {formElements}
                        <div className={classes.auth_form_btn}>
                            <Button
                                clicked={this.submitForm}
                                disabled={!this.state.isFormValid}>{this.state.signUpMode ? 'Signup' : 'Login'}</Button>

                        </div>


                    </form>
                    <div className={classes.auth_ftr_link}>
                        {/*<span>{this.state.signUpMode ? "Already Have an account ?" : "Welcome back! Please enter email and password to login To your account"}</span>*/}
                        {/*<a href="/" onClick={this.switchHandler}>{this.state.signUpMode ? "Login" : "SignUp"} </a>*/}
                    </div>
                </div>
            </div>);

    }

}

const mapStateToProps = (state) => ({
        loading: state.auth.loading,
        error: state.auth.error,
        user: state.auth.user,
        token: state.auth.token,
        isAuth: state.auth.token !== null,
        redirectPath: state.auth.redirect_path,

    })
const mapDispatchToProps = (dispatch) => ({
        onAuth: (data) => dispatch(actions.auth(data)), setRedirectPath: () => dispatch(actions.auth('/')),
    })


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
