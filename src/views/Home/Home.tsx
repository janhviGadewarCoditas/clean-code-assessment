import { suppliers } from "../../components/Supplier/supplier.data";
import SupplierList from "../../components/SupplierList/SupplierList";
import { use } from "../../context/Context"
import TrackOrder from "../TrackOrder/TrackOrder"
import styles from "./CustomerPage.module.scss";
const Home = () => {
    const {
        selectedItemIds,
        isActive,
        handleSelectItem,
        handleSelectAllitems,
        handleViewOrder,
        btnText,
        showTrackOrder,
        hanldeTrackOrder
    } = use();


    const renderContent = () => {
        if (showTrackOrder) {
            return <TrackOrder />;
        } else {
            return (
                <div className={styles.CustomerView}>
                    <div className={styles.ViewOrder}>
                        {btnText === "Track Order" && <button onClick={hanldeTrackOrder}>Track Order</button>}
                        {isActive && <button onClick={handleViewOrder}>View Order</button>}
                    </div>
                    {/* view for the customer to see all the items */}
                    <div className={styles.SupplierList}>
                        <SupplierList
                            supplierList={suppliers}
                            selectedItemIds={selectedItemIds}
                            handleSelectItem={handleSelectItem}
                            handleSelectAllitems={handleSelectAllitems}
                        />
                    </div>
                </div>
            );
        }
    };
    return (
        <div className={styles.CustomerPage}>{renderContent()}</div>
    )
}
export default Home;