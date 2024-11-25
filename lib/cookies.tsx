"use server"
import { cookies } from "next/headers";

export async function SetCookies({ credential }: { credential: string }) {
    try {
        const cookieStore = cookies();
        
        // Parse the credential to ensure it's valid JSON
        const parsedCredential = JSON.parse(credential);
        
        cookieStore.set({
            name: 'credential',
            value: JSON.stringify(parsedCredential), // Ensure the value is stringified
            path: '/',
            httpOnly: false,  // Set to true for security
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',  // Changed to 'lax' for better compatibility
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return { success: true };
    } catch (error) {
        console.error('Error setting cookie:', error);
        throw error;
    }
}
export async function GetCookies() {
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get('credential');
    // console.log("Retrieved Cookie Value:", cookieValue);
    return cookieValue ? cookieValue.value : null;
}

export async function DeleteCookies({ credential }: { credential: any }) {
    const cookieStore = cookies();
    const isDeleted = cookieStore.delete('credential');
    console.log("Cookie Deleted:", isDeleted);
    return isDeleted;
}

