import React, { useState, useEffect } from "react";
import {Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  RadarChart,
  PolarGrid, 
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import Widget from "../../components/Widget/Widget";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

export default function ChartOne(props) {
  var theme = useTheme();

  var [lineData, setLineData] = useState([]);
  var [pieData, setPieData] = useState([]);
  const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date('2019-09-20'));
  const [selectedDateTo, setSelectedDateTo] = React.useState(new Date());

  const handleDateChangeFrom = date => {
    setSelectedDateFrom(date);
  };
  const handleDateChangeTo = date => {
    setSelectedDateTo(date);
  };
  
  useEffect(() => {

    var urlpath = process.env.NODE_ENV === "development" ? process.env.REACT_APP_URL_PATH : "";
    function fetchDataPie(){
        fetch(`${urlpath}/api/getChartData/pie/${localStorage.getItem("usergroup").toLowerCase()}/${localStorage.getItem("userid")}/${Date.parse(selectedDateFrom)}/${Date.parse(selectedDateTo)}`)
        .then(response => response.json())
        .then(response => setPieData(response))
    };
    fetchDataPie(); 

    async function fetchData(){
        fetch(`${urlpath}/api/getChartData/line/${localStorage.getItem("usergroup").toLowerCase()}/${localStorage.getItem("userid")}/${Date.parse(selectedDateFrom)}/${Date.parse(selectedDateTo)}`)
        .then(response => response.json())
        .then(response => setLineData(response))
    };
    fetchData();

  }, [selectedDateTo, selectedDateFrom]);


console.log(pieData);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Widget title="Filters" noBodyPadding upperTitle  disableWidgetMenu = "true" >
            <Grid container spacing={4}>
                
                <Grid item xs={12} md={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-from-picker-dialog"
                                label="Date From"
                                format="MM/dd/yyyy"
                                value={selectedDateFrom}
                                onChange={handleDateChangeFrom}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-to-picker-dialog"
                                label="Date To"
                                format="MM/dd/yyyy"
                                value={selectedDateTo}
                                onChange={handleDateChangeTo}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item xs={12} md={8}>
          <Widget title="Quantity vs. Date" noBodyPadding upperTitle disableWidgetMenu = "true" >
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                width={500}
                height={300}
                data={lineData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dateadded" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="kgs"
                  stroke={theme.palette.primary.main}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Widget>
        </Grid>
        <Grid item xs={12} md={4}>
          <Widget title="Donations by Food Type" noBodyPadding upperTitle disableWidgetMenu = "true" >
            <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx={200} cy={150} outerRadius={80} width={200} height={300} data={pieData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="foodtype" />
                <PolarRadiusAxis />
                <Radar name="Mike" dataKey="kgs" stroke="#8884d8" fill="#8884d8" fillOpacity={0.7} />
            </RadarChart>
            </ResponsiveContainer>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}