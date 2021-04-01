import React from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ChartStyles from "../../../styles/web/chartStyles";
import {
  BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceArea,
  XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList, Rectangle
} from 'recharts';
import _ from 'lodash';

import APITransport from "../../../../flux/actions/apitransport/apitransport";
import { showSidebar } from '../../../../flux/actions/apis/common/showSidebar';
import ChartRenderHeader from "./ChartRenderHeader"

var randomColor = require('randomcolor');
var jp = require('jsonpath')
const data = [{ value: 2400614, label: 'Hindi' }, { value: 1290410, label: 'Bengali' }, { value: 1190325, label: 'Tamil' }, { value: 1283020, label: 'Malayalam' }, { value: 1362367, label: 'Telugu' }, { value: 1085055, label: 'Kannada' }, { value: 1456320, label: 'Marathi' },{ value: 2400614, label: 'Hindi' }, { value: 1290410, label: 'Bengali' }, { value: 1190325, label: 'Tamil' }]
const source = [{ value: 81884, label: 'HC/SUVAS' }, { value: 3000, label: 'Legal Terminologies' }, { value: 263100, label: 'PIB' }, { value: 264200, label: 'NewsOnAir' }, { value: 81884, label: 'DD News Sports' }, { value: 307430, label: 'OneIndia' }, { value: 263100, label: 'Times of India' }]
const domain = [{ value: 1442876, label: 'Judicial' }, { value: 569327, label: 'News' }, { value: 754631, label: 'General' }, { value: 632419, label: 'Tourism' }, { value: 654631, label: 'sports' }, { value: 652419, label: 'Financial' }]
class ChartRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      word: "",
      currentPage: 0,
      dataSet: data,
      title: "Number of parallel sentences per language with English"
    }

  }

  getData(dataValue) {
    let condition = `$..[*].${dataValue}`
    let dataCalue = jp.query(data, condition)
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



  handleOnClick(value) {
    switch (value) {
      case 1:
        this.setState({ currentPage: value, dataSet: domain, title: "Number of parallel sentences (Domain basis)" })
        break;
      case 2:
        this.setState({ currentPage: value, dataSet: source, title: "Number of parallel sentences (by source basis)" })
        break;
      case 0:
        this.setState({ currentPage: value, dataSet: data, title: "Number of parallel sentences per language with English" })
        break;

    }

  }

  onChartClick = (params) => {
    console.log("sajish", params)
  }



  render() {
    const { classes, open_sidebar } = this.props;
    const onEvents = {
      'click': this.onChartClick,
      'legendselectchanged': this.onChartLegendselectchanged
    }
    this.getData()
    return (
       

        <div className={classes.div}>
        <ChartRenderHeader
          handleOnClick={this.handleOnClick.bind(this)}
          currentPage={this.state.currentPage}

        />
          <Typography value="" variant="h2" className={classes.typographyHeader}>
            {this.state.title}
          </Typography>
          <Paper elevation={3} style={{ minHeight: '70%' }} className={classes.paper}>
            <BarChart width={900} height={400} data={this.state.dataSet} maxBarSize={100} style={{ margin: "30px" }}>
              <XAxis dataKey="label" />
              <YAxis type="number" dx={0} width={100} />
              <CartesianGrid horizontal={true} vertical={false} margin={60} />

              <Tooltip />
              <Bar dataKey="value" fill="green" maxBarSize={100} onClick={(event) => {  this.handleOnClick(this.state.currentPage + 1) }} style={{ cursor: this.state.currentPage !== 2 && "pointer" }}>

                <LabelList dataKey="value" position="top" />
                {
                  data.map((entry, index) => {
                    const color = Math.floor(Math.random() * 16777215).toString(16);
                    return <Cell key ={index} fill={`#${color}`} />;
                  })
                }
              </Bar>
            </BarChart>
          </Paper>
        </div>

    )
  }
}

const mapStateToProps = state => ({
  // open_sidebar: state.open_sidebar.open
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    APITransport,
    showSidebar
  },
  dispatch
);

export default withRouter(withStyles(ChartStyles)(connect(mapStateToProps, mapDispatchToProps)(ChartRender)));

