// import express, {Request, Response} from "express";
import {writeFileSync, readFileSync, accessSync} from "fs"
import { OrganizationInterface } from "../interface/interface";
import path from "path";
import {v4 as uuidv4} from "uuid"

const dbPath = path.resolve("./databases/db.json");
console.log( dbPath );

function ensureDataBaseExist(){
    try{
        accessSync(dbPath);
        
    }catch(err){
        writeFileSync(dbPath, JSON.stringify([]));
    }
}

//get DataBase
function getDataBase(): Array<OrganizationInterface>{
   ensureDataBaseExist();
    const companies = eval(  JSON.parse(readFileSync(dbPath, "utf8")) );
    return companies;
}

function writeDataBase(companiesArray: Array<any>){
    //ensure that database file exist.
    ensureDataBaseExist();
    writeFileSync( dbPath , 
        JSON.stringify(
            companiesArray,
            null,
            " "));
}


function processObj(obj: any) {
  const propertiesToRemove = ["id", "createdAt", "updatedAt"];
  return Object.fromEntries(
    Object.entries(obj).filter((arr) => !propertiesToRemove.includes(arr[0]))
  );
}

function verifyObject(obj: any): boolean {
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
  if (
    mustHaveProperties.every((key) => objKeys.includes(key))
  ) {
    return true;
  } else {
    return false;
  }
}


function findCompany(id: string) {
  return new Promise((resolve, reject) => {
    console.log("identification: ",id)
      const companies = getDataBase();
    let company = processObj(
      companies.find((company) => `${company.id}` == id) || {}
    );
    if (Object.keys(company).length > 0) {
      resolve(company);
    } else {
      resolve(false);
    }
  }).catch(err=> console.log(err));
}

function findAllCompanies() {
  return new Promise((resolve, reject) => {
    const companies = getDataBase();
    resolve(companies.map(processObj));
  }).catch(err => console.log(err));
}

function addCompany(obj: any): boolean {
  if (verifyObject(obj)) {
    const companies = getDataBase();
    console.log("model.addCompany is called...")
    const id = uuidv4();
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
  } else {
    return false;
  }
}

function updateCompany(obj: (OrganizationInterface|any), id: string): boolean {
  const companies = getDataBase();
  const objIndex = companies.findIndex((company) => `${company.id}` === id);
  //get object with the passed id
  const objInDb = companies.find((company) => company.id === id);
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
  } else {
    return false;
  }
}

function deleteCompany(id: string) {
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
    } else {
      resolve(false);
    }
  }).catch( err => {
    console.log(err)
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
      writeDataBase(companies)  ;
    } catch {
      resolve(false);
    }
  }).catch(err => false);
}

export = {
  findCompany,
  findAllCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
  deleteAllCompany,
};
