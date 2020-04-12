import React from 'react'
import Header from './Header'

class Container extends React.Component {
    render() {
        return(
            <div className="container">
                <Header />
                {this.props.children}
            </div>
        )
    }
}

export default Container;
