export interface LinkItem {
    id: string;
    userId: string;
    title: string;
    url: string;
    icon: string | null;
    order: number;
    archived: boolean;
    clicks: number;
    createdAt: string;
    updatedAt: string;
}
