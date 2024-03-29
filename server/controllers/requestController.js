const Request = require('../models/requestModel')
const mongoose = require("mongoose");
const {request} = require("express");

const CreateRequest = async (req, res) => {
    try {
        const userId = res.locals.payload.id;
        let data = req.body;
        data.user = userId
        const result = await Request.create(data)
        const request = await Request.findById(result._id).populate({ path: 'service', populate: { path: 'user' } }).populate('user')
        res.status(201).json({ status: 200, message: "Request Created Successfully", request: request })
    } catch (error){
        res.status(500).send('Internal Server Error');
        throw error;
    }
}

const Requests = async (req, res) => {
    try {
        const userId = res.locals.payload.id;
        const requests = await Request.find({ user: userId }).populate({ path: 'service', populate: { path: 'user' } }).populate('user')
        res.status(200).json({status: 200, message: "Requests Fetched Successfully", requests: requests})
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}

const ProviderRequests = async (req, res) => {
    try {
        const userId = res.locals.payload.id;
        const requests = await Request.find().populate({ path: 'service', match: { user: userId } }).populate('user')
        let reqs = requests.filter(value => value.service !== null);
        res.status(200).json({status: 200, message: "Requests Fetched Successfully", requests: reqs})
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
    Requests,
    ProviderRequests,
    UpdateRequest
}
