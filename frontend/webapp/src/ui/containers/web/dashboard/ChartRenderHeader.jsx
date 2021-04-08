import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import { isMobile } from 'react-device-detect';

const styles = {
    container: {},
    containerDemo: {},
    appBar: {
       boxShadow: 'none',
       borderBottom: '1px solid #DADCE0'
    },
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

    render() {
        const { classes, open_sidebar } = this.props;

        return (
            <div>
                <div>
                    <AppBar position="fixed" color="primary" className={classNames(classes.appBar, this.props.open_sidebar && classes.appBarShift)}  style={{ height: '56px', padding: "0% 3em" }}>

                        <Toolbar disableGutters={!open_sidebar} style={{ minHeight: "56px" }}>


                            <div style={{ display: "flex", flexDirection: "row" }}>
                              
                                <div className={classes.divStyle}>
                                    <Typography variant={isMobile? "h5" : "h5"} >
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