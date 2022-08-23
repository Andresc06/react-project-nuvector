import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Components
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import TaskEntriesTable from "./components/TaskEntriesPage/TaskEntriesTable";
import ProjectTable from "./components/ProjectsPage/ProjectTable";
import ProjectTableEdit from "./components/ProjectsPage/ProjectTableEdit";
import TaskEntriesTableEdit from "./components/TaskEntriesPage/TaskEntriesTableEdit";
import ProjectTableAdd from "./components/ProjectsPage/ProjectTableAdd";
import TaskEntriesTableAdd from "./components/TaskEntriesPage/TaskEntriesTableAdd";




function App() {

  // Hooks para establecer la authentication
  const [isAuthenticated, setisAuthenticated] = useState(false);

  // Funcion para saber si esta authenticated
  const setAuth = (boolean) => {
    setisAuthenticated(boolean);
  }

  async function isAuth() {

    try {
      
      const response = await fetch("https://andresc06.herokuapp.com/authentication/verify", {
        method: "GET",
        headers: { token: localStorage.token }
      })

      const parseRes = await response.json()

      // Condicional para mostrar el dashboard siempre y cuando se tenga el token activo
      parseRes === true ? setisAuthenticated(true) : setisAuthenticated(false);

    } catch (error) {
      console.error(error.message);
    }
  }
  
  useEffect(() => {
    isAuth()
  })

  return (
  <Fragment>
    <Router>
        <Routes>
          <Route exact path="/"  element={ isAuthenticated ? (<Dashboard setAuth={setAuth}/>) : (<Navigate to="/login"/>) } />
          <Route exact path="/login"  element={ !isAuthenticated ? (<Login setAuth={setAuth}/>) : (<Navigate to="/dashboard"/>) } />
          <Route exact path="/register" element={ !isAuthenticated ? (<Register setAuth={setAuth}/>) : (<Navigate to="/login"/>) } />
          <Route exact path="/dashboard" element={ isAuthenticated ? (<Dashboard setAuth={setAuth}/>) : (<Navigate to="/login"/>) } />
          <Route exact path="/dashboard/projects" element={<ProjectTable setAuth={setAuth}/>} />
          <Route exact path="/dashboard/projects/edit" element={<ProjectTableEdit setAuth={setAuth}/>} />
          <Route exact path="/dashboard/projects/add" element={<ProjectTableAdd setAuth={setAuth}/>} />
          <Route exact path="/dashboard/task_entries" element={<TaskEntriesTable setAuth={setAuth}/>} />
          <Route exact path="/dashboard/task_entries/edit" element={<TaskEntriesTableEdit setAuth={setAuth}/>} />
          <Route exact path="/dashboard/task_entries/add" element={<TaskEntriesTableAdd setAuth={setAuth}/>} />
        </Routes >
    </Router>
  </Fragment>
  )
}

export default App;