import React from 'react';
import {Link} from 'react-router-dom';
export default function Navbar() {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <Link to="/dashboard" class="nav-link" href="#">Dashboard</Link>
                </li>
                <li class="nav-item">
                    <Link to="/signin" class="nav-link" href="#">Sign In</Link>
                </li>
                <li class="nav-item">
                    <Link to="/signup" class="nav-link" href="#">Sign Up</Link>
                </li>
                <li class="nav-item">
                    <Link to="/profile" class="nav-link" href="#">Profile</Link>
                </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
            </nav>
        </>
    )
}
