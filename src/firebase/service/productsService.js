

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

const productsCollection = collection(db, "products");

const formatProduct = (docItem) => {
  const data = docItem.data();

  return {
    id: docItem.id,
    ...data,
    createdAt: data.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : data.createdAt || null,
    updatedAt: data.updatedAt?.toDate
      ? data.updatedAt.toDate().toISOString()
      : data.updatedAt || null,
  };
};

export const getProducts = async () => {
  const q = query(productsCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(formatProduct);
};

export const getProductById = async (id) => {
  const productRef = doc(db, "products", id);
  const productSnap = await getDoc(productRef);

  if (!productSnap.exists()) {
    throw new Error("Product not found");
  }

  return formatProduct(productSnap);
};

export const addProduct = async (productData) => {
  const docRef = await addDoc(productsCollection, {
    title: productData.title,
    price: Number(productData.price),
    description: productData.description,
    category: productData.category,
    image: productData.image,
    rating: productData.rating || {
      rate: 0,
      count: 0,
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};

export const updateProduct = async (productId, productData) => {
  const productRef = doc(db, "products", productId);

  await updateDoc(productRef, {
    title: productData.title,
    price: Number(productData.price),
    description: productData.description,
    category: productData.category,
    image: productData.image,
    rating: productData.rating || {
      rate: 0,
      count: 0,
    },
    updatedAt: serverTimestamp(),
  });
};

export const deleteProduct = async (productId) => {
  const productRef = doc(db, "products", productId);
  await deleteDoc(productRef);
};

export const seedProductsFromFakeApi = async () => {
  const existingProducts = await getProducts();

  if (existingProducts.length > 0) {
    throw new Error("Products already exist in Firestore");
  }

  const response = await fetch("https://fakestoreapi.com/products");

  if (!response.ok) {
    throw new Error("Failed to fetch fake products");
  }

  const fakeProducts = await response.json();

  const createdProducts = await Promise.all(
    fakeProducts.map((product) =>
      addProduct({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: product.rating || {
          rate: 0,
          count: 0,
        },
      })
    )
  );

  return createdProducts;
};
