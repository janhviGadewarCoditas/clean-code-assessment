import { useState } from "react";
import styles from "./UploadPres.module.scss";
import { UploadPresProps } from "./PlaceOrder.types";
import { IoCloseSharp } from "react-icons/io5";
import { use } from "../../context/Context";
import Counter from "../../components/Counter/Counter";

const PlaceOrder = ({ orderrs, handleSubmit, handleClose }: UploadPresProps) => {
    const [status, setStatus] = useState("");
    const { setSelectedItemIds, orders, handlePlaceOrder, setOrders, updateItemQuantity } = use();
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const file = formData.get('prescription');
        const data = { file };
        handlePlaceOrder(data);
        setOrders([...orders, data]);
        handleSubmit(data);
        setStatus("Order placed successfully");
        setSelectedItemIds([]);
    };

    const onIncrement = (id: number) => {
        const newQuantity = (quantities[id] || 0) + 1;
        setQuantities(prev => ({
            ...prev,
            [id]: newQuantity
        }));
        updateItemQuantity(id, newQuantity);
    };

    const onDecrement = (id: number) => {
        const newQuantity = Math.max((quantities[id] || 0) - 1, 0);
        setQuantities(prev => ({
            ...prev,
            [id]: newQuantity
        }));
        updateItemQuantity(id, newQuantity);
    };

    return (
        <div className={styles.UploadPres}>
            <div className={styles.CloseIcon} onClick={handleClose}><IoCloseSharp /></div>
            <div className={styles.itemsInfo}>
                <div className={styles.ItemList}>
                    {orderrs.map((order, index) => (
                        order.items.map((Item) => (
                            <div className={styles.Item} key={`${Item.Name}-${index}`}>
                                <div className={styles.ItemName}>{Item.Name}</div>
                                <div className={styles.CounterWrapper}>
                                    <Counter
                                        quantity={quantities[Item.m_id] || 1}
                                        onIncrement={() => onIncrement(Item.m_id)}
                                        onDecrement={() => onDecrement(Item.m_id)}
                                    />
                                </div>
                            </div>
                        ))
                    ))}
                </div>
            </div>
            <div className={styles.Form}>
                <form className={styles.PresForm} onSubmit={handleFormSubmit}>
                    {
                        status === "Order placed successfully" ?
                            <div className={styles.Status}>{status}</div> :
                            <>
                                <div className={styles.Input}>
                                    <label htmlFor="prescription">Upload Prescription</label>
                                    <input type="file" name="prescription" required />
                                </div>
                                <button type="submit">Place Order</button>
                            </>
                    }
                    {
                        orders && orders.length > 0 && status === "Order placed successfully" && (
                            <div className={styles.OrderId}>
                                <span>
                                    Your Order Id is
                                </span>
                                <span className={styles.Id}>  {orders[orders.length - 1].orderrId}</span>
                                <span>. Note it for future Reference.</span>
                            </div>
                        )
                    }

                </form>
            </div>
        </div>
    );
};

export default PlaceOrder;
