import React from 'react';
import NavMenu from './NavMenu';

const layout = (props) => {
    return (
        <div>
            <NavMenu />
            <div className="container">
                {props.children}
            </div>
        </div>
    );
};

export default layout;
