uc.MainNetworkListener = uc.BaseListener.extend({
        onDisconnected: function () {
            // cc.log("MinigameListener Finish connect Minigame" );
            // cc.log("MinigameListener countOnConect = " + countOnConect);

            var Minigame = gI.mainSocket;

            this.gameWsState = CLIENT_STATE.NOT_CONNECTED;

            // menutab.close_list_hu();
            return;

            if (taiXiu != null) {
                closeTaiXiu();

            }
            if (gI.vqmm != null) {

            }
            if (_miniPoker != null) {
                closeMiniPoker();
            }
            if (caothap != null) {
                closeCaoThap();
            }
            if (baucua != null) {
                closeBauCua();
            }
            if (slot3hang != null) {
                closeslot3hang();
                // slot3hang.forceStopAuto();
            }
        },
        handleLogin: function () {
            if (userInfo.userData.luckyRotate > 0 && !cc.sys.isNative) {
                loadResoureGame(g_resources_mn_vqmm, null, function () {
                    uc.VQMM.prototype.open();
                });
            }
            lobby.menuLayer.getPotGameBai();
            menutab.runAction(cc.sequence(cc.delayTime(1.5),cc.callFunc(function(){
                menutab.userManager.funGetInfoEventVippoint();
            })));
            this._super();
        },
        handleData: function (pkg, cmdId) {
            var cmd = null;
            switch (cmdId) {
                case MN_UPDATE_USER_INFO:
                    cmd = new uc.TaixiuSocket.CmdUpdateMoney(pkg);
                    lobby.updateMoney(cmd.currentMoney, cmd.moneyType);
                    break;
                case MN_POP:
                    cmd = new uc.TaixiuSocket.CmdPopMinigame(pkg);
                    break;
                /// vqmm
                case START_NEW_VQMM:
                    if (!gI.vqmm) break;
                    cmd = new CmdStartVQMM(pkg);
                    gI.vqmm.responseVQMM(cmd.error, cmd.prizeVin, cmd.prizeXu, cmd.prizeSlot, cmd.remainCount, cmd.currentMoneyVin, cmd.currentMoneyXu);
                    break;
                /// minipoker
                case PLAY_MINI_POKER:
                    if (!_miniPoker) break;
                    cmd = new CmdReceivedPlayMiniPoker(pkg);
                    _miniPoker.responsePlayMiniPoker(cmd.result, cmd.prize, cmd.card1, cmd.card2, cmd.card3, cmd.card4, cmd.card5, cmd.currentMoney);
                    break;
                case UPDATE_POT_MINIPOKER:
                    if (!_miniPoker) break;
                    cmd = new CmdUpdateMiniPoker(pkg);
                    _miniPoker.responseUpdateMiniPoker(cmd.value, cmd.x2);
                    break;
                case X2_DATE:
                    if (!_miniPoker) break;
                    cmd = new CmdReceivedX2Date(pkg);
                    _miniPoker.responseX2Date(cmd.datex2);
                    break;
                /// caothap
                case FORCE_STOP_AUTO_PLAY:
                    if (!_miniPoker) break;
                    cmd = new CmdReceivedStopAutoPlay(pkg);
                    _miniPoker.responseStopAutoMiniPoker();
                    break;
                case USER_INFO_CAO_THAP:
                    if (!caothap) break;
                    cmd = new CmdReceivedUserInfoCaoThap(pkg);
                    caothap.responseUserInfoCaoThap(cmd.numA, cmd.card, cmd.money1, cmd.money2, cmd.money3, cmd.time, cmd.step, cmd.referenceId, cmd.cards);
                    break;
                case START_PLAY_CAO_THAP:
                    if (!caothap) break;
                    cmd = new CmdReceivedStartCaoThap(pkg);
                    caothap.responseStartCaoThap(cmd.error, cmd.referenceId, cmd.card, cmd.money1, cmd.money2, cmd.money3, cmd.currentMoney);
                    break;
                case PLAY_CAO_THAP:
                    if (!caothap) break;
                    cmd = new CmdReceivedPlayCaoThap(pkg);
                    caothap.responsePlayCaoThap(cmd.card, cmd.money1, cmd.money2, cmd.money3);
                    break;
                case UPDATE_POT_CAO_THAP:
                    if (!caothap) break;
                    cmd = new CmdUpdatePotPlayCaoThap(pkg);
                    caothap.responseUpdatePotCaoThap(cmd.value);
                    break;
                case STOP_PLAY_CAO_THAP:
                    if (!caothap) break;
                    cmd = new CmdReceivedStopCaoThap(pkg);
                    caothap.responseStopCaoThap(cmd.result, cmd.currentMoney, cmd.moneyExchange);
                    break;
                case UPDATE_TIME_CAO_THAP:
                    if (!caothap) break;
                    cmd = new CmdReceivedUpdateTimeCaoThap(pkg);
                    caothap && caothap.responseUpdateTimeCaoThap(cmd.time);
                    break;
                case SUBSCRIBE_CAO_THAP:
                    if (!caothap) break;
                    cmd = new CmdReceivedSubscribeCaoThap(pkg);
                    caothap.responseReceivedSubcribeCaoThap(cmd.status, cmd.roomId);
                    break;
                case CHANGE_ROOM_CAO_THAP:
                    if (!caothap) break;
                    cmd = new CmdReceivedChangeRoomCaoThap(pkg);
                    caothap.responseReceivedChangeRoomCaoThap(cmd.status);
                    break;
                //Bàu cua
                case BC_INFO:
                    if (!baucua) break;
                    cmd = new BCResponseInfo(pkg);
                    baucua.responseInfo(cmd.referenceId, cmd.remainTime, cmd.bettingState, cmd.potData, cmd.betData, cmd.lichSuPhien, cmd.dice1, cmd.dice2, cmd.dice3, cmd.xPot, cmd.xValue, cmd.room);
                    break;
                case BC_BET:
                    if (!baucua) break;
                    cmd = new BCResponseBet(pkg);
                    baucua.responseBet(cmd.result, cmd.currentMoney);
                    break;
                case BC_START_NEW_GAME:
                    if (!baucua) break;
                    cmd = new BCResponseStartNewGame(pkg);
                    baucua.responseStartNewGame(cmd.referenceId);
                    break;
                case BC_UPDATE:
                    if (!baucua) break;
                    cmd = new BCResponseUpdate(pkg);
                    if (baucua)
                        baucua.responseUpdate(cmd.potData, cmd.remainTime, cmd.bettingState);
                    break;
                case BC_RESULT:
                    if (!baucua) break;
                    cmd = new BCResponseResult(pkg);
                    if (baucua)
                        baucua.responseResult(cmd.dice1, cmd.dice2, cmd.dice3, cmd.xPot, cmd.xValue)
                    break;
                case BC_PRIZE:
                    if (!baucua) break;
                    cmd = new BCResponsePrize(pkg);
                    if (baucua)
                        baucua.responsePrize(cmd.prize, cmd.currentMoney, cmd.room);
                    break;

                //pokemon
                case PKM_UPDATE_RESULT:
                    cmd = new PKMResponseUpdateResult(pkg);
                    slot3hang && slot3hang.updateResult(cmd.result, cmd.matrix, cmd.linesWin, cmd.prize, cmd.currentMoney);
                    break;
                case PKM_UPDATE_POT:
                    cmd = new PKMResponseUpdatePot(pkg);
                    slot3hang && slot3hang.updatePot(cmd.value, cmd.x2);
                    break;
                case PKM_FORCE_STOP_AUTO:
                    cmd = new PKMResponseForceStopAuto(pkg);
                    slot3hang && slot3hang.forceStopAuto();
                    break;
                case PKM_DATE_X2:
                    cmd = new PKMResponseDateX2(pkg);
                    //slot3hang
                    slot3hang && slot3hang.setDateX2(cmd.date);
                    break;

                // GiftCode
                case GIFTCODE:
                    cmd = new CmdReceivedGiftCode(pkg);
                    menutab.giftcodeLayer.responseGiftCode(cmd.error, cmd.currentMoneyVin, cmd.currentMoneyXu, cmd.moneyGiftCodeVin, cmd.moneyGiftCodeXu);
                    break;
                // CheckNickName
                case CHECK_NICK_NAME:
                    cmd = new CmdReceivedCheckNickName(pkg);
                    menutab.chuyenKhoanLayer.responsenickname(cmd.error, cmd.type, cmd.fee);

                    break;
                // RECHARGE_XU
                case RECHARGE_XU:
                    cmd = new CmdReceivedRechargeXu(pkg);
                    menutab.shoppingLayer.napXulayer.responseRechargeXu(cmd.error);
                    break;
                case RESULT_RECHARGE_XU:
                    cmd = new CmdReceivedResultRechargeXu(pkg);
                    menutab.shoppingLayer.napXulayer.responseResultRechargeXu(cmd.error, cmd.currentMoneyVin, cmd.currentMoneyXu);
                    break;
                // RECHARGE_VIN
                case RECHARGE_VIN:
                    cmd = new CmdReceivedRechargeVin(pkg);

                    menutab.shoppingLayer.napVinThelayer.responseRechargeVin(cmd.error, cmd.currentMoney, cmd.timeFail, cmd.numFail);
                    break;
                // RECHARGE_VINPLAY
                case RECHARGE_VINPLAY_CARD:
                    cmd = new CmdReceivedRechargeVinPlayCard(pkg);
                    menutab.shoppingLayer.napVinThelayer.responseRechargeVinplayCard(cmd.error, cmd.currentMoney, cmd.timeFail, cmd.numFail);
                    break;
                // RECHARGE_MEGA
                case RECHARGE_MEGA_CARD:
                    cmd = new CmdReceivedRechargeMegaCard(pkg);
                    menutab.shoppingLayer.napVinThelayer.responseRechargeMegaCard(cmd.error, cmd.currentMoney, cmd.timeFail, cmd.numFail);
                    break;
                // RECHARGE_VCOIN
                case RECHARGE_VCOIN:
                    // cmd = new CmdReceivedRechargeVcoin(pkg);
                    // shopping_info.responseRechargeVcoin(cmd.error, cmd.currentMoney, cmd.timeFail, cmd.numFail);
                    break;
                // CONFIRM OTP
                case SEND_OTP:
                    cmd = new CmdReceivedSendOTP(pkg);
                    if (panel_otp == null) {
                        openpn_otp("", 0);
                        panel_otp.responseSendOtp(cmd.error);
                    } else
                        panel_otp.responseSendOtp(cmd.error);
                    break;
                // BROADCAST_MESSAGE
                case BROADCAST_MESSAGE:
                    cmd = new CmdReceivedBroadcastmessage(pkg);
                    menutab.bigWin.responseBroadcastMessage(cmd.message);
                    break;
                // CHANGEPASSWORD
                case CHANGEPASS:
                    cmd = new CmdReceivedChangePassword(pkg);
                    menutab.profileLayer.changePasswordLayer.responseChangePassword(cmd.error);
                    break;
                case RESULT_CHANGEPASS:
                    cmd = new CmdReceivedResultChangePassword(pkg);
                    menutab.profileLayer.changePasswordLayer.responseResultChangePassword(cmd.error);
                    break;
                // EXCHANGE VIPPOINT
                case EXCHANGE_VIPPOINT:
                    cmd = new CmdReceivedExchangeVippint(pkg);
                    menutab.profileLayer.vipLayer.responseExchangeVippoint(cmd.error);
                    break;
                case RESULT_EXCHANGE_VIPPOINT:
                    cmd = new CmdReceivedResultExchangeVippint(pkg);
                    menutab.profileLayer.vipLayer.responseResultExchangeVippoint(cmd.error, cmd.currentMoney, cmd.moneyAdd);
                    break;
                // UPDATE USER INFO
                case UPDATE_USER_INFO:
                    cmd = new CmdReceivedUpdateUserInfo(pkg);
                    // sercurity_info.responseUpdateUserInfo(cmd.error);
                    menutab.sercurityLayer.informationLayer.responseUpdateUserInfo(cmd.error);
                    break;
                case UPDATE_EMAIL_USER:
                    cmd = new CmdReceivedUpdateEmail(pkg);
                    // sercurity_info.responseUpdateEmail(cmd.error);
                    menutab.sercurityLayer.informationLayer.responseUpdateEmail(cmd.error);
                    break;
                case UPDATE_PHONE_USER:
                    cmd = new CmdReceivedUpdatePhone(pkg);
                    // sercurity_info.responseUpdatePhone(cmd.error);
                    menutab.sercurityLayer.informationLayer.responseUpdatePhone(cmd.error);
                    break;
                case ACTIVE_EMAIL:
                    cmd = new CmdReceivedActiveEmail(pkg);
                    // sercurity_info.responseActiveEmail(cmd.error);
                    menutab.sercurityLayer.informationLayer.responseActiveEmail(cmd.error);
                    break;
                case ACTIVE_MOBILE:
                    cmd = new CmdReceivedActivePhone(pkg);
                    //sercurity_info.responseActivePhone(cmd.error);
                    menutab.sercurityLayer.informationLayer.responseActivePhone(cmd.error);
                    break;
                case RESULT_ACTIVE_MOBILE:
                    cmd = new CmdReceivedResultActivePhone(pkg);
                    //sercurity_info.responseResultActivePhone(cmd.error);
                    menutab.sercurityLayer.informationLayer.responseResultActivePhone(cmd.error);
                    break;
                /// EXCHANGE MOBILE ACTIVED
                case EXCHANGE_MOBILE_ACTIVED:
                    cmd = new CmdReceivedExchangeMobileActived(pkg);
                    //   sercurity_info.responseExchangeMobileActived(cmd.error);
                    menutab.sercurityLayer.changeMobileLayer.responseExchangeMobileActived(cmd.error);
                    break;
                case RESULT_EXCHANGE_MOBILE_ACTIVED:
                    cmd = new CmdReceivedResultExchangeMobileActived(pkg);
                    //sercurity_info.responseResultExchangeMobileActived(cmd.error);
                    menutab.sercurityLayer.changeMobileLayer.responseResultExchangeMobileActived(cmd.error);
                    break;
                case RESULT_ACTIVE_NEW_MOBILE:
                    cmd = new CmdReceivedResultActiveNewMobile(pkg);
                    //sercurity_info.responseResultActiveNewMobile(cmd.error);
                    menutab.sercurityLayer.smsPlusLayer.responseResultActiveNewMobile(cmd.error);
                    break;
                /// GET INFORMATION SERCURITY
                case GET_INFORMATION_SERCURITY:
                    cmd = new CmdReceivedGetInformationSercurity(pkg);
                    menutab.sercurityLayer.responseGetInformationSercurity(cmd.error, cmd.username, cmd.cmt, cmd.email, cmd.mobile, cmd.mobileSecure, cmd.emailSecure, cmd.appSecure, cmd.loginSecure, cmd.moneyLoginOtp, cmd.moneyUse, cmd.safe, cmd.configGame);
                    //profileUser.responseGetInformationSercurity(cmd.error, cmd.username, cmd.cmt, cmd.email, cmd.mobile, cmd.mobileSecure, cmd.emailSecure, cmd.appSecure, cmd.loginSecure, cmd.moneyLoginOtp, cmd.moneyUse, cmd.safe, cmd.configGame);
                    break;
                /// SERCURITY LOGIN
                case SERCURITY_LOGIN:
                    cmd = new CmdReceivedSercurityLogin(pkg);
                    // sercurity_info.responseSercurityLogin(cmd.error);
                    menutab.sercurityLayer.baoMatDangNhapLayer.responseSercurityLogin(cmd.error);
                    break;
                /// CONFIG_GAMES
                case CONFIG_GAMES:
                    cmd = new CmdReceivedConfigGames(pkg);
                    menutab.sercurityLayer.quanLyGameLayer.responseConfigGames(cmd.error);
                    break;
                /// SAFE MONEY
                case SAFE_MONEY:
                    cmd = new CmdReceivedSafeMoney(pkg);
                    // sercurity_info.responseSafeMoney(cmd.error, cmd.moneyUse, cmd.safe);
                    menutab.sercurityLayer.ketAnToanLayer.responseSafeMoney(cmd.error, cmd.moneyUse, cmd.safe);
                    break;
                case RESULT_SAFE_MONEY:
                    cmd = new CmdReceivedResultSafeMoney(pkg);
                    // sercurity_info.responseResultSafeMoney(cmd.error, cmd.moneyUse, cmd.safe, cmd.currentMoney);
                    menutab.sercurityLayer.ketAnToanLayer.responseResultSafeMoney(cmd.error, cmd.moneyUse, cmd.safe, cmd.currentMoney);
                    break;
                /// EXCHANGE_VIN
                case EXCHANGE_VIN:
                    cmd = new CmdReceivedExchangeVin(pkg);
                    menutab.chuyenKhoanLayer.responseExchangeMoneyTest(cmd.error, cmd.moneyUse);
                    break;
                case RESULT_EXCHANGE_VIN:
                    cmd = new CmdReceivedResultExchangeVin(pkg);
                    menutab.chuyenKhoanLayer.responseResultExchangeMoneyTest(cmd.error, cmd.moneyUse, cmd.currentMoney);
                    break;
                //Get MoneyUse
                case GET_MONEYUSE:
                    cmd = new CmdReceivedGetMoneyUse(pkg);

                    responseGetMoneyUse(cmd.moneyUse);

                    break;
                //Buy Card Mobile
                case BUY_CARD:
                    cmd = new CmdReceivedBuyCardMobile(pkg);
                    if (menutab.shoppingLayer.checkDoiThe == 1) {
                        menutab.shoppingLayer.muaMaTheDtLayer.responseBuyCard(cmd.error);
                    } else if (menutab.shoppingLayer.checkDoiThe == 2) {
                        menutab.shoppingLayer.muaTheGameLayer.responseBuyCard(cmd.error);
                    }

                    break;
                case RESULT_BUY_CARD:
                    cmd = new CmdReceivedResultBuyCardMobile(pkg);
                    if (menutab.shoppingLayer.checkDoiThe == 1) {
                        menutab.shoppingLayer.muaMaTheDtLayer.responseResultBuyCard(cmd.error, cmd.currentMoney, cmd.softpin);
                        ;
                    } else if (menutab.shoppingLayer.checkDoiThe == 2) {
                        menutab.shoppingLayer.muaTheGameLayer.responseResultBuyCard(cmd.error, cmd.currentMoney, cmd.softpin);
                        ;
                    }

                    break;
                //Recharge Mobile
                case RECHARGE_MOBILE:
                    cmd = new CmdReceivedRechargeMobile(pkg);
                    if (menutab.shoppingLayer.checkDoiThe == 3) {
                        menutab.shoppingLayer.napTienTraTruoc.responseRechargeMobile(cmd.error);
                    } else if (menutab.shoppingLayer.checkDoiThe == 4) {
                        menutab.shoppingLayer.napTienTraSau.responseRechargeMobile(cmd.error);
                    }

                    break;
                case RESULT_RECHARGE_MOBILE:
                    cmd = new CmdReceivedResultRechargeMobile(pkg);
                    if (menutab.shoppingLayer.checkDoiThe == 3) {
                        menutab.shoppingLayer.napTienTraTruoc.responseResultRechargeMobile(cmd.error, cmd.currentMoney);
                    } else if (menutab.shoppingLayer.checkDoiThe == 4) {
                        menutab.shoppingLayer.napTienTraSau.responseResultRechargeMobile(cmd.error, cmd.currentMoney);
                    }

                    break;
                case UPDATE_JACKPOT:
                    cmd = new CmdReceivedUpdateJackpot(pkg);

                    menutab.huGameLayer.responseUpdateJackpot(cmd.miniPoker100, cmd.miniPoker1000, cmd.miniPoker10000, cmd.pokeGo100, cmd.pokeGo1000, cmd.pokeGo10000, cmd.khoBau100, cmd.khoBau1000, cmd.khoBau10000,
                        cmd.NDV100, cmd.NDV1000, cmd.NDV10000, cmd.Avengers100, cmd.Avengers1000, cmd.Avengers10000, cmd.Vqv100, cmd.Vqv1000, cmd.Vqv10000, cmd.DCLM100, cmd.DCLM1000, cmd.DCLM10000);
                    break;
                case RECHARGE_BANK:
                    cmd = new CmdReceivedRechargeBank(pkg);
                    menutab.shoppingLayer.napVinFromBank.responseRechargeBank(cmd.error, cmd.url);
                    break;
                //Kick User
                case KICK_USER:
                    cmd = new CmdReceivedKickUser(pkg);
                    gI.magicDoor.responseKickUser(cmd.error);
                    break;
                //Pot Game bai
                case POT_GAME_BAI:
                    cmd = new CmdReceivedPotGameBai(pkg);
                    lobby.menuLayer.responsePotGameBai(cmd.huBaCay, cmd.huBaiCao, cmd.huBinh, cmd.huSam, cmd.huTLMN);
                    break;
                /// IAP
                case CHECK_IAP:
                    cmd = new CmdReceivedCheckIAP(pkg);
                    menutab.shoppingLayer.napVinFromIap.responseCheckIAP(cmd.error);
                    break;
                case RESULT_IAP:
                    cmd = new CmdReceivedResultIAP(pkg);
                    menutab.shoppingLayer.napVinFromIap.responseResultIAP(cmd.error, cmd.sku, cmd.currentMoney);
                    break;
                // Event Vippoint
                case EVENT_VIPPOINT:
                    cmd = new CmdReceivedEventVippoint(pkg);
                    menutab.userManager.responseEventVippoint(cmd.status, cmd.time);
                    break;

                // New Mail
                case NEW_MAIL:
                    cmd = new CmdReceivedNewMail(pkg);
                    Minigame.responseHasNewMail();
                    break;
                // Event Dragon
                case EVENT_VP_DRAGON:
                    cmd = new CmdReceivedEventDragon(pkg);
                    menutab.userManager.responseHasEventDragon();
                    break;
                // VQ VIP
                case GET_VONGQUAY_VIP:
                    cmd = new CmdReceivedGetVongQuayVip(pkg);
                    vq_vip && vq_vip.responseGetVongQuayVip(cmd.remainCount);
                    break;
                case PLAY_VONGQUAY_VIP:
                    cmd = new CmdReceivedPlayVongQuayVip(pkg);
                    vq_vip && vq_vip.responsePlayVongQuayVip(cmd.error, cmd.prizeVin, cmd.prizeMulti, cmd.remainCount, cmd.currentMoneyVin);
                    break;
                // MISSION
                case GET_LIST_MISSION:
                    cmd = new CmdReceivedGetListMission(pkg);
                    giftcode && giftcode.responseGetListMission(cmd);
                    break;
                case EARN_VIN_MISSION:
                    cmd = new CmdReceivedEarnVinMission(pkg);
                    giftcode && giftcode.responseEarnVinMission(cmd);
                    break;
            }
            if (cmd != null) {
                cmd.clean();
            }
        }
    }
);
