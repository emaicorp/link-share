import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Function to convert multiline private key properly
const formatPrivateKey = (key: string) => {
    return key.replace(/\\n/g, '\n');
}

export function initAdmin() {
    if (getApps().length === 0) {
        try {
            const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY || '');
            
            initializeApp({
                credential: cert({
                    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: privateKey,
                }),
                projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
            });
            
            // console.log('Firebase Admin initialized successfully');
        } catch (error) {
            // console.error('Firebase admin initialization error:', error);
            throw error;
        }
    }
    
    return getAuth();
} 