"use server"
import { cookies } from "next/headers";

export async function SetCookies({ credential }: { credential: string }) {
    const cookieStore = cookies();
    cookieStore.set('credential', credential, {
        path: '/', // Make the cookie available across the whole site
        httpOnly: false, // Allows JavaScript access (use true for security on sensitive data)
        secure: process.env.NODE_ENV === 'production', // Secure only in production
        sameSite: 'strict', // Prevents CSRF
        maxAge: 60 * 60 * 24 * 7, // Cookie expiration (7 days in seconds)
    });
}
export async function GetCookies() {
    const cookieStore = cookies();
    const cookieValue = cookieStore.get('credential');
    console.log("Retrieved Cookie Value:", cookieValue);
    return cookieValue ? cookieValue.value : null;
}

export async function DeleteCookies({ credential }: { credential: any }) {
    const cookieStore = cookies();
    const isDeleted = cookieStore.delete('credential');
    console.log("Cookie Deleted:", isDeleted);
    return isDeleted;
}

