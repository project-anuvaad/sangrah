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

class Header extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    heading: translate('header.page.heading.translation'),
    name: localStorage.getItem("userDetails"),
    userName: "",
    currentPage: 'dashboard'
  };

  // componentDidUpdate() {
  //   if (this.state.open && this.props.tocken) {
  //     this.setState({ open: false });

  //   }
  //   if (this.props.tocken) {
  //     this.props.handleTockenChange()
  //   }
  // }

  handleDrawerTranslate = () => {
    this.setState({
      heading: translate('header.page.heading.translation')
    });
  };

  handleDrawerDoc = () => {
    this.setState({
      heading: translate('common.page.title.document')
    });
  };
  handleDrawerClose() {
    if (this.props.open_sidebar) {
      this.props.showSidebar(false)
    }
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget, currentPage: "" });
  };

  handleMenuOpenClose = event => {
    this.props.showSidebar(!this.props.open_sidebar)
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  handleBack = () => {

    let drillDownVal = this.props.drill_down.page_data

    if (drillDownVal) {
      let pageNo = drillDownVal.currentPage - 1
      let title = ""

      switch (pageNo) {
        case 0:
          title = "Domain Details Chart"
          break;
        case 1:
          title = "Source Details Chart"
          break;
        default:
          title = "Language Datasets Chart"
      }

      this.props.currentPageUpdate({ currentPage: drillDownVal.currentPage - 1, dataSet: drillDownVal.domain, title })

    }

  }

  render() {
    const { classes, title, forDemo, dontShowHeader, currentMenu, open_sidebar } = this.props;

    var role = [localStorage.getItem("roles")];
    var useRole = [];
    role.map((item, value) => {
      useRole.push(item); value !== role.length - 1 && useRole.push(", ")
      return true;
    });
    const ToolbarComp = this.props.toolBarComp; // eslint-disable-line

    return (
      <div>
        {dontShowHeader &&
        <div>
          <AppBar position="fixed" color="primary" className={classNames(classes.appBar, this.props.open_sidebar && classes.appBarShift)} style={{ height: '50px' }}>

            <Toolbar disableGutters={!open_sidebar} style={{ minHeight: "50px" }}>

              {open_sidebar ?
                <IconButton onClick={this.handleMenuOpenClose} className={classes.menuButton} color="inherit" aria-label="Menu">
                  <CloseIcon />
                </IconButton> :
                <div>
                  {this.props.drill_down.page_data && this.props.drill_down.page_data.hasOwnProperty("currentPage") && this.props.drill_down.page_data.currentPage !== 0
                    &&
                    <IconButton id="menu" onClick={this.handleMenuOpenClose} className={classes.menuButton} color="inherit" aria-label="Menu">
                      <MenuIcon />
                    </IconButton>
                  }
                </div>

              }
              <div style={{ borderLeft: "1px solid #D6D6D6", height: "40px", marginRight: "10px" }}></div>
              <Typography variant="h5" color="inherit" className={forDemo ? classes.felxDemo : classes.flex}>
                {title}
              </Typography>
              {this.props.toolBarComp &&
                <div style={{ position: 'absolute', right: '3%' }}>
                  <ToolbarComp />
                </div>
              }
            </Toolbar>
          </AppBar>


        </div>
  }
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
)(withStyles(styles)(Header));