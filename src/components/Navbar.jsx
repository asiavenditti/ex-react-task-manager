import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Navbar() {
    return (
        <>
            <nav className='navbar navbar-dark bg-dark'>
                <div className="container">
                    <NavLink className='navbar-brand' to='/'>
                        My App
                    </NavLink>
                    <div>
                        <NavLink className='nav-link d-inline text-white me-3' to='/'>
                            Lista Task
                        </NavLink>
                        <NavLink className='nav-link d-inline text-white' to='/add'>
                            Aggiungi Task
                        </NavLink>
                    </div>
                </div >
            </nav >
        </>
    )
}
