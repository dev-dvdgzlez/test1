import React from 'react';
import Navigation from '../../components/Navigation/Navigation';

const layout = (props) => {
    return (
        <div>
            <Navigation />
            <div className="container">
                {props.children}
            </div>
        </div>
    );
};

export default layout;
