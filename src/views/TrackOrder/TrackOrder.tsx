import { useState } from "react";
import styles from "./TrackOrder.module.scss";
import { use } from "../../context/Context";
import { MdArrowBack } from "react-icons/md";

const TrackOrder = () => {
    const [orderId, setOrderId] = useState<number | null>(null);
    const [order, setOrder] = useState<any>(null);
    const { orders, setShowTrackOrder, setSelectedItemIds, setOrders } = use();

    const handleTrackOrder = () => {
        if (orderId !== null) {
            const foundOrder = orders.find((order) => order.orderrId === orderId);
            setOrder(foundOrder);
        }
    };

    const handleGoBack = () => {
        setShowTrackOrder(false);
        setSelectedItemIds([]);
    }

    const handleCancelOrder = (id: number) => {
        const foundOrder = orders.find((order) => order.orderrId === orderId);
        foundOrder.status = "Cancelled";
        console.log(foundOrder)
        setOrder(foundOrder);
        const updatedOrders = orders.map((order) =>
            order.orderrId === id ? { ...order, status: "Cancelled" } : order
        );
        setOrders(updatedOrders);
    }

    return (
        <div className={styles.TrackOrder}>
            <div className={styles.GoBack}>
                <span onClick={() => handleGoBack()}> <MdArrowBack fontSize={25} /></span>
            </div>
            <div className={styles.Main}>
                <div className={styles.UpperDiv}>
                    <p className={styles.p1}>Track your orders</p>
                    <span className={styles.p3}>with real-time updates </span>
                    <span className={styles.p4}>right at your</span>
                    <span className={styles.p5}>fingertips...</span>
                </div>
                <div className={styles.LowerDiv}>
                    <div className={styles.Form}>
                        <input
                            type="number"
                            placeholder="Enter Order Id"
                            value={orderId ?? ""}
                            onChange={(e) => setOrderId(parseInt(e.target.value))}
                        />
                        <button onClick={handleTrackOrder}>Search</button>
                    </div>
                    <h3>Order Details</h3>
                    {order ? (
                        <div className={styles.OrderDetails}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Item-Quantity</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{order.orderrId}</td>
                                        <td>
                                            {order.orderDetails.map((orderdetail: any) =>
                                                orderdetail.items.map((Item: any) => (
                                                    <div key={Item.m_id}>
                                                        <strong>{Item.Name}</strong> : {Item.quantity}
                                                    </div>
                                                ))
                                            )}
                                        </td>
                                        <td>
                                            {
                                                order.status === "Rejected" ? <div>Rejected - reason:{order.rejectionReason}</div> : <div>{order.status}</div>
                                            }
                                            </td>
                                        <td>
                                            {order.status === "Approved" || order.status === "Rejected" || order.status === "pending" || order.status === "Placed" ? (
                                                <button onClick={() => handleCancelOrder(order.orderrId)}>Cancel Order</button>
                                            ) : <div>Order Cancelled</div>}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        orderId !== null && <div>Order not found</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;
