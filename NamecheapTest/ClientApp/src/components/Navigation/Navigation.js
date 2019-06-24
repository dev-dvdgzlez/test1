import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const navigation = () => {
    return (
        <nav className="navbar">
            <div className="header">
                <div className="brand">
                    <span>Namecheap Test</span>
                </div>
            </div>
            <div className="nav-items">
                <div className="nav-item">
                    <Link to={'/'} exact="true">Create Selfie</Link>
                </div>
                <div className="nav-item">
                    <Link to={'/list'}>Selfie List</Link>
                </div>
            </div>
        </nav>
    );
};
export default navigation;
