import React from 'react';
import { Link } from "react-router-dom";



const Navbar = () => {

    return (
        <div>
            <header>
            <nav className="navbar navbar-expand-lg navbar-dark" id='header'>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse nav-link" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-link" to='/login'>Login</Link>
                    <Link className="nav-link" to='/register'>Register</Link>
                </div>
                </div>
            </div>
            </nav>
            </header>
        </div>
    )
}

export default Navbar;