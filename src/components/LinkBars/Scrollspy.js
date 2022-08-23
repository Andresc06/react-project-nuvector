import React from 'react';
import { Link } from "react-router-dom";



const Scrollspy = () => {

    return (
                <div className="links w-35">
                    <nav className="flex-column align-items-stretch pe-5">
                    <nav className="nav nav-pills flex-column">
                        <Link className="list-group-item list-group-item-action m-3" to='/dashboard'>Dashboard</Link>
                        <Link className="list-group-item list-group-item-action m-3" to='/dashboard/projects'>Projects</Link>
                        <nav className="nav nav-pills flex-column little-links">
                            <Link className="nav-link ms-3 my-1 text-white fs-6" to='/dashboard/projects/edit'>Edit Section</Link>
                            <Link className="nav-link ms-3 my-1 text-white fs-6" to='/dashboard/projects/add'>Add Section</Link>
                        </nav>
                        <Link className="list-group-item list-group-item-action m-3" to='/dashboard/task_entries'>Tasks</Link>
                        <nav className="nav nav-pills flex-column little-links">
                            <Link className="nav-link ms-3 my-1 text-white fs-6" to='/dashboard/task_entries/edit'>Edit Section</Link>
                            <Link className="nav-link ms-3 my-1 text-white fs-6" to='/dashboard/task_entries/add'>Add Section</Link>
                        </nav>
                    </nav>
                    </nav>
                </div>
    )
}

export default Scrollspy;