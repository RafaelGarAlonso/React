import React from 'react';
import { Spinner  } from 'react-bootstrap';
import { useEffect } from 'react';
import './ScreenSpinner.css';

export const ScreenSpinner = (props) => {

    useEffect(() => {
        if (props.show) {
            document.body.classList.add('disable-scrolling');
        } else {
            document.body.classList.remove('disable-scrolling');
        }
     }, [ props.show ]);

    return (
        props.show ? <div className="wrapper-spinner">
            <div className="container-spinner">
                <Spinner variant="primary" 
                        className="spinner" 
                        animation="border" 
                        role="status">
                </Spinner>
                <span className="text mt-2">Cargando...</span>
            </div>
        </div>
        : ''
    )
}