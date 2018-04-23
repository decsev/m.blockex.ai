import React from 'react';
import styles from './index.scss';

const Index = (props) => {
    return (
        <div className={`btn ${props.type}`}>
            {props.children}
        </div>
    );
};

Index.propTypes = {
};

export default Index;
