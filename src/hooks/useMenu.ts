import { useQuery } from "@tanstack/react-query";
import moviesApiClient from "../services/moviesApiClient";


interface MenuItem {
    id: string;
    name: string;
    url: string;
    show_loggedin_user: number;

}

const fetchMenu = async (): Promise<MenuItem[]> => {
    const response = await moviesApiClient.get("/menulist");

    if (!response.data || !response.data.data) {
        throw new Error("Invalid API response format");
    }

    return response.data.data;
};

const useMenu = () => {
    return useQuery<MenuItem[]>({ queryKey: ["menu"], queryFn: fetchMenu });
};

export default useMenu;
