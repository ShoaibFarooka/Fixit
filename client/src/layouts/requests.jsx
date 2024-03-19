import React from 'react';
import {useDispatch} from "react-redux";
import {updateRequest} from "../data/reducers/request";
import moment from "moment/moment";

const Requests = ({requests}) => {

    const dispatch = useDispatch()

    const updateStatus = (id, status) => {
        dispatch(updateRequest({request: id, status: status}))
    }

    return (
        <>
            <div className="container">
                <div className="row mx-auto mt-4">
                    {requests.map(value => (
                        <div key={value._id} className="col-6">
                            <div className="my-2 bg-white shadow py-4 px-3 rounded-3 justify-content-center">
                                <div className="d-flex justify-content-between">
                                    <span>{value.service.name}</span>
                                    <span className="">{moment(value.date).format("ll")}</span>
                                </div>
                                <h5 className="fw-bold">{value.user.name}</h5>
                                <span>{value.message}</span>
                                <div className="d-flex justify-content-center mt-3">
                                    {value.status === 'Pending' ?
                                        <>
                                            <span className="fw-bolder text-black">Pending</span>
                                        </> :
                                        <>
                                            {value.status === "Accepted" ?
                                                <span className="fw-bolder text-success">Accepted</span>
                                                :
                                                <span className="fw-bolder text-danger">Rejected</span>
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Requests;
