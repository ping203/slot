var miniPoker = null;

(function () {
    var miniPokerX = 0;
    var miniPokerY = 0;
    var changeCatGatX = 80;
// var distanceStartEndMiniPoker = 126 * 9;
// var cardMiniPokerDistance = 125;
    var cardMiniPokerDistance = 146;
    var distanceStartEndMiniPoker = cardMiniPokerDistance * 9 + 16;


    var codeMiniPoker = uc.MiniPoker = uc.MiniGameBaseLayer.extend({
        ctor: function () {
            this._super("codeMiniPoker");

            // Declare UI
            this.pMiniPoker = null;
            this.btnRoom1 = null;
            this.btnRoom2 = null;
            this.btnRoom3 = null;
            this.changeMoneyType = null;
            this.lbPot = null;
            this.effectLayer = null;
            this.btnAutoPlay = null;

            // Declare value
            this.columns = [{col: null, x: 7}, {col: null, x: 12 + 78}, {col: null, x: 18 + 78 * 2}, {
                col: null,
                x: 23 + 78 * 3
            }, {col: null, x: 28 + 78 * 4}];
            this.roomjoint = 0;
            /*
            * ValueMoney
            * MoneyType === 0 : [1k, 10k, 100k]
            * MoneyType === 1 : [100<default>, 1k, 10k]
            * */
            this.valueMoney = 100;
            /*
            * MoneyType
            * 0: Xu
            * 1: Vin <default>
            * */
            this.moneyType = 1;
            this.autoPlayCmd = null;
            return true;
        },
        initBackground: function () {
            var self = this;
            var texture = ccui.Widget.LOCAL_TEXTURE;
            if (false) {
                texture = ccui.Widget.PLIST_TEXTURE;
            }
            this.addButton(this.pMiniPoker, 'btnClose', codeMiniPoker.BTN_CLOSEGAMEMINIPOKER, cc.p(945, 555), false, "res/MenuTab/btn-close-round.png", "res/MenuTab/btn-close-round.png", texture);
            this.addImage(this.pMiniPoker, 'title', cc.p(640, 594), "res/MiniGame/MiniPoker/title.png", cc.size(316, 105));
            this.addImage(this.pMiniPoker, 'bg', cc.p(640, 360), "res/MiniGame/MiniPoker/bg.png", cc.size(714, 404));
            this.addButton(this.pMiniPoker, 'btnSpin', codeMiniPoker.BTN_CANGAT, cc.p(1000, 400), false, "res/MiniGame/MiniPoker/cangiat.png", "res/MiniGame/MiniPoker/cangiat.png", texture);
            this.addImage(this.pMiniPoker, 'pot', cc.p(640, 500), "res/MiniGame/MiniPoker/pot.png", cc.size(278, 62));
            this.addText(this.pMiniPoker, 'lbPot', cc.p(568, 504), "", fontUTMBebas.fontName, 36);
            this.addText(this.pMiniPoker, 'lb-auto-quay', cc.p(906, 385), "TỰ QUAY", fontUTMBebas.fontName, 24);
            this['lb-auto-quay'].setColor(GuiUtil.color('#f7e788'));
            this.addCheckBox(this.pMiniPoker, "btnAutoPlay", cc.p(906, 340), false, 'res/MiniGame/MiniPoker/checkbox.png', 'res/MiniGame/MiniPoker/checkbox.png',
                res_Lobby + "/reg/checked.png", 'res/MiniGame/MiniPoker/checkbox.png', res_Lobby + "/reg/checked.png", ccui.Widget.LOCAL_TEXTURE);
            this.btnAutoPlay.addEventListener(function (sender, eventType) {
                self.autoPlayCmd = new CmdSendAutoMiniPoker();
                if(eventType === ccui.CheckBox.EVENT_SELECTED) {
                    self.autoPlayCmd.putAutoMiniPoker(1);
                } else if (eventType === ccui.CheckBox.EVENT_UNSELECTED) {
                    self.autoPlayCmd.putAutoMiniPoker(0);
                }
                Minigame.miniGameClient.send(self.autoPlayCmd);
            });
            // this.btnAutoPlay.setTag(codeMiniPoker.BTN_TUQUAY);
            // this.btnAutoPlay.setTouchEnabled(true);
            // this.btnAutoPlay.addTouchEventListener(this.onTouchEventHandler, this);
            this.lbPot._setAnchorX(0);
            this.addButton(this.pMiniPoker, 'changeMoneyType', codeMiniPoker.BTN_CHANGEMONEYTYPE, cc.p(534, 500), false, "res/MenuTab/coin-money.png", "res/MenuTab/coin-money.png", texture);
            this.addImage(this.pMiniPoker, 'in-bg', cc.p(640, 348), "res/MiniGame/MiniPoker/in_bg.png", cc.size(427, 228));
            this.addButton(this.pMiniPoker, 'history', codeMiniPoker.BTN_LICHSU, cc.p(564, 164), false, "res/MiniGame/MiniPoker/lichsu.png", "res/MiniGame/MiniPoker/lichsu.png", texture);
            this.addButton(this.pMiniPoker, 'top', codeMiniPoker.BTN_TOPXEPHANG, cc.p(640, 164), false, "res/MiniGame/MiniPoker/ds-dungdau.png", "res/MiniGame/MiniPoker/ds-dungdau.png", texture);
            this.addButton(this.pMiniPoker, 'guide', codeMiniPoker.BTN_HUONG_DAN, cc.p(716, 164), false, "res/MiniGame/MiniPoker/huongdan.png", "res/MiniGame/MiniPoker/huongdan.png", texture);
            this.addButton(this.pMiniPoker, 'btnRoom1', codeMiniPoker.BTN_SELECTROOM1, cc.p(378, 448), false, "res/MiniGame/MiniPoker/bg-btn-active.png", "res/MiniGame/MiniPoker/bg-btn-active.png", texture);
            this.addButton(this.pMiniPoker, 'btnRoom2', codeMiniPoker.BTN_SELECTROOM2, cc.p(378, 362), false, "res/MiniGame/MiniPoker/bg-btn.png", "res/MiniGame/MiniPoker/bg-btn.png", texture);
            this.addButton(this.pMiniPoker, 'btnRoom3', codeMiniPoker.BTN_SELECTROOM3, cc.p(378, 278), false, "res/MiniGame/MiniPoker/bg-btn.png", "res/MiniGame/MiniPoker/bg-btn.png", texture);
            this.addLayout(this.pMiniPoker, 'spinContent', cc.p(640, 348), null, cc.size(427, 205), false);
            this.addSprite(this.pMiniPoker, 'shadown-inbg', cc.p(640, 348), "res/MiniGame/MiniPoker/shadow-inbg.png", texture);
            this['spinContent'].setClippingEnabled(true);

            this.btnRoom1.setTitleText('100');
            this.btnRoom2.setTitleText('1k');
            this.btnRoom3.setTitleText('10k');
            this.btnRoom1.setTitleFontName(fontUTMBebas.fontName);
            this.btnRoom2.setTitleFontName(fontUTMBebas.fontName);
            this.btnRoom3.setTitleFontName(fontUTMBebas.fontName);
        },
        customizeGUI: function () {
            this.pMiniPoker = new ccui.Layout();
            this.addLayout(this, 'pMiniPoker', cc.p(640, 320), null, cc.size(1280, 720), true);
            // GuiUtil.setBackGroundColor(this.getParent(), cc.color.BLACK, 200);
            this.open();
            this.initBackground();
            var ranCard = this.createCardNotLike(10);
            var resCard = this.createCardNotLike(5, ranCard);
            for (var i = 0; i < 5; i++) {
                var threeFirst = [ranCard[i * 2], resCard[i], ranCard[i + 1]];
                this.columns[i].col = new ColumnCardMiniPoker(threeFirst, threeFirst);
                this.columns[i].col.x = this.columns[i].x;
                this.columns[i].col.y = -105 / 2;
                this['spinContent'].addChild(this.columns[i].col);
            }
            this.funChangeRoom();
        },
        createCardNotLike: function (numberCard, notLike) {
            var arrCheck = new Array(65).fill(0);
            var arrCard = [];
            if (notLike) {
                for (var i = 0; i < notLike.length; i++)
                    arrCheck[notLike[i].code + notLike[i].type] = 1;
            }
            for (var i = 0; i < numberCard; i++) {
                var so = Math.floor(Math.random() * 13) + 1;
                var chat = Math.floor(Math.random() * 4) + 1;
                if (arrCheck[so + (chat * 13)] === 1) i--;
                else {
                    arrCheck[so + (chat * 13)] = 1;
                    arrCard.push({code: so, type: chat * 13});
                }
            }
            return arrCard;
        },
        runEffectColumn: function (col, time) {
            setTimeout(function () {
                col.spinColumnCard(4);
            }, time);
        },
        funPlayMinigame: function () {
            this.commandPlayMinigame();
        },
        onButtonRelease: function (button, id) {
            switch (id) {
                case codeMiniPoker.BTN_CANGAT:
                    if (!this.btnAutoPlay.isSelected())
                        this.commandPlayMinigame();
                    else
                        alert('Vui lòng tắt tự động quay trước khi thay đổi!');
                    break;
                case codeMiniPoker.BTN_TUQUAY:
                    break;
                case codeMiniPoker.BTN_CHANGEMONEYTYPE:
                    if (!this.btnAutoPlay.isSelected()) {
                        this.moneyType = this.moneyType === 0 ? 1 : 0;
                        if (this.moneyType === 0) {
                            this.btnRoom1.setTitleText('1k');
                            this.btnRoom2.setTitleText('10k');
                            this.btnRoom3.setTitleText('100k');
                            this.valueMoney = 1000;
                        } else {
                            this.btnRoom1.setTitleText('100');
                            this.btnRoom2.setTitleText('1k');
                            this.btnRoom3.setTitleText('10k');
                            this.valueMoney = 100;
                        }
                        this.selectRoom(this.btnRoom1);
                    } else alert('Vui lòng tắt tự động quay trước khi thay đổi!');
                    break;
                case codeMiniPoker.BTN_SELECTROOM1:
                    if (!this.btnAutoPlay.isSelected()) {
                        this.valueMoney = this.moneyType === 1 ? 100 : 1000;
                        this.selectRoom(this.btnRoom1);
                    } else alert('Vui lòng tắt tự động quay trước khi thay đổi!');
                    break;
                case codeMiniPoker.BTN_SELECTROOM2:
                    if (!this.btnAutoPlay.isSelected()) {
                        this.selectRoom(this.btnRoom2);
                        this.valueMoney = this.moneyType === 1 ? 1000 : 10000;
                    } else alert('Vui lòng tắt tự động quay trước khi thay đổi!');
                    break;
                case codeMiniPoker.BTN_SELECTROOM3:
                    if (!this.btnAutoPlay.isSelected()) {
                        this.selectRoom(this.btnRoom3);
                        this.valueMoney = this.moneyType === 1 ? 10000 : 100000;
                    } else alert('Vui lòng tắt tự động quay trước khi thay đổi!');
                    break;
            }
        },
        selectRoom: function (node) {
            var texture = ccui.Widget.LOCAL_TEXTURE;
            if (false) {
                texture = ccui.Widget.PLIST_TEXTURE;
            }
            this.btnRoom1.loadTextureNormal("res/MiniGame/MiniPoker/bg-btn.png", texture);
            this.btnRoom2.loadTextureNormal("res/MiniGame/MiniPoker/bg-btn.png", texture);
            this.btnRoom3.loadTextureNormal("res/MiniGame/MiniPoker/bg-btn.png", texture);
            node.loadTextureNormal("res/MiniGame/MiniPoker/bg-btn-active.png", texture);
        },
        responseX2Date: function (datex2) {

        },
        commandPlayMinigame: function () {
            var playMiniPoker = new CmdSendMiniPoker();
            playMiniPoker.putPlayMiniPoker(this.valueMoney, this.moneyType);
            if (Minigame.miniGameClient.send(playMiniPoker)) {
                /* this.spCangat.runAction(actionCanGat());
                 miniPoker.CanGat.setEnabled(false);
                 miniPoker.pn_effect_muiten.setVisible(false);
                 this.btnCoin100.setEnabled(false);
                 this.btnCoin1000.setEnabled(false);
                 this.btnCoin10000.setEnabled(false);*/
            }
            playMiniPoker.clean();
        },
        funChangeRoom: function () {
            //cc.log("roomleave: " + this.MINI_POKER_ROOM + " roomJoint: " + miniPoker.roomjoint);
            this.ischangeroom = true;
            var miniPokerSend = new CmdChangeRoomMiniPoker();
            miniPokerSend.putChangeRoomMiniPoker(this.MINI_POKER_ROOM, miniPoker.roomjoint);
            Minigame.miniGameClient.send(miniPokerSend);
            miniPokerSend.clean();
            /*miniPoker.CanGat.setEnabled(false);
            this.btnChangeMoneytype.setEnabled(false);
            this.btnCoin100.setEnabled(false);
            this.btnCoin1000.setEnabled(false);
            this.btnCoin10000.setEnabled(false);*/
        },
        responseUpdateMiniPoker: function (value, x2) {
            this.lbPot.setText(StringUtility.pointNumber(x2 === 1 ? value * 2 : value));
        },
        responsePlayMiniPoker: function (result, prize, card1, card2, card3, card4, card5, currentmoney) {
            var self = this;
            // cc.log(new Date().getSeconds());
            if (this.effectLayer) this.effectLayer.removeFromParent();
            this['btnSpin'].setTouchEnabled(false);
            cc.log("result: " + result + ", prize: " + prize + ", card: " + card1 + "," + card2 + "," + card3 + "," + card4 + "," + card5 + " currentmoney " + currentmoney);
            this['spinContent'].removeAllChildren();
            var resCard = [this.parserCard(card1), this.parserCard(card2), this.parserCard(card3), this.parserCard(card4), this.parserCard(card5)];
            var ranCard = this.createCardNotLike(10, resCard);
            for (var i = 0; i < 5; i++) {
                var threeLast = [ranCard[i * 2], resCard[i], ranCard[i + 1]];
                this.columns[i].col = new ColumnCardMiniPoker(this.columns[i].col.arrCard.slice(27, 30), threeLast);
                this.columns[i].col.x = this.columns[i].x;
                this.runEffectColumn(this.columns[i].col, i === 0 ? 0 : i * 300);
                this['spinContent'].addChild(this.columns[i].col);
            }
            // xong hieu ung quay
            setTimeout(function () {
                self.showResult(result, prize);
                self['btnSpin'].setTouchEnabled(true);
            }, 3000);
        },
        responseStopAutoMiniPoker: function () {
            cc.log("responseStopAutoMiniPoker");
            // this.autoPlayCmd.putAutoMiniPoker(false);
            // Minigame.miniGameClient.send(this.autoPlayCmd);
        },
        showResult: function (result, prize) {
            switch (result) {
                case 0: // trượt
                    break;
                case 1: // nổ hũ
                case 2: // thùng phá sảnh nhỏ
                case 3: // tứ quý
                    this.showEffectWinBig(result, prize);
                    break;
                case 4: // cù lũ
                case 5: // thùng
                case 6: // sảnh
                case 7: // sám cô
                case 8: // hai đôi
                case 9: // một đôi to
                case 10: // một đôi nhỏ
                case 11: // bài cáo
                    this.showEffectWinSmall(result, prize);
                    break;
                case 100: // quay không thành công
                    break;
                case 101: // đặt cược không hợp lệ
                    break;
                case 102: // không đủ tiền
                    break;
            }
        },
        parserCard: function (value) {
            for (var i = 0, j = 2; i < 52; i = i + 4, j++) {
                if (value < i + 4) {
                    j = j === 14 ? 1 : j;
                    switch (value - i) {
                        case 0:
                            return {
                                code: j,
                                type: 13 * 3
                            };
                        case 1:
                            return {
                                code: j,
                                type: 13 * 4
                            };
                        case 2:
                            return {
                                code: j,
                                type: 13
                            };
                        case 3:
                            return {
                                code: j,
                                type: 13 * 2
                            };
                    }
                }
            }
        },
        showEffectWinSmall: function (result, prize) {
            var texType = ccui.Widget.LOCAL_TEXTURE;
            var options = {
                amount: StringUtility.pointNumber(result),
                texture: ''
            };
            switch (result) {
                case 4: // cù lũ
                    options.texture = 'res/MiniGame/MiniPoker/cu-lu.png';
                    break;
                case 5: // thùng
                    options.texture = 'res/MiniGame/MiniPoker/thung.png';
                    break;
                case 6: // sảnh
                    options.texture = 'res/MiniGame/MiniPoker/Sanh.png';
                    break;
                case 7: // sám cô
                    options.texture = 'res/MiniGame/MiniPoker/sam.png';
                    break;
                case 8: // hai đôi
                    options.texture = 'res/MiniGame/MiniPoker/2-doi.png';
                    break;
                case 9: // một đôi to
                    options.texture = 'res/MiniGame/MiniPoker/Doi-J.png';
                    break;
                case 10: // một đôi nhỏ
                    options.texture = '';
                    break;
                case 11: // bài cáo
                    options.texture = '';
                    break;
            }
            this.effectLayer = new ccui.Layout();
            this.effectLayer.width = 455;
            this.effectLayer.height = 143;
            this.effectLayer.setAnchorPoint(0.5, 0.5);
            this.effectLayer.setPosition(this["shadown-inbg"].width / 2, this["shadown-inbg"].height / 2);
            this.effectLayer.setBackGroundImage(options.texture, texType);

            if (prize > 0) {
                var lbMoney = new ccui.Text('', fontUTMBebas.fontName, 46);
                lbMoney.setPosition(this.effectLayer.width / 2, 130);
                lbMoney.enableOutline(cc.color.BLACK, 5);
                this.effectLayer.addChild(lbMoney);
                this.showEffectMoney(lbMoney, prize);
            }
            this["shadown-inbg"].addChild(this.effectLayer);
        },
        showEffectWinBig: function (result, prize) {
            var self = this;
            var texType = ccui.Widget.LOCAL_TEXTURE;
            var options = {
                amount: StringUtility.pointNumber(result),
                texture: '',
                textureTitle: '',
                textureSubTitle: '',
            };
            this.effectLayer = new ccui.Layout();
            this.effectLayer.width = 455;
            this.effectLayer.height = 143;
            this.effectLayer.setAnchorPoint(0.5, 0.5);
            this.effectLayer.setPosition(this["shadown-inbg"].width / 2, this["shadown-inbg"].height / 2);
            this.effectLayer.setBackGroundImage('res/MiniGame/MiniPoker/bg-effect.png', texType);
            switch (result) {
                case 1: // nổ hũ
                    options.texture = 'res/MiniGame/MiniPoker/jackpot-coin.png';
                    options.textureTitle = 'res/MiniGame/MiniPoker/jackpot-txt.png';
                    options.textureSubTitle = 'res/MiniGame/MiniPoker/thung-pha-sanh-co-j-txt.png';
                    break;
                case 2: // thùng phá sảnh nhỏ
                    options.texture = 'res/MiniGame/MiniPoker/thung-pha-sanh-coin.png';
                    options.textureTitle = 'res/MiniGame/MiniPoker/thung-pha-sanh-text.png';
                    break;
                case 3: // tứ quý
                    options.texture = 'res/MiniGame/MiniPoker/tu-quy.png';
                    options.textureTitle = 'res/MiniGame/MiniPoker/tu-quy-text.png';
                    break;
            }

            var bgEffect = new ccui.ImageView('res/MiniGame/MiniPoker/effect.png', texType);
            bgEffect.setPosition(this.effectLayer.width / 2, this.effectLayer.height / 2);

            var title = new ccui.ImageView(options.textureTitle, texType);
            title.setPosition(this.effectLayer.width / 2, this.effectLayer.height / 2);
            title.setScale(.8, .8);

            var subTitle = null;

            if (result === 1) {
                var texture = new ccui.ImageView(options.texture, texType);
                texture.setPosition(this.effectLayer.width / 2, this.effectLayer.height / 2);
                texture.setScale(0, 0);
                texture.runAction(cc.repeatForever(cc.sequence([cc.scaleTo(.9, 1, 1).easing(cc.easeSineIn()), cc.scaleTo(0, 0, 0)])));
                subTitle = new ccui.ImageView(options.textureSubTitle, texType);
                subTitle.setPosition(this.effectLayer.width / 2, 0);
                subTitle.setScale(.8, .8);
            } else {
                var texture = new ccui.ImageView(options.texture, texType);
                texture.setPosition(this.effectLayer.width / 2, 0);
            }
            var lbMoney = new ccui.Text('', fontUTMBebas.fontName, 48);
            lbMoney.setPosition(this.effectLayer.width / 2, 130);
            lbMoney.enableOutline(cc.color.BLACK, 5);
            this.showEffectMoney(lbMoney, prize);

            this.effectLayer.addChild(bgEffect);
            this.effectLayer.addChild(title);
            this.effectLayer.addChild(texture);
            this.effectLayer.addChild(lbMoney);
            if (subTitle) this.effectLayer.addChild(subTitle);

            // action
            var rotate = cc.rotateBy(5, 100);
            bgEffect.runAction(cc.repeatForever(rotate));

            var sequence = cc.sequence([cc.scaleTo(.5, .6).easing(cc.easeSineIn()), cc.scaleTo(.5, .8).easing(cc.easeBackOut())]);
            title.runAction(cc.repeatForever(sequence));
            this["shadown-inbg"].addChild(this.effectLayer);
        },
        showEffectMoney: function (label, prize, value) {
            var self = this;
            if (!value) value = prize > 100 ? prize - 100 : 0;
            label.setText('+' + StringUtility.pointNumber(value));
            // cc.log(value);
            setTimeout(function () {
                if (value < prize) self.showEffectMoney(label, prize, value + 1);
            }, 2);
        },
        open: function () {
            if (miniPoker) return;
            gI.miniPoker = miniPoker = new codeMiniPoker();
            miniPokerX = miniPoker.getPosition().x;
            miniPokerY = miniPoker.getPosition().y;
            var curScene = SceneMgr.getInstance().getRunningScene();
            curScene.addGUI(miniPoker, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_MINI_POKER);
            miniPoker.hideMiniPoker = false;
            subScribeMiniPoker();
        },
        close: function () {
            if (!miniPoker) return;
            if (mini_thanhtich != null) close_minipoker_bangthanhtich();
            if (mini_lichsu != null) close_minipoker_lichsu();
            if (gI.mainSocket.state == uc.WEBSOCKET_CONNECTED) {
                var miniPokerSend = new CmdSendUnsubcriberMiniPoker();
                miniPokerSend.putUnsubscriberMiniPoker(miniPoker.MINI_POKER_ROOM);
                Minigame.miniGameClient.send(miniPokerSend);
                miniPokerSend.clean();
            }
            miniPoker.removeFromParent();
            miniPoker = null;
            cc.spriteFrameCache.removeSpriteFramesFromFile("res/Minigame/ResMiniPoker/PlistMiniPoker.plist");
            cc.spriteFrameCache.removeSpriteFramesFromFile("res/Minigame/ResMiniPoker/CanGatAnimation.plist");
            GuiUtil.removeTextureList(g_resources_mn_poker);
        }
    });

    codeMiniPoker.BTN_SELECTROOM1 = 1;
    codeMiniPoker.BTN_SELECTROOM2 = 2;
    codeMiniPoker.BTN_SELECTROOM3 = 3;
    codeMiniPoker.BTN_CHANGEMONEYTYPE = 4;
    codeMiniPoker.BTN_TUQUAY = 5;
    codeMiniPoker.BTN_CANGAT = 6;
    codeMiniPoker.BTN_CLOSEGAMEMINIPOKER = 7;
    codeMiniPoker.BTN_GUILD = 9;
    codeMiniPoker.BTN_LICHSU = 10;
    codeMiniPoker.BTN_TOPXEPHANG = 12;
    codeMiniPoker.BTN_LICHSUGIAODICH = 13;
    codeMiniPoker.BTN_EVENT = 14;
})();

