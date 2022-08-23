import React, { useState, useEffect } from "react";
import {DataGrid} from '@mui/x-data-grid';
import Scrollspy from "../LinkBars/Scrollspy";
import { Link } from "react-router-dom";

const ProjectTable = ({setAuth}) => {
  // Configurar los hooks
  const [projects, setProjects] = useState([]);

  // Funcion para mostrar los datos con fetch
  const response = async () => {
    await fetch("https://andresc06.herokuapp.com/dashboard/projects/simple", {
      method: "GET",
      headers: { token: localStorage.token }
    }).then((response) => {
      response
        .json()
        .then((json) => {
          setProjects(json);
        })
        .catch((error) => console.log(error));
    });
  };

  useEffect(() => {
    response();
  }, []);

  // Configuramos los columns para Datatable
  const columns = [
    {
      field: 'client',
      headerName: "CLIENT",
      sortable: false,
      flex: 1
    },
    {
      field: 'name',
      headerName: "NAME",
      flex: 0.5
    },
    {
        field: 'description',
        headerName: "DESCRIPTION",
        flex: 1
    },
    {
        field: 'actual_status',
        headerName: "STATUS",
        flex: 0.5
    }
  ];

  return (
    <div className='divided'>
    <Scrollspy/>
    <div className="right">
      <DataGrid
        className="my-3 font-monospace"
        getRowId={(row) => row.description}
        columns={columns}
        rows={projects}
        sx={{width: '82vw', height: '670px'}}
      />
    <button className='btn btn-info m-1 text-white'>
    <Link className='nav-link' to='/dashboard/projects/edit'>Go to Edit Page</Link>
    </button>
    </div>
    </div>
  );
};

export default ProjectTable;
