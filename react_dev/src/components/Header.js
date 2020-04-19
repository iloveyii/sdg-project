import React from 'react'
import {apiServer} from "../settings/constants";

class Header extends React.Component {
    render() {
        return (
            <div className="py-5 text-center">
                <img src={apiServer + "/static/img/logo192.png"} width="200" alt="img"/>
                <br/>
                <a href={apiServer + "/api/logout"} className="btn btn-warning">Logout</a>
            </div>
        )
    }
}

export default Header;
