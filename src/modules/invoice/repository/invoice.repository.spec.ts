import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import Product from "../domain/product";
import InvoiceModel from "./invoice.model";
import { Address } from "../domain/address.value-object";
import InvoiceRepostiory from "./invoice.repository";
import ProductModel from "./product.model";
import InvoiceProductModel from "./invoice-product.model";

describe("InvoiceRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([InvoiceModel, InvoiceProductModel, ProductModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("creates an invoice", async () => {

        let address = new Address({
            street: "Rua 123",
            number: "99",
            complement: "Casa Verde",
            city: "Lonrina",
            state: "Pr",
            zipCode: "88888-888",
        });

        const invoice = new Invoice({
            id: new Id("1"),
            name: "invoice name",
            document: "5231632033",
            address: address,
            items: [
                new Product({
                    id: new Id("1"),
                    name: "product A",
                    price: 200
                }),
                new Product({
                    id: new Id("2"),
                    name: "product B",
                    price: 400
                })
            ]
        });

        const repository = new InvoiceRepostiory();
        const result = await repository.create(invoice);

        expect(result.id.id).toBe(invoice.id.id);
        expect(result.name).toBe(invoice.name)
        expect(result.document).toBe(invoice.document)
        expect(result.address).toBe(invoice.address)
        expect(result.items).toBe(invoice.items)
    });
});