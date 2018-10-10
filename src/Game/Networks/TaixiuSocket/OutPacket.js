uc.TaixiuSocket.CmdSendSubcribleChat = CmdSendCommon.extend({
        ctor: function () {
            this._super(taixiuWebSocketCmd.SUBCRIBLE_CHAT);
        }
    }
);

uc.TaixiuSocket.CmdSendUnSubcribleChat = CmdSendCommon.extend({
        ctor: function () {
            this._super(taixiuWebSocketCmd.UNSUBCRIBLE_CHAT);
        }
    }
);

uc.TaixiuSocket.CmdSendChat = CmdSendCommon.extend({
        ctor: function (message) {
            this._super(taixiuWebSocketCmd.SEND_CHAT, true);
            this.putString(message);
            this.updateSize();
        }
    }
);

uc.TaixiuSocket.CmdSendTanLoc = CmdSendCommon.extend(
    {
        ctor: function () {
            this._super();
            this.setCmdId(taixiuWebSocketCmd.TX_TAN_LOC);

        },
        putTanLoc: function (money) {
            this.packHeader();
            this.putLong(money);
            this.updateSize();
        }
    }
);

uc.TaixiuSocket.CmdSendRutLoc = CmdSendCommon.extend(
    {
        ctor: function () {
            this._super();
            this.setCmdId(taixiuWebSocketCmd.TX_RUT_LOC);

        },
        putRutLoc: function () {
            this.packHeader();
            this.updateSize();
        }
    }
);


uc.TaixiuSocket.CmdSendBetTaiXiu = CmdSendCommon.extend(
    {
        ctor: function (cmdID, data) {
            this._super();
            this.setCmdId(taixiuWebSocketCmd.BET_TAI_XIU);

        },
        putBetTaiXiu: function (userId, referenceId, betValue, moneyType, betSide, inputTime) {

            this.packHeader();
            this.putInt(userId);
            this.putLong(referenceId);
            this.putLong(betValue);
            this.putShort(moneyType);
            this.putShort(betSide);
            this.putShort(inputTime);
            this.updateSize();
        }
    }
);

uc.TaixiuSocket.CmdSendLichSuTaiXiu = CmdSendCommon.extend(
    {
        ctor: function () {
            this._super();
            this.setCmdId(taixiuWebSocketCmd.LICH_SU_PHIEN_TAI_XIU);

        },
        putLichSuTaiXiu: function () {

            this.packHeader();
            this.updateSize();
        }
    }
);

uc.TaixiuSocket.CmdSendScribe = CmdSendCommon.extend(
    {
        ctor: function () {
            this._super();
            this.setCmdId(taixiuWebSocketCmd.MN_SUBSCRIBE);

        },
        putSubScribe: function (typeGame, room) {
            this.packHeader();
            this.putShort(typeGame);
            this.putShort(room);
            this.updateSize();
        }
    }
);

uc.TaixiuSocket.CmdSendUnscribe = CmdSendCommon.extend(
    {
        ctor: function () {
            this._super();
            this.setCmdId(taixiuWebSocketCmd.MN_UNSUBSCRIBE);

        },
        putUnsubScribe: function (gameId, roomId) {
            this.packHeader();
            this.putShort(gameId);
            this.putShort(roomId);
            this.updateSize();
        }
    }
);

uc.TaixiuSocket.CmdSendChangeRoom = CmdSendCommon.extend(
    {
        ctor: function () {
            this._super();
            this.setCmdId(taixiuWebSocketCmd.MN_CHANGE_ROOM);

        },
        putChangeRoom: function (gameId, lastRoomId, newRoomId) {
            this.packHeader();
            this.putShort(gameId);
            this.putShort(lastRoomId);
            this.putShort(newRoomId);
            this.updateSize();
        }
    }
);