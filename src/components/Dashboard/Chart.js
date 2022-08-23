import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, LinearScale, CategoryScale } from 'chart.js';
import { ToastContainer, toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
)

const Chart = () => {
  // useState para el grafico, inputs y para obtener los clientes de la BD
  const [chart, setChart] = useState([]);
  const [list, setlist] = useState([]);
  const [clients, setClients] = useState([]);

  let [input, setInput] = useState({
    start: "",
    end: "",
    client: "",
  });

  // Se declara variables que son obtenidos de cada campo del input
  let { start, end, client } = input;

  // handleChange para los inputs
  const handleChange = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  // Creacion de la variable data por parte de la libreria Chart.js
  var data = {
    // Obtiene los nombres de cada projecto de la BD
    labels: chart?.map((x) => x.project),
    datasets: [
      {
        label: `hours`,
        // Obtiene la duracion total de cada projecto de la BD
        data: chart?.map((x) => x.total_duration),
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // handleSubmit al darle en filter
  const handleSubmit = async (e) => {
    // Previene la recarga de la pagina
    e.preventDefault();

    try {
      // Condiciones para el llenado de campos del formulario

      if (start === "" && end === "" && client === "") {
        return toast.error("Enter Date Range or Client", {
          position: "bottom-right",
          autoClose: 2000,
          draggable: true,
        });
      } else if (start === "" && end === "" && client) {
        const response = async () => {
          let url = `https://andresc06.herokuapp.com/dashboard/project/graph/custom/${client}`;
          await fetch(url, {
            method: "GET",
            headers: {
              token: localStorage.token,
              "Content-Type": "application/json",
            },
          }).then((response) => {
            response
              .json()
              .then((json) => {
                setChart(json);
              })
              .catch((error) => console.log(error));
          });
        };
        response();

        return toast.success("Filtered", {
          position: "bottom-right",
          autoClose: 1000,
          draggable: true,
        });
      } else if (start === "") {
        return toast.error("Enter Start Date", {
          position: "bottom-right",
          autoClose: 2000,
          draggable: true,
        });
      } else if (end === "") {
        return toast.error("Enter End Date", {
          position: "bottom-right",
          autoClose: 2000,
          draggable: true,
        });
      } else if (client === "") {
        // se hace el fetch para la comunicacion con el backend
        const response = async () => {
          let url = `https://andresc06.herokuapp.com/dashboard/project/graph/custom/${start}/${end}`;
          await fetch(url, {
            method: "GET",
            headers: {
              token: localStorage.token,
              "Content-Type": "application/json",
            },
          }).then((response) => {
            response
              .json()
              .then((json) => {
                setChart(json);
              })
              .catch((error) => console.log(error));
          });
        };
        response();

        return toast.success("Filtered", {
          position: "bottom-right",
          autoClose: 1000,
          draggable: true,
        });
      } else {
        const response = async () => {
          let url = `https://andresc06.herokuapp.com/dashboard/project/graph/custom/${start}/${end}/${client}`;

          // Comunicacion con el Backend
          await fetch(url, {
            method: "GET",
            headers: {
              token: localStorage.token,
              "Content-Type": "application/json",
            },
          }).then((response) => {
            response
              .json()
              .then((json) => {
                setChart(json);
              })
              .catch((error) => console.log(error));
          });
        };
        response();

        return toast.success("Filtered", {
          position: "bottom-right",
          autoClose: 1000,
          draggable: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Creacion de variable options para modificar el Chart
  var options = {
    maintainAspectRatio: true,
    legend: {
      labels: {
        display: true,
        fontSize: 25,
      },
    },
  };

  // useEffect para la carga del grafico predefinido
  useEffect(() => {
    const response = async () => {
      await fetch("https://andresc06.herokuapp.com/dashboard/project/graph", {
        method: "GET",
        headers: { token: localStorage.token },
      }).then((response) => {
        response
          .json()
          .then((json) => {
            setChart(json);
          })
          .catch((error) => console.log(error));
      });
    };

    // Funcion para obtener los nombres de los clientes que se encuentran en la BD
    const resp = async () => {
      await fetch("https://andresc06.herokuapp.com/dashboard/clientele/names", {
        method: "GET",
        headers: { token: localStorage.token },
      }).then((response) => {
        response
          .json()
          .then((json) => {
            setClients(json);
            setlist('Clientes obtenidos');
          })
          .catch((error) => console.log(error));
      });
    };
    response();
    resp();
  }, []);


  // useEffect para el agregado dinamico de todos los clientes de la BD al elemento select de la pagina
  useEffect(() => {
    
    const last = () => {
      let top = clients.length;

      for (let i = 0; i < top; i++) {
        let element = clients[i];
        let oOption = document.createElement("option");
        oOption.setAttribute("value", element.code_uid);
        oOption.setAttribute("name", element.name);
        oOption.textContent = `${element.name}`;
        let parent = document.getElementById("options");
        parent.append(oOption);
      }
    };
    last();
  }, [list]);
  // Utilice list y no chart ya que quiero que se ejecute una sola vez, al momento de haber hecho al consulta de clients

  return (
    <div>
      <ToastContainer />
      <h1 className="text-center fs-3">Data Projects Hours</h1>
      <Bar data={data} height={90} options={options} />
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="start"
          className="text-center form-control my-3 w-50 mx-auto"
          onChange={handleChange}
        />
        <input
          type="date"
          name="end"
          className="text-center form-control my-3 w-50 mx-auto"
          onChange={handleChange}
        />
        <select
          className="form-control w-50 mx-auto text-center"
          id="options"
          onChange={handleChange}
          name="client"
        >
          <option value="">DEFAULT</option>
        </select>
        <button className="btn btn-info my-3 w-50 mx-auto d-grid">
          FILTER
        </button>
      </form>
    </div>
  );
};

export default Chart;
