import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL ?? "/api"; 

export interface SiteContent {
    id: number;
    sectionKey: string;
    title: string;
    content: string;
    displayOrder: number;
}

export const fetchSiteContent = async (): Promise<SiteContent[]> => {
    const response = await axios.get<SiteContent[]>(`${API_URL}/content`);
    return response.data;
};


/**
 * prende il conetunto del tutto il sito
 */