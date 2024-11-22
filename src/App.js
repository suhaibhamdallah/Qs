import './App.css';
import {connect} from "react-redux";
import Layout from "./hoc/Layout/Layout";
import {Route, Routes, Navigate, Router} from "react-router-dom";
import Auth from "./Containers/Auth/Auth";
import React, {Component} from "react";
import * as actions from './store/actions/auth'
import Home from "./Containers/home/home";
import Logout from "./Containers/Auth/Logout";
import Header from "./Components/Header/Header";
import AccountEdit from "./Components/Users/User/AccountEdit";
import Users from "./Components/Users/Users";

class App extends Component {
    // componentDidMount() {
    //     this.props.onAutoSignIn();
    //     this.props.fetchDids();
    //     this.props.fetchExtensions();
    // }
    componentWillMount() {
        this.props.onAutoSignIn();
    }
    componentDidUpdate() {

    }

    render() {

        let routes = <Routes>
            <Route path="/auth" element={<Auth/>}/>
            <Route path="/" element={<Auth/>}/>
            <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
        if (this.props.isAuth) {
            routes = <Routes>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/logout" element={<Logout logout={this.props.logout}/>}/>
                <Route path="/account-settings" element={<AccountEdit/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
        }
        let layout = <Layout>
            {routes}
        </Layout>;
        if (this.props.isAuth) {
            layout = <Layout>
                <div className="App-wrapper">
                    {routes}
                </div>

            </Layout>;
        }

        return (layout);
    }

}


const mapStateToProps = (state) => {
    return ({
        isAuth: state.auth.token !== null,
        token: state.auth.token ,
        user: state.auth.user ,
    })

}
const mapDispatchToProps = (dispatch) => {
    return ({
        onAutoSignIn: () => dispatch(actions.checkAuthState()),
        logout: () => dispatch(actions.logout()),
    })

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
