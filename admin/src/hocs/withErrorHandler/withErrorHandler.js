import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../HightAux/HightAux';
import axios from '../../configs/axios'
import * as actions from '../../store/actions';

const withErrorHandler = ( WrappedComponent ) => {
    class ExtendComponent extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState( { error: null } );
                return req;
            } );
            this.resInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState( { error: error } );
            } );
        }

        componentWillUnmount () {
            axios.interceptors.request.eject( this.reqInterceptor );
            axios.interceptors.response.eject( this.resInterceptor );
        }

        errorConfirmedHandler = () => {
            if (this.props.popup) {
                this.props.onClosePopup()
            }
            if (this.state.error) {
                this.setState( { error: null } );
            }
        }

        render () {
            return (
                <Aux>
                    <Modal
                        show={this.state.error || this.props.popup}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                        {this.props.popup ? this.props.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }

    const mapStateToProps = state => {
        return {
            popup: state.popup.popup,
            message: state.popup.message,
            redirect: state.popup.redirect
        }
    }
      
    const mapDispatchToProps = dispatch => {
        return {
            onClosePopup: () => dispatch(actions.closePopup()),
        }
    } 
    
    return connect(mapStateToProps, mapDispatchToProps)(ExtendComponent)
}


export default withErrorHandler;