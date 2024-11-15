import { cookies } from "next/headers";

export async function SetCookies({credential} : any){
    const cookieStore = await cookies();

    cookieStore.set('credential', credential)
}
export async function GetCookies({credential} : any){
    const cookieStore = await cookies();

    const hasCookies  = cookieStore.has(credential)
    return hasCookies ? hasCookies : false
}
export async function DeleteCookies({credential} : any){
    const cookieStore = await cookies();
    const isDeleted = cookieStore.delete(credential)
    return isDeleted ? isDeleted : false
}
