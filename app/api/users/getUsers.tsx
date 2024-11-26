"use server"
import admin from 'firebase-admin'; // Import the Admin SDK

export async function POST(request : Request) {
    // Initialize the Admin SDK (make sure to do this in your server-side code)
admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Use your preferred method for credentials
  });
    try {
        const formData = await request.formData();
        const file = formData.get('uid') as String;
        
        if (!file) {
            return Response.json({ error: 'No Uid provided' }, { status: 400 });
        }
      const user = await admin.auth().getUser(`${file}`); // Fetch user by UID using Admin SDK
      return user.toJSON(); // Store user data
    } catch (err : any) {
      return err.message
    } 
}