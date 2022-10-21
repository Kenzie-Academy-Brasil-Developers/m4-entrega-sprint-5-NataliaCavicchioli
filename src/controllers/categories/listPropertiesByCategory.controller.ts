import { Request, Response } from "express";
import listPropertiesByCategoryService from "../../services/categories/listPropertiesByCategory.service";

const listPropertiesByCategoryController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const propertyList = await listPropertiesByCategoryService(id);

  return res.status(200).json(propertyList);
};

export default listPropertiesByCategoryController;
