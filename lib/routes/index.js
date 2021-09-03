"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller/controller");
const router = express_1.default.Router();
//listen for homeUrl
router.get("/", controller_1.getAllCompanies);
router.get("/:id", controller_1.getCompanyById);
router.get("*", (req, res) => {
    res.status(404).json({
        status: "fail",
        data: "invalid route, please use /company/{id} or /company with GET request.",
    });
});
router.post("/", controller_1.addCompany);
router.post("*", (req, res) => {
    res.status(404).json({
        status: "fail",
        data: "invalid route, please use /company with POST request",
    });
});
router.put("/:id", controller_1.updateCompanyById);
router.put("*", (req, res) => {
    res.status(404).json({
        status: "fail",
        data: "invalid route, please use /company/{id} with PUT request method",
    });
});
router.delete("/:id", controller_1.deleteCompanyById);
//HANDLE OTHER HHT REQUEST METHODS.
router.delete("*", (req, res) => {
    res.status(404).json({
        status: "fail",
        data: "invalid route, please use /company/{id} with DELETE request method",
    });
});
exports.default = router;
