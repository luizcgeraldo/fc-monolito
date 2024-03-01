import Invoice from "../domain/invoice";


export default interface InvoiceGateway {
    create(input: Invoice): Promise<Invoice>;
    find(id: string): Promise<Invoice>;
}