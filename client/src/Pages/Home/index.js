import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchServices, fetchUserServices, resetService} from "../../data/reducers/service";
import {isAuthenticated} from "../../utils/authUtils";
import {useNavigate} from "react-router-dom";
import {Tabs} from "antd";
import Providers from "../../layouts/providers";
import TabPane from "antd/es/tabs/TabPane";
import Requests from "../../layouts/requests";
import userService from "../../services/userService";
import ProviderServices from "../../layouts/providerServices";
import ProviderRequests from "../../layouts/providerRequests";
import Cookies from "js-cookie";
import {fetchProviders, resetUsers} from "../../data/reducers/user";
import {getAllRequests, getProviderRequests, resetRequest} from "../../data/reducers/request";

const Home = () => {

    const auth = isAuthenticated();

    const [role, setRole] = useState(null)

    const response = useSelector(state => state.service)
    const userResponse = useSelector(state => state.user)
    const requestResponse = useSelector(state => state.request)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (role) {
            if (role === "service_provider") {
                if (!response.fetched) {
                    dispatch(fetchUserServices())
                    dispatch(getProviderRequests())
                }
            } else {
                if (!response.fetched) {
                    dispatch(fetchProviders())
                    dispatch(getAllRequests())
                }
            }
        }
    }, [role]);

    useEffect(() => {
        if (!auth) {
            navigate('/login', {replace: true})
        } else {
            const fetchRole = async () => {
                const r = await userService.getUserRole()
                setRole(r?.role)
            }
            fetchRole()
        }
    }, [auth]);

    const handleLogout = () => {
        Cookies.remove('fixit-jwt-token');
        dispatch(resetService())
        dispatch(resetRequest())
        dispatch(resetUsers())
        navigate('/login');
    };

    return (
        <>
            <div className="mx-5 mt-2 text-end">
                <button type="button" className="btn bg-black text-white px-5 mt-1" onClick={() => handleLogout()}>Logout</button>
                <div className="text-start">
                    {role === "service_provider" ?
                        <Tabs defaultActiveKey="services" centered={true} tabBarStyle={{}}>
                            <TabPane tab="Services" key="services"><ProviderServices
                                services={response.services}/></TabPane>
                            <TabPane tab="Requests" key="requests"><ProviderRequests requests={requestResponse.requests}/></TabPane>
                        </Tabs>
                        :
                        <Tabs defaultActiveKey="services" centered={true} tabBarStyle={{}}>
                            <TabPane tab="Service Providers" key="services"><Providers providers={userResponse.providers}/></TabPane>
                            <TabPane tab="My Requests" key="requests"><Requests requests={requestResponse.requests}/></TabPane>
                        </Tabs>
                    }
                </div>
            </div>
        </>
    );
};

export default Home;
