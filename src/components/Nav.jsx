import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {
    return (
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Link to='/'>Home</Link>
            <Link to='/form'>Form</Link>
        </div>
    );
}

export default Nav;