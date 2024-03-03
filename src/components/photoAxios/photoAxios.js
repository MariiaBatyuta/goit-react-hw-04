import axios from "axios";

export const handlePhotoAPI = async (query, page = 1) => {
    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query,
                page,    
                per_page: 12,
            },
            headers: {
                Authorization: "Client-ID 9HrM0coriOgbUe8rYyeLo6-NR5_L7eDPPu9pZEt2o0M"
            }
        });
        
        return response.data.results; 
    } catch (error) {
        return error;
    }
}

