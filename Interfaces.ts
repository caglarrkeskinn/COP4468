export default interface Product {
  id: number;
  supplierId: any;
  categoryId: any;
  quantityPerUnit: any;
  unitPrice: any;
  unitsInStock: any;
  unitsOnOrder: any;
  reorderLevel: any;
  discontinued: boolean;
  name: string;
}
