"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// import express, {Request, Response} from "express";
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const dbPath = path_1.default.resolve("./databases/db.json");
console.log(dbPath);
function ensureDataBaseExist() {
    try {
        fs_1.accessSync(dbPath);
    }
    catch (err) {
        fs_1.writeFileSync(dbPath, JSON.stringify([]));
    }
}
//get DataBase
function getDataBase() {
    ensureDataBaseExist();
    const companies = eval(JSON.parse(fs_1.readFileSync(dbPath, "utf8")));
    return companies;
}
function writeDataBase(companiesArray) {
    //ensure that database file exist.
    ensureDataBaseExist();
    fs_1.writeFileSync(dbPath, JSON.stringify(companiesArray, null, " "));
}
function processObj(obj) {
    const propertiesToRemove = ["id", "createdAt", "updatedAt"];
    return Object.fromEntries(Object.entries(obj).filter((arr) => !propertiesToRemove.includes(arr[0])));
}
function verifyObject(obj) {
    if (typeof obj !== "object") {
        return false;
    }
    const mustHaveProperties = [
        "organization",
        "products",
        "marketValue",
        "address",
        "ceo",
        "country",
        "employees",
    ];
    const objKeys = Object.keys(obj);
    if (mustHaveProperties.every((key) => objKeys.includes(key))) {
        return true;
    }
    else {
        return false;
    }
}
function findCompany(id) {
    return new Promise((resolve, reject) => {
        console.log("identification: ", id);
        const companies = getDataBase();
        let company = processObj(companies.find((company) => `${company.id}` == id) || {});
        if (Object.keys(company).length > 0) {
            resolve(company);
        }
        else {
            resolve(false);
        }
    }).catch(err => console.log(err));
}
function findAllCompanies() {
    return new Promise((resolve, reject) => {
        const companies = getDataBase();
        resolve(companies.map(processObj));
    }).catch(err => console.log(err));
}
function addCompany(obj) {
    if (verifyObject(obj)) {
        const companies = getDataBase();
        console.log("model.addCompany is called...");
        const id = uuid_1.v4();
        const createdAt = new Date(Date.now()).toISOString();
        const updatedAt = createdAt;
        obj.noOfEmployees = obj.employees.length;
        companies.push({
            ...obj,
            id,
            createdAt,
            updatedAt,
        });
        writeDataBase(companies);
        return true;
    }
    else {
        return false;
    }
}
function updateCompany(obj, id) {
    const companies = getDataBase();
    const objIndex = companies.findIndex((company) => `${company.id}` === id);
    console.log("object index: ", objIndex, id);
    //get object with the passed id
    const objInDb = companies.find((company) => company.id === id);
    console.log("updateCompany says: ", objInDb);
    if (objInDb) {
        //object exist in db
        const updatedAt = new Date(Date.now()).toISOString();
        obj.noOfEmployees = obj.employees.length;
        const updatedObj = {
            ...objInDb,
            ...obj,
            updatedAt,
        };
        companies.splice(objIndex, 1, updatedObj);
        writeDataBase(companies);
        return true;
    }
    else {
        return false;
    }
}
function deleteCompany(id) {
    return new Promise((resolve, reject) => {
        const companies = getDataBase();
        //if company not in database return false
        let companyIndex = companies.findIndex((company) => `${company.id}` === id);
        if (companyIndex > -1) {
            //delete the company
            companies.splice(companyIndex, 1);
            writeDataBase(companies);
            resolve(true);
            return;
        }
        else {
            resolve(false);
        }
    }).catch(err => {
        console.log(err);
        return false;
    });
}
function deleteAllCompany() {
    return new Promise((resolve, reject) => {
        //if company not in database return false
        try {
            const companies = getDataBase();
            companies.length = 0;
            resolve(true);
            writeDataBase(companies);
        }
        catch {
            resolve(false);
        }
    }).catch(err => false);
}
console.log("company models loaded");
module.exports = {
    findCompany,
    findAllCompanies,
    addCompany,
    updateCompany,
    deleteCompany,
    deleteAllCompany,
};
