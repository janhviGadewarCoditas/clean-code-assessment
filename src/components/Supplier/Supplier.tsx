import { useState } from "react";
import styles from "./Supplier.module.scss";
import { SupplierProps } from "./Supplier.types";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const Supplier = ({
  supplier,
  Rating,
  items,
  selectedItemIds,
  handleSelectItem,
  handleSelectAllitems,
}: SupplierProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.Supplier}>
      <div className={styles.VisibleInfo}>
        <div className={styles.SupplierInfo}>
          <input
            className={styles.Checkbox}
            type="checkbox"
            checked={selectedItemIds.length === items.length}
            onChange={() => handleSelectAllitems(items)}
          />
          <span className={styles.SupplierName}>{supplier}</span>
          <span className={styles.Rating}>Rating: {Rating}</span>
        </div>
        <div
          className={styles.AccordionIcon}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? <FaAngleUp color="#219e4c9e"/> : <FaAngleDown color="#219e4c9e"/>}
        </div>
      </div>
      {isActive && (
        <div className={styles.InvisibleInfo}>
          {items.map((Item) => {
            const { m_id, Name, power, expiry } = Item;
            return (
              <div key={m_id} className={styles.itemsInfo}>
                <input
                  className={styles.Checkbox}
                  type="checkbox"
                  checked={selectedItemIds.includes(m_id)}
                  onChange={() => handleSelectItem(m_id)}
                />
                <div className={styles.ItemDetails}>
                  <span className={styles.Name}>{Name}</span>
                  <span className={styles.Power}>{power}</span>
                  <span className={styles.Expiry}>{expiry}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Supplier;
