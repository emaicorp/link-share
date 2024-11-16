"use client";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, type QuerySnapshot, type DocumentData } from "firebase/firestore";
import { db } from "@/firebase.config";
import { useRouter } from "next/navigation";
import { GetCookies } from "@/lib/cookies";


interface Link {
  id: string;
  url: string;
  platform: string;
}

interface Credential {
  user: {
    uid: string;
  };
}

const useUserLinks = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const rawCredential = await GetCookies(); // raw string or null
        if (rawCredential) {
          let credential: Credential;

          try {
            credential = JSON.parse(rawCredential) as Credential; // Parse raw cookie
          } catch (e) {
            throw new Error("Invalid cookie format");
          }

          if (credential?.user?.uid) {
            const userId = credential.user.uid;
            console.log("User ID:", userId);

            const linksCollection = collection(db, "links");
            const q = query(linksCollection, where("userId", "==", userId));
            const unsubscribe = onSnapshot(
              q,
              (snapshot: typeof QuerySnapshot) => {
                const linksData = snapshot.docs.map((doc: typeof DocumentData) => ({
                  id: doc.id,
                  ...(doc.data() as Omit<Link, "id">),
                }));
                setLinks(linksData);
              }
            );

            return unsubscribe; // Return cleanup function
          } else {
            throw new Error("User not authenticated");
          }
        } else {
          throw new Error("No cookie found");
        }
      } catch (error: any) {
        setError(error.message || "Error fetching links");
        console.error("Error fetching links:", error);
        router.push("/"); // Redirect to login page if error occurs
      } finally {
        setLoading(false);
      }
    };

    const unsubscribePromise = fetchLinks();
    return () => {
      unsubscribePromise.then((unsubscribe) => unsubscribe && unsubscribe());
    };
  }, [router]);

  return { links, loading, error };
};

export { useUserLinks };
