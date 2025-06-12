import moviesApiClient from "./authApiClient";
import { SubscriptionPlan } from "../hooks/subscriptionplan";

export const getSubscriptionPlans = async (
    sessionToken?: string
): Promise<SubscriptionPlan[]> => {
    try {
        const response = await moviesApiClient.get("/subscriptionlist", {
            headers: sessionToken
                ? { Authorization: `Bearer ${sessionToken}` }
                : {},
        });

        if (response.data?.data) {
            return response.data.data;
        } else {
            console.warn("Unexpected response structure", response.data);
            return [];
        }
    } catch (error) {
        console.error("Error fetching subscription plans:", error);
        return [];
    }
};
