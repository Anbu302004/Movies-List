import moviesApiClient from "./authApiClient";
import { SubscriptionPlan } from "../hooks/subscriptionplan";

export const getSubscriptionPlans = async (
    sessionToken?: string
): Promise<SubscriptionPlan[]> => {
    try {
        const tokenToUse = sessionToken || "2048|BgBEXAFMieNAqq6vZLmxkGTpZVugLpcmWZXLMead3f3f8002";

        const response = await moviesApiClient.get("/subscriptionlist", {
            headers: {
                Authorization: `Bearer ${tokenToUse}`,
            },
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
