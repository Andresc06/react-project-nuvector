import React, { useState, useEffect } from "react";
import {DataGrid} from '@mui/x-data-grid';
import { ToastContainer, toast } from 'react-toastify';
import Scrollspy from "../LinkBars/Scrollspy";
import { Link } from "react-router-dom";



const TaskEntriesTableEdit = ({setAuth}) => {
  // Configurar los hooks
  const [TaskEntries, setTaskEntries] = useState([]);
  const [selection, setselection] = useState([]);

  // Funcion para mostrar los datos con fetch
  const response = async () => {
    await fetch("https://andresc06.herokuapp.com/dashboard/task_entries", {
      method: "GET",
      headers: { token: localStorage.token }
    }).then((response) => {
      response
        .json()
        .then((json) => {
          setTaskEntries(json);
        })
        .catch((error) => console.log(error));
    });
  };
  const mutateRow = async (id, field, value) => {

    try {

    let url = "https://andresc06.herokuapp.com/dashboard/task_entries/" + id + "/edit"

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

      mutateRow( id, field, value )
    }, []);

    const handleDelete = async () => {

        try {

            selection.map(async (id) => {

                try {
                let url = "https://andresc06.herokuapp.com/dashboard/task_entries/" + id + "/delete"

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

        return toast.success('Chore Deleted', {
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
        field: 'entry_code',
        headerName: "ID",
        sortable: false,
        hide: true,
        flex: 0.2
      },
      {
        field: 'contractor',
        headerName: "CONTRACTOR",
        flex: 0.8
      },
      {
          field: 'entry_date',
          headerName: "ENTRY DATE",
          type: 'date',
          flex: 0.8,
          editable: true
      },
      {
          field: 'bill_flag',
          headerName: "BILL",
          sortable: false,
          width: 60,
          flex: 0.5,
          editable: true
      },
      {
          field: 'duration',
          headerName: "HRS",
          sortable: false,
          width: 25,
          flex: 0.4,
          editable: true
      },
      {
          field: 'project',
          headerName: "PROJECT",
          flex: 0.5
      },
      {
          field: 'client',
          headerName: "CLIENT",
          flex: 1
      },
      {
          field: 'activity',
          headerName: "ACTIVITY",
          flex: 1
      },    
      {
          field: 'product',
          headerName: "PRODUCT",
          flex: 1
      },
      {
          field: 'category',
          headerName: "CATEGORY",
          flex: 1
      },
      {
          field: 'task_description',
          headerName: "TASK",
          flex: 1.5,
          editable: true
      }
  ];

  return (
    <div className='divided'>
    <Scrollspy/>
    <div className="right">
    <ToastContainer/>
      <DataGrid 
        className="my-3 font-monospace"
        checkboxSelection
        onSelectionModelChange={(ids) => {
            setselection(ids);
        }}
        onCellEditCommit={handleRowEditCommit}
        getRowId={(row) => row.entry_code}
        rows={TaskEntries}
        columns={columns}
        sx={{width: '82vw', height: '670px'}}
      />
      <button className='btn mb-2 btn-danger fw-bold' onClick={handleDelete}>
        Delete
      </button>
      <button className='d-inline btn mb-2 btn-warning fw-bold ms-5' onClick={handleDelete}>
        <Link className='nav-link' to='/dashboard/task_entries/add'>Go to Add Section</Link>
      </button>
    </div>
    </div>
  );
};

export default TaskEntriesTableEdit;
