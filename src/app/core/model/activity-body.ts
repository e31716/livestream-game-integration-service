export interface PokeUserFromAnchor {
    FromAnchor: boolean;
    SpecifyId?: string; // Specified player id
    Content: string; // content
}

export interface MegaphoneSenderInfo {
    Permit: boolean;
    SenderName: string;
    SenderLevel: number;
    SenderBody: string;
    SenderId: string;
}