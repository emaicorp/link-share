"use client";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  type QuerySnapshot,
  type DocumentData,
  doc,
  DocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase.config";
import { useRouter } from "next/navigation";
import { GetCookies, SetCookies } from "@/lib/cookies";
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
              (snapshot: typeof QuerySnapshot) => {
                const linksData = snapshot.docs.map(
                  (doc: typeof DocumentData) => ({
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
const UserDetails = () => {
  const [image, setImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(true);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoadingDetails(true);
      try {
        const Details = await GetCookies();
        if (!Details) {
          throw new Error("No cookie found");
        }

        const credential = JSON.parse(Details) as Credential;
        const { user } = credential;

        // Set up Firestore listener for user document
        const unsubscribe = onSnapshot(
          doc(db, 'users', user.uid),
          async (docSnapshot: DocumentSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              
              // Update states with latest data
              setImage(userData.photoURL || null);
              setDisplayName(userData.displayName || null);
              setEmail(userData.email || null);

              // Update cookie with new user data
              const updatedCredential = {
                ...credential,
                user: {
                  ...credential.user,
                  providerData: [{
                    ...credential.user.providerData[0],
                    photoURL: userData.photoURL || null,
                    displayName: userData.displayName || null,
                    email: userData.email || null
                  }]
                }
              };

              // Set the updated cookie
              await SetCookies({ 
                credential: JSON.stringify(updatedCredential) 
              });
            }
          },
          (error : Error) => {
            console.error("Error listening to user document:", error);
            setErrorDetails(error.message);
          }
        );

        // Initial setup from provider data
        const { providerData } = user;
        if (providerData && providerData.length > 0) {
          const profile = providerData[0];
          setImage(profile.photoURL || null);
          setDisplayName(profile.displayName || null);
          setEmail(profile.email || null);
        }

        // Cleanup function to unsubscribe from snapshot listener
        return () => unsubscribe();
      } catch (error: any) {
        setErrorDetails(error.message || "Error fetching user details");
        console.error("Error fetching user details:", error);
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchDetails();
  }, []); // Empty dependency array for single execution

  return { image, displayName, email, loadingDetails, errorDetails };
};

export { useUserLinks, UserDetails };
