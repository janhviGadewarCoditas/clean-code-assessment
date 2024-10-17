import { SupplierProps } from "../Supplier/Supplier.types"

export interface order {
    file: any,
    orderDetails: SupplierProps[],
    status: string,
    orderrId: number
}
export interface OrderProps {
    Orders: order[]
}