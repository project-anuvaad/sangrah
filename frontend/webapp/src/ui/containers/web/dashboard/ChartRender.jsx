import React from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ChartStyles from "../../../styles/web/chartStyles";
import {
    ResponsiveContainer,
    BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceArea,
    XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList, Rectangle
} from 'recharts';
import _ from 'lodash';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import { showSidebar } from '../../../../flux/actions/apis/common/showSidebar';
import FetchLanguageDataSets from "../../../../flux/actions/apis/dashboard/languageDatasets";
import ChartRenderHeader from "./ChartRenderHeader"
import Container from '@material-ui/core/Container';
import { isMobile } from 'react-device-detect';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBack';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
const theme = createMuiTheme();
var randomColor = require('randomcolor');
var jp = require('jsonpath')
var colors = ["188efc", "7a47a4", "b93e94", "1fc6a4", "f46154", "d088fd", "f3447d", "188efc", "f48734", "189ac9", "0e67bd"]

class ChartRender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            word: "",
            currentPage: 0,
            dataSetValues: [],
            filterValue:'domain',
            title: "Number of parallel sentences per language with English"
        }

    }

    getData(dataValue) {
        let condition = `$..[*].${dataValue}`
        let dataCalue = jp.query(this.state.dataSetValues, condition)
        return dataCalue
    }

    getOption() {

        const option = {
            tooltip: {},
            xAxis: {
                type: 'category',
                data: this.getData("label"),
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: this.getData("value"),
                    type: 'bar',
                    smooth: true,
                },
            ],

        }

        return option
    }

    componentDidMount() {



        this.handleApiCall("parallel-corpus", "languagePairs", [])

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.dataValues !== this.props.dataValues) {
            if (this.props.dataValues.length > 0) {
                // let others = this.props.dataValues.slice(7, this.props.dataValues.length)
                // let othersCount = 0
                // others.map(dataVal => {
                //     othersCount = dataVal.value + othersCount

                // })

                // let dataSetValues = this.props.dataValues.slice(0, 7)
                // let obj = {}
                // let cardNavigation = false

                // if (this.props.dataValues.length > 7) {
                //     obj.value = othersCount
                //     obj.label = "Others"
                //     dataSetValues.push(obj)

                //     cardNavigation = true
                // }

                // this.setState({ dataSetValues, originalValues: this.props.dataValues, cardNavigation })
                this.fetchChartData()
            }

        }
    }

    fetchChartData() {
        if (this.props.dataValues.length > 0) {
            let others = this.props.dataValues.slice(7, this.props.dataValues.length)
            let othersCount = 0
            others.map(dataVal => {
                othersCount = dataVal.value + othersCount

            })

            let dataSetValues = this.props.dataValues.slice(0, 7)
            let obj = {}

            if (this.props.dataValues.length > 7) {
                obj.value = othersCount
                obj.label = "Others"
                dataSetValues.push(obj)
            }

            this.setState({ dataSetValues, originalValues: this.props.dataValues })

            if (this.state.cardNavigation) {
                this.setState({
                    cardNavigation: false
                })
            }
        }

    }

    handleApiCall = (dataType, value, criterions) => {
        const apiObj = new FetchLanguageDataSets(dataType, value, criterions);
        this.props.APITransport(apiObj);
    }

    handleOnClick(value, event) {
        if (event && event.hasOwnProperty("label") && event.label === "Others") {
            let others = this.props.dataValues.slice(7, this.props.dataValues.length)
            this.setState({
                dataSetValues: others,
                cardNavigation: true
            })
        } else {
            switch (value) {
                case 1:
                    this.handleApiCall("parallel-corpus", "domain", [{ "type": "PARAMS", "sourceLanguage": { "type": "PARAMS", "value": "English" }, "targetLanguage": { "type": "PARAMS", "value": this.state.selectedLanguage ? this.state.selectedLanguage : event && event.hasOwnProperty("label") && event.label } }])
                    this.setState({ currentPage: value, dataSetValues: [], selectedLanguage: this.state.selectedLanguage ? this.state.selectedLanguage : event && event.hasOwnProperty("label") && event.label, title: `Number of parallel English-${this.state.selectedLanguage ? this.state.selectedLanguage : event && event.hasOwnProperty("label") && event.label} sentences ` })
                    break;
                case 2:
                    this.handleApiCall("parallel-corpus", "source", [{ "type": "PARAMS", "sourceLanguage": { "type": "PARAMS", "value": "English" }, "targetLanguage": { "type": "PARAMS", "value": this.state.selectedLanguage } }, { "type": "PARAMS", "value": event && event.hasOwnProperty("label") && event.label }])
                    this.setState({ currentPage: value, dataSetValues: [], title: `Number of parallel English-${this.state.selectedLanguage} sentences from ${event && event.hasOwnProperty("label") && event.label}` })
                    break;
                case 0:
                    this.handleApiCall("parallel-corpus", "languagePairs", [])
                    this.setState({ currentPage: value, selectedLanguage: '', dataSetValues: [], title: "Number of parallel sentences per language with English" })
                    break;

            }
        }
    }

    handleCardNavigation = () => {
        this.fetchChartData()
    }

    handleLanguageChange = (event,value) => {
        this.setState({filterValue:value})
    }

    fetchLanuagePairButtons() {
        return (
            <div>
                <ToggleButtonGroup
                    value={this.state.filterValue}
                    exclusive
                    onChange={this.handleLanguageChange}
                    aria-label="text alignment"
                    color="primary"
                >
                    <ToggleButton value="domain" aria-label="left aligned" color="primary" >
                       Domain
                    </ToggleButton>
                    <ToggleButton value="source" aria-label="centered" color="primary">
                       Source
                    </ToggleButton>
                    <ToggleButton value="collectionMethod" aria-label="right aligned" color="primary">
                        Collection Method
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        )
    }

    render() {
        console.log(this.state.dataSetValues)
        const { classes, open_sidebar } = this.props;
        const onEvents = {
            'click': this.onChartClick,
            'legendselectchanged': this.onChartLegendselectchanged
        }
        this.getData()
        return (

            <Container>
                <div className={classes.div}>
                    <ChartRenderHeader
                        handleOnClick={this.handleOnClick.bind(this)}
                        currentPage={this.state.currentPage}

                    />
                    <div style={{ textAlign: "center", paddingBottom: isMobile ? "0" : "3%" }}>
                        <Typography value="" variant="h4" className={classes.typographyHeader}>
                            {this.state.title}
                        </Typography>
                    </div>
                    <div>
                           { this.fetchLanuagePairButtons()}
                    </div>
                    <Paper elevation={3} style={{ minHeight: '100%' }} className={classes.paper}>
                        <ResponsiveContainer width="95%" height={400}>
                            <BarChart width={900} height={400} data={this.state.dataSetValues} maxBarSize={100} >
                                <XAxis dataKey="label"
                                    textAnchor={isMobile ? "end" : "middle"}
                                    tick={{ angle: isMobile ? -90 : 0 }} height={isMobile ? 100 : 20}
                                    interval={0}
                                />
                                <YAxis type="number" dx={0} />
                                <CartesianGrid horizontal={true} vertical={false} />

                                <Tooltip />
                                <Bar dataKey="value" radius={[12, 12, 0, 0]} maxBarSize={100} onClick={(event) => { this.handleOnClick(this.state.currentPage + 1, event) }} style={{ cursor: this.state.currentPage !== 2 && "pointer" }}>


                                    {/* <LabelList dataKey="value" position="top" style={{ textAnchor: 'middle', fontSize: '90%', fill: 'rgba(0, 0, 0, 0.87)' }} angle={270} /> */}
                                    {
                                        this.state.dataSetValues.length > 0 && this.state.dataSetValues.map((entry, index) => {
                                            const color = colors[index < 9 ? index : index % 10]
                                            return <Cell key={index} fill={`#${color}`} />;
                                        })
                                    }
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        {this.state.cardNavigation && this.state.dataSetValues && this.state.dataSetValues.length > 0 && <div style={{ padding: "3%", textAlign: "center" }}>
                            <Button color="primary" size="medium" style={{ textTransform: "capitalize" }} startIcon={<BackIcon />} onClick={() => this.handleCardNavigation()}>Previous</Button>
                        </div>}
                    </Paper>
                </div>
            </Container>


        )
    }
}

const mapStateToProps = state => ({

    dataValues: state.dataValues
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        APITransport,
        showSidebar
    },
    dispatch
);

export default withRouter(withStyles(ChartStyles)(connect(mapStateToProps, mapDispatchToProps)(ChartRender)));

