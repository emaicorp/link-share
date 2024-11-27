import { initializeApp, getApps, getApp } from 'firebase-admin/app';
import admin from 'firebase-admin';

// If you want to load from a JSON file (development environment)


// Function to convert multiline private key properly
const convertKey = (key: string) => key.replace(/\\n/g, "\n");

if (!getApps().length) {
    // You can load credentials either from environment variables or directly from the service account JSON

    const cert = admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: convertKey(process.env.FIREBASE_PRIVATE_KEY as string),
    });
    console.log(process.env.NEXT_PUBLIC_PROJECT_ID)
    initializeApp({
        credential: cert,
        storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET || "link-share-3f8cf.appspot.com",
    });
} else {
    getApp(); // Firebase Admin has already been initialized
}

// POST request handler for user authentication
export async function POST(request: Request) {
    try {
        const body = await request.json(); // Parse JSON request body
        const uid = body.uid; // Extract UID from the JSON body

        if (!uid) {
            return new Response(JSON.stringify({ error: 'No UID provided' }), { status: 400 });
        }

        const user = await admin.auth().getUser(uid); // Fetch user by UID using Admin SDK
        return new Response(JSON.stringify(user), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
