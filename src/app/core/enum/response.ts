export enum ResponseCodes {
    userTokenExpired = 101401,
    noAnchor = 101503,
    notSupportTestPlayer = 204401,
    notSupportCurrency = 104400
}

export enum ResponseMessages {
    userTokenExpired = '凭证过期，请重新登入',
    websocketExpired = '用户重复登录，请重新登录',
    noAnchor = '目前无主播在线，返回大厅',
    notSupportTestPlayer = '不支援试玩帐号',
    notSupportCurrency = '此游戏不支持你的币别: USD',
    undefined401 = '401 其他錯誤',
    undefined400 = '400 其他錯誤',
    undefined500 = '系统错误，请重新登录',
    undefinedOther = '其他错误，返回上一页',
}

export enum SendGiftRespCode {
    success = 0,
    noBalance = 204500,
    generalFail = 201500,
    noAnchorOnline = 101503,
    playerCanNotSendGift = 203401,
}

export enum SendGiftRespMessages {
    success = '成功',
    noBalance = '余额不足',
    generalFail = '送礼失败',
    noAnchorOnline = '目前无主播在线，送礼失败',
    playerCanNotSendGift = '您无法送礼',
}

export enum InterceptMsgEnum {
    benefitMsg = '@benefitMsg,',
    dessertMsg = '@dessertMsg,',
    continuousOnlineMsg = '@continuousOnlineMsg,',
    userSendMegaphoneMsg = '@userSendMegaphoneMsg,',
    anchorSendMegaphoneMsg = '@anchorSendMegaphoneMsg,'
}

// Limited time event types
export enum LimitedTimeTaskName {
    dessert = 'dessert',
    megaphone = 'megaphone',
}

// Name for special limited time event
export enum LimitedTimeActivitiesName {
    lottery = 'lottery'
}

// Activity identification
export enum ActivityFeatureCode {
    SCRATCH_OFF_CARD = 'scratchOffCard',
    DESSERT = 'dessert',
    CONTINUOUS_ONLINE = 'continuousOnline',
    MEGAPHONE = 'megaPhone',
    POKE_USER = 'pokeUser',
    PLAYER_LOGIN = 'playerLogin',
}
