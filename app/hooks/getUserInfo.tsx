const getInfo = async (uid: string) => {
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            // console.error('API Error:', errorData);
            return errorData
        }
        
        const data = await response.json();
        return data;
    } catch (err) {
        
        // console.error('getUserInfo error:', err);
        throw err; // Re-throw the error for handling by the caller
    }
}

export {getInfo}