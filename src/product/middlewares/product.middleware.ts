import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

import { HttpResponse } from "../../shared/response/http.response";
import { ProductDTO } from "../dto/product.dto";

export class ProductMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  productValidator(req: Request, res: Response, next: NextFunction) {
    const { productName, description, category, price } = req.body;

    const valid = new ProductDTO();
    valid.productName = productName;
    valid.description = description;
    valid.category = category;
    valid.price = price;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
