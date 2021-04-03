import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import Grid from "@material-ui/core/Grid";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import history from "../../../../web.history";

import MenuIcon from '@material-ui/icons/ArrowBack';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import logo from '../../../../assets/logo.png';
import anuvaadLogo from '../../../../assets/AnuvaadLogo.svg';
import { translate } from '../../../../../src/assets/localisation';
import themeAnuvaad from "../../../theme/web/theme-default";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import APITransport from "../../../../flux/actions/apitransport/apitransport";

const styles = {
    container: {},
    containerDemo: {},
    appBar: {},
    appBarShift: {},
    buttonLeft: {},
    buttonRight: {},
    editButton: {},
    hide: {},
    drawer: {},
    drawerPaper: {},
    drawerHeader: {},
    contentShift: {},
    drawerPaperClose: {},
    toolbar: {},
    title: {},
    content: {},

    root: {
        flexGrow: 1,

    },
    flex: {
        flex: 1,

    },
    felxDemo: {
        flex: 1,
        marginLeft: "1%"
    },
    menuButton: {
        marginLeft: -12,
        // marginRight: 20,
        marginRight: "8px !important",
    },
    divider: {
        marginLeft: '12%',
        marginRight: '12%'
    }
};

class ChartRenderHeader extends React.Component {
    // state = {
    //     auth: true,
    //     anchorEl: null,
    //     heading: translate('header.page.heading.translation'),
    //     name: localStorage.getItem("userDetails"),
    //     userName: "",
    //     currentPage: 'dashboard'
    // };

    render() {
        const { classes, open_sidebar } = this.props;

        return (
            <div>
                <div>
                    <AppBar position="fixed" color="primary" className={classNames(classes.appBar, this.props.open_sidebar && classes.appBarShift)} style={{ height: '50px', padding: "0% 1%" }}>

                        <Toolbar disableGutters={!open_sidebar} style={{ minHeight: "50px" }}>


                            <div style={{ display: "flex", flexDirection: "row" }}>
                                {this.props.currentPage !== 0
                                    &&
                                    <div style={{display: "flex", flexDirection: "row", width: '5%'}}>
                                        <IconButton id="menu" style={{ fontSize: "20px" }}
                                            onClick={() => this.props.handleOnClick(this.props.currentPage - 1)}
                                            className={classes.menuButton} color="inherit" aria-label="Menu">
                                            <MenuIcon fontSize="large" />
                                        </IconButton>
                                        <div style={{ borderLeft: "1px solid #D6D6D6", height: "40px", marginRight: "10px", marginTop: "6px" }}></div>

                                    </div>
                                }
                                <div>
                                    <Typography variant="h4" style={{ position: 'absolute', left: '60px', top: "10%" }}>
                                        Sangrah
                                        </Typography>
                                </div>
                            </div>


                        </Toolbar>
                    </AppBar>

                </div>
            </div >
        );
    }
}

const mapStateToProps = state => ({
    // open_sidebar: state.open_sidebar.open
    drill_down: state.drill_down
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            APITransport,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ChartRenderHeader));