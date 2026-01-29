import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

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
