import React from "react";
import DashboardOptions from "../../components/DashboardOptions";
export default function Dashboard(props) {
    const userGroup = localStorage.getItem("usergroup") ? localStorage.getItem("usergroup").toLowerCase() : 'na';

  return (
    <>
      <DashboardOptions
        userType= {userGroup}
        button="Latest5 Reports"
        />
    </>
  );
}
