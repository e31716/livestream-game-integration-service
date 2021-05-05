import { AnchorLobbyInfoDetail, GiftDetail, VideoDetail } from './live-chat-room';

export interface PlayerLobbyConnectResp {
    RoomId: string;
    Videos: VideoDetail[];
    GiftCount: number;
    Currency: string;
    Gifts: GiftDetail[];
    AnchorLobbyInfo: AnchorLobbyInfoDetail;
    Id: string;
    NickName: string;
    MessageId: string;
    Code: number;
    CorrelationId: string;
}

export interface CommonResp {
    Id: string;
    NickName: string;
    MessageId: string;
    Code: number;
    CorrelationId: string;
}

export interface PlayerLikeResp extends CommonResp {
    LikeCount: number;
    StarValue: number;
    IsLike: boolean;
}

export interface BalanceInfo {
    Balance: number;
    BalanceSeq: number;
}

export interface PlayerSendGiftResp extends CommonResp, BalanceInfo {
    GiftId: number;
    StarValue: number;
    Level: number;
    GiftUrl?: string;
    GiftName?: string;
    ClickTime: number;
}

export interface AnchorConnectedResp {
    AnchorChatRooms: ChatRoomDetail[];
    AnchorId: string;
    Code: number;
    Currency: string;
    FollowCount: number;
    GiftCount: number;
    Gifts: AnchorGiftDetail[];
    LikeCount: number;
    MessageId: string;
    NickName: string;
    StarValue: number;
}

export interface AnchorGiftDetail {
    Id: number;
    Name: string;
    Icon: string;
    Mov: string;
    Value: number;
    Priority: number;
}

export interface ChatRoomDetail {
    RoomId: string;
    RoomName: string;
}

export interface PlayerCanLikeResp {
    CanLike: boolean;
    Code: number;
    ExternalId: string;
    Id: string;
    Name: string;
    OnlineAnchorId: string;
    OnlineAnchorName: string;
}

export interface LobbyUrlResp {
    LobbyUrl: string;
}

export interface PlayerGiftCombo {
    Combo: number;
}

export interface TimeSpeaker {
    CurrentTimeStamp: number;
    ContinuouslyOnlineSec: number;
}

export interface LimitedTimeTask {
    TaskTitle: string;
    TaskCode: number;
    EndTime: number;
    TaskCDTime: number;
    CanActive: boolean;
}

export interface LimitedTimeActivities {
    ActivitiesTitle: string;
    ActivitiesCode: number;
    EndTime: number;
    ActivitiesCDTime: number;
    CanActive: boolean;
}