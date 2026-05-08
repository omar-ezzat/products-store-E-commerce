import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const formatUserData = (userData) => {
  return {
    ...userData,
    createdAt: userData.createdAt?.toDate
      ? userData.createdAt.toDate().toISOString()
      : userData.createdAt || null,
  };
};

export const createUserDocument = async (user, extraData = {}) => {
  if (!user) return null;
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    const userData = {
      uid: user.uid,
      name: user.displayName || extraData.name || "",
      email: user.email,
      photoURL: user.photoURL || "",
      role: "customer",
      createdAt: serverTimestamp(),
      ...extraData,
    };
    await setDoc(userRef, userData);
    return {
      ...userData,
      createdAt: null,
    };
  }

  return formatUserData(userSnap.data());
};

export const getUserDocument = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null;
  }

  return formatUserData(userSnap.data());
};
