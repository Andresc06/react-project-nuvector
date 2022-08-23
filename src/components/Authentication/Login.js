import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../LinkBars/Navbar";



const Login = ({ setAuth }) => {
  // useState para guardar los inputs
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // Destructurar input y tomar cada variable
  const { email, password } = input;

  // useState para el estado de cargando del boton Login
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
      const body = { email, password };

      // se hace el fetch para la comunicacion con el backend
      const res = await fetch(
        "https://andresc06.herokuapp.com/authentication/login",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        }
      );

      // Se parsea y queda como un objeto
      const parseRes = await res.json();

      if (parseRes.token) {
        // Se busca el atributo token
        localStorage.setItem("token", parseRes.token);
        // Se autoriza el user
        setAuth(true);
      } else {
        // Se dice que el user no esta autorizado
        setAuth(false);

        // Se toma el mensaje del error del backend
        if (parseRes.error) {
          (() => {
            const message = parseRes.error.message;

            return toast.error(message, {
              position: "bottom-right",
              autoClose: 2000,
              draggable: true,
            });
          })();
        }

        // Funcion flecha autoejecutada
        else {
          (() => {
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
    <div className="p-5 background-login">
      <ToastContainer />
      <div class="card col-sm-6 col-lg-3 h-75 mx-auto">
        <h1 className="text-center my-5 title">Login</h1>
        <form onSubmit={handleSubmit}>

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
            placeholder="Password"
            className="form-control my-3 mb-5 w-75 mx-auto"
            onChange={handleChange}
          />

          <div className="d-grid gap-5 mx-auto w-75">
            <button className="btn btn-primary">
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm fst-semibold"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <button className="btn btn-info mx-auto w-75 text-center d-grid m-3">
          <Link
            to="/register"
            className="text-white text-decoration-none fst-semibold"
          >
            Don't have an account? Register
          </Link>
        </button>
      </div>
    </div>
    </div>
  );
};

export default Login;
