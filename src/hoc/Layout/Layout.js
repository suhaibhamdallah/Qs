import React, {Component} from "react";
import {connect} from "react-redux";
import Wrap from "../Wrap/Wrap";
import Toolbar from "../Navigation/Toolbar/Toolbar";
// import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import SideDrawer from "../../Components/UI/SideDrawer/SideDrawer";
import { makeStyles } from '@material-ui/core/styles';
// import LinearProgress from '@material-ui/core/LinearProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ProgressLinear from "../../Components/UI/LinearProgress"
class Layout extends Component {
    render() {
        return (
            <div>
            <ProgressLinear/>

                {/*<Toolbar isAuth={this.props.isAuth} userName={this.props.user?Object.keys(this.props.user).length ?this.props.user.username:"":""}  />*/}
                {this.props.isAuth ? <SideDrawer/> : null}
                <Container>
                    {this.props.children}
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        isAuth: state.auth.token !== null,
        user: state.auth.user,
    }
)
export default connect(mapStateToProps, null)(Layout)