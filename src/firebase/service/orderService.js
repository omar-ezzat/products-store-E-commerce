import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebaseConfig";

const ordersCollection = collection(db, "orders");

const formatOrder = (docItem) => {
  const data = docItem.data();

  return {
    id: docItem.id,
    ...data,
    createdAt: data.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : data.createdAt || null,
  };
};

export const createOrder = async (orderData) => {
  const docRef = await addDoc(ordersCollection, {
    ...orderData,
    status: "pending",
    paymentStatus: orderData.paymentStatus||"unpaid",
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

export const getUserOrders = async (userId) => {
  const q = query(
    ordersCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(formatOrder);
};

export const getAllOrders = async () => {
  const q = query(ordersCollection, orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map(formatOrder);
};

export const updateOrderStatus = async (orderId, status) => {
  const orderRef = doc(db, "orders", orderId);

  await updateDoc(orderRef, {
    status,
  });
};
