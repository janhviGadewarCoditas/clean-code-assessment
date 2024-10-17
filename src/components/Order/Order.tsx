import styles from "./Order.module.scss";
import { OrderProps } from "./Order.types";
const Order = ({ Orders }: OrderProps) => {

    if (!Orders || Orders.length === 0) {
        return <div>Orders not available</div>;
    }

    return (
        <div className={styles.Order}>
            <div className={styles.HeaderRow}>
                <div className={styles.HeaderItem}>ID</div>
                <div className={styles.HeaderItem}>items</div>
            </div>
            {Orders.map((order, orderIndex) => (
                <div className={styles.OrderRow} key={orderIndex}>
                    <div className={styles.OrderId}>
                        <span>{order.orderrId}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Order;
