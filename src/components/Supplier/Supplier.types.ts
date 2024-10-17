interface Item {
  m_id: number;
  Name: string;
  power: string;
  expiry: string;
  quantity?: number
}
export interface SupplierProps {
  id?: number;
  supplier: string;
  totalQuantity: number;
  Rating: number;
  items: Item[];
  selectedItemIds?: any,
  handleSelectItem?: any,
  handleSelectAllitems?: any,
  rejectionReason?:string
}
