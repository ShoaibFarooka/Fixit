const Request = require('../models/requestModel')
const mongoose = require("mongoose");

const CreateRequest = async (req, res) => {
    try {
        const userId = res.locals.payload.id;
        let data = req.body;
        data.user = userId
        const request = await Request.create(data)
        res.status(201).json({ status: 200, message: "Request Created Successfully", request: request })
    } catch (error){
        res.status(500).send('Internal Server Error');
        throw error;
    }
}

const ProviderRequests = async (req, res) => {
    try {
        const userId = res.locals.payload.id;
        console.log(userId)
        const requests = await Request.find().populate({ path: 'service', match: { user: userId } }).populate('user')
        res.status(200).json({status: 200, message: "Requests Fetched Successfully", requests: requests})
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}

const UpdateRequest = async (req, res) => {
    try {
        const { request } = req.params
        const { status } = req.body
        const data = await Request.findByIdAndUpdate(request,{ status: status }, { new: true })
        res.status(201).json({ status: 200, message: "Request Updated Successfully", request: data })
    } catch (error){
        res.status(500).send('Internal Server Error');
        throw error;
    }
}

module.exports = {
    CreateRequest,
    ProviderRequests,
    UpdateRequest
}
