var CmdUpdateMiniPoker = CmdReceivedCommon.extend(
    {
        readData: function () {
            this.value = this.getLong();
            this.x2 = this.getByte();
        }
    }
);

var CmdSendMiniPoker = CmdSendCommon.extend(
    {
        ctor: function () {
            this._super();
            this.setCmdId(PLAY_MINI_POKER);
        },
        putPlayMiniPoker: function (betValue, moneyType) {
            this.packHeader();
            this.putLong(betValue);
            this.putShort(moneyType);
            this.updateSize();
        }
    }
);

var CmdReceivedPlayMiniPoker = CmdReceivedCommon.extend(
    {
        readData: function () {
            this.result = this.getShort();
            this.prize = this.getLong();
            this.card1 = this.getByte();
            this.card2 = this.getByte();
            this.card3 = this.getByte();
            this.card4 = this.getByte();
            this.card5 = this.getByte();
            this.currentMoney = this.getLong();
        }
    }
);


function subScribeMiniPoker(room) {
    var miniPokerSend = new CmdSendScribeMiniPoker();
    miniPokerSend.putSubScribe(room);
    Minigame.miniGameClient.send(miniPokerSend);
    miniPokerSend.clean();
}

var CmdSendScribeMiniPoker = CmdSendCommon.extend(
    {
        ctor: function () {
            this._super();
            this.setCmdId(MINI_POKER_SUBSCRIBE);

        },
        putSubScribe: function (room) {
            this.packHeader();
            this.putByte(room);
            this.updateSize();
        }
    }
);

var CmdSendUnsubcriberMiniPoker = CmdSendCommon.extend(
    {
        ctor: function () {
            this._super();
            this.setCmdId(UNSUBSCRIBER_MINI_POKER);

        },
        putUnsubscriberMiniPoker: function (room) {
            this.packHeader();
            this.putByte(room);
            this.updateSize();
        }
    }
);

var CmdChangeRoomMiniPoker = CmdSendCommon.extend(
    {
        ctor: function () {
            this._super();
            this.setCmdId(CHANGE_ROOM_MINIPOKER);

        },
        putChangeRoomMiniPoker: function (roomLeavedId, roomJoinedId) {
            this.packHeader();
            this.putByte(roomLeavedId);
            this.putByte(roomJoinedId);
            this.updateSize();
        }
    }
);

var CmdSendAutoMiniPoker = CmdSendCommon.extend(
    {
        ctor: function () {
            this._super();
            this.setCmdId(AUTO_PLAY_MINI_POKER);
        },
        putAutoMiniPoker: function (play) {
            this.packHeader();
            this.putByte(play);
            this.updateSize();
        }
    }
);

var CmdReceivedStopAutoPlay = CmdReceivedCommon.extend(
    {
        readData: function () {
        }
    }
);

var CmdReceivedX2Date = CmdReceivedCommon.extend(
    {
        readData: function () {
            this.datex2 = this.getString();
        }
    }
);