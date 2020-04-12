import React from 'react'


class Header extends React.Component {
    render() {
        return (
            <div className="py-5 text-center">
                <img src="/img/logo192.png" width="200" alt="img"/>
                <br/>
                <a href="/api/logout" className="btn btn-warning">Logout</a>
            </div>
        )
    }
}

export default Header;
