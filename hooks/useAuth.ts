import { useEffect, useState } from "react";
import { onAuthStateChanged} from "firebase/auth";
import { auth } from "../app/firebase.ts";

export function useAuth() {
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsub();

    }, []);

    return { user };
}
