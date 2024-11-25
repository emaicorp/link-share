const UploadFile = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error);
        
        return data.url;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export { UploadFile };