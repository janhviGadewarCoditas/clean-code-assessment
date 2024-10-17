import { SupplierProps } from "../Supplier/Supplier.types";

export interface SupplierListProps {
  supplierList: SupplierProps[];
  selectedItemIds: any;
  handleSelectItem: any;
  handleSelectAllitems: any;
}
