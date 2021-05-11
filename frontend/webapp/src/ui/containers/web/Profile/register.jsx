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
                        <Grid item xs={12} sm={4} lg={5} xl={5} style={{ paddingRight: "0px" }} color="primary">
                            {/* <img src="Anuvaad.png" width="100%" height="81%" alt="" style={{ backgroundRepeat: 'repeat-y' }} /> */}
                            {/* <Typography align='center' variant='h2' style={{ marginTop: '140px', fontWeight: "bold" }}>ULCA</Typography>


                            <Typography align='center' variant='h2' style={{ marginTop: '240px', fontWeight: "bold" }}>ULCA</Typography> */}

                            <Info />
                        </Grid>
                        <Grid item xs={12} sm={8} lg={7} xl={7} className={classes.signUpPaper} style={{ padding: "5rem" }}>
                            <Typography align='left' variant='h4' style={{ marginTop: '140px', padding: "2% 0%" }}>Sign up to ULCA</Typography>
                            <Typography align='left' variant='h6' style={{ padding: "2% 0%" }}>Please enter the details to create an account with ULCA</Typography>

                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <FormControl fullWidth style={{ width: '50%', margin: '2%', textAlign: "left" }}>
                                    <TextField
                                        id="email"
                                        fullWidth
                                        value={this.state.email}
                                        label={"Email address"}
                                        variant="outlined" onChange={this.processInputReceived('email')}
                                        style={{ textAlign: "left" }}
                                    /></FormControl>
                                <FormControl fullWidth style={{ width: '50%', margin: '2%', textAlign: "right" }}>
                                    <TextField
                                        id="email"
                                        fullWidth
                                        value={this.state.email}
                                        label={"Email address"}
                                        style={{ textAlign: "right" }}
                                        variant="outlined" onChange={this.processInputReceived('email')}
                                    /></FormControl>
                            </div>
                            <FormControl align='center' fullWidth style={{ alignItems: "center", margin: '2%' }}>
                                <TextField
                                    id="email"
                                    fullWidth
                                    value={this.state.email}
                                    label={"Email address"}
                                    variant="outlined" style={{ margin: '2%' }} onChange={this.processInputReceived('email')}
                                />
                                <TextField
                                    id="passowrd"
                                    fullWidth
                                    value={this.state.password}
                                    label="Password"
                                    helperText="At least one uppercase letter, one lowercase letter and one number"
                                    variant="outlined" style={{ margin: '2%' }} onChange={this.processInputReceived('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                            // onClick={handleClickShowPassword}
                                            // onMouseDown={handleMouseDownPassword}
                                            >
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />

                                <TextField
                                    id="confirm-passowrd"
                                    fullWidth
                                    value={this.state.password}
                                    label="Confirm password"
                                    helperText="Both password must match"
                                    variant="outlined" style={{ margin: '2%' }} onChange={this.processInputReceived('password')}
                                />


                            </FormControl>

                            <FormControlLabel fullWidth className={classes.formControl}
                                control={
                                    <Checkbox
                                        id="privacy-policy-checkbox"
                                        color={"primary"}
                                        className={classes.checkRemember.className}
                                        value={this.state.termsAndCondition ? true : false}
                                        checked={(this.state.termsAndCondition || this.state.loading) ? true : false}
                                        onChange={() => this.handleCheckboxChange()}

                                    />
                                }
                                label={<div style={{ textAlign: "left" }}><span>I agree to the</span>
                                    <Link href="#" onClick={() => {
                                        window.open('/Anuvaad-TnC.html', 'T&C', `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=500,height=500`);
                                    }} style={{ color: '#0C8AA9' }}> Privacy Policy</Link>
                                </div>}
                            />

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
                                    Sign up
                            </Button>


                            <Typography style={{ display: "flex", flexDirection: "row", margin: '2%', justifyContent: 'center' }}>
                                Already have an account &nbsp;
                                <Link id="signup" color="primary" style={{ cursor: 'pointer' }} href="#" onClick={() => { history.push(`${process.env.PUBLIC_URL}/signup`); }}> Sign up</Link>
                            </Typography>

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

