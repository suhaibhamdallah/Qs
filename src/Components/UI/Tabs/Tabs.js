
import classes from "./Tabs.module.css"
import {NavLink} from "react-router-dom";

const Tabs = (props) => (
    <div className={classes.tabs}>
        {
            props.tabs.map((_tab) =>
                <NavLink  to={_tab.link} className={classes.tab} activeClassName={classes.active_class}>
                    {_tab.title}
                </NavLink>
            )
        }
    </div>

)

export default Tabs;