import React, {Component} from 'react';

// import Modal from '../../components/UI/Modal/Modal';
import Wrap from "../Wrap/Wrap";
import Snackbar from "../../Components/UI/SnackBar/SnackBar";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null, successMessage: null,
        };

        hi = ()=>{
            this.setState({error: "ssssss"});
            this.setState({ error: "ssssss" }, () => {
            });
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => {
                this.setState({successMessage: res.data.message},()=>{
                });
                return res
            }, error => {
                this.setState({error: error.response.data.message});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        };

        render() {
            let _type = "error";
            if (this.state.successMessage) {
                _type = "success"
            }
            return (<Wrap>
                <Snackbar handleClose={this.onCanceled} type={_type}
                          message={this.state.error ? this.state.error : this.state.successMessage}
                          active={this.state.successMessage || this.state.error}/>
                {/*<Modal*/}
                {/*    show={this.state.error}*/}
                {/*    modalClosed={this.errorConfirmedHandler}>*/}
                {/*    {this.state.error ? this.state.error.message : null}*/}
                {/*</Modal>*/}
                <WrappedComponent {...this.props} />
            </Wrap>);
        }
    }
};

export default withErrorHandler;