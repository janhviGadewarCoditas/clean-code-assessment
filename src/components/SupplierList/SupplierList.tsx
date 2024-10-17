import Supplier from "../Supplier/Supplier";
import styles from "./SupplierList.module.scss";
import { SupplierListProps } from "./SupplierList.types";

const SupplierList = ({
  supplierList,
  selectedItemIds,
  handleSelectItem,
  handleSelectAllitems,
}: SupplierListProps) => {
  return (
    <div className={styles.SupplierList}>
      {supplierList.map((supplier) => {
        const supplierItemIds = supplier.items.map((m) => m.m_id);
        return (
          <Supplier
            key={supplier.supplier}
            supplier={supplier.supplier}
            totalQuantity={supplier.totalQuantity}
            Rating={supplier.Rating}
            items={supplier.items}
            selectedItemIds={selectedItemIds.filter((id: number) =>
              supplierItemIds.includes(id)
            )}
            handleSelectItem={handleSelectItem}
            handleSelectAllitems={handleSelectAllitems}
          />
        );
      })}
    </div>
  );
};

export default SupplierList;
