import express, { Request, Response } from "express";

import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import { AddProductFacadeInputDto } from "../../../modules/product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";
import {
    FindProductInputDto,
    FindProductOutputDto
} from "../../../modules/store-catalog/usecase/find-product/find-product.dto";

export const productsRoute = express.Router();

productsRoute.post("/", async (request: Request, response: Response) => {
    const facade = ProductAdmFacadeFactory.create();

    try {
        const { id, name, description, stock, purchasePrice } = request.body;

        const productDto: AddProductFacadeInputDto = {
            id,
            name,
            description,
            stock,
            purchasePrice,
        };

        await facade.addProduct(productDto);

        response.status(201).send();
    } catch (error) {
        response.status(400).send(error);
    }
});

export const storeCatalogRoute = express.Router();

storeCatalogRoute.get("/", async (request: Request, response: Response) => {
    const facade = StoreCatalogFacadeFactory.create();

    try {
        const  id = request.body.id;
        const name = request.body.name;
        const description = request.body.description;
        const salesPrice = request.body.salesPrice;

        const findProductsDto: FindProductInputDto = {
            id
        }

        const findProductsOutputDto: FindProductOutputDto = {
            id,
            name,
            description,
            salesPrice
        }

        await facade.find(findProductsDto);
        response.status(200).send();

        await facade.find(findProductsOutputDto);
        response.status(200).send();

    }catch (error) {
        response.status(400).send(error);
    }

})