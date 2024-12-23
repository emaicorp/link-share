"use client";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  type QuerySnapshot,
  type DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase.config";
import { useRouter } from "next/navigation";
import { GetCookies } from "@/lib/cookies";
import { getAuth } from "firebase/auth";

interface Link {
  id: string;
  url: string;
  platform: string;
}

interface ProviderData {
  photoURL: string | null;
  displayName: string | null;
  email: string | null;
}

interface Credential {
  user: {
    uid: string;
    providerData: ProviderData[];
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

            const linksCollection = collection(db, "links");
            const q = query(linksCollection, where("userId", "==", userId));
            const unsubscribe = onSnapshot(
              q,
              (snapshot: QuerySnapshot<DocumentData>) => {
                const linksData = snapshot.docs.map(
                  (doc: QueryDocumentSnapshot<DocumentData>) => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Link, "id">),
                  })
                );
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
const UserDetails =  () => {
  const [image, setImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(true);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoadingDetails(true); // Set loading to true at the start
      const Details = await GetCookies(); // raw string or null
      if (!Details) {
        throw new Error("No cookie found"); // Handle null case
      }
      let credential: Credential;

      try {
        credential = JSON.parse(Details) as Credential; // Parse raw cookie

        const { user } = credential;
        const { providerData } = user;
        if (providerData && providerData.length > 0) {
          const profile = providerData[0]; // Assuming you want the first provider's data
          setImage(profile.photoURL || null);
          setDisplayName(profile.displayName || null);
          setEmail(profile.email || null);
        } else {
          setErrorDetails("No provider data available");
        }
      } catch (error: any) {
        setErrorDetails(error.message || "Error fetching user details");
      } finally {
        setLoadingDetails(false); // Ensure loading is set to false in the end
      }
    };

    const channel = new BroadcastChannel('cookie-change-channel');

    channel.onmessage = (event) => {
      if (event.data === 'cookieChanged') {
        fetchDetails(); // Re-fetch details when cookie changes
      }
    };

    fetchDetails(); // Initial fetch

    return () => {
      channel.close(); // Cleanup on unmount
    };
  }, []);

  return { image, displayName, email, loadingDetails, errorDetails };
};

export { useUserLinks, UserDetails };
