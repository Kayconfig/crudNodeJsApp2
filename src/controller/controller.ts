import  { Request, Response } from "express";
import companyModel from "../model/companyModel";

let getAllCompanies = async (req: Request, res: Response) => {
    const companies = await companyModel.findAllCompanies();
    res.status(200).json({
      status: "successful",
      data: companies,
    });
  }

let getCompanyById = async (req: Request, res: Response) => {
    const company = await companyModel.findCompany(req.params.id);
    if (company) {
      res.status(200).json({
        status: "success!",
        data: company,
      });
    } else {
      res.status(404).json({
        status: "fail!",
        msg: "Request resource not found!",
      });
    }
  }

let addCompany = (req: Request, res: Response) => {
    try {
      const parsedData = req.body;
      if( Object.values(parsedData).length < 2){
          throw TypeError("Invalid Object")
      }
      const companyAdded = companyModel.addCompany(parsedData);
      if (companyAdded) {
        res.status(201).json({
          status: "success!",
          msg: "Company added successfully",
        });
      } else {
        res.status(403).json({
          status: "fail!",
          msg: "Error occurred while trying to add company.",
        });
      }
    } catch (err) {
      res.status(400).json({
        status: "error",
        msg: "Unable to parse invalid object.",
      });
    }
}

let updateCompanyById = (req: Request, res: Response) => {
    try {
      const parsedData = req.body;
      if( Object.values(parsedData).length < 2){
          throw TypeError("Invalid object")
      }
      const companyUpdated = companyModel.updateCompany(
        parsedData,
        req.params.id
      );
      if (companyUpdated) {
        res.status(201).json({
          status: "success!",
          msg: "Company updated successfully",
        });
      } else {
        res.status(403).json({
          status: "fail!",
          msg: "Unable to update. Company not in database.",
        });
      }
    } catch (err) {
      res.status(400).json({
        status: "error",
        msg: "Unable to parse invalid object.",
      });
    }
}

const deleteCompanyById = async (req: Request, res: Response) => {
    const companyDeleted = await companyModel.deleteCompany(req.params.id);
    if (companyDeleted) {
      res.status(200).json({
        status: "success!",
        msg: `deleted successfully.`,
      });
    } else {
      res.status(403).json({
        status: "fail!",
        msg: `Unable to delete, please ensure the correctness of the id.`,
      });
    }
  }

  export {
      addCompany,
      getCompanyById,
      getAllCompanies,
      updateCompanyById,
      deleteCompanyById
  }