import React, {useEffect, useRef, useState} from 'react';
import {Modal} from "antd";
import {useDispatch} from "react-redux";
import {newRequest} from "../data/reducers/request";

const Providers = ({providers}) => {

    const [open, setOpen] = useState(false)
    const [requestData, setRequestData] = useState({ service: '', message: '', date: '' })

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setRequestData(r => ({...r, [e.target.name]: e.target.value}))
    }

    const handleSubmit = () => {
        dispatch(newRequest(requestData))
        const initialState = { service: '', message: '', date: '' }
        setRequestData(initialState)
        setOpen(!open)
    }

    const openDialog = (id) => {
        setOpen(!open)
        setRequestData(r => ({...r, service: id}))
    }

    return (
        <>
            <div className="container">
                <div className="row mx-auto mt-5">
                    {providers?.map(value => (
                        <div key={value._id} className="col-4">
                            <div className="my-2 bg-white shadow text-center py-4 rounded-3 justify-content-center">
                                <h4 className="fw-bold">{value.name}</h4>
                                <p>{value.email}</p>
                                <h5 className="fw-bold">Services:</h5>
                                {value.services.map(service => (
                                    <>
                                        <hr/>
                                    <div className="d-flex justify-content-between px-4">
                                        <h6>{service.name}</h6>
                                        <button type="button" className="btn btn-primary" onClick={() => openDialog(service._id)}>Request</button>
                                    </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal title="" centered open={open} footer={null} onCancel={() => setOpen(!open)}>
                <center>
                    <div className="row w-50 my-4">
                        <h3 className="fw-bold">Request Service</h3>
                        <textarea value={requestData.message} name="message" className="rounded-2 p-2 mt-2" style={{backgroundColor: "#f3f3f3"}}
                                  placeholder="Enter Message Here" aria-multiline={true}
                                  rows={3} onChange={(e) => handleChange(e)}/>
                        <input value={requestData.date} name="date" className="rounded-2 p-2 mt-3 border-1"
                               style={{backgroundColor: "#f3f3f3"}} type={"date"} placeholder="Date" onChange={(e) => handleChange(e)}/>

                    </div>
                    <button type="button" className="btn bg-black w-25 mx-1 mb-2 text-white" onClick={() => handleSubmit()}>Request</button>
                </center>
            </Modal>
        </>
    );
};

export default Providers;
