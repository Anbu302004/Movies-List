import moviesApiClient from "../services/authApiClient";

export const getPaymentGatewayInfo = async (token: string) => {
    const response = await moviesApiClient.get("/paymentgatewayinfo", {
        headers: { Authorization: `Bearer ${token}` }
    });

    if (response.data?.results?.razorpay) {
        return response.data.results.razorpay;
    } else {
        throw new Error("Invalid response structure");
    }
};
