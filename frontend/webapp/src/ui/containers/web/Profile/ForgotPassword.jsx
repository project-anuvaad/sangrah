import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles, Typography } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import ThemeDefault from "../../../theme/web/theme-default";
import LoginStyles from "../../../styles/web/LoginStyles";
import history from "../../../../web.history";
import TextField from '@material-ui/core/TextField';
// import TextField from '../../../components/web/common/TextField';

import Snackbar from "../../../components/web/common/Snackbar";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import LoginAPI from "../../../../flux/actions/apis/login";
import profileDetails from '../../../../flux/actions/apis/profile_details';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Info from './ULCAInfo'


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: false,
            loading: false,
            showPassword: false
        };
    }

    componentDidMount() {
        localStorage.removeItem("token");
        window.addEventListener('keypress', (key) => {
            if (key.code === 'Enter') {
                this.processLoginButtonPressed();
            }
        })

    }

    processInputReceived = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    processLoginButtonPressed = () => {
        const { email, password } = this.state;
        this.setState({ error: false, loading: true })
        const apiObj = new LoginAPI(email, password);
        const apiReq = fetch(apiObj.apiEndPoint(), {
            method: 'post',
            body: JSON.stringify(apiObj.getBody()),
            headers: apiObj.getHeaders().headers
        }).then(async response => {
            const rsp_data = await response.json();
            if (!response.ok) {
                return Promise.reject('');
            } else {
                let resData = rsp_data && rsp_data.data
                localStorage.setItem("token", resData.token)
                this.fetchUserProfileDetails(resData.token)
            }
        }).catch((error) => {
            this.setState({ error: true, loading: false })
        });
    };

    handleRoles = (value) => {
        let result = []
        value.roles.map(element => {
            result.push(element.roleCode)
        })
        return result;
    }

    fetchUserProfileDetails = (token) => {

        const apiObj = new profileDetails(token);
        const apiReq = fetch(apiObj.apiEndPoint(), {
            method: 'post',
            body: JSON.stringify(apiObj.getBody()),
            headers: apiObj.getHeaders().headers
        }).then(async response => {
            const rsp_data = await response.json();
            if (!response.ok) {
                return Promise.reject('');
            } else {
                let resData = rsp_data && rsp_data.data
                var roles = this.handleRoles(resData);
                localStorage.setItem("roles", roles)
                localStorage.setItem("lang", "en")
                localStorage.setItem("userProfile", JSON.stringify(resData));
                if (roles.includes('ADMIN')) {
                    history.push(`${process.env.PUBLIC_URL}/user-details`);
                } else {
                    history.push(`${process.env.PUBLIC_URL}/parallel-corpus`);
                }
            }
        }).catch((error) => {
            console.log('api failed because of server or network')
        });
    }


    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={ThemeDefault} style={{ height: window.innerHeight + "px" }} >

                <div style={{ height: window.innerHeight, overflow: 'hidden' }}>
                    <Grid container spacing={8}>
                        <Grid item xs={6} sm={5} lg={4} xl={4} style={{ paddingRight: "0px" }} color="primary">
                            <Info />
                        </Grid>
                        <Grid item xs={6} sm={7} lg={8} xl={8} className={classes.signUpPaper} style={{ padding: "20rem" }}>
                            <Typography align='left' variant='h4' style={{ marginTop: 'auto', marginBottom: "auto", padding: "2% 0%" }}>Forgot Password</Typography>
                            <Typography align='left' variant='h6' style={{ padding: "2% 0%" }}>Enter your email address and we will send  a link to reset your password.</Typography>

                            <FormControl align='center' fullWidth style={{ alignItems: "center", margin: '2%' }}>
                                <TextField
                                    id="email"
                                    fullWidth
                                    value={this.state.email}
                                    label={"Email address"}
                                    variant="outlined" style={{ margin: '2%' }} onChange={this.processInputReceived('email')}
                                />

                            </FormControl>

                            <Button
                                id="signin-btn"
                                fullWidth
                                color="primary"
                                variant="contained" style={{
                                    margin: '2%', height: '45px', textTransform: 'initial', fontWeight: '30px',
                                    color: 'white',
                                }} onClick={this.processLoginButtonPressed.bind(this)}
                                disabled={this.state.loading}>
                                {this.state.loading && <CircularProgress size={24} className={'success'} className={classes.buttonProgress} />}
                                    Send Link
                            </Button>

                            <div style={{ display: "flex", flexDirection: "row", margin: "2%", textAlign: 'center', justifyContent: 'center' }}>
                                <Typography>
                                    By continuing, you agree to ULCA
                            </Typography>
                                <Typography>
                                    Terms of Service, Privacy Policy.
                            </Typography>
                            </div>

                            <Typography style={{margin: '2%', textAlign: 'center'}}>
                                Copyright 2021-2022 ULCA. All rights reserved
                            </Typography>
                        </Grid>
                    </Grid>
                    <div className={classes.buttonsDiv} />
                    {this.state.error && (
                        <Snackbar
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            open={this.state.error}
                            autoHideDuration={4000}
                            onClose={this.handleClose}
                            variant="error"
                            message={"Invalid Username/Password"}
                        />
                    )}
                </div>

            </MuiThemeProvider>
        );
    }
}


const mapStateToProps = state => ({
    user: state.login
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
        },
        dispatch
    );

export default withRouter(
    withStyles(LoginStyles)(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(Register)
    )
);

