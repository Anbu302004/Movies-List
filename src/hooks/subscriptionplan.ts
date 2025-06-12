

export interface SubscriptionPlan {
    id: number;
    title: string;
    name: string;
    price: number;
    duration: string;
    video_quality_text: string;
    video_resolution_text: string;
    video_device_text: string;
    device_limit: number;
    ads_free: boolean;
    duration_text: string;
    before_price: number;
    tagtext?: string;
}
