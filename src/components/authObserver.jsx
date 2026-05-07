import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";
import { setUser, clearUser } from "../Redux/auth/authSlice"
import { getUserDocument } from "../firebase/service/userService";
function AuthObserver() {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {

                const userData = await getUserDocument(user.uid)

                if (userData) {
                    dispatch(setUser(userData))
                } else {
                    dispatch(
                        setUser({
                            uid: user.uid,
                            name: user.displayName,
                            email: user.email,
                            photoURL: user.photoURL,
                            role: "customer",
                        })
                    );
                }
            } else {
                dispatch(clearUser());
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    return null;
}

export default AuthObserver;
