export interface FishLiveReqParam {
    token: string;
    username: string;
    pid: string;
    nick: string;
    anchorId: string;
}

export interface FishInitResp {
    Token: string;
    AnchorId: string;
    LobbyUrl: string;
    GameUrl: string;
    Code: number;
    AllowSendGift: boolean;
}
export interface AnchorSelectRoomResp {
    MessageId: string;
    NickName: string;
    Id: string;
    RoomId: string;
    LikeCount: number;
    FollowCount: number;
    Currency: string;
    GiftCount: number;
    StarValue: number;
    Code: number;
    Message: string;
    CorrelationId: string;
}

export interface AnchorLobbyInfoDetail {
    CanLike: boolean;
    FollowCount: number;
    LikeCount: number;
    Name: string;
    NickName: string;
    StarValue: number;
}
export interface AnchorLobbyInfoDetailOptional {
    CanLike?: boolean;
    FollowCount?: number;
    LikeCount?: number;
    Name?: string;
    StarValue?: number;
    NickName?: string;
}
export interface VideoDetail {
    Flv: string;
    Hls: string;
    Priority: number;
}
export interface GiftDetail {
    Id: number;
    Name: string;
    Icon: string;
    Mov: string;
    Value: number;
    Priority: number;
    IsFree?: boolean;
}
export interface GiftReq {
    GiftId: string;
    GiftValue: string;
}

export interface GiftRsep {
    Code: number;
    Message: string;
}

export interface RecievedMessage {
    MessageId: string;
    NickName: string;
    Id: string;
    Level: string;
}
export interface ChatMessage extends RecievedMessage {
    Body: string;
    IsAnchor: boolean;
    IsEmoji: boolean;
}

export interface AnchorInfo {
    AvatarImgUrl: string;
    NickName: string;
    FollowCount: string;
    Popularity: string;
}

export type GiftListSlideStatus = 'left' | 'right';

export type ChatHistoryMessage = ChatMessage[];

export interface SendChatMessage {
    Body: string;
}

export interface PlayerLogged {
    AnchorName: string;
    LikeCount: number;
    FollowCount: number;
    StarValue: number;
    ExternalId: string;
    IsTopWinner: boolean;
    Id: string;
    NickName: string;
    MessageId: string;
    Code: number;
    CorrelationId: string;
    Level: number;
}

export interface LotteryObjectResp {
    Active: boolean;
    Theme: string;
    Awards: string[];
}

export interface WeaponListDetail {
    LoginName: string;
    PlayerName: string;
    WeaponId: string;
    WeaponLevel: number;
    StartTime: number;
    EndTime: number;
    ConvertedStartTime: string;
    ConvertedEndTime: string;
    AnchorExpiredTime: string;
}

export interface AdditionWeaponSccuessItem {
    AwardType?: string;
    WeaponName?: string;
}

export interface GivePlayerWeaponResp extends WeaponListDetail, AdditionWeaponSccuessItem {
    MessageId: string;
    NickName: string;
    Id: string;
    RoomId: string;
    Code: number;
    Message: string;
    CorrelationId: string;
}

export interface GameAspectRatioSetting {
    root: GameAspectRatio;
    gameDisplay: GameAspectRatio;
    liveChat: GameAspectRatio;
}

export interface GameAspectRatio {
    aspectRatio: string;
    relativeTo: string;
}

export interface ActivityMsgReq {
    FeatureCode: string;
    OnlyReadOnBackstage: boolean;
    Body: string;
}

export interface ActivityMsgResp extends ActivityMsgReq {
    Level: number;
    IsAnchor: boolean;
    Id: string;
    NickName: string;
    MessageId: string;
    Code: number;
    Message?: any;
    CorrelationId: string;
    GroupName: string;
}

export interface DeleteMsgNotice {
    DeleteMessageId: string;
    Id: string;
    NickName: string;
    MessageId: string;
    Code: number;
    CorrelationId: string;
    GroupName: string;
}
