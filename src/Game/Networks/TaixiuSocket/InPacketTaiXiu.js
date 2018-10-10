uc.TaixiuSocket.CmdUpdateMoney = CmdReceivedCommon.extend(
    {

        readData: function () {
            this.currentMoney = this.getLong();
            this.moneyType = this.getShort();
        }

    }
);

uc.TaixiuSocket.CmdPopMinigame = CmdReceivedCommon.extend(
    {

        readData: function () {
            //this.currentMoney = this.getLong();
            //this.moneyType = this.getShort();
        }

    }
);


//Response

uc.TaixiuSocket.CmdBetTaiXiu = CmdReceivedCommon.extend(
    {

        readData: function () {
            this.result = this.getError();
            this.currentMoney = this.getLong();
            //this.getError();
        }

    }
);
//lich su phien

uc.TaixiuSocket.CmdLichSuTaiXiu = CmdReceivedCommon.extend(
    {

        readData: function () {
            this.data = this.getString();
        }

    }
);

uc.TaixiuSocket.CmdTaiXiuInfo = CmdReceivedCommon.extend(
    {

        readData: function () {
            this.gameId = this.getShort();
            this.moneyType = this.getShort();
            this.referenceId = this.getLong();
            this.remainTime = this.getShort();
            this.bettingState = this.getBool();
            this.potTai = this.getLong();
            this.potXiu = this.getLong();
            this.betTai = this.getLong();
            this.betXiu = this.getLong();
            this.dice1 = this.getShort();
            this.dice2 = this.getShort();
            this.dice3 = this.getShort();

            this.remainTimeRutLoc = this.getShort();
        }

    }
);//TaiXiuInfo

uc.TaixiuSocket.CmdUpdateTaiXiu = CmdReceivedCommon.extend(
    {

        readData: function () {
            this.remainTime = this.getShort();
            this.bettingState = this.getBool();
            this.potTai = this.getLong();
            this.potXiu = this.getLong();
            this.numBetTai = this.getShort();
            this.numBetXiu = this.getShort();

        }
    }
);

//UPDATE_RESULT_DICES

uc.TaixiuSocket.CmdUpdateResultDices = CmdReceivedCommon.extend(
    {

        readData: function () {
            this.result = this.getShort();
            this.dice1 = this.getShort();
            this.dice2 = this.getShort();
            this.dice3 = this.getShort();
        }

    }
);
//UPDATE_PRIZE_TAI_XIU

uc.TaixiuSocket.CmdUpdatePrizeTaiXiu = CmdReceivedCommon.extend(
    {

        readData: function () {

            this.moneyType = this.getShort();
            this.totalMoney = this.getLong();
            this.currentMoney = this.getLong();

        }

    }
);
//START_NEW_GAME_TAI_XIU
uc.TaixiuSocket.CmdStartNewGameTaiXiu = CmdReceivedCommon.extend(
    {


        readData: function () {
            this.referenceId = this.getLong();
            this.remainTimeRutLoc = this.getShort();
        }

    }
);
//Rut Loc
uc.TaixiuSocket.CmdTXRutLoc = CmdReceivedCommon.extend(
    {

        readData: function () {
            this.prize = this.getInt();
            this.currentMoney = this.getLong();
        }

    }
);
//Tan Loc
uc.TaixiuSocket.CmdTXTanLoc = CmdReceivedCommon.extend(
    {

        readData: function () {
            this.result = this.getShort();
            this.currentMoney = this.getLong();
        }

    }
);

//Update quy loc
uc.TaixiuSocket.CmdTXUpdateQuyLoc = CmdReceivedCommon.extend(
    {

        readData: function () {
            this.value = this.getLong();
        }

    }
);

// start new rut loc

uc.TaixiuSocket.CmdTXStartRutLoc = CmdReceivedCommon.extend(
    {

        readData: function () {
            this.remainTime = this.getInt();
        }

    }
);
uc.TaixiuSocket.CmdTXUpdateSoLuotRutLoc = CmdReceivedCommon.extend({
    readData: function () {
        this.soLuotRut = this.getInt();
    }
});
uc.TaixiuSocket.CmdTXUpdateTimeTaiXiu = CmdReceivedCommon.extend({
    readData: function () {
        this.remainTime = this.getByte();
        this.bettingState = this.getBool();
    }

});


uc.TaixiuSocket.CmdReceivedSendChat = CmdReceivedCommon.extend({
        readData: function () {
            this.error = this.getError()
            this.nickname = this.getString();
            this.message = this.getString();
        }
    }
);

uc.TaixiuSocket.CmdReceivedLogChat = CmdReceivedCommon.extend({
        readData: function () {
            this.message = this.getString();
            this.minVipPoint = this.getByte();
            this.timeBan = this.getLong();
            this.userType = this.getByte();
        }
    }
);