const getInfo = async (uid : string ) => {
    try{
        const formData = new FormData();
        formData.append('uid', uid);
        const response = await fetch('/api/users', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error);
        
        return data;
    }catch(err){
        console.error(err);
    }

}

export {getInfo}