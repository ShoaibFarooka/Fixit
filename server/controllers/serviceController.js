const Service = require('../models/serviceModel')

const CreateService = async (req, res) => {
    try {
        const userId = res.locals.payload.id;
        let data = req.body;
        data.user = userId
        const service = await Service.create(data);
        res.status(201).json({ status: 200, message: "Services Fetched Successfully", service: service })
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}

const GetServices = async (req, res) => {
    try {
        const services = await Service.find({})
        res.status(200).json({ status: 200, message: "Services Fetched Successfully", services: services })
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}

const GetProvidersServices = async (req, res) => {
    try {
        const userId = res.locals.payload.id;
        const services = await Service.find({ user: userId })
        res.status(200).json({ status: 200, message: "Services Fetched Successfully", services: services })
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}

const GetServicesByProvider = async (req, res) => {
    try {
        const { user } = req.params
        const services = await Service.find({ user: user })
        res.status(200).json({ status: 200, message: "Services Fetched Successfully", services: services })
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}

module.exports = {
    CreateService,
    GetServices,
    GetProvidersServices,
    GetServicesByProvider
}
