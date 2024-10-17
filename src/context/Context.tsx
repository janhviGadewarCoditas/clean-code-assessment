import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { suppliers } from "../components/Supplier/supplier.data"

interface ContextType {
  selectedItemIds: number[];
  setSelectedItemIds: any;
  isActive: boolean;
  showPopup: boolean;
  orders: any[];
  finalOrder: any[];
  handleSelectItem: (ItemId: number) => void;
  handleSelectAllitems: (items: { m_id: number }[]) => void;
  handleViewOrder: () => void;
  handlePlaceOrder: (data: any) => void;
  setShowPopup: (show: boolean) => void;
  btnText: string;
  setOrders: (orders: any[]) => void;
  showTrackOrder: boolean;
  setShowTrackOrder: any;
  hanldeTrackOrder: any;
  role: string;
  setRole: (role: string) => void;
  handleLogout: () => void;
  verify: boolean;
  setVerify: (verify: boolean) => void;
  updateItemQuantity: (ItemId: number, quantity: number) => void;
  showitems: boolean,
  setShowitems: any,
  showPres: boolean,
  setShowPres: any,
  submitReason: boolean,
  setSubmitReason: any,
  id: number,
  setid: any,
  reason: string,
  setReason: any
}

export const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [btnText, setBtnText] = useState("View Order");
  const [showTrackOrder, setShowTrackOrder] = useState(false);
  const [role, setRole] = useState("");
  const [verify, setVerify] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [showitems, setShowitems] = useState(false);
  const generateRandomNumber = () => Math.floor(Math.random() * 10000);
  const [showPres, setShowPres] = useState(false);
  const [submitReason, setSubmitReason] = useState(false);
  const [id, setid] = useState(0);
  const [reason, setReason] = useState("");
  useEffect(() => {
    setIsActive(selectedItemIds.length > 0);
  }, [selectedItemIds]);

  const handleSelectItem = (ItemId: number) => {
    setSelectedItemIds((prevSelectedItemIds) => {
      const newSelection = prevSelectedItemIds.includes(ItemId)
        ? prevSelectedItemIds.filter((id) => id !== ItemId)
        : [...prevSelectedItemIds, ItemId];

      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [ItemId]: newSelection.includes(ItemId) ? (prevQuantities[ItemId] || 0) : 0
      }));
      return newSelection;
    });
  };

  const handleSelectAllitems = (items: { m_id: number }[]) => {
    const ItemIds = items.map((Item) => Item.m_id);
    const allSelected = ItemIds.every((id) => selectedItemIds.includes(id));

    setSelectedItemIds((prevSelectedItemIds) =>
      allSelected
        ? prevSelectedItemIds.filter((id) => !ItemIds.includes(id))
        : [
          ...prevSelectedItemIds,
          ...ItemIds.filter((id) => !prevSelectedItemIds.includes(id)),
        ]
    );
  };

  const handleViewOrder = () => setShowPopup(true);
  const hanldeTrackOrder = () => setShowTrackOrder(true);

  const finalOrder = suppliers
    .map((supplier) => ({
      ...supplier,
      items: supplier.items.filter((Item) =>
        selectedItemIds.includes(Item.m_id)
      ).map((Item) => ({
        ...Item,
        quantity: quantities[Item.m_id] || 1,
      })),
    }))
    .filter((supplier) => supplier.items.length > 0);

  const handlePlaceOrder = (data: any) => {
    setOrders([...orders, { ...data, orderDetails: finalOrder, status: "pending", orderrId: generateRandomNumber() }]);
    setBtnText("Track Order");
    setQuantities({});
  };

  const handleLogout = () => {
    setSelectedItemIds([]);
    setIsActive(false);
    setShowPopup(false);
    setOrders([]);
    setBtnText("View Order");
    setShowTrackOrder(false);
    setRole("");
    setVerify(false);
  };

  const updateItemQuantity = (ItemId: number, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ItemId]: quantity,
    }));
  };

  return (
    <Context.Provider
      value={{
        selectedItemIds,
        setSelectedItemIds,
        isActive,
        showPopup,
        orders,
        finalOrder,
        handleSelectItem,
        handleSelectAllitems,
        handleViewOrder,
        handlePlaceOrder,
        setShowPopup,
        btnText,
        setOrders,
        showTrackOrder,
        setShowTrackOrder,
        hanldeTrackOrder,
        role,
        setRole,
        handleLogout,
        verify,
        setVerify,
        updateItemQuantity,
        showitems,
        setShowitems,
        showPres,
        setShowPres,
        submitReason,
        setSubmitReason,
        id,
        setid,
        reason,
        setReason
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const use = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('use must be used within a Provider');
  }
  return context;
};
