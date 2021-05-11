import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles, Typography, Button, Grid } from "@material-ui/core";
import Box from '@material-ui/core/Box';

class Info extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={{ backgroundColor: "#392c71", padding: "8%", height: '100%'}}>
                    <Typography variant="h3" style={{margin: "8% 0% 0% 0%",color: "#f2f2f4" }}>ULCA</Typography>

                    <Typography variant="h3" style={{margin: "20% 0% 0% 0%", color: "#f2f2f4"}}>Unified</Typography>
                    <Typography variant="h3" style={{margin: "3% 0% 0% 0%", color: "#f2f2f4"}}>Language</Typography>
                    <Typography variant="h3" style={{margin: "3% 0% 0% 0%", color: "#f2f2f4"}}>Contribution APIS</Typography>


                    <p>
                        <Typography style={{ color: "#f2f2f4", fontSize: "18px", color: "#f2f2f4", marginTop: "10%"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                            labore et dolore magna aliqua. Ut enim ad  minim venim, quis nostrud exercitation ullamco laboris.
                        </Typography>
                    </p>

                    <Button style={{ backgroundColor: "#f2f2f4" , marginTop: "10%", fontSize: "14px"}}>
                        Explore
                    </Button>
            </div>
        )
    }
}



export default Info;
