import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import Header from '../../components/Shop/Header/Header';
import Footer from '../../components/Shop/Footer/Foorter';

class Layout extends Component {

    render () {
        return (
            <Aux>
                <Header/>
                <main>
                    {this.props.children}
                </main>
                <Footer/>   
            </Aux>
        )
    }
}

export default Layout;