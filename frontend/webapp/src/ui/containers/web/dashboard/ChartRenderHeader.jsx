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
import Styles from "../../../styles/web/ChartRenderHeaderStyles"


class ChartRenderHeader extends React.Component {

    render() {
        const { classes, open_sidebar } = this.props;
        return (
            <div>
                <div>
                    <AppBar color="primary" className={classNames(classes.appBar, this.props.open_sidebar && classes.appBarShift)} >

                        <Toolbar disableGutters={!open_sidebar} className={classes.toolbar}>


                            <div className={classes.drawerHeader}>
                              
                                <div className={classes.divStyle}>
                                
                                    <Typography variant={isMobile? "h5" : "h6"} >
                                        Sangrah Dashboard
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
)(withStyles(Styles)(ChartRenderHeader));