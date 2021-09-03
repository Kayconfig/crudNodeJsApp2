import express, { Request, Response } from "express";
import {
  addCompany,
  getCompanyById,
  getAllCompanies,
  deleteCompanyById,
  updateCompanyById,
} from "../controller/controller";

const router = express.Router();

//listen for homeUrl
router.get("/", getAllCompanies);
router.get("/:id", getCompanyById);
router.get("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    data: "invalid route, please use /company/{id} or /company with GET request.",
  });
});

router.post("/", addCompany);
router.post("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    data: "invalid route, please use /company with POST request",
  });
});

router.put("/:id", updateCompanyById);
router.put("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    data: "invalid route, please use /company/{id} with PUT request method",
  });
});

router.delete("/:id", deleteCompanyById);
//HANDLE OTHER HHT REQUEST METHODS.
router.delete("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    data: "invalid route, please use /company/{id} with DELETE request method",
  });
});

export default router;
