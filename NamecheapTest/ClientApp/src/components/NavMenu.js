import React from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';

const navMenu = () => {
    return (
        <nav className="navbar">
            <div className="Header">
                <div className="brand">
                    <span>Namecheap Test</span>
                </div>
            </div>
            <div className="collapse">
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
export default navMenu;
