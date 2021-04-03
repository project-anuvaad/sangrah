import React from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ChartStyles from "../../../styles/web/chartStyles";
import {ResponsiveContainer,
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
const theme = createMuiTheme();
var randomColor = require('randomcolor');
var jp = require('jsonpath')

class ChartRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      word: "",
      currentPage: 0,
      dataSetValues: [],
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
   
    

    this.handleApiCall("parallel-corpus" , "languagePairs",[])
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataValues !== this.props.dataValues) {
      if (this.props.dataValues.length > 0) {
        let others = this.props.dataValues.slice(10, this.props.dataValues.length)
        let othersCount = 0
        others.map(dataVal => {
          othersCount = dataVal.value + othersCount
  
        })
  
        let dataSetValues = this.props.dataValues.slice(0, 9)
        let obj = {}
        if(this.props.dataValues.length > 9){
          obj.value = othersCount
        obj.label = "Others"
        dataSetValues.push(obj)
        }
        
        this.setState({ dataSetValues })
  
      }
      
    }
  }

  handleApiCall =(dataType,value,criterions)=>{
    const apiObj = new FetchLanguageDataSets(dataType,value,criterions);
      this.props.APITransport(apiObj);
  }

  handleOnClick(value, event) {
    if (event && event.hasOwnProperty("label") && event.label === "Others") {
     this.setState({
      dataSetValues: this.state.dataSetValues
     })
    } else {
      switch (value) {
        case 1:
          this.handleApiCall("parallel-corpus", "domain", [{"type": "PARAMS", "sourceLanguage": { "type": "PARAMS", "value": "English"}, "targetLanguage": {      "type": "PARAMS",      "value": this.state.selectedLanguage ? this.state.selectedLanguage :event && event.hasOwnProperty("label") && event.label    }  }])
          this.setState({ currentPage: value,dataSetValues:[], selectedLanguage:this.state.selectedLanguage ?this.state.selectedLanguage : event && event.hasOwnProperty("label") && event.label , title: "Number of parallel sentences (Domain basis)" })
          break;
        case 2:
          this.handleApiCall("parallel-corpus" ,  "source",[{    "type": "PARAMS",    "sourceLanguage": {      "type": "PARAMS",      "value": "English"    },    "targetLanguage": {      "type": "PARAMS",      "value": this.state.selectedLanguage   }  }, {"type":"PARAMS", "value":event && event.hasOwnProperty("label") && event.label}])
          this.setState({ currentPage: value, title: "Number of parallel sentences (by source basis)" })
          break;
        case 0:
          this.handleApiCall("parallel-corpus" , "languagePairs",[])
          this.setState({ currentPage: value,selectedLanguage:'',dataSetValues:[], title: "Number of parallel sentences per language with English" })
          break;

      }
    }
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
       
          <Typography value="" variant="h4" className={classes.typographyHeader}>
            {this.state.title}
          </Typography>
          <Paper elevation={3} style={{ minHeight: '100%' }} className={classes.paper}>
          <ResponsiveContainer width="95%" height={400}>
            <BarChart width={900} height={400} data={this.state.dataSetValues} maxBarSize={100} >
              <XAxis dataKey="label" />
              <YAxis type="number" dx={0} width={100} />
              <CartesianGrid horizontal={true} vertical={false} />

              <Tooltip />
              <Bar dataKey="value" fill="green" maxBarSize={100} onClick={(event) => {  this.handleOnClick(this.state.currentPage + 1, event) }} style={{ cursor: this.state.currentPage !== 2 && "pointer" }}>

                
                {/* <LabelList dataKey="value" position="top" style={{ textAnchor: 'middle', fontSize: '90%', fill: 'rgba(0, 0, 0, 0.87)' }} angle={270} /> */}
                {
                  this.state.dataSetValues.length>0 && this.state.dataSetValues.map((entry, index) => {
                    const color = Math.floor(Math.random() * 16777215).toString(16);
                    return <Cell key ={index} fill={`#${color}`} />;
                  })
                }
              </Bar>
            </BarChart>
            </ResponsiveContainer>
          </Paper>
        </div>
        </Container>
        

    )
  }
}

const mapStateToProps = state => ({
  
  dataValues: state.dataValues.data
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    APITransport,
    showSidebar
  },
  dispatch
);

export default withRouter(withStyles(ChartStyles)(connect(mapStateToProps, mapDispatchToProps)(ChartRender)));

