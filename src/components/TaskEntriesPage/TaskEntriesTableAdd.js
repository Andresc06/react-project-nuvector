import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Scrollspy from "../LinkBars/Scrollspy";

const TaskEntriesTableAdd = ({setAuth}) => {

    let [input, setInput] = useState({
        contractor: "",
        date: "",
        duration: "",
        bill: false,
        activity: "",
        project: "",
        product: "",
        category: "",
        task_description: ""

    });

    let { contractor, date, duration, bill, activity, project, product, category, task_description } = input;

    const [loading, setloading] = useState(false);

    
    const handleChange = (e) => {setInput({ ...input, [e.target.name]: e.target.value.toUpperCase() });
    console.log(input)
    }
    const handleSubmit = async (e) => {
        
        e.preventDefault();
    
        setloading(true);
    
        try {

            if(!contractor || !date || !duration || !bill || ! activity || !project || !product || !category || !task_description) {

                setloading(false);

                return toast.error('Please enter valid data', {
                    position: "bottom-right",
                    autoClose: 2000,
                    draggable: true
                })
            }

            if(bill === 'TRUE') bill = true;
            else bill = false;
    
            // Se toma todo de los inputs
            let body = { contractor, date, duration, bill, activity, project, product, category, task_description }
    
            // se hace el fetch para la comunicacion con el backend
            await fetch("https://andresc06.herokuapp.com/dashboard/task_entries/add", {
                method: "POST",
                body: JSON.stringify(body),
                headers: { token: localStorage.token, "Content-Type": "application/json" },
            });
            setloading(false);

            return toast.info("If you put the correct IDS, see your task in the Show section!", {
                position: "bottom-right",
                autoClose: 2000,
                draggable: true
            })
        } catch(error) {

            setloading(false)
            return toast.error('Please enter valid data', {
                position: "bottom-right",
                autoClose: 2000,
                draggable: true
            })
        }
    }       
        

    return (
        <div className='divided'>
            <Scrollspy/>
            <ToastContainer/>
            <div className="right form">
            <h1 className="text-center my-5">Task Entries Table Form</h1>
            <form onSubmit={handleSubmit}>
             
                <input
                type="text"
                name="contractor"
                placeholder="Contractor ID"
                className="form-control w-50 mx-auto mt-3"
                onChange={handleChange}
                />
                <input
                type="date"
                name="date"
                placeholder="Entry date"
                className="form-control w-50 mx-auto text-center mt-3"
                onChange={handleChange}
                />
                <input
                type="number"
                step="0.1"
                name="duration"
                placeholder="Duration (hrs)"
                className="form-control w-50 mx-auto text-center mt-3"
                onChange={handleChange}
                />
                <input
                type="text"
                name="activity"
                placeholder="Activity ID"
                className="form-control w-50 mx-auto mt-3"
                onChange={handleChange}
                />
                <input
                type="text"
                name="project"
                placeholder="Project ID"
                className="form-control w-50 mx-auto mt-3"
                onChange={handleChange}
                />
                <input
                type="text"
                name="product"
                placeholder="Product ID"
                className="form-control w-50 mx-auto mt-3"
                onChange={handleChange}
                />
                <input
                type="text"
                name="category"
                placeholder="Category ID"
                className="form-control w-50 mx-auto mt-3"
                onChange={handleChange}
                />
                <input
                type="text"
                name="task_description"
                placeholder="Task Description"
                className="form-control w-50 mx-auto mt-3"
                onChange={handleChange}
                />
                <div className='w-50 mx-auto mt-3'>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="bill" value={true} onChange={handleChange}/>
                        <label className="form-check-label" for="bill">Billable</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="bill" value={false} onChange={handleChange}/>
                        <label className="form-check-label" for="bill">No Billable</label>
                    </div>
                </div>

                <div className="d-grid gap-2 mt-2 w-50 mx-auto">
                    <button className="btn btn-dark">
                    {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Add Task"}
                    </button>
                </div>
            </form>
            </div>
        </div>
    )
};

export default TaskEntriesTableAdd;