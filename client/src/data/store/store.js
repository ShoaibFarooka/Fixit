import {configureStore} from "@reduxjs/toolkit";
import service from "../reducers/service";
import user from "../reducers/user";
import request from "../reducers/request";

const store = configureStore({
    reducer: {
        service: service,
        user: user,
        request: request
    }
})

export default store
