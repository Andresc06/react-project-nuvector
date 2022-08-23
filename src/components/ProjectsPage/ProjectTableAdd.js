import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Scrollspy from "../LinkBars/Scrollspy";

const ProjectTableAdd = ({setAuth}) => {


    let [input, setInput] = useState({
        client: "",
        name: "",
        description: "",
        actual_status: ""
    });

    let { client, name, description, actual_status } = input;

    const [loading, setloading] = useState(false);

    
    const handleChange = (e) => { setInput({ ...input, [e.target.name]: e.target.value.toUpperCase() }); console.log(input)}
    const handleOption = (e) => setInput({ ...input, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        
        e.preventDefault();
    
        setloading(true);
    
        try {
            // Se toma todo de los inputs
            let body = { client, name, description, actual_status }

            if(!client || !name || !description || !actual_status) {

                setloading(false);
                
                return toast.error('Please enter valid data', {
                    position: "bottom-right",
                    autoClose: 2000,
                    draggable: true
                })
            }

            // se hace el fetch para la comunicacion con el backend
            await fetch("https://andresc06.herokuapp.com/dashboard/projects/add", {
                method: "POST",
                body: JSON.stringify(body),
                headers: { token: localStorage.token, "Content-Type": "application/json" },
            });
            setloading(false);

            return toast.success("Project Added", {
                position: "bottom-right",
                autoClose: 2000,
                draggable: true
            })
        } catch(error) {

            setloading(false)
        }
    }       
        

    return (
        <div className='divided'>
            <Scrollspy/>
            <ToastContainer/>
            <div className="right form">
            <h1 className="text-center my-5">Project Table Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="client"
                placeholder="Client Name"
                className="form-control w-50 mx-auto mt-3"
                onChange={handleChange}
                />
                <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-control w-50 mx-auto mt-3"
                onChange={handleChange}
                />
                <input
                type="text"
                name="description"
                placeholder="description"
                className="form-control w-50 mx-auto mt-3"
                onChange={handleChange}
                />
                <div className='w-50 mx-auto mt-3'>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="actual_status" value="active" onChange={handleOption}/>
                        <label className="form-check-label" for="active">Active</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="actual_status" value="inactive" onChange={handleOption}/>
                        <label className="form-check-label" for="inactive">Inactive</label>
                    </div>
                </div>

                <div className="d-grid gap-2 mt-2 w-50 mx-auto">
                    <button className="btn btn-dark">
                    {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Add Project"}
                    </button>
                </div>
            </form>
            </div>
        </div>
    )
};

export default ProjectTableAdd;