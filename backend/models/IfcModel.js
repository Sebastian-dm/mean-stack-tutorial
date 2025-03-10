// backend/models/IfcModel.js
const mongoose = require('mongoose');

const IfcModelSchema = new mongoose.Schema({
    fileName: String,
    properties: Object,
}, { timestamps: true });

const IfcModel = mongoose.model('IfcModel', IfcModelSchema);
module.exports = { IfcModel };