import moviesApiClient from "./authApiClient";
import { SubscriptionPlan } from "../hooks/subscriptionplan";

export const getSubscriptionPlans = async (
    sessionToken: string
): Promise<SubscriptionPlan[]> => {
    const response = await moviesApiClient.get("/subscriptionlist", {
        headers: {
            Authorization: `Bearer ${sessionToken}`,
        },
    });
    return response.data.data;
};
