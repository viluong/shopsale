import React from 'react';

import useHttpErrorHandler from 'hooks/http-error-handler';
import Modal from 'components/UI/Modal/Modal';
import Aux from 'hocs/HightAux/HightAux';


const withErrorHandler = ( WrappedComponent, axios ) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);
        const modal = error && error.detail ? <Modal
                    show={error}
                    modalClosed={clearError}>
                    {error.detail}
                </Modal> : ''; 
        return (
            <Aux>
                {modal}
                <WrappedComponent {...props} />
            </Aux>
        );
    
    }
}

export default withErrorHandler;