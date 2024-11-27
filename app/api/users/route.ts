import { initAdmin } from "@/app/lib/firebaseAdmin";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const uid = body.uid;

        if (!uid) {
            return new Response(JSON.stringify({ error: 'No UID provided' }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const auth = initAdmin();
        try {
            const user = await auth.getUser(uid);
            return new Response(JSON.stringify(user), { 
                status: 200, 
                headers: { 'Content-Type': 'application/json' } 
            });
        } catch (userError: any) {
            if (userError.code === 'auth/user-not-found') {
                return new Response(JSON.stringify({ error: 'User not found' }), { 
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            throw userError; // Re-throw other auth errors to be caught by outer catch
        }
    } catch (err: any) {
        // console.error('Error fetching user:', err);
        return new Response(JSON.stringify({ error: err.message }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
