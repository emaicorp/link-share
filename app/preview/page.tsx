"use client"
import React from 'react'
import { PreviewNavBar } from '@/components/ui/navBar/previewNavBar'
import { useState, useEffect } from 'react'
import { GetCookies } from '@/lib/cookies'
import { getAuth } from 'firebase/auth'
// import { useParams } from 'react-router-dom';
import admin from 'firebase-admin'; // Import the Admin SDK

// Initialize the Admin SDK (make sure to do this in your server-side code)
admin.initializeApp({
  credential: admin.credential.applicationDefault(), // Use your preferred method for credentials
});

const Page = () => {
  // const { userId } = useParams<{ userId?: string }>(); // Get userId from URL
  const [userRecord, setUserRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async (uid: string) => {
      try {
        const user = await admin.auth().getUser("jgKXnUXvWoT5Vn2BsQu3e5jpFyj2"); // Fetch user by UID using Admin SDK
        setUserRecord(user.toJSON()); // Store user data
      } catch (err : any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // if (userId) {
    //   fetchUserDetails(userId); // Fetch user details using userId from URL
    // } else {
    //   // Handle case where userId is not provided
    //   setError("User ID is required.");
    //   setLoading(false);
    // }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User Profile</h1>
      {userRecord && (
        <div>
          <p>Name: {userRecord.displayName}</p>
          <p>Email: {userRecord.email}</p>
          <p>User ID: {userRecord.uid}</p>
          {/* Add more user details as needed */}
        </div>
      )}
    </div>
  );
};

export default Page;