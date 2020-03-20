import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

export default class LineChart3 extends React.Component {
  state = {
    lineData: [["Loading Data..."]],
    usergroup: localStorage.getItem("usergroup").toLowerCase(),
    userid: localStorage.getItem("userid"),
};

  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw/';

  componentDidMount(){
    var urlpath = process.env.NODE_ENV == "development" ? process.env.REACT_APP_URL_PATH : "";
    fetch(`${urlpath}/api/getChartData/line/${this.state.usergroup}/${this.state.userid}`)
    .then(response => response.json())
    // .then(response => this.setState({donationData: response}))
    .then((response)  => {
       console.log(response);
      if (response){      
        this.setState({lineData: response });
      }

    })
  }

  render() {
    return (
      <LineChart
        width={500}
        height={300}
        data={lineData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="foodtype" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }} />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    );
  }
}
