// backend/controllers/ifcController.js
const fs = require('fs');
const path = require('path');
const IfcAPI = require('web-ifc').IfcAPI;
const { IfcModel } = require('../models/IfcModel');

const uploadIFC = async (req, res) => {
    if (!req.files || !req.files.ifcFile) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const file = req.files.ifcFile;
    const filePath = path.join(__dirname, '../uploads', file.name);
    
    file.mv(filePath, async err => {
        if (err) {
            return res.status(500).json({ message: 'File upload failed', error: err });
        }
        
        const ifcAPI = new IfcAPI();
        ifcAPI.Init();
        
        const buffer = fs.readFileSync(filePath);
        const modelID = ifcAPI.OpenModel(buffer);
        const properties = ifcAPI.GetAllProperties(modelID);
        
        const newModel = new IfcModel({
            fileName: file.name,
            properties
        });
        await newModel.save();
        
        res.json({ message: 'IFC file uploaded successfully', modelID });
    });
};

const compareIFC = async (req, res) => {
    const { model1Id, model2Id } = req.body;
    if (!model1Id || !model2Id) {
        return res.status(400).json({ message: 'Both model IDs are required' });
    }
    
    const model1 = await IfcModel.findById(model1Id);
    const model2 = await IfcModel.findById(model2Id);
    if (!model1 || !model2) {
        return res.status(404).json({ message: 'One or both models not found' });
    }
    
    const differences = {}; // Implement IFC comparison logic here
    res.json({ message: 'Comparison complete', differences });
};

module.exports = { uploadIFC, compareIFC };