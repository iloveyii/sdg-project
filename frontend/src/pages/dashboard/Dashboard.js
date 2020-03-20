import React from "react";
import DashboardOptions from "../../components/DashboardOptions";
export default function Dashboard(props) {

  return (
    <>
      <DashboardOptions 
        userType= {localStorage.getItem("usergroup").toLowerCase()}
        button="Latest5 Reports" 
        />
    </>
  );
}