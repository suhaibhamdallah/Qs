import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from '../../store/actions/auth'
import {Navigate} from "react-router-dom";

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }

    render() {
        return (<Navigate to="/auth"/>)
    }

}

const mapStateToProps = state => ({})
const mapDispatchToProps = (dispatch) => {
    return {
        logout: dispatch(actions.logout())
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Logout);
export default Logout;