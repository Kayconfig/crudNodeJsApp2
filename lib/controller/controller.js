"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompanyById = exports.updateCompanyById = exports.getAllCompanies = exports.getCompanyById = exports.addCompany = void 0;
const companyModel_1 = __importDefault(require("../model/companyModel"));
let getAllCompanies = async (req, res) => {
    const companies = await companyModel_1.default.findAllCompanies();
    res.status(200).json({
        status: "successful",
        data: companies,
    });
};
exports.getAllCompanies = getAllCompanies;
let getCompanyById = async (req, res) => {
    const company = await companyModel_1.default.findCompany(req.params.id);
    if (company) {
        res.status(200).json({
            status: "success!",
            data: company,
        });
    }
    else {
        res.status(404).json({
            status: "fail!",
            msg: "Request resource not found!",
        });
    }
};
exports.getCompanyById = getCompanyById;
let addCompany = (req, res) => {
    try {
        const parsedData = req.body;
        if (Object.values(parsedData).length < 2) {
            throw TypeError("Invalid Object");
        }
        const companyAdded = companyModel_1.default.addCompany(parsedData);
        if (companyAdded) {
            res.status(201).json({
                status: "success!",
                msg: "Company added successfully",
            });
        }
        else {
            res.status(403).json({
                status: "fail!",
                msg: "Error occurred while trying to add company.",
            });
        }
    }
    catch (err) {
        res.status(400).json({
            status: "error",
            msg: "Unable to parse invalid object.",
        });
    }
};
exports.addCompany = addCompany;
let updateCompanyById = (req, res) => {
    try {
        const parsedData = req.body;
        if (Object.values(parsedData).length < 2) {
            throw TypeError("Invalid object");
        }
        const companyUpdated = companyModel_1.default.updateCompany(parsedData, req.params.id);
        if (companyUpdated) {
            res.status(201).json({
                status: "success!",
                msg: "Company updated successfully",
            });
        }
        else {
            res.status(403).json({
                status: "fail!",
                msg: "Unable to update. Company not in database.",
            });
        }
    }
    catch (err) {
        res.status(400).json({
            status: "error",
            msg: "Unable to parse invalid object.",
        });
    }
};
exports.updateCompanyById = updateCompanyById;
const deleteCompanyById = async (req, res) => {
    const companyDeleted = await companyModel_1.default.deleteCompany(req.params.id);
    if (companyDeleted) {
        res.status(200).json({
            status: "success!",
            msg: `deleted successfully.`,
        });
    }
    else {
        res.status(403).json({
            status: "fail!",
            msg: `Unable to delete, please ensure the correctness of the id.`,
        });
    }
};
exports.deleteCompanyById = deleteCompanyById;
