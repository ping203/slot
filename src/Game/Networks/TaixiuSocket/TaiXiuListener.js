uc.TaixiuListener = uc.BaseListener.extend({
        onDisconnected: function () {

        },
        handleData: function (pkg, cmdId) {
            var cmdDefine = taixiuWebSocketCmd;
            var cmd = null;
            var taiXiu = gI.taiXiu;
            var magicDoor = gI.magicDoor;
            switch (cmdId) {
                case cmdDefine.UPDATE_TIME_TAI_XIU:
                    cmd = new uc.TaixiuSocket.CmdTXUpdateTimeTaiXiu(pkg);
                    magicDoor.updateTimeTaiXiu(cmd.remainTime, cmd.bettingState);
                    break;

                case cmdDefine.UPDATE_TAI_XIU_PER_SECOND:
                    cmd = new uc.TaixiuSocket.CmdUpdateTaiXiu(pkg);
                    taiXiu.responseUpdateTaiXiu(cmd.remainTime, cmd.bettingState, cmd.potTai, cmd.potXiu, cmd.numBetTai, cmd.numBetXiu);
                    break;
                case cmdDefine.TAI_XIU_INFO:
                    cmd = new uc.TaixiuSocket.CmdTaiXiuInfo(pkg);
                    if (taiXiu != null)
                        taiXiu.responseTaiXiuInfo(cmd.gameId, cmd.moneyType, cmd.referenceId, cmd.remainTime, cmd.bettingState, cmd.potTai, cmd.potXiu, cmd.betTai, cmd.betXiu, cmd.dice1, cmd.dice2, cmd.dice3, cmd.remainTimeRutLoc);

                    break;


                case cmdDefine.UPDATE_RESULT_DICES:
                    cmd = new uc.TaixiuSocket.CmdUpdateResultDices(pkg);
                    if (taiXiu)
                        taiXiu.responseTaiXiu(cmd.result, cmd.dice1, cmd.dice2, cmd.dice3);
                    break;
                case cmdDefine.UPDATE_PRIZE_TAI_XIU:
                    cmd = new uc.TaixiuSocket.CmdUpdatePrizeTaiXiu(pkg);
                    if (taiXiu)
                        taiXiu.responsePrizeTaiXiu(cmd.moneyType, cmd.totalMoney, cmd.currentMoney);
                    break;
                case  cmdDefine.BET_TAI_XIU:
                    cmd = new uc.TaixiuSocket.CmdBetTaiXiu(pkg);
                    if (taiXiu)
                        taiXiu.responseBetTaiXiuSuccess(cmd.result, cmd.currentMoney);
                    break;
                case  cmdDefine.START_NEW_GAME_TAI_XIU:
                    cmd = new uc.TaixiuSocket.CmdStartNewGameTaiXiu(pkg);
                    taiXiu.responseStartNewGameTaiXiu(cmd.referenceId, cmd.remainTimeRutLoc);
                    break;
                case cmdDefine.LICH_SU_PHIEN_TAI_XIU:
                    cmd = new uc.TaixiuSocket.CmdLichSuTaiXiu(pkg);
                    taiXiu.responseLichSuPhien(cmd.data);
                    break;
                case cmdDefine.TX_TAN_LOC:
                    cmd = new uc.TaixiuSocket.CmdTXTanLoc(pkg);
                    taiXiu.responseTanLoc(cmd.result, cmd.currentMoney);
                    break;
                case cmdDefine.TX_RUT_LOC:
                    cmd = new uc.TaixiuSocket.CmdTXRutLoc(pkg);
                    taiXiu.responseRutLoc(cmd.prize, cmd.currentMoney);
                    break;
                case cmdDefine.UPDATE_QUY_LOC:
                    if (!taiXiu) break;
                    cmd = new uc.TaixiuSocket.CmdTXUpdateQuyLoc(pkg);
                    taiXiu.responseUpdateHuLoc(cmd.value);
                    break;
                case cmdDefine.START_NEW_ROUND_RUT_LOC:
                    cmd = new uc.TaixiuSocket.CmdTXStartRutLoc(pkg);
                    taiXiu.responseStartRutLoc(cmd.remainTime);
                    break;
                case cmdDefine.UPDATE_LUOT_RUT_LOC:
                    cmd = new uc.TaixiuSocket.CmdTXUpdateSoLuotRutLoc(pkg);
                    taiXiu.responseUpdateLuotRutLoc(cmd.soLuotRut);
                    break;
                case cmdDefine.ENABLE_RUT_LOC:
                    taiXiu.startRutLoc();
                    break;
                //Chat Lobby
                case cmdDefine.SEND_CHAT:
                    cmd = new uc.TaixiuSocket.CmdReceivedSendChat(pkg);
                    TXChat && TXChat.responseSendChat(cmd.error, cmd.nickname, cmd.message);
                    break;
                case cmdDefine.LOG_CHAT:
                    cmd = new uc.TaixiuSocket.CmdReceivedLogChat(pkg);
                    TXChat && TXChat.responseLogChat(cmd.message, cmd.minVipPoint, cmd.timeBan, cmd.userType);
                    break;


            }
            if (cmd != null) {
                cmd.clean();
            }
        }
    }
);
