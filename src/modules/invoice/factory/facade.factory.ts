import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecases/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecases/generate-invoice/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
    static create(): InvoiceFacade {
        const invoiceRepository = new InvoiceRepository();

        const findUseCase = new FindInvoiceUseCase(invoiceRepository);
        const generateUseCase = new GenerateInvoiceUseCase(invoiceRepository);

        const facade = new InvoiceFacade({
            findUseCase: findUseCase,
            generateUseCase: generateUseCase,
        });

        return facade;
    }
}