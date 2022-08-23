import React, { useState, useEffect } from "react";
import {DataGrid} from '@mui/x-data-grid';
import Scrollspy from "../LinkBars/Scrollspy";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";

const ProjectTableEdit = ({setAuth}) => {
  // Configurar los hooks
  const [projects, setProjects] = useState([]);
  const [selection, setselection] = useState([]);

  // Funcion para mostrar los datos con fetch
  const response = async () => {
    await fetch("https://andresc06.herokuapp.com/dashboard/projects", {
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

  const mutateRow = async (id, field, value) => {

    try {

    let url = "https://andresc06.herokuapp.com/dashboard/projects/" + id + "/edit"

    const body = { field, value }
    await fetch(url, {
        method: "PUT",
        headers: { token: localStorage.token, "Content-Type": "application/json"  },
        body: JSON.stringify(body)
    })
    } catch (error) {
    console.error(error.message);
    }
  }

  const handleRowEditCommit = React.useCallback(
    (newRow) => {
      // Make the HTTP request to save in the backend
      const id = newRow.id
      const field = newRow.field
      const value = newRow.value

      mutateRow( id, field, value)
    }, []);

    const handleDelete = async () => {

        try {

            selection.map(async (id) => {

                try {
                let url = "https://andresc06.herokuapp.com/dashboard/projects/" + id + "/delete"

                await fetch(url, {
                    method: "DELETE",
                    headers: { token: localStorage.token }
                })
                } catch (error) {
                console.error(error.message);
                }

            })
    
        }catch (error) {
            console.error(error.message);
        }

        response();

        return toast.success('Project Deleted', {
            position: "bottom-right",
            autoClose: 2000,
            draggable: true
        })
    }

  useEffect(() => {
    response();
  }, []);

  // Configuramos los columns para Datatable
  const columns = [
    {
        field: 'code_uid',
        headerName: "CODE",
        sortable: false,
        hide: true
    },
    {
      field: 'client_uid',
      headerName: "CLIENT",
      sortable: false,
      editable: true,
      flex: 1.2
    },
    {
      field: 'name',
      headerName: "NAME",
      editable: true,
      flex: 0.5
    },
    {
        field: 'description',
        headerName: "DESCRIPTION",
        flex: 1,
        editable: true
    },
    {
        field: 'actual_status',
        headerName: "STATUS",
        flex: 0.5,
        editable: true
    },
  ];

  return (
    <div className='divided'>
    <Scrollspy/>
    <div className="right">
    <ToastContainer/>
      <DataGrid
        checkboxSelection
        className="my-3 font-monospace"
        onSelectionModelChange={(ids) => {
            setselection(ids);
        }}
        onCellEditCommit={handleRowEditCommit}
        getRowId={(row) => row.code_uid}
        columns={columns}
        rows={projects}
        sx={{width: '82vw', height: '670px'}}
      />
    <button className='btn mb-2 btn-danger fw-bold' onClick={handleDelete}>
        Delete
    </button>
    <button className='d-inline btn mb-2 btn-warning fw-bold ms-5' onClick={handleDelete}>
    <Link className='nav-link' to='/dashboard/projects/add'>Go to Add Section</Link>
    </button>
    </div>
    </div>
  );
};

export default ProjectTableEdit;