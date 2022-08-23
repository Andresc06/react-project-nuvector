import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../LinkBars/Navbar";



const Register = ({ setAuth }) => {

  // useState para guardar los inputs
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Destructurar input y tomar cada variable
  const { email, password, name } = input;

  // useState para el estado de cargando del boton Submit
  const [loading, setloading] = useState(false);

  // handleChange para cuando haya cambios en los inputs ( e.target.name coincide con el nombre de la variable input)
  const handleChange = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });


  const handleSubmit = async (e) => {

    // Prevent reload de la pagina
    e.preventDefault();

    // Empezar animacion de carga en el boton
    setloading(true);

    try {
      // Se toma todo de los inputs
      const body = { name, email, password };

      // se hace el fetch para la comunicacion con el backend
      const res = await fetch(
        "https://andresc06.herokuapp.com/authentication/register",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        }
      );

      // Se parsea y queda como un objeto
      const parseRes = await res.json();

      // Si se registro con exito se indica un mensaje
      if (parseRes.token) {
        (() => {
          return toast.success("Registered successfully", {
            position: "bottom-right",
            autoClose: 2000,
            draggable: true,
          });
        })();
      }

      // Si hubo un error en el registro se indica un mensaje
      else {
        // Se dice que el user no esta autorizado
        setAuth(false);

        // Funcion flecha autoejecutada
        if (parseRes.error) {
          (() => {
            // Se toma el mensaje del error del backend
            const message = parseRes.error.message;

            return toast.error(message, {
              position: "bottom-right",
              autoClose: 2000,
              draggable: true,
            });
          })();
        } 
        
        else {
          (() => {
            // Se toma el mensaje del error ocurrido
            return toast.error(parseRes, {
              position: "bottom-right",
              autoClose: 2000,
              draggable: true,
            });
          })();
        }
      }

      // Se acaba la animacion de cargando en boton
      setloading(false);
    } catch (error) {
      console.error(error.message);
      setloading(false);
    }
  };


  return (
    <div>
      <Navbar />
    <div className="p-5 background">
      <ToastContainer />
      <div class="card col-sm-6 col-lg-3 h-75 mx-auto">
      <h1 className="text-center my-5 title">Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="form-control my-3 w-75 mx-auto"
          onChange={handleChange}
        />
        

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control my-3 w-75 mx-auto"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password  (min. 8 caracters)"
          className="form-control my-3 w-75 mx-auto"
          onChange={handleChange}
        />

        <div className="d-grid gap-3 mx-auto w-75">
          <button className="btn btn-success">
            {loading ? (
              <span
                className="spinner-border spinner-border-sm fst-semibold"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
      <button className="btn btn-info mx-auto w-75 text-center d-grid m-3">
      <Link to="/login" className="text-white text-decoration-none fst-semibold">Already have an account? Login</Link>
      </button>
      </div>
    </div>
    </div>
  );
};

export default Register;
