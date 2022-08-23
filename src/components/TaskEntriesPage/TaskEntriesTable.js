import React, { useState, useEffect } from "react";
import {DataGrid} from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import Scrollspy from "../LinkBars/Scrollspy";



const TaskEntriesTable = ({setAuth}) => {
  // Configurar los hooks
  const [TaskEntries, setTaskEntries] = useState([]);

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

  useEffect(() => {
    response();
  }, []);

  // Configuramos los columns para Datatable
  const columns = [
    {
      field: 'entry_code',
      headerName: "ID",
      sortable: false,
      flex: 0.1
    },
    {
      field: 'contractor',
      headerName: "CONTRACTOR",
      flex: 0.85
    },
    {
        field: 'entry_date',
        headerName: "ENTRY DATE",
        type: 'date',
        flex: 0.85
    },
    {
        field: 'bill_flag',
        headerName: "BILL",
        width: 60,
        flex: 0.5
    },
    {
        field: 'duration',
        headerName: "HRS",
        width: 25,
        flex: 0.5
    },
    {
        field: 'project',
        headerName: "PROJECT",
        flex: 0.6
    },
    {
        field: 'client',
        headerName: "CLIENT",
        flex: 1.3
    },
    {
        field: 'activity',
        headerName: "ACTIVITY",
        flex: 1.3
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
        flex: 1.4
    }
  ];

  return (
    <div className='divided'>
    <Scrollspy/>
    <div className="right m-2">
      <DataGrid 
        className="my-3 font-monospace"
        onCellEditCommit
        getRowId={(row) => row.entry_code}
        rows={TaskEntries}
        columns={columns}
        sx={{width: '83vw', height: '660px'}}
      />
      <button className='btn btn-info m-1 text-white'>
    <Link className='nav-link' to='/dashboard/task_entries/edit'>Go to Edit Page</Link>
    </button>
    </div>
    </div>
  );
};

export default TaskEntriesTable;
