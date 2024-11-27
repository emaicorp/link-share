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
            throw new Error(errorData.error || 'Failed to fetch user info');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}

export {getInfo}