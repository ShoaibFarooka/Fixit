import React, {useState} from 'react';
import {Modal} from "antd";
import {useDispatch} from "react-redux";
import {addService} from "../data/reducers/service";

const ProviderServices = ({services}) => {

    const [open, setOpen] = useState(false)
    const [service, setService] = useState({ name: '', details: '' })

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setService(s => ({...s, [e.target.name]: e.target.value}))
    }

    const handleSubmit = () => {
        dispatch(addService(service))
        setOpen(!open)
    }

    return (
        <>
            <div className="container">
                <button type="button" className="btn bg-black mx-3 mb-2 text-white px-5 mt-3" onClick={() => setOpen(!open)}>Add Service</button>
                <div className="row mx-auto mt-4">
                    {services.map(value => (
                        <div key={value._id} className="col-4">
                            <div className="my-2 bg-white shadow text-center py-4 rounded-3 justify-content-center">
                                <h4 className="fw-bold">{value.name}</h4>
                                <p>{value.details}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal title="" centered open={open} footer={null} onCancel={() => setOpen(!open)}>
                <center>
                    <div className="row w-50 my-4">
                        <h3 className="fw-bold">Add Service</h3>
                        <input name="name" className="rounded-2 p-2 mt-3 border-1" onChange={(e) => handleChange(e)}
                               style={{backgroundColor: "#f3f3f3"}} type={"text"} placeholder="Service Title"/>
                        <textarea name="details" className="rounded-2 p-2 mt-2" style={{backgroundColor: "#f3f3f3"}}
                                  placeholder="Service Details" aria-multiline={true} onChange={(e) => handleChange(e)}
                                  rows={3}/>
                    </div>
                    <button type="button" className="btn bg-black w-25 mx-1 mb-2 text-white" onClick={() => handleSubmit()}>Save</button>
                </center>
            </Modal>
        </>
    );
};

export default ProviderServices;
