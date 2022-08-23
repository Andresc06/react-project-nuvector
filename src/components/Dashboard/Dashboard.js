import React, { useState, useEffect } from "react";



// pages
import Scrollspy from "../LinkBars/Scrollspy";
import Chart from "./Chart";



const Dashboard = ({ setAuth }) => {

  // useState para obtener el nombre de usuario
  const [name, setName] = useState("");

  // Funcion para obtener el nombre de usuario
  async function getName() {
    
    try {

      // Se comunica con el backend
      const response = await fetch(
        "https://andresc06.herokuapp.com/dashboard",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      // Se obtiene y se parsea el resultado
      const parseRes = await response.json();

      // Se establece a la variable name
      setName(parseRes.name);
    } catch (error) {
      console.error(error.message);
    }
  }

  // Funcion para salir de sesion (quitar token)
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  // useEffect del get name
  useEffect(() => {
    getName();
  }, []);

  return (
    <div className="divided">
      <Scrollspy />
      <div className="right p-3 pages">
        <h1 className="my-3 fw-bold text-center">Dashboard de {name}</h1>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            className="btn btn-danger mb-2"
            type="button"
            onClick={(e) => logout(e)}
          >
            Logout
          </button>
        </div>
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
