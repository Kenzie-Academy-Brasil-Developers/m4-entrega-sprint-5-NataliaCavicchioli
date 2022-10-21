import { Request, Response } from "express";
import createPropertyService from "../../services/properties/createProperty.service";

const createPropertyController = async (req: Request, res: Response) => {
  const data = req.body;

  const createdProperty = await createPropertyService(data);

  return res.status(201).json(createdProperty);
};

export default createPropertyController;
