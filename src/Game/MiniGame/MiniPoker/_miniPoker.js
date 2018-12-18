var _miniPoker = null;

(function () {
    var miniPokerX = 0;
    var miniPokerY = 0;
    var changeCatGatX = 80;
// var distanceStartEndMiniPoker = 126 * 9;
// var cardMiniPokerDistance = 125;
    var cardMiniPokerDistance = 146;
    var distanceStartEndMiniPoker = cardMiniPokerDistance * 9 + 16;


    var codeMiniPoker = uc.MiniPoker = uc.MiniGameBaseLayer.extend(
        {
            ctor: function () {
                this.moneyType = MONEY_VIN;
                this.autoRotate = false;
                this.valueMoney = 0;
                this.isStartRotateMini = false;

                this.valueColum = false;
                this.link_image_chat = "";
                this.text_quanbai = "";
                this.linkImage = null;
                this.color_quanbai = "red";
                this.vitriYmini = 0;
                this.saveVitri = 0;
                this.isshowNoHu = false;
                this.roomjoint = 0;
                this.ischangeroom = false;
                this.MINI_POKER_ROOM = 0;
                this.valueOldHu = 500000;
                this.isruneffecthu = false;
                this.moveOn1 = false;
                this.moveOn2 = false;
                this.moveOn3 = false;
                this.hideMiniPoker = false;

                this._super("codeMiniPoker");
                this._enableChangeRoom = true;
                this._enableAutoSpin = true;
                return true;
            },
            customizeGUI: function () {
                this.resourcePath = "res/Minigame/ResMiniPoker/";
                cc.spriteFrameCache.addSpriteFrames("res/Minigame/ResMiniPoker/PlistMiniPoker.plist");
                cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/PlistImageChung.plist");
                cc.spriteFrameCache.addSpriteFrames("res/Minigame/ResMiniPoker/CanGatAnimation.plist");
                this.pn_minipoker = this.addLayoutStructure(this, "_layout", cc.p(640.00, 360.00), "", cc.size(742, 294.00), false);
                this.setDraggableLayout(this._layout);

                this.initBackground();
                this.initPanelAnimation();
                this.initBackgroundSecon();
                this.initSpThongbao();
                this.initBackgroundThird();
                this.initPanelEffectMuiten();
                this.initPnEffectHu();
                this.initEffect();
            },

            initBackground: function () {

                if (!cc.sys.isNative) {
                    this.pn_minipoker.setScale(0.7);
                }

                var background = this._layout;

                this.addSpriteStructureWithoutResourcePath(background, "shadow", cc.p(369.79, 306.41), this.commonImagePath + "shadow_tren.png");
                this.addSpriteStructure(background, "bg_cangat", cc.p(672.79 + changeCatGatX, 150.51), "bg_cangat.png");
                this.addSpriteStructureWithoutResourcePath(background, "bg_minipoker", cc.p(369.79, 145.41), this.commonImagePath + "bg_minigame.png");
                this.addSpriteStructureWithoutResourcePath(background, "sp_time_event", cc.p(156.64, 360.55), this.commonImagePath + "time_event.png");
                this.addTextStructure(background, "time_event", cc.p(157.18, 341.56), "", fontRobotoBold.fontName, "16");
                this.addSpriteStructure(background, "bg_bobai", cc.p(369.79, 147.41), "bg_bobai.png");
                this.addSpriteStructureWithoutResourcePath(background, "spCangat", cc.p(672.79 + changeCatGatX, 150.51), "res/Minigame/ResMiniPoker/CanGat/Cangat1.png");
                this.addButtonStructure(background, "CanGat", codeMiniPoker.BTN_CANGAT, cc.p(672.79 + changeCatGatX, 150.51), true, this.resourcePath + "run1.png");
                this.addSpriteStructure(background, "sp_tuquay", cc.p(525.63, 45.38), "tuquay.png");
                this.addButtonStructure(background, "btnTuQuay", codeMiniPoker.BTN_TUQUAY, cc.p(525.63, 45.38), true, this.resourcePath + "btntuquay.png").setScale(198.00 / 141, 42 / 31);
                var changeHuX = -130, changeHuY = 20;
                this.addSpriteStructureWithoutResourcePath(background, "bg_hu", cc.p(369.79 + changeHuX, 265.51 + changeHuY), this.resourcePath + "bg_hu.png");
                this.addTextStructure(background, "txtHu", cc.p(368.28 + changeHuX, 265.07 + changeHuY), "", fontRobotoBold.fontName, "34", undefined, {__size: cc.size(300.00, 56)});
            },

            initPanelAnimation: function () {
                var changeX = 14, changeY = -11;
                // var changeX = 0, changeY = 0;
                var layout = this.addLayoutStructure(this._layout, "pnAnimation", cc.p(116.00 - 2.5 * changeX, 88.00 + changeY), "", cc.size(505.00 + 5 * changeX, 125.00 + 2 * Math.abs(changeY)), false, {
                    anchorX: 0,
                    anchorY: 0
                });
                layout.setClippingEnabled(true);
                var changeXInner = 36;
                var changeYInner = changeY + 12;
                // var changeYInner = changeY + 0;
                var postions = [[7.00 - 2.5 * changeX + changeXInner, 3.00 + changeYInner], [107.00 - 1.5 * changeX + changeXInner, 3.00 + changeYInner], [207.00 - 0.5 * changeX + changeXInner, 3.00 + changeYInner],
                    [307.00 + 0.5 * changeX + changeXInner, 3.00 + changeYInner], [407.00 + 1.5 * changeX + changeXInner, 3.00 + changeYInner]];

                var scaleX = 113 / 96, scaleY = 146 / 124;

                function createPanelColum(position, index) {
                    var name = index + 1;
                    var layout = this.addLayoutStructure(this.pnAnimation, "pnColum" + name, cc.p.apply(this, position), "", cc.size(1.00, 1.00), false, {
                        anchorX: 0,
                        anchorY: 0,
                        // scaleX: 113 / 96,
                        // scaleY: 146 / 124
                    });
                    for (var i = 0; i < 10; i++) {
                        createQuanbai.call(this, i, name);
                    }
                }

                function createQuanbai(index, name) {
                    var indexName = index + 1;
                    var quanbaiName = name + "_" + indexName;
                    var position = [0, cardMiniPokerDistance * index];
                    var layout = this.addLayoutStructure(this["pnColum" + name], "quanbai" + quanbaiName, cc.p.apply(this, position), "", cc.size(0, 0), false, {
                        anchorX: 0,
                        anchorY: 0,
                        scaleX: scaleX,
                        scaleY: scaleY
                    });
                    this.addSpriteStructure(layout, "bg_labai", cc.p(44.41, 58.00), "bg_labai.png", {
                        nestedProp: true
                    });
                    this.addSpriteStructureWithoutResourcePath(layout, "spColum" + quanbaiName, cc.p(82.41, 5.50), this.commonImagePath + "DauNguoi/chat_co.png", {
                        anchorX: 1,
                        anchorY: 0
                    });
                    this.addSpriteStructureWithoutResourcePath(layout, "sp_chat" + quanbaiName, cc.p(26.82, 55.34), this.commonImagePath + "DauNguoi/chat_co.png", {
                        anchorX: 1,
                        anchorY: 0,
                        scaleX: 0.32,
                        scaleY: 0.32
                    });
                    this.addTextStructure(layout, "txt" + quanbaiName, cc.p(18.18, 93.89), "10", "Roboto-Regular", "40", "#FF0000", {
                        scaleX: 0.72,
                        __size: cc.size(59.00, 47)
                    });
                }

                postions.forEach(createPanelColum.bind(this));
            },

            initBackgroundSecon: function () {
                var background = this._layout;
                var buttonPositionY = 40;
                this.addSpriteStructureWithoutResourcePath(background, "sp_room1", cc.p(146.79, buttonPositionY), this.commonImagePath + "room_select.png");
                this.addSpriteStructureWithoutResourcePath(background, "sp_room2", cc.p(240.42, buttonPositionY), this.commonImagePath + "bg_room.png");
                this.addSpriteStructureWithoutResourcePath(background, "sp_room3", cc.p(336.23, buttonPositionY), this.commonImagePath + "bg_room.png");

                var _self = this;
                createBtnSelect("btnCoin100", codeMiniPoker.BTN_SELECTROOM1, cc.p(146.79, buttonPositionY));
                createBtnSelect("btnCoin1000", codeMiniPoker.BTN_SELECTROOM2, cc.p(240.42, buttonPositionY));
                createBtnSelect("btnCoin10000", codeMiniPoker.BTN_SELECTROOM3, cc.p(336.23, buttonPositionY));

                function createBtnSelect(name, tag, position) {
                    var button = new ccui.Button();
                    _self.addChildAsProp(background, button, name, true);
                    tag = parseInt(tag);
                    button.setTag(tag);
                    button.setName(name);
                    button.setPosition(position);
                    button.setPressedActionEnabled(true);
                    button.setContentSize(cc.size(63, 63));
                    button.addTouchEventListener(_self.onTouchEventHandler, _self);
                    button.loadTextureNormal(_self.resourcePath + "btn_room.png", GuiUtil.checkTextureType(_self.resourcePath + "btn_room.png"));
                    button.loadTexturePressed(_self.commonImagePath + "room_select.png", GuiUtil.checkTextureType(_self.commonImagePath + "room_select.png"));
                    return button;
                }

                this.addTextStructure(background, "lb_room1", cc.p(146.79, buttonPositionY), "", fontRobotoBold.fontName, "23", undefined).setTouchEnabled(false);
                this.addTextStructure(background, "lb_room2", cc.p(240.42, buttonPositionY), "", fontRobotoBold.fontName, "23", undefined).setTouchEnabled(false);
                this.addTextStructure(background, "lb_room3", cc.p(336.23, buttonPositionY), "", fontRobotoBold.fontName, "23", undefined).setTouchEnabled(false);
                var changeX = 60;
                this.addButtonStructure(background, "btnGuild", codeMiniPoker.BTN_GUILD, cc.p(550.21 - 1 * changeX, 286.48), true, this.commonImagePath + "huongdan.png");
                this.addButtonStructure(background, "btnLichSu", codeMiniPoker.BTN_LICHSU, cc.p(550.21 - 0 * changeX, 286.48), true, this.commonImagePath + "lsgd.png");
                this.addButtonStructure(background, "btnTop", codeMiniPoker.BTN_TOPXEPHANG, cc.p(550.21 - 2 * changeX, 286.80), true, this.commonImagePath + "bangvinhdanh.png");
                this.addButtonStructure(background, "btnCloseGame", codeMiniPoker.BTN_CLOSEGAMEMINIPOKER, cc.p(634.21, 286.48), true, this.commonImagePath + "btn_closegame.png");
                this.addButtonStructure(background, "btn_event", codeMiniPoker.BTN_EVENT, cc.p(381.01, 351.21), true, this.resourcePath + "event_poker.png");

                this.addText(this.pn_minipoker, "time_event", cc.p(157.18, 341.56), "", fontRobotoBold.fontName, 16);
                this.time_event.ignoreContentAdaptWithSize(false);
                this.time_event.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                this.time_event.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.time_event.setContentSize(cc.size(94, 19));

                this.addLayout(this.pn_minipoker, "pnx2", cc.p(555.60 - 187, 263.33 + 23), null, cc.size(0, 0), false);
                this.addSpriteStructure(this.pnx2, "bg_x2", cc.p(0, 0), "Bg_x2.png");
                this.addTextStructure(this.pnx2, "lbX2", cc.p(0, 0), "X2", fontRobotoBold.fontName, 30, GuiUtil.color("#FFFF00"), {__size: cc.size(50, 30)});
                this.lbX2.enableOutline(cc.color.BLACK, 1);
            },

            initSpThongbao: function () {
                var background = this.addLayoutStructure(this._layout, "sp_thongbao", cc.p(370.00, 145.10), "", cc.size(38, 37), false);
                this.addTextStructure(background, "txtThongBao1", cc.p(18.79, -9.42), "", fontRobotoBold.fontName, "34", "#FFFF00").enableOutline(cc.color.BLACK, 1);
                this.addTextStructure(background, "txtThongBao2", cc.p(18.79, 63.74), "", fontRobotoBold.fontName, "36", "#FFFFFF").enableOutline(cc.color.BLACK, 1);
            },

            initBackgroundThird: function () {
                var background = this._layout;
                this.addSpriteStructureWithoutResourcePath(background, "bg_nhangiai", cc.p(370.04, 144.04), this.commonImagePath + "bg_giaithuong.png");
                this.addSpriteStructure(background, "sp_giaithuong", cc.p(370.04, 144.04), "run1.png");
                this.addSpriteStructureWithoutResourcePath(background, "spChangeMoney", cc.p(103.43, 283.79), this.commonImagePath + "choivin.png");
                var btnChangeMoneytype = this.addButtonStructure(background, "btnChangeMoneytype", codeMiniPoker.BTN_CHANGEMONEYTYPE, cc.p(103.43, 283.78), true, this.resourcePath + "btnChangeMoney.png", {scaleY: 95.00 / 34});
                if (!isOpenXu) {
                    this.spChangeMoney.setVisible(false);
                    this.btnChangeMoneytype.setVisible(false);
                }
            },
            initPanelEffectMuiten: function () {
                var background = this.addLayoutStructure(this._layout, "pn_effect_muiten", cc.p(651.57 + changeCatGatX, 2.63 + 30), undefined, cc.size(0, 0), false, {
                    anchorX: 0,
                    anchorY: 0
                });
                this.addSpriteStructure(background, "muiten1", cc.p(21.14, 209.08), "arrow_down.png");
                this.addSpriteStructure(background, "muiten2", cc.p(21.14, 146.08), "arrow_down.png");
                this.addSpriteStructure(background, "muiten3", cc.p(21.14, 86.08), "arrow_down.png");
            },

            initPnEffectHu: function () {
                var background = this.addLayoutStructure(this._layout, "pn_effect_hu", cc.p(118.00, 90.00), "", cc.size(0, 0), false, {
                    anchorX: 0,
                    anchorY: 0
                });
                this.addSpriteStructureWithoutResourcePath(background, "circle", cc.p(253.00, 56.00), this.commonImagePath + "effect_circle.png");
                this.addSpriteStructure(background, "bg_effect_hu", cc.p(263.00, 56.00), "bg_effect.png");
                this.addSpriteStructure(background, "sp_nohu", cc.p(253.00, 56.00), "text_nohu.png");
                this.addSpriteStructure(background, "sp_thungphasanh", cc.p(253.00, 56.00), "text_thungphasanh.png");
                this.addSpriteStructure(background, "star_1", cc.p(421.97, 104.40), "sp_star.png");
                this.addSpriteStructure(background, "star_2", cc.p(168.34, -6.52), "sp_star.png", {
                    scaleX: 0.8,
                    scaleY: 0.8
                });
                this.addSpriteStructure(background, "star_3", cc.p(132.23, 113.99), "sp_star.png", {
                    scaleX: 0.5,
                    scaleY: 0.5
                });
                this.addTextStructure(background, "lb_money_earn_hu", cc.p(253.00, 56.00), "10.000.000", fontRobotoBold.fontName, "50", "#FFFFFF", {
                    __size: cc.size(450.00, 70.00)
                });
            },


            initEffect: function () {


                this.valueMoney = 100;
                this.moneyType = 1;
                this.autoRotate = false;

                this.btnCoin100.setEnabled(false);
                this.txtHu.setColor(GuiUtil.color("#FFFF00"));

                this.sp_thongbao = this.pn_minipoker.getChildByName("sp_thongbao");
                this.MiniPokerNotice1 = this.txtThongBao1;
                this.MiniPokerNotice2 = this.txtThongBao2;
                this.MiniPokerNotice1.setString("");
                this.MiniPokerNotice2.setString("");
                this.position_notice = this.MiniPokerNotice2.y;
                this.bg_nhangiai.setVisible(false);
                this.sp_giaithuong.setScaleX(0);
                this.lb_room1.setString("100");
                this.lb_room2.setString("1K");
                this.lb_room3.setString("10K");

                GuiUtil.changeSprite(this.spColum1_1, "res/Minigame/ImageChung/DauNguoi/chat_co.png");
                GuiUtil.changeSprite(this.sp_chat1_1, "res/Minigame/ImageChung/DauNguoi/chat_co.png");
                this.txt1_1.setString("9");
                GuiUtil.changeSprite(this.spColum2_1, "res/Minigame/ImageChung/DauNguoi/chat_co.png");
                GuiUtil.changeSprite(this.sp_chat2_1, "res/Minigame/ImageChung/DauNguoi/chat_co.png");
                this.txt2_1.setString("10");
                GuiUtil.changeSprite(this.spColum3_1, "res/Minigame/ImageChung/DauNguoi/J_co.png");
                GuiUtil.changeSprite(this.sp_chat3_1, "res/Minigame/ImageChung/DauNguoi/chat_co.png");
                this.txt3_1.setString("J");
                GuiUtil.changeSprite(this.spColum4_1, "res/Minigame/ImageChung/DauNguoi/Q_co.png");
                GuiUtil.changeSprite(this.sp_chat4_1, "res/Minigame/ImageChung/DauNguoi/chat_co.png");
                this.txt4_1.setString("Q");
                GuiUtil.changeSprite(this.spColum5_1, "res/Minigame/ImageChung/DauNguoi/K_co.png");
                GuiUtil.changeSprite(this.sp_chat5_1, "res/Minigame/ImageChung/DauNguoi/chat_co.png");
                this.txt5_1.setString("K");

                // this.resetItemInColumMini();

                var fadeou1 = new cc.FadeOut(0.7);
                var fadeou2 = new cc.FadeOut(0.7);
                var fadeou3 = new cc.FadeOut(0.7);
                this.muiten1.runAction(cc.sequence(fadeou1, cc.callFunc(this.Muiten1_FadeIn, this)));
                this.muiten2.runAction(cc.sequence(cc.delayTime(0.33), fadeou2, cc.callFunc(this.Muiten2_FadeIn, this)));
                this.muiten3.runAction(cc.sequence(cc.delayTime(0.66), fadeou3, cc.callFunc(this.Muiten3_FadeIn, this)));

                var ShowLineSelect1 = cc.EventListener.create(
                    {
                        event: cc.EventListener.MOUSE,
                        onMouseMove: function (event) {
                            var target = event.getCurrentTarget();
                            var locationInNode = target.convertToNodeSpace(event.getLocation());
                            var s = target.getContentSize();
                            var rect = cc.rect(0, 0, s.width, s.height);
                            if (cc.rectContainsPoint(rect, locationInNode)) {
                                if (_miniPoker.moveOn1 === false) {
                                    GuiUtil.changeSprite(_miniPoker.sp_room1, "res/Minigame/ImageChung/room_select.png");
                                    _miniPoker.moveOn1 = true;
                                }
                            } else {
                                if (_miniPoker.moveOn1 === true) {
                                    if (_miniPoker.roomjoint === 0 || _miniPoker.roomjoint === 3) {
                                    } else
                                        GuiUtil.changeSprite(_miniPoker.sp_room1, "res/Minigame/ImageChung/bg_room.png");
                                    _miniPoker.moveOn1 = false;
                                }
                            }
                        }
                    });
                cc.eventManager.addListener(ShowLineSelect1.clone(), this.sp_room1);

                var ShowLineSelect2 = cc.EventListener.create(
                    {
                        event: cc.EventListener.MOUSE,
                        onMouseMove: function (event) {
                            var target = event.getCurrentTarget();
                            var locationInNode = target.convertToNodeSpace(event.getLocation());
                            var s = target.getContentSize();
                            var rect = cc.rect(0, 0, s.width, s.height);
                            if (cc.rectContainsPoint(rect, locationInNode)) {
                                if (_miniPoker.moveOn2 === false) {
                                    GuiUtil.changeSprite(_miniPoker.sp_room2, "res/Minigame/ImageChung/room_select.png");
                                    _miniPoker.moveOn2 = true;
                                }
                            } else {
                                if (_miniPoker.moveOn2 === true) {
                                    if (_miniPoker.roomjoint === 1 || _miniPoker.roomjoint === 4) {
                                    } else
                                        GuiUtil.changeSprite(_miniPoker.sp_room2, "res/Minigame/ImageChung/bg_room.png");
                                    _miniPoker.moveOn2 = false;
                                }
                            }
                        }
                    });
                cc.eventManager.addListener(ShowLineSelect2.clone(), this.sp_room2);

                var ShowLineSelect3 = cc.EventListener.create(
                    {
                        event: cc.EventListener.MOUSE,
                        onMouseMove: function (event) {
                            var target = event.getCurrentTarget();
                            var locationInNode = target.convertToNodeSpace(event.getLocation());
                            var s = target.getContentSize();
                            var rect = cc.rect(0, 0, s.width, s.height);
                            if (cc.rectContainsPoint(rect, locationInNode)) {
                                if (_miniPoker.moveOn3 === false) {
                                    GuiUtil.changeSprite(_miniPoker.sp_room3, "res/Minigame/ImageChung/room_select.png");
                                    _miniPoker.moveOn3 = true;
                                }
                            } else {
                                if (_miniPoker.moveOn3 === true) {
                                    if (_miniPoker.roomjoint === 2 || _miniPoker.roomjoint === 5) {
                                    } else
                                        GuiUtil.changeSprite(_miniPoker.sp_room3, "res/Minigame/ImageChung/bg_room.png");
                                    _miniPoker.moveOn3 = false;
                                }
                            }
                        }
                    });
                cc.eventManager.addListener(ShowLineSelect3.clone(), this.sp_room3);

                // pn_effect trung hu
                this.lb_money_earn_hu.setString("");
                this.lb_money_earn_hu.setScaleY(0);

                this.sp_nohu.setVisible(false);
                this.sp_thungphasanh.setVisible(false);

                this.pn_effect_hu.setVisible(false);
                gI.popUp.closeLoading();
            },
            onButtonRelease: function (button, id) {
                switch (id) {
                    case codeMiniPoker.BTN_EVENT:
                        if (cc.sys.os === cc.sys.OS_IOS) {
                            if (lobby.open_payment_ios === false)
                                return;
                        }
                        ConnectNative.openWebView(GameManager.webViewLink.eventMiniPoker);
                        break;
                    case codeMiniPoker.BTN_SELECTROOM1:
                        if (this.isStartRotateMini === false) {
                            //this.resetButtonSelectRoom();
                            var roomjoin = 0;
                            var valueMoney = 100;
                            if (_miniPoker.moneyType === 1) {
                                roomjoin = 0;
                                valueMoney = 100;
                            } else {
                                roomjoin = 3;
                                valueMoney = 1000;
                            }
                            this.funChangeRoom(roomjoin, valueMoney);
                        }
                        break;
                    case codeMiniPoker.BTN_SELECTROOM2:
                        if (this.isStartRotateMini === false) {
                            //this.resetButtonSelectRoom();
                            var roomjoin = 0;
                            var valueMoney = 100;
                            if (_miniPoker.moneyType === 1) {
                                roomjoin = 1;
                                valueMoney = 1000;
                            } else {
                                roomjoin = 4;
                                valueMoney = 10000;
                            }
                            this.funChangeRoom(roomjoin, valueMoney);
                        }
                        break;
                    case codeMiniPoker.BTN_SELECTROOM3:
                        if (this.isStartRotateMini === false) {
                            //this.resetButtonSelectRoom();
                            var roomjoin = 0;
                            var valueMoney = 100;
                            if (_miniPoker.moneyType === 1) {
                                roomjoin = 2;
                                valueMoney = 10000;
                            } else {
                                roomjoin = 5;
                                valueMoney = 100000;
                            }
                            this.funChangeRoom(roomjoin, valueMoney);
                        }
                        break;
                    case codeMiniPoker.BTN_CHANGEMONEYTYPE:
                        if (this.isStartRotateMini === false) {
                            var roomjoin = 0;
                            var valueMoney = 100;
                            if (_miniPoker.moneyType === 1) {
                                roomjoin = 3;
                                valueMoney = 1000;

                            } else {
                                roomjoin = 0;
                                valueMoney = 100;

                            }
                            this.funChangeRoom(roomjoin, valueMoney);

                        }
                        break;
                    case codeMiniPoker.BTN_TUQUAY:
                        if (!this._enableAutoSpin)
                            break;
                        if (_miniPoker.disableBtnTuQuay)
                            break;
                        _miniPoker.disableBtnTuQuay = true;
                        setTimeout(function () {
                            _miniPoker.disableBtnTuQuay = false;
                        }, 1000);
                        this._enableChangeRoom = false;

                        if (this.isshowNoHu === true) {
                            this.close_effect_hu();
                        }
                        if (_miniPoker.autoRotate === false) {
                            if (_miniPoker.isStartRotateMini === false) {

                                this.funAutoRotate();
                            }
                        } else {
                            _miniPoker.autoRotate = false;

                            var playMiniPoker = new CmdSendAutoMiniPoker();
                            playMiniPoker.putAutoMiniPoker(0);
                            if (Minigame.miniGameClient.send(playMiniPoker)) {
                                _miniPoker.autoRotate = false;
                                GuiUtil.changeSprite(this.sp_tuquay, "res/Minigame/ResMiniPoker/tuquay.png");
                                this.pn_effect_muiten.setVisible(true);
                                this.CanGat.setEnabled(true);
                            }
                            playMiniPoker.clean();

                        }
                        break;
                    case codeMiniPoker.BTN_CANGAT:
                        if (this.isshowNoHu === true) {
                            this.close_effect_hu();
                        }
                        this.funPlayMinigame();
                        break;
                    case codeMiniPoker.BTN_CLOSEGAMEMINIPOKER:
                        this.close();
                        break;
                    case codeMiniPoker.BTN_GUILD:
                        if (cc.sys.os === cc.sys.OS_IOS) {
                            if (lobby.open_payment_ios === false)
                                return;
                        }
                        ConnectNative.openWebView(GameManager.webViewLink.guildMiniePoker);
                        break;
                    case codeMiniPoker.BTN_LICHSU:
                        open_minipoker_lichsu(_miniPoker.moneyType);
                        break;
                    case codeMiniPoker.BTN_TOPXEPHANG:
                        open_minipoker_bangthanhtich(_miniPoker.moneyType);
                        break;
                }
            },

            showSP_giaithuong: function (linkimage) {
                this.bg_nhangiai.setVisible(true);
                GuiUtil.changeSprite(this.sp_giaithuong, "res/Minigame/ResMiniPoker/" + linkimage + ".png");
                this.sp_giaithuong.runAction(cc.sequence(cc.scaleTo(0.2, 1.1, 1), cc.delayTime(0.1), cc.scaleTo(0.15, 0.9, 1), cc.delayTime(0.1), cc.scaleTo(0.1, 1, 1)));
            },
            closeSP_giaithuong: function () {
                this.bg_nhangiai.setVisible(false);
                this.sp_giaithuong.setScaleX(0);
                GuiUtil.changeSprite(this.sp_giaithuong, "res/Minigame/ResMiniPoker/run1.png");
            },

            commandPlayMinigame: function () {
                var playMiniPoker = new CmdSendMiniPoker();
                playMiniPoker.putPlayMiniPoker(_miniPoker.valueMoney, _miniPoker.moneyType);
                if (Minigame.miniGameClient.send(playMiniPoker)) {
                    /* this.spCangat.runAction(actionCanGat());
                     _miniPoker.CanGat.setEnabled(false);
                     _miniPoker.pn_effect_muiten.setVisible(false);
                     this.btnCoin100.setEnabled(false);
                     this.btnCoin1000.setEnabled(false);
                     this.btnCoin10000.setEnabled(false);*/
                }
                playMiniPoker.clean();
            },

            funPlayMinigame: function () {
                if (_miniPoker.moneyType === 1) {
                    if (userInfo.userData.vinTotal >= _miniPoker.valueMoney) {
                        if (this.isStartRotateMini === false) {
                            this.commandPlayMinigame();
                        }
                    } else {
                        this._enableChangeRoom = true;
                        this.MiniPokerNotice2.setString("");
                        this.MiniPokerNotice1.setString("Bạn không đủ số dư!");
                        this.EffectError();
                    }
                } else {
                    if (userInfo.userData.xuTotal >= _miniPoker.valueMoney) {
                        if (this.isStartRotateMini === false) {
                            this.commandPlayMinigame();
                        }
                    } else {
                        this._enableChangeRoom = true;
                        this.MiniPokerNotice2.setString("");
                        this.MiniPokerNotice1.setString("Bạn không đủ số dư!");
                        this.EffectError();
                    }
                }
            },

            funAutoRotate: function () {
                if (_miniPoker.moneyType === 1) {
                    if (userInfo.userData.vinTotal >= _miniPoker.valueMoney) {
                        if (this.isStartRotateMini === false) {
                            var playMiniPoker = new CmdSendAutoMiniPoker();
                            playMiniPoker.putAutoMiniPoker(1);
                            if (Minigame.miniGameClient.send(playMiniPoker)) {
                                _miniPoker.autoRotate = true;
                                GuiUtil.changeSprite(this.sp_tuquay, "res/Minigame/ResMiniPoker/dungquay.png");
                                this.spCangat.runAction(actionCanGat());
                                _miniPoker.CanGat.setEnabled(false);
                                _miniPoker.pn_effect_muiten.setVisible(false);
                                this.btnCoin100.setEnabled(false);
                                this.btnCoin1000.setEnabled(false);
                                this.btnCoin10000.setEnabled(false);
                            }
                            playMiniPoker.clean();
                        }
                    } else {
                        this._enableChangeRoom = true;
                        this.MiniPokerNotice2.setString("");
                        this.MiniPokerNotice1.setString("Bạn không đủ số dư!");
                        this.EffectError();
                    }
                } else {
                    if (userInfo.userData.xuTotal >= _miniPoker.valueMoney) {
                        if (this.isStartRotateMini === false) {
                            var playMiniPoker = new CmdSendAutoMiniPoker();
                            playMiniPoker.putAutoMiniPoker(1);
                            if (Minigame.miniGameClient.send(playMiniPoker)) {
                                _miniPoker.autoRotate = true;
                                GuiUtil.changeSprite(this.sp_tuquay, "res/Minigame/ResMiniPoker/dungquay.png");
                                this.spCangat.runAction(actionCanGat());
                                _miniPoker.CanGat.setEnabled(false);
                                _miniPoker.pn_effect_muiten.setVisible(false);
                                this.btnCoin100.setEnabled(false);
                                this.btnCoin1000.setEnabled(false);
                                this.btnCoin10000.setEnabled(false);
                            }
                            playMiniPoker.clean();
                        }
                    } else {
                        this._enableChangeRoom = true;
                        this.MiniPokerNotice2.setString("");
                        this.MiniPokerNotice1.setString("Bạn không đủ số dư!");
                        this.EffectError();
                    }
                }
            },

            funChangeRoom: function () {
                //cc.log("roomleave: " + this.MINI_POKER_ROOM + " roomJoint: " + _miniPoker.roomjoint);
                this.ischangeroom = true;
                var miniPokerSend = new CmdChangeRoomMiniPoker();
                miniPokerSend.putChangeRoomMiniPoker(this.MINI_POKER_ROOM, _miniPoker.roomjoint);
                Minigame.miniGameClient.send(miniPokerSend);
                miniPokerSend.clean();
                _miniPoker.CanGat.setEnabled(false);
                this.btnChangeMoneytype.setEnabled(false);
                this.btnCoin100.setEnabled(false);
                this.btnCoin1000.setEnabled(false);
                this.btnCoin10000.setEnabled(false);
            },

            funChangeRoom: function (roomjoint, valueMoney) {
                //cc.log("roomleave: " + this.MINI_POKER_ROOM + " roomJoint: " + _miniPoker.roomjoint);
                var checkSend = false;
                var miniPokerSend = new CmdChangeRoomMiniPoker();
                miniPokerSend.putChangeRoomMiniPoker(this.MINI_POKER_ROOM, roomjoint);

                if (Minigame.miniGameClient.send(miniPokerSend)) {
                    _miniPoker.roomjoint = roomjoint;
                    _miniPoker.valueMoney = valueMoney;
                    if (roomjoint === 0) {
                        this.txtHu.setColor(cc.color("#FFFF00"));
                        GuiUtil.changeSprite(_miniPoker.spChangeMoney, "res/Minigame/ImageChung/choivin.png");
                        this.lb_room1.setString("100");
                        this.lb_room2.setString("1K");
                        this.lb_room3.setString("10K");
                        _miniPoker.moneyType = 1;
                    } else if (roomjoint === 3) {
                        _miniPoker.moneyType = 0;
                        this.txtHu.setColor(cc.color("#E3E3E3"));
                        GuiUtil.changeSprite(_miniPoker.spChangeMoney, "res/Minigame/ImageChung/choixu.png");
                        this.lb_room1.setString("1K");
                        this.lb_room2.setString("10K");
                        this.lb_room3.setString("100K");
                    }
                    checkSend = true;
                    this.resetButtonSelectRoom();
                    this.ischangeroom = true;
                    _miniPoker.CanGat.setEnabled(false);
                    this.btnChangeMoneytype.setEnabled(false);
                    this.btnCoin100.setEnabled(false);
                    this.btnCoin1000.setEnabled(false);
                    this.btnCoin10000.setEnabled(false);

                    if (this.autoRotate === true) {
                        this.autoRotate = false;
                        GuiUtil.changeSprite(this.sp_tuquay, "res/Minigame/ResMiniPoker/tuquay.png");
                        this.pn_effect_muiten.setVisible(true);
                        this.CanGat.setEnabled(true);
                    }
                }

                miniPokerSend.clean();
                return checkSend;
            },

            Muiten1_FadeIn: function () {
                var fadeIn = new cc.FadeIn(0.7);
                var fadeOut = new cc.FadeOut(0.7);
                this.muiten1.runAction(cc.repeatForever(cc.sequence(fadeIn, fadeOut)));
            },
            Muiten2_FadeIn: function () {
                var fadeIn = new cc.FadeIn(0.7);
                var fadeOut = new cc.FadeOut(0.7);
                this.muiten2.runAction(cc.repeatForever(cc.sequence(fadeIn, fadeOut)));
            },
            Muiten3_FadeIn: function () {
                var fadeIn = new cc.FadeIn(0.7);
                var fadeOut = new cc.FadeOut(0.7);
                this.muiten3.runAction(cc.repeatForever(cc.sequence(fadeIn, fadeOut)));
            },
            resetButtonSelectRoom: function () {
                GuiUtil.changeSprite(this.sp_room1, "res/Minigame/ImageChung/bg_room.png");
                GuiUtil.changeSprite(this.sp_room2, "res/Minigame/ImageChung/bg_room.png");
                GuiUtil.changeSprite(this.sp_room3, "res/Minigame/ImageChung/bg_room.png");
            },

            resetItemInColumMini: function () {
                if (this.valueColum === false) { ///// rs1 o duoi
                    this.quanbai1_1.y = this.saveVitri;
                    this.quanbai2_1.y = this.saveVitri;
                    this.quanbai3_1.y = this.saveVitri;
                    this.quanbai4_1.y = this.saveVitri;
                    this.quanbai5_1.y = this.saveVitri;
                    this.saveVitri = this.saveVitri - 16;
                    this.vitriYmini = this.quanbai1_1.y;
                } else { ///// rs6 o duoi
                    this.quanbai1_6.y = this.saveVitri;
                    this.quanbai2_6.y = this.saveVitri;
                    this.quanbai3_6.y = this.saveVitri;
                    this.quanbai4_6.y = this.saveVitri;
                    this.quanbai5_6.y = this.saveVitri;
                    this.saveVitri = this.saveVitri - 16;
                    this.vitriYmini = this.quanbai1_6.y;
                }
                for (var i = 2; i < 10; i++) {
                    if (i === 2) {
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum1_2, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat1_2, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt1_2.setString("" + this.text_quanbai);
                        this.quanbai1_2.setPositionY(this.vitriYmini + cardMiniPokerDistance);
                        if (this.color_quanbai === "red") this.txt1_2.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt1_2.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum2_2, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat2_2, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt2_2.setString("" + this.text_quanbai);
                        this.quanbai2_2.setPositionY(this.vitriYmini + cardMiniPokerDistance);
                        if (this.color_quanbai === "red") this.txt2_2.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt2_2.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum3_2, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat3_2, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt3_2.setString("" + this.text_quanbai);
                        this.quanbai3_2.setPositionY(this.vitriYmini + cardMiniPokerDistance);
                        if (this.color_quanbai === "red") this.txt3_2.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt3_2.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum4_2, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat4_2, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt4_2.setString("" + this.text_quanbai);
                        this.quanbai4_2.setPositionY(this.vitriYmini + cardMiniPokerDistance);
                        if (this.color_quanbai === "red") this.txt4_2.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt4_2.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum5_2, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat5_2, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt5_2.setString("" + this.text_quanbai);
                        this.quanbai5_2.setPositionY(this.vitriYmini + cardMiniPokerDistance);
                        if (this.color_quanbai === "red") this.txt5_2.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt5_2.setColor(GuiUtil.color(0, 0, 0));
                    }
                    if (i === 3) {
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum1_3, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat1_3, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt1_3.setString("" + this.text_quanbai);
                        this.quanbai1_3.setPositionY(this.vitriYmini + cardMiniPokerDistance * 2);
                        if (this.color_quanbai === "red") this.txt1_3.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt1_3.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum2_3, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat2_3, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt2_3.setString("" + this.text_quanbai);
                        this.quanbai2_3.setPositionY(this.vitriYmini + cardMiniPokerDistance * 2);
                        if (this.color_quanbai === "red") this.txt2_3.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt2_3.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum3_3, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat3_3, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt3_3.setString("" + this.text_quanbai);
                        this.quanbai3_3.setPositionY(this.vitriYmini + cardMiniPokerDistance * 2);
                        if (this.color_quanbai === "red") this.txt3_3.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt3_3.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum4_3, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat4_3, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt4_3.setString("" + this.text_quanbai);
                        this.quanbai4_3.setPositionY(this.vitriYmini + cardMiniPokerDistance * 2);
                        if (this.color_quanbai === "red") this.txt4_3.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt4_3.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum5_3, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat5_3, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt5_3.setString("" + this.text_quanbai);
                        this.quanbai5_3.setPositionY(this.vitriYmini + cardMiniPokerDistance * 2);
                        if (this.color_quanbai === "red") this.txt5_3.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt5_3.setColor(GuiUtil.color(0, 0, 0));
                    }
                    if (i === 4) {
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum1_4, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat1_4, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt1_4.setString("" + this.text_quanbai);
                        this.quanbai1_4.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt1_4.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt1_4.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum2_4, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat2_4, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt2_4.setString("" + this.text_quanbai);
                        this.quanbai2_4.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt2_4.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt2_4.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum3_4, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat3_4, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt3_4.setString("" + this.text_quanbai);
                        this.quanbai3_4.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt3_4.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt3_4.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum4_4, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat4_4, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt4_4.setString("" + this.text_quanbai);
                        this.quanbai4_4.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt4_4.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt4_4.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum5_4, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat5_4, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt5_4.setString("" + this.text_quanbai);
                        this.quanbai5_4.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt5_4.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt5_4.setColor(GuiUtil.color(0, 0, 0));
                    }
                    if (i === 5) {
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum1_5, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat1_5, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt1_5.setString("" + this.text_quanbai);
                        this.quanbai1_5.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt1_5.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt1_5.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum2_5, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat2_5, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt2_5.setString("" + this.text_quanbai);
                        this.quanbai2_5.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt2_5.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt2_5.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum3_5, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat3_5, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt3_5.setString("" + this.text_quanbai);
                        this.quanbai3_5.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt3_5.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt3_5.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum4_5, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat4_5, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt4_5.setString("" + this.text_quanbai);
                        this.quanbai4_5.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt4_5.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt4_5.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum5_5, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat5_5, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt5_5.setString("" + this.text_quanbai);
                        this.quanbai5_5.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt5_5.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt5_5.setColor(GuiUtil.color(0, 0, 0));
                    }
                    if (i === 6) {
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum1_7, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat1_7, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt1_7.setString("" + this.text_quanbai);
                        this.quanbai1_7.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt1_7.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt1_7.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum2_7, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat2_7, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt2_7.setString("" + this.text_quanbai);
                        this.quanbai2_7.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt2_7.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt2_7.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum3_7, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat3_7, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt3_7.setString("" + this.text_quanbai);
                        this.quanbai3_7.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt3_7.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt3_7.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum4_7, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat4_7, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt4_7.setString("" + this.text_quanbai);
                        this.quanbai4_7.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt4_7.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt4_7.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum5_7, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat5_7, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt5_7.setString("" + this.text_quanbai);
                        this.quanbai5_7.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt5_7.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt5_7.setColor(GuiUtil.color(0, 0, 0));
                    }
                    if (i === 7) {
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum1_8, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat1_8, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt1_8.setString("" + this.text_quanbai);
                        this.quanbai1_8.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt1_8.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt1_8.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum2_8, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat2_8, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt2_8.setString("" + this.text_quanbai);
                        this.quanbai2_8.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt2_8.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt2_8.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum3_8, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat3_8, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt3_8.setString("" + this.text_quanbai);
                        this.quanbai3_8.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt3_8.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt3_8.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum4_8, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat4_8, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt4_8.setString("" + this.text_quanbai);
                        this.quanbai4_8.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt4_8.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt4_8.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum5_8, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat5_8, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt5_8.setString("" + this.text_quanbai);
                        this.quanbai5_8.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt5_8.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt5_8.setColor(GuiUtil.color(0, 0, 0));
                    }
                    if (i === 8) {
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum1_9, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat1_9, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt1_9.setString("" + this.text_quanbai);
                        this.quanbai1_9.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt1_9.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt1_9.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum2_9, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat2_9, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt2_9.setString("" + this.text_quanbai);
                        this.quanbai2_9.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt2_9.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt2_9.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum3_9, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat3_9, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt3_9.setString("" + this.text_quanbai);
                        this.quanbai3_9.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt3_9.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt3_9.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum4_9, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat4_9, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt4_9.setString("" + this.text_quanbai);
                        this.quanbai4_9.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt4_9.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt4_9.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum5_9, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat5_9, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt5_9.setString("" + this.text_quanbai);
                        this.quanbai5_9.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt5_9.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt5_9.setColor(GuiUtil.color(0, 0, 0));
                    }
                    if (i === 9) {
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum1_10, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat1_10, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt1_10.setString("" + this.text_quanbai);
                        this.quanbai1_10.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt1_10.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt1_10.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum2_10, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat2_10, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt2_10.setString("" + this.text_quanbai);
                        this.quanbai2_10.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt2_10.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt2_10.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum3_10, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat3_10, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt3_10.setString("" + this.text_quanbai);
                        this.quanbai3_10.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt3_10.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt3_10.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum4_10, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat4_10, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt4_10.setString("" + this.text_quanbai);
                        this.quanbai4_10.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt4_10.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt4_10.setColor(GuiUtil.color(0, 0, 0));
                        this.getRandomIntMini(1, 52);
                        GuiUtil.changeSprite(this.spColum5_10, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                        GuiUtil.changeSprite(this.sp_chat5_10, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                        this.txt5_10.setString("" + this.text_quanbai);
                        this.quanbai5_10.setPositionY(this.vitriYmini + cardMiniPokerDistance * (i - 1));
                        if (this.color_quanbai === "red") this.txt5_10.setColor(GuiUtil.color(255, 0, 0));
                        else this.txt5_10.setColor(GuiUtil.color(0, 0, 0));
                    }
                }
            },
            GenResultMini: function () {
                if (this.valueColum === false) { ///// rs1 o duoi
                    this.GetLinkImageMini(this.resultLB1);
                    GuiUtil.changeSprite(this.spColum1_6, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                    GuiUtil.changeSprite(this.sp_chat1_6, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                    this.txt1_6.setString("" + this.text_quanbai);
                    this.quanbai1_6.setPositionY(this.vitriYmini + cardMiniPokerDistance * 9);
                    if (this.color_quanbai === "red") this.txt1_6.setColor(GuiUtil.color(255, 0, 0));
                    else this.txt1_6.setColor(GuiUtil.color(0, 0, 0));
                    this.GetLinkImageMini(this.resultLB2);
                    GuiUtil.changeSprite(this.spColum2_6, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                    GuiUtil.changeSprite(this.sp_chat2_6, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                    this.txt2_6.setString("" + this.text_quanbai);
                    this.quanbai2_6.setPositionY(this.vitriYmini + cardMiniPokerDistance * 9);
                    if (this.color_quanbai === "red") this.txt2_6.setColor(GuiUtil.color(255, 0, 0));
                    else this.txt2_6.setColor(GuiUtil.color(0, 0, 0));
                    this.GetLinkImageMini(this.resultLB3);
                    GuiUtil.changeSprite(this.spColum3_6, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                    GuiUtil.changeSprite(this.sp_chat3_6, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                    this.txt3_6.setString("" + this.text_quanbai);
                    this.quanbai3_6.setPositionY(this.vitriYmini + cardMiniPokerDistance * 9);
                    if (this.color_quanbai === "red") this.txt3_6.setColor(GuiUtil.color(255, 0, 0));
                    else this.txt3_6.setColor(GuiUtil.color(0, 0, 0));
                    this.GetLinkImageMini(this.resultLB4);
                    GuiUtil.changeSprite(this.spColum4_6, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                    GuiUtil.changeSprite(this.sp_chat4_6, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                    this.txt4_6.setString("" + this.text_quanbai);
                    this.quanbai4_6.setPositionY(this.vitriYmini + cardMiniPokerDistance * 9);
                    if (this.color_quanbai === "red") this.txt4_6.setColor(GuiUtil.color(255, 0, 0));
                    else this.txt4_6.setColor(GuiUtil.color(0, 0, 0));
                    this.GetLinkImageMini(this.resultLB5);
                    GuiUtil.changeSprite(this.spColum5_6, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                    GuiUtil.changeSprite(this.sp_chat5_6, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                    this.txt5_6.setString("" + this.text_quanbai);
                    this.quanbai5_6.setPositionY(this.vitriYmini + cardMiniPokerDistance * 9);
                    if (this.color_quanbai === "red") this.txt5_6.setColor(GuiUtil.color(255, 0, 0));
                    else this.txt5_6.setColor(GuiUtil.color(0, 0, 0));
                } else {
                    this.GetLinkImageMini(this.resultLB1);
                    GuiUtil.changeSprite(this.spColum1_1, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                    GuiUtil.changeSprite(this.sp_chat1_1, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                    this.txt1_1.setString("" + this.text_quanbai);
                    this.quanbai1_1.setPositionY(this.vitriYmini + cardMiniPokerDistance * 9);
                    if (this.color_quanbai === "red") this.txt1_1.setColor(GuiUtil.color(255, 0, 0));
                    else this.txt1_1.setColor(GuiUtil.color(0, 0, 0));
                    this.GetLinkImageMini(this.resultLB2);
                    GuiUtil.changeSprite(this.spColum2_1, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                    GuiUtil.changeSprite(this.sp_chat2_1, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                    this.txt2_1.setString("" + this.text_quanbai);
                    this.quanbai2_1.setPositionY(this.vitriYmini + cardMiniPokerDistance * 9);
                    if (this.color_quanbai === "red") this.txt2_1.setColor(GuiUtil.color(255, 0, 0));
                    else this.txt2_1.setColor(GuiUtil.color(0, 0, 0));
                    this.GetLinkImageMini(this.resultLB3);
                    GuiUtil.changeSprite(this.spColum3_1, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                    GuiUtil.changeSprite(this.sp_chat3_1, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                    this.txt3_1.setString("" + this.text_quanbai);
                    this.quanbai3_1.setPositionY(this.vitriYmini + cardMiniPokerDistance * 9);
                    if (this.color_quanbai === "red") this.txt3_1.setColor(GuiUtil.color(255, 0, 0));
                    else this.txt3_1.setColor(GuiUtil.color(0, 0, 0));
                    this.GetLinkImageMini(this.resultLB4);
                    GuiUtil.changeSprite(this.spColum4_1, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                    GuiUtil.changeSprite(this.sp_chat4_1, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                    this.txt4_1.setString("" + this.text_quanbai);
                    this.quanbai4_1.setPositionY(this.vitriYmini + cardMiniPokerDistance * 9);
                    if (this.color_quanbai === "red") this.txt4_1.setColor(GuiUtil.color(255, 0, 0));
                    else this.txt4_1.setColor(GuiUtil.color(0, 0, 0));
                    this.GetLinkImageMini(this.resultLB5);
                    GuiUtil.changeSprite(this.spColum5_1, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                    GuiUtil.changeSprite(this.sp_chat5_1, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                    this.txt5_1.setString("" + this.text_quanbai);
                    this.quanbai5_1.setPositionY(this.vitriYmini + cardMiniPokerDistance * 9);
                    if (this.color_quanbai === "red") this.txt5_1.setColor(GuiUtil.color(255, 0, 0));
                    else this.txt5_1.setColor(GuiUtil.color(0, 0, 0));
                }
            },
            getRandomIntMini: function (min, max) {
                var vRandom = Math.floor(Math.random() * (max - min + 1)) + min;
                this.GetLinkImageMini(vRandom);
            },
            RotateColum: function () {
                this.resetItemInColumMini();
                this.GenResultMini();
                if (this.valueColum === false) {
                    this.valueColum = true;
                } else {
                    this.valueColum = false;
                }
                this.CanGat.setEnabled(false);

                this.save_pos_1_1 = this.quanbai1_1.y;
                this.save_pos_1_2 = this.quanbai1_2.y;
                this.save_pos_1_3 = this.quanbai1_3.y;
                this.save_pos_1_4 = this.quanbai1_4.y;
                this.save_pos_1_5 = this.quanbai1_5.y;
                this.save_pos_1_6 = this.quanbai1_6.y;
                this.save_pos_1_7 = this.quanbai1_7.y;
                this.save_pos_1_8 = this.quanbai1_8.y;
                this.save_pos_1_9 = this.quanbai1_9.y;
                this.save_pos_1_10 = this.quanbai1_10.y;

                this.save_pos_2_1 = this.quanbai2_1.y;
                this.save_pos_2_2 = this.quanbai2_2.y;
                this.save_pos_2_3 = this.quanbai2_3.y;
                this.save_pos_2_4 = this.quanbai2_4.y;
                this.save_pos_2_5 = this.quanbai2_5.y;
                this.save_pos_2_6 = this.quanbai2_6.y;
                this.save_pos_2_7 = this.quanbai2_7.y;
                this.save_pos_2_8 = this.quanbai2_8.y;
                this.save_pos_2_9 = this.quanbai2_9.y;
                this.save_pos_2_10 = this.quanbai2_10.y;

                this.save_pos_3_1 = this.quanbai3_1.y;
                this.save_pos_3_2 = this.quanbai3_2.y;
                this.save_pos_3_3 = this.quanbai3_3.y;
                this.save_pos_3_4 = this.quanbai3_4.y;
                this.save_pos_3_5 = this.quanbai3_5.y;
                this.save_pos_3_6 = this.quanbai3_6.y;
                this.save_pos_3_7 = this.quanbai3_7.y;
                this.save_pos_3_8 = this.quanbai3_8.y;
                this.save_pos_3_9 = this.quanbai3_9.y;
                this.save_pos_3_10 = this.quanbai3_10.y;

                this.save_pos_4_1 = this.quanbai4_1.y;
                this.save_pos_4_2 = this.quanbai4_2.y;
                this.save_pos_4_3 = this.quanbai4_3.y;
                this.save_pos_4_4 = this.quanbai4_4.y;
                this.save_pos_4_5 = this.quanbai4_5.y;
                this.save_pos_4_6 = this.quanbai4_6.y;
                this.save_pos_4_7 = this.quanbai4_7.y;
                this.save_pos_4_8 = this.quanbai4_8.y;
                this.save_pos_4_9 = this.quanbai4_9.y;
                this.save_pos_4_10 = this.quanbai4_10.y;

                this.save_pos_5_1 = this.quanbai5_1.y;
                this.save_pos_5_2 = this.quanbai5_2.y;
                this.save_pos_5_3 = this.quanbai5_3.y;
                this.save_pos_5_4 = this.quanbai5_4.y;
                this.save_pos_5_5 = this.quanbai5_5.y;
                this.save_pos_5_6 = this.quanbai5_6.y;
                this.save_pos_5_7 = this.quanbai5_7.y;
                this.save_pos_5_8 = this.quanbai5_8.y;
                this.save_pos_5_9 = this.quanbai5_9.y;
                this.save_pos_5_10 = this.quanbai5_10.y;

                this.save_pos_pn_1 = this.pnColum1.y;
                this.save_pos_pn_2 = this.pnColum2.y;
                this.save_pos_pn_3 = this.pnColum3.y;
                this.save_pos_pn_4 = this.pnColum4.y;
                this.save_pos_pn_5 = this.pnColum5.y;

                var actionBack = cc.MoveTo.create(0.5, cc.p(this.pnColum1.x, this.pnColum1.y + 8));
                this.pnColum1.runAction(cc.sequence(actionBack, cc.callFunc(this.RotateColum1, this)));
                var actionBack2 = cc.MoveTo.create(0.5, cc.p(this.pnColum2.x, this.pnColum2.y + 8));
                this.pnColum2.runAction(cc.sequence(cc.delayTime(0.15), actionBack2, cc.callFunc(this.RotateColum2, this)));
                var actionBack3 = cc.MoveTo.create(0.5, cc.p(this.pnColum3.x, this.pnColum3.y + 8));
                this.pnColum3.runAction(cc.sequence(cc.delayTime(0.3), actionBack3, cc.callFunc(this.RotateColum3, this)));
                var actionBack4 = cc.MoveTo.create(0.5, cc.p(this.pnColum4.x, this.pnColum4.y + 8));
                this.pnColum4.runAction(cc.sequence(cc.delayTime(0.45), actionBack4, cc.callFunc(this.RotateColum4, this)));
                var actionBack5 = cc.MoveTo.create(0.5, cc.p(this.pnColum5.x, this.pnColum5.y + 8));
                this.pnColum5.runAction(cc.sequence(cc.delayTime(0.6), actionBack5, cc.callFunc(this.RotateColum5, this)));
            },
            RotateColum1: function () {
                var actionCol1_1 = cc.MoveTo.create(1.2, cc.p(this.quanbai1_1.x, this.quanbai1_1.y - distanceStartEndMiniPoker));
                this.quanbai1_1.runAction(actionCol1_1);
                var actionCol1_2 = cc.MoveTo.create(1.2, cc.p(this.quanbai1_2.x, this.quanbai1_2.y - distanceStartEndMiniPoker));
                this.quanbai1_2.runAction(actionCol1_2);
                var actionCol1_3 = cc.MoveTo.create(1.2, cc.p(this.quanbai1_3.x, this.quanbai1_3.y - distanceStartEndMiniPoker));
                this.quanbai1_3.runAction(actionCol1_3);
                var actionCol1_4 = cc.MoveTo.create(1.2, cc.p(this.quanbai1_4.x, this.quanbai1_4.y - distanceStartEndMiniPoker));
                this.quanbai1_4.runAction(actionCol1_4);
                var actionCol1_5 = cc.MoveTo.create(1.2, cc.p(this.quanbai1_5.x, this.quanbai1_5.y - distanceStartEndMiniPoker));
                this.quanbai1_5.runAction(actionCol1_5);
                var actionCol1_7 = cc.MoveTo.create(1.2, cc.p(this.quanbai1_7.x, this.quanbai1_7.y - distanceStartEndMiniPoker));
                this.quanbai1_7.runAction(actionCol1_7);
                var actionCol1_8 = cc.MoveTo.create(1.2, cc.p(this.quanbai1_8.x, this.quanbai1_8.y - distanceStartEndMiniPoker));
                this.quanbai1_8.runAction(actionCol1_8);
                var actionCol1_9 = cc.MoveTo.create(1.2, cc.p(this.quanbai1_9.x, this.quanbai1_9.y - distanceStartEndMiniPoker));
                this.quanbai1_9.runAction(actionCol1_9);
                var actionCol1_10 = cc.MoveTo.create(1.2, cc.p(this.quanbai1_10.x, this.quanbai1_10.y - distanceStartEndMiniPoker));
                this.quanbai1_10.runAction(actionCol1_10);
                var actionCol1_6 = cc.MoveTo.create(1.2, cc.p(this.quanbai1_6.x, this.quanbai1_6.y - distanceStartEndMiniPoker));
                this.quanbai1_6.runAction(cc.sequence(actionCol1_6, cc.callFunc(this.spinBackColum1Mini, this)));
            },
            RotateColum2: function () {
                var actionCol2_1 = cc.MoveTo.create(1.2, cc.p(this.quanbai2_1.x, this.quanbai2_1.y - distanceStartEndMiniPoker));
                this.quanbai2_1.runAction(actionCol2_1);
                var actionCol2_2 = cc.MoveTo.create(1.2, cc.p(this.quanbai2_2.x, this.quanbai2_2.y - distanceStartEndMiniPoker));
                this.quanbai2_2.runAction(actionCol2_2);
                var actionCol2_3 = cc.MoveTo.create(1.2, cc.p(this.quanbai2_3.x, this.quanbai2_3.y - distanceStartEndMiniPoker));
                this.quanbai2_3.runAction(actionCol2_3);
                var actionCol2_4 = cc.MoveTo.create(1.2, cc.p(this.quanbai2_4.x, this.quanbai2_4.y - distanceStartEndMiniPoker));
                this.quanbai2_4.runAction(actionCol2_4);
                var actionCol2_5 = cc.MoveTo.create(1.2, cc.p(this.quanbai2_5.x, this.quanbai2_5.y - distanceStartEndMiniPoker));
                this.quanbai2_5.runAction(actionCol2_5);
                var actionCol2_7 = cc.MoveTo.create(1.2, cc.p(this.quanbai2_7.x, this.quanbai2_7.y - distanceStartEndMiniPoker));
                this.quanbai2_7.runAction(actionCol2_7);
                var actionCol2_8 = cc.MoveTo.create(1.2, cc.p(this.quanbai2_8.x, this.quanbai2_8.y - distanceStartEndMiniPoker));
                this.quanbai2_8.runAction(actionCol2_8);
                var actionCol2_9 = cc.MoveTo.create(1.2, cc.p(this.quanbai2_9.x, this.quanbai2_9.y - distanceStartEndMiniPoker));
                this.quanbai2_9.runAction(actionCol2_9);
                var actionCol2_10 = cc.MoveTo.create(1.2, cc.p(this.quanbai2_10.x, this.quanbai2_10.y - distanceStartEndMiniPoker));
                this.quanbai2_10.runAction(actionCol2_10);
                var actionCol2_6 = cc.MoveTo.create(1.2, cc.p(this.quanbai2_6.x, this.quanbai2_6.y - distanceStartEndMiniPoker));
                this.quanbai2_6.runAction(cc.sequence(actionCol2_6, cc.callFunc(this.spinBackColum2Mini, this)));
            },
            RotateColum3: function () {
                var actionCol3_1 = cc.MoveTo.create(1.2, cc.p(this.quanbai3_1.x, this.quanbai3_1.y - distanceStartEndMiniPoker));
                this.quanbai3_1.runAction(actionCol3_1);
                var actionCol3_2 = cc.MoveTo.create(1.2, cc.p(this.quanbai3_2.x, this.quanbai3_2.y - distanceStartEndMiniPoker));
                this.quanbai3_2.runAction(actionCol3_2);
                var actionCol3_3 = cc.MoveTo.create(1.2, cc.p(this.quanbai3_3.x, this.quanbai3_3.y - distanceStartEndMiniPoker));
                this.quanbai3_3.runAction(actionCol3_3);
                var actionCol3_4 = cc.MoveTo.create(1.2, cc.p(this.quanbai3_4.x, this.quanbai3_4.y - distanceStartEndMiniPoker));
                this.quanbai3_4.runAction(actionCol3_4);
                var actionCol3_5 = cc.MoveTo.create(1.2, cc.p(this.quanbai3_5.x, this.quanbai3_5.y - distanceStartEndMiniPoker));
                this.quanbai3_5.runAction(actionCol3_5);
                var actionCol3_7 = cc.MoveTo.create(1.2, cc.p(this.quanbai3_7.x, this.quanbai3_7.y - distanceStartEndMiniPoker));
                this.quanbai3_7.runAction(actionCol3_7);
                var actionCol3_8 = cc.MoveTo.create(1.2, cc.p(this.quanbai3_8.x, this.quanbai3_8.y - distanceStartEndMiniPoker));
                this.quanbai3_8.runAction(actionCol3_8);
                var actionCol3_9 = cc.MoveTo.create(1.2, cc.p(this.quanbai3_9.x, this.quanbai3_9.y - distanceStartEndMiniPoker));
                this.quanbai3_9.runAction(actionCol3_9);
                var actionCol3_10 = cc.MoveTo.create(1.2, cc.p(this.quanbai3_10.x, this.quanbai3_10.y - distanceStartEndMiniPoker));
                this.quanbai3_10.runAction(actionCol3_10);
                var actionCol3_6 = cc.MoveTo.create(1.2, cc.p(this.quanbai3_6.x, this.quanbai3_6.y - distanceStartEndMiniPoker));
                this.quanbai3_6.runAction(cc.sequence(actionCol3_6, cc.callFunc(this.spinBackColum3Mini, this)));
            },
            RotateColum4: function () {
                var actionCol4_1 = cc.MoveTo.create(1.2, cc.p(this.quanbai4_1.x, this.quanbai4_1.y - distanceStartEndMiniPoker));
                this.quanbai4_1.runAction(actionCol4_1);
                var actionCol4_2 = cc.MoveTo.create(1.2, cc.p(this.quanbai4_2.x, this.quanbai4_2.y - distanceStartEndMiniPoker));
                this.quanbai4_2.runAction(actionCol4_2);
                var actionCol4_3 = cc.MoveTo.create(1.2, cc.p(this.quanbai4_3.x, this.quanbai4_3.y - distanceStartEndMiniPoker));
                this.quanbai4_3.runAction(actionCol4_3);
                var actionCol4_4 = cc.MoveTo.create(1.2, cc.p(this.quanbai4_4.x, this.quanbai4_4.y - distanceStartEndMiniPoker));
                this.quanbai4_4.runAction(actionCol4_4);
                var actionCol4_5 = cc.MoveTo.create(1.2, cc.p(this.quanbai4_5.x, this.quanbai4_5.y - distanceStartEndMiniPoker));
                this.quanbai4_5.runAction(actionCol4_5);
                var actionCol4_7 = cc.MoveTo.create(1.2, cc.p(this.quanbai4_7.x, this.quanbai4_7.y - distanceStartEndMiniPoker));
                this.quanbai4_7.runAction(actionCol4_7);
                var actionCol4_8 = cc.MoveTo.create(1.2, cc.p(this.quanbai4_8.x, this.quanbai4_8.y - distanceStartEndMiniPoker));
                this.quanbai4_8.runAction(actionCol4_8);
                var actionCol4_9 = cc.MoveTo.create(1.2, cc.p(this.quanbai4_9.x, this.quanbai4_9.y - distanceStartEndMiniPoker));
                this.quanbai4_9.runAction(actionCol4_9);
                var actionCol4_10 = cc.MoveTo.create(1.2, cc.p(this.quanbai4_10.x, this.quanbai4_10.y - distanceStartEndMiniPoker));
                this.quanbai4_10.runAction(actionCol4_10);
                var actionCol4_6 = cc.MoveTo.create(1.2, cc.p(this.quanbai4_6.x, this.quanbai4_6.y - distanceStartEndMiniPoker));
                this.quanbai4_6.runAction(cc.sequence(actionCol4_6, cc.callFunc(this.spinBackColum4Mini, this)));
            },
            RotateColum5: function () {
                var actionCol5_1 = cc.MoveTo.create(1.2, cc.p(this.quanbai5_1.x, this.quanbai5_1.y - distanceStartEndMiniPoker));
                this.quanbai5_1.runAction(actionCol5_1);
                var actionCol5_2 = cc.MoveTo.create(1.2, cc.p(this.quanbai5_2.x, this.quanbai5_2.y - distanceStartEndMiniPoker));
                this.quanbai5_2.runAction(actionCol5_2);
                var actionCol5_3 = cc.MoveTo.create(1.2, cc.p(this.quanbai5_3.x, this.quanbai5_3.y - distanceStartEndMiniPoker));
                this.quanbai5_3.runAction(actionCol5_3);
                var actionCol5_4 = cc.MoveTo.create(1.2, cc.p(this.quanbai5_4.x, this.quanbai5_4.y - distanceStartEndMiniPoker));
                this.quanbai5_4.runAction(actionCol5_4);
                var actionCol5_5 = cc.MoveTo.create(1.2, cc.p(this.quanbai5_5.x, this.quanbai5_5.y - distanceStartEndMiniPoker));
                this.quanbai5_5.runAction(actionCol5_5);
                var actionCol5_7 = cc.MoveTo.create(1.2, cc.p(this.quanbai5_7.x, this.quanbai5_7.y - distanceStartEndMiniPoker));
                this.quanbai5_7.runAction(actionCol5_7);
                var actionCol5_8 = cc.MoveTo.create(1.2, cc.p(this.quanbai5_8.x, this.quanbai5_8.y - distanceStartEndMiniPoker));
                this.quanbai5_8.runAction(actionCol5_8);
                var actionCol5_9 = cc.MoveTo.create(1.2, cc.p(this.quanbai5_9.x, this.quanbai5_9.y - distanceStartEndMiniPoker));
                this.quanbai5_9.runAction(actionCol5_9);
                var actionCol5_10 = cc.MoveTo.create(1.2, cc.p(this.quanbai5_10.x, this.quanbai5_10.y - distanceStartEndMiniPoker));
                this.quanbai5_10.runAction(actionCol5_10);
                var actionCol5_6 = cc.MoveTo.create(1.2, cc.p(this.quanbai5_6.x, this.quanbai5_6.y - distanceStartEndMiniPoker));
                this.quanbai5_6.runAction(cc.sequence(actionCol5_6, cc.callFunc(this.spinBackColum5Mini, this)));
            },

            spinBackColum1Mini: function () {
                var actionBack = cc.MoveTo.create(0.15, cc.p(this.pnColum1.x, this.pnColum1.y + 10));
                this.pnColum1.runAction(cc.sequence(actionBack, cc.callFunc(this.spinBackColum1_1Mini, this)));
            },
            spinBackColum1_1Mini: function () {
                var actionBack = cc.MoveTo.create(0.15, cc.p(this.pnColum1.x, this.pnColum1.y - 5));
                this.pnColum1.runAction(cc.sequence(actionBack, cc.callFunc(this.spinBackColum1_2Mini, this)));
            },
            spinBackColum1_2Mini: function () {
                var actionBack = cc.MoveTo.create(0.15, cc.p(this.pnColum1.x, this.pnColum1.y + 3));
                this.pnColum1.runAction(actionBack);
            },
            spinBackColum2Mini: function () {
                var actionBack = cc.MoveTo.create(0.15, cc.p(this.pnColum2.x, this.pnColum2.y + 10));
                this.pnColum2.runAction(cc.sequence(actionBack, cc.callFunc(this.spinBackColum2_1Mini, this)));
            },
            spinBackColum2_1Mini: function () {
                var actionBack = cc.MoveTo.create(0.15, cc.p(this.pnColum2.x, this.pnColum2.y - 5));
                this.pnColum2.runAction(cc.sequence(actionBack, cc.callFunc(this.spinBackColum2_2Mini, this)));
            },
            spinBackColum2_2Mini: function () {
                var actionBack = cc.MoveTo.create(0.15, cc.p(this.pnColum2.x, this.pnColum2.y + 3));
                this.pnColum2.runAction(actionBack);
            },
            spinBackColum3Mini: function () {
                var actionBack = cc.MoveTo.create(0.15, cc.p(this.pnColum3.x, this.pnColum3.y + 10));
                this.pnColum3.runAction(cc.sequence(actionBack, cc.callFunc(this.spinBackColum3_1Mini, this)));
            },
            spinBackColum3_1Mini: function () {
                var actionBack = cc.MoveTo.create(0.15, cc.p(this.pnColum3.x, this.pnColum3.y - 5));
                this.pnColum3.runAction(cc.sequence(actionBack, cc.callFunc(this.spinBackColum3_2Mini, this)));
            },
            spinBackColum3_2Mini: function () {
                var actionBack = cc.MoveTo.create(0.15, cc.p(this.pnColum3.x, this.pnColum3.y + 3));
                this.pnColum3.runAction(actionBack);
            },
            spinBackColum4Mini: function () {
                var actionBack = cc.MoveTo.create(0.15, cc.p(this.pnColum4.x, this.pnColum4.y + 10));
                this.pnColum4.runAction(cc.sequence(actionBack, cc.callFunc(this.spinBackColum4_1Mini, this)));
            },
            spinBackColum4_1Mini: function () {
                var actionBack = cc.MoveTo.create(0.15, cc.p(this.pnColum4.x, this.pnColum4.y - 5));
                this.pnColum4.runAction(cc.sequence(actionBack, cc.callFunc(this.spinBackColum4_2Mini, this)));
            },
            spinBackColum4_2Mini: function () {
                var actionBack = cc.MoveTo.create(0.15, cc.p(this.pnColum4.x, this.pnColum4.y + 3));
                this.pnColum4.runAction(actionBack);
            },
            spinBackColum5Mini: function () {
                var actionBack = cc.MoveTo.create(0.15, cc.p(this.pnColum5.x, this.pnColum5.y + 10));
                this.pnColum5.runAction(cc.sequence(actionBack, cc.callFunc(this.spinBackColum5_1Mini, this)));
            },
            spinBackColum5_1Mini: function () {
                var actionBack = cc.MoveTo.create(0.15, cc.p(this.pnColum5.x, this.pnColum5.y - 5));
                this.pnColum5.runAction(cc.sequence(actionBack, cc.callFunc(this.spinBackColum5_2Mini, this)));
            },
            spinBackColum5_2Mini: function () {
                var actionBack = cc.MoveTo.create(0.15, cc.p(this.pnColum5.x, this.pnColum5.y + 3));
                this.pnColum5.runAction(actionBack);
                this.GetMaGiai(this.saveResutl);
                //this.isStartRotateMini = false; this.pn_effect_muiten.setVisible(true);

                if (this.autoRotate === true) {
                    // if neu trung hu thi ko tiep tuc quay va ko hien effect notice
                    if (this.typeNoHu_Thung === 1) {
                        this.show_effect_hu(1, this.MoneyWin, this.moneyType);
                        this.autoRotate = false;
                        GuiUtil.changeSprite(this.sp_tuquay, "res/Minigame/ResMiniPoker/tuquay.png");
                    } else if (this.typeNoHu_Thung === 2) {
                        this.show_effect_hu(2, this.MoneyWin, this.moneyType);
                        GuiUtil.changeSprite(this.sp_tuquay, "res/Minigame/ResMiniPoker/tuquay.png");
                        this.autoRotate = false;
                    } else {
                        this.EffectNotice();
                        //this.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(this.funCheckAuto, this)));
                    }
                } else {
                    // if neu trung hu thi ko hien effect notice
                    if (this.typeNoHu_Thung === 1) {
                        this.show_effect_hu(1, this.MoneyWin, this.moneyType);
                        this.autoRotate = false;
                    } else if (this.typeNoHu_Thung === 2) {
                        this.show_effect_hu(2, this.MoneyWin, this.moneyType);
                        this.autoRotate = false;
                    } else {
                        this.EffectNotice();
                    }
                }
                _miniPoker.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(this.enebleStartRotate, this)));
                if (userInfo.userData === null) {
                } else {
                    if (_miniPoker.moneyType === 1) {
                        lobby.updateMoney(userInfo.userData.vinTotal, MONEY_VIN);
                    } else if (_miniPoker.moneyType === 0) {
                        lobby.updateMoney(userInfo.userData.xuTotal, MONEY_XU);
                    }
                }
            },

            enebleStartRotate: function () {
                if (this.autoRotate === false) {
                    this.pn_effect_muiten.setVisible(true);
                    this.CanGat.setEnabled(true);
                }
                this.isStartRotateMini = false;
                if (this.MINI_POKER_ROOM === 0 || this.MINI_POKER_ROOM === 3) {
                    this.btnCoin100.setEnabled(false);
                    GuiUtil.changeSprite(this.sp_room1, "res/Minigame/ImageChung/room_select.png");
                    this.btnCoin1000.setEnabled(true);
                    this.btnCoin10000.setEnabled(true);
                } else if (this.MINI_POKER_ROOM === 1 || this.MINI_POKER_ROOM === 4) {
                    this.btnCoin100.setEnabled(true);
                    GuiUtil.changeSprite(this.sp_room2, "res/Minigame/ImageChung/room_select.png");
                    this.btnCoin1000.setEnabled(false);
                    this.btnCoin10000.setEnabled(true);
                } else {
                    GuiUtil.changeSprite(_miniPoker.sp_room3, "res/Minigame/ImageChung/room_select.png");
                    this.btnCoin100.setEnabled(true);
                    this.btnCoin1000.setEnabled(true);
                    this.btnCoin10000.setEnabled(false);
                }
                this.btnChangeMoneytype.setEnabled(true);
            },

            funCheckAuto: function () {
                if (this.autoRotate === true) {
                    this.funPlayMinigame();
                }
            },

            RunRotate: function () {
                //this.MiniPokerNotice1.setString(""); this.MiniPokerNotice2.setString("");
                this.btnChangeMoneytype.setEnabled(false);
                this.RotateColum();
            },
            GetLinkImageMini: function (value) {
                if (value === 0) {
                    this.linkImage = "chat_bich.png";
                    this.link_image_chat = "chat_bich.png";
                    this.text_quanbai = "2";
                    this.color_quanbai = "black";
                } else if (value === 1) {
                    this.linkImage = "chat_tep.png";
                    this.link_image_chat = "chat_tep.png";
                    this.text_quanbai = "2";
                    this.color_quanbai = "black";
                } else if (value === 2) {
                    this.linkImage = "chat_ro.png";
                    this.link_image_chat = "chat_ro.png";
                    this.text_quanbai = "2";
                    this.color_quanbai = "red";
                } else if (value === 3) {
                    this.linkImage = "chat_co.png";
                    this.link_image_chat = "chat_co.png";
                    this.text_quanbai = "2";
                    this.color_quanbai = "red";
                } else if (value === 4) {
                    this.linkImage = "chat_bich.png";
                    this.link_image_chat = "chat_bich.png";
                    this.text_quanbai = "3";
                    this.color_quanbai = "black";
                } else if (value === 5) {
                    this.linkImage = "chat_tep.png";
                    this.link_image_chat = "chat_tep.png";
                    this.text_quanbai = "3";
                    this.color_quanbai = "black";
                } else if (value === 6) {
                    this.linkImage = "chat_ro.png";
                    this.link_image_chat = "chat_ro.png";
                    this.text_quanbai = "3";
                    this.color_quanbai = "red";
                } else if (value === 7) {
                    this.linkImage = "chat_co.png";
                    this.link_image_chat = "chat_co.png";
                    this.text_quanbai = "3";
                    this.color_quanbai = "red";
                } else if (value === 8) {
                    this.linkImage = "chat_bich.png";
                    this.link_image_chat = "chat_bich.png";
                    this.text_quanbai = "4";
                    this.color_quanbai = "black";
                } else if (value === 9) {
                    this.linkImage = "chat_tep.png";
                    this.link_image_chat = "chat_tep.png";
                    this.text_quanbai = "4";
                    this.color_quanbai = "black";
                } else if (value === 10) {
                    this.linkImage = "chat_ro.png";
                    this.link_image_chat = "chat_ro.png";
                    this.text_quanbai = "4";
                    this.color_quanbai = "red";
                } else if (value === 11) {
                    this.linkImage = "chat_co.png";
                    this.link_image_chat = "chat_co.png";
                    this.text_quanbai = "4";
                    this.color_quanbai = "red";
                } else if (value === 12) {
                    this.linkImage = "chat_bich.png";
                    this.link_image_chat = "chat_bich.png";
                    this.text_quanbai = "5";
                    this.color_quanbai = "black";
                } else if (value === 13) {
                    this.linkImage = "chat_tep.png";
                    this.link_image_chat = "chat_tep.png";
                    this.text_quanbai = "5";
                    this.color_quanbai = "black";
                } else if (value === 14) {
                    this.linkImage = "chat_ro.png";
                    this.link_image_chat = "chat_ro.png";
                    this.text_quanbai = "5";
                    this.color_quanbai = "red";
                } else if (value === 15) {
                    this.linkImage = "chat_co.png";
                    this.link_image_chat = "chat_co.png";
                    this.text_quanbai = "5";
                    this.color_quanbai = "red";
                } else if (value === 16) {
                    this.linkImage = "chat_bich.png";
                    this.link_image_chat = "chat_bich.png";
                    this.text_quanbai = "6";
                    this.color_quanbai = "black";
                } else if (value === 17) {
                    this.linkImage = "chat_tep.png";
                    this.link_image_chat = "chat_tep.png";
                    this.text_quanbai = "6";
                    this.color_quanbai = "black";
                } else if (value === 18) {
                    this.linkImage = "chat_ro.png";
                    this.link_image_chat = "chat_ro.png";
                    this.text_quanbai = "6";
                    this.color_quanbai = "red";
                } else if (value === 19) {
                    this.linkImage = "chat_co.png";
                    this.link_image_chat = "chat_co.png";
                    this.text_quanbai = "6";
                    this.color_quanbai = "red";
                } else if (value === 20) {
                    this.linkImage = "chat_bich.png";
                    this.link_image_chat = "chat_bich.png";
                    this.text_quanbai = "7";
                    this.color_quanbai = "black";
                } else if (value === 21) {
                    this.linkImage = "chat_tep.png";
                    this.link_image_chat = "chat_tep.png";
                    this.text_quanbai = "7";
                    this.color_quanbai = "black";
                } else if (value === 22) {
                    this.linkImage = "chat_ro.png";
                    this.link_image_chat = "chat_ro.png";
                    this.text_quanbai = "7";
                    this.color_quanbai = "red";
                } else if (value === 23) {
                    this.linkImage = "chat_co.png";
                    this.link_image_chat = "chat_co.png";
                    this.text_quanbai = "7";
                    this.color_quanbai = "red";
                } else if (value === 24) {
                    this.linkImage = "chat_bich.png";
                    this.link_image_chat = "chat_bich.png";
                    this.text_quanbai = "8";
                    this.color_quanbai = "black";
                } else if (value === 25) {
                    this.linkImage = "chat_tep.png";
                    this.link_image_chat = "chat_tep.png";
                    this.text_quanbai = "8";
                    this.color_quanbai = "black";
                } else if (value === 26) {
                    this.linkImage = "chat_ro.png";
                    this.link_image_chat = "chat_ro.png";
                    this.text_quanbai = "8";
                    this.color_quanbai = "red";
                } else if (value === 27) {
                    this.linkImage = "chat_co.png";
                    this.link_image_chat = "chat_co.png";
                    this.text_quanbai = "8";
                    this.color_quanbai = "red";
                } else if (value === 28) {
                    this.linkImage = "chat_bich.png";
                    this.link_image_chat = "chat_bich.png";
                    this.text_quanbai = "9";
                    this.color_quanbai = "black";
                } else if (value === 29) {
                    this.linkImage = "chat_tep.png";
                    this.link_image_chat = "chat_tep.png";
                    this.text_quanbai = "9";
                    this.color_quanbai = "black";
                } else if (value === 30) {
                    this.linkImage = "chat_ro.png";
                    this.link_image_chat = "chat_ro.png";
                    this.text_quanbai = "9";
                    this.color_quanbai = "red";
                } else if (value === 31) {
                    this.linkImage = "chat_co.png";
                    this.link_image_chat = "chat_co.png";
                    this.text_quanbai = "9";
                    this.color_quanbai = "red";
                } else if (value === 32) {
                    this.linkImage = "chat_bich.png";
                    this.link_image_chat = "chat_bich.png";
                    this.text_quanbai = "10";
                    this.color_quanbai = "black";
                } else if (value === 33) {
                    this.linkImage = "chat_tep.png";
                    this.link_image_chat = "chat_tep.png";
                    this.text_quanbai = "10";
                    this.color_quanbai = "black";
                } else if (value === 34) {
                    this.linkImage = "chat_ro.png";
                    this.link_image_chat = "chat_ro.png";
                    this.text_quanbai = "10";
                    this.color_quanbai = "red";
                } else if (value === 35) {
                    this.linkImage = "chat_co.png";
                    this.link_image_chat = "chat_co.png";
                    this.text_quanbai = "10";
                    this.color_quanbai = "red";
                } else if (value === 36) {
                    this.linkImage = "J_bi.png";
                    this.link_image_chat = "chat_bich.png";
                    this.text_quanbai = "J";
                    this.color_quanbai = "black";
                } else if (value === 37) {
                    this.linkImage = "J_te.png";
                    this.link_image_chat = "chat_tep.png";
                    this.text_quanbai = "J";
                    this.color_quanbai = "black";
                } else if (value === 38) {
                    this.linkImage = "J_ro.png";
                    this.link_image_chat = "chat_ro.png";
                    this.text_quanbai = "J";
                    this.color_quanbai = "red";
                } else if (value === 39) {
                    this.linkImage = "J_co.png";
                    this.link_image_chat = "chat_co.png";
                    this.text_quanbai = "J";
                    this.color_quanbai = "red";
                } else if (value === 40) {
                    this.linkImage = "Q_bi.png";
                    this.link_image_chat = "chat_bich.png";
                    this.text_quanbai = "Q";
                    this.color_quanbai = "black";
                } else if (value === 41) {
                    this.linkImage = "Q_te.png";
                    this.link_image_chat = "chat_tep.png";
                    this.text_quanbai = "Q";
                    this.color_quanbai = "black";
                } else if (value === 42) {
                    this.linkImage = "Q_ro.png";
                    this.link_image_chat = "chat_ro.png";
                    this.text_quanbai = "Q";
                    this.color_quanbai = "red";
                } else if (value === 43) {
                    this.linkImage = "Q_co.png";
                    this.link_image_chat = "chat_co.png";
                    this.text_quanbai = "Q";
                    this.color_quanbai = "red";
                } else if (value === 44) {
                    this.linkImage = "K_bi.png";
                    this.link_image_chat = "chat_bich.png";
                    this.text_quanbai = "K";
                    this.color_quanbai = "black";
                } else if (value === 45) {
                    this.linkImage = "K_te.png";
                    this.link_image_chat = "chat_tep.png";
                    this.text_quanbai = "K";
                    this.color_quanbai = "black";
                } else if (value === 46) {
                    this.linkImage = "K_ro.png";
                    this.link_image_chat = "chat_ro.png";
                    this.text_quanbai = "K";
                    this.color_quanbai = "red";
                } else if (value === 47) {
                    this.linkImage = "K_co.png";
                    this.link_image_chat = "chat_co.png";
                    this.text_quanbai = "K";
                    this.color_quanbai = "red";
                } else if (value === 48) {
                    this.linkImage = "chat_bich.png";
                    this.link_image_chat = "chat_bich.png";
                    this.text_quanbai = "A";
                    this.color_quanbai = "black";
                } else if (value === 49) {
                    this.linkImage = "chat_tep.png";
                    this.link_image_chat = "chat_tep.png";
                    this.text_quanbai = "A";
                    this.color_quanbai = "black";
                } else if (value === 50) {
                    this.linkImage = "chat_ro.png";
                    this.link_image_chat = "chat_ro.png";
                    this.text_quanbai = "A";
                    this.color_quanbai = "red";
                } else if (value === 51) {
                    this.linkImage = "chat_co.png";
                    this.link_image_chat = "chat_co.png";
                    this.text_quanbai = "A";
                    this.color_quanbai = "red";
                }
            },

            GetMaGiai: function (value) {
                if (value === 3) {
                    this.TextGiaiThuong = "";
                    this.linkmagiai = "tuquy";
                } else if (value === 4) {
                    this.TextGiaiThuong = "";
                    this.linkmagiai = "culu";
                } else if (value === 5) {
                    this.TextGiaiThuong = "";
                    this.linkmagiai = "thung";
                } else if (value === 6) {
                    this.TextGiaiThuong = "";
                    this.linkmagiai = "sanh";
                } else if (value === 7) {
                    this.TextGiaiThuong = "";
                    this.linkmagiai = "samco";
                } else if (value === 8) {
                    this.TextGiaiThuong = "";
                    this.linkmagiai = "haidoi";
                } else if (value === 9) {
                    this.TextGiaiThuong = "";
                    this.linkmagiai = "doij";
                } else
                    this.TextGiaiThuong = "";
            },

            EffectNotice: function () {
                //resetvitri
                this.MiniPokerNotice1.setString(this.TextGiaiThuong);

                if (this.moneyType === 1)
                    this.MiniPokerNotice2.setColor(GuiUtil.color("#F3F354"));
                else
                    this.MiniPokerNotice2.setColor(GuiUtil.color("#EDEDFC"));

                if (parseInt(this.MoneyWin) > 0) {
                    this.MiniPokerNotice2.setString("+" + formatMoney(0, 3, this.MoneyWin));
                    this.showSP_giaithuong(this.linkmagiai);
                }
                var fadeout = new cc.FadeOut(2.1);
                this.sp_thongbao.runAction(fadeout);
                var actionBack = cc.MoveTo.create(2.1, cc.p(this.MiniPokerNotice2.x, this.MiniPokerNotice2.y + 40));
                this.MiniPokerNotice2.runAction(cc.sequence(actionBack, cc.callFunc(this.HideNotice, this)));

            },

            EffectError: function () {
                var fadeout = new cc.FadeOut(2.1);
                this.sp_thongbao.runAction(cc.sequence(fadeout, cc.callFunc(this.HideError, this)));
            },

            HideError: function () {
                this.sp_thongbao.stopAllActions();
                this.MiniPokerNotice1.setString("");
                var fadein = new cc.FadeIn(0);
                this.sp_thongbao.runAction(fadein);

                if (this.MINI_POKER_ROOM === 0 || this.MINI_POKER_ROOM === 3) {
                    this.btnCoin100.setEnabled(false);
                    this.btnCoin1000.setEnabled(true);
                    this.btnCoin10000.setEnabled(true);
                } else if (this.MINI_POKER_ROOM === 1 || this.MINI_POKER_ROOM === 4) {
                    this.btnCoin100.setEnabled(true);
                    this.btnCoin1000.setEnabled(false);
                    this.btnCoin10000.setEnabled(true);
                } else {
                    this.btnCoin100.setEnabled(true);
                    this.btnCoin1000.setEnabled(true);
                    this.btnCoin10000.setEnabled(false);
                }
                this.CanGat.setEnabled(true);
                this.btnChangeMoneytype.setEnabled(true);
                this.pn_effect_muiten.setVisible(true);
                this.btnTuQuay.setEnabled(true);
                if (_miniPoker.autoRotate === true) {
                    _miniPoker.autoRotate = false;
                    GuiUtil.changeSprite(_miniPoker.sp_tuquay, "res/Minigame/ResMiniPoker/tuquay.png");
                }
            },

            HideNotice: function () {
                this.MiniPokerNotice2.y = this.position_notice;
                this.MiniPokerNotice1.setString("");
                this.MiniPokerNotice2.setString("");
                var fadein = new cc.FadeIn(0);
                this.sp_thongbao.runAction(fadein);
                this.closeSP_giaithuong();
            },

            show_effect_hu: function (type, money, moneytype) {
                this.isshowNoHu = true;
                this.pn_effect_hu.setVisible(true);
                if (type === 1) { /// No hu
                    this.sp_nohu.setVisible(true);
                    this.sp_thungphasanh.setVisible(false);
                    this.HuOrThung = "NOHU";
                } else if (type === 2) {
                    this.sp_thungphasanh.setVisible(true);
                    this.sp_nohu.setVisible(false);
                    this.HuOrThung = "THUNGPHASANH";
                }

                var rotateByVT = new cc.RotateBy(5, 360);
                this.circle.runAction(cc.repeatForever(rotateByVT));

                var fadeInStar = new cc.FadeIn(1.2);
                var fadeOutStar = new cc.FadeOut(1.2);
                var spawnIn = cc.spawn(fadeOutStar, cc.scaleTo(1.2, 0));
                var spawnOut = cc.spawn(fadeInStar, cc.scaleTo(1.2, 1));
                var sequence = cc.sequence(spawnIn, cc.delayTime(0.3), spawnOut);
                this.star_1.runAction(cc.repeatForever(sequence));

                var fadeInStar2 = new cc.FadeIn(1);
                var fadeOutStar2 = new cc.FadeOut(1);
                var spawnIn2 = cc.spawn(fadeOutStar2, cc.scaleTo(1, 0));
                var spawnOut2 = cc.spawn(fadeInStar2, cc.scaleTo(1, 0.8));
                var sequence2 = cc.sequence(spawnOut2, cc.delayTime(0.5), spawnIn2);
                this.star_2.runAction(cc.repeatForever(sequence2));

                var fadeInStar3 = new cc.FadeIn(0.7);
                var fadeOutStar3 = new cc.FadeOut(0.7);
                var spawnIn3 = cc.spawn(fadeOutStar3, cc.scaleTo(0.7, 0));
                var spawnOut3 = cc.spawn(fadeInStar3, cc.scaleTo(0.7, 0.5));
                var sequence3 = cc.sequence(spawnIn3, cc.delayTime(0), spawnOut3);
                this.star_3.runAction(cc.repeatForever(sequence3));
                if (moneytype === 1) {
                    this.lb_money_earn_hu.setColor(GuiUtil.color("#F3F354"));
                } else {
                    this.lb_money_earn_hu.setColor(GuiUtil.color("#EDEDFC"));
                }
                this.lb_money_earn_hu.setString(formatMoney(0, 3, money));
                this.run_effect_text_hu();
            },
            run_effect_text_hu: function () {
                var sequenceHuIn = cc.sequence(cc.scaleTo(0.4, 1, 1), cc.delayTime(3), cc.scaleTo(0.4, 1, 0), cc.callFunc(this.run_effect_sp_hu, this));
                if (this.HuOrThung === "NOHU") {
                    this.sp_nohu.runAction(sequenceHuIn);
                } else {
                    this.sp_thungphasanh.runAction(sequenceHuIn);
                }
            },
            run_effect_sp_hu: function () {
                var seq = cc.sequence(cc.scaleTo(0.2, 1.1), cc.scaleTo(0.2, 0.9), cc.scaleTo(0.2, 1.1), cc.scaleTo(0.2, 1), cc.delayTime(0.2));
                var spawntxt = cc.spawn(cc.delayTime(3), cc.sequence(seq, seq, seq));
                var sequenceTxt = cc.sequence(cc.scaleTo(0.4, 1, 1), spawntxt, cc.scaleTo(0.4, 1, 0), cc.callFunc(this.run_effect_text_hu, this));
                this.lb_money_earn_hu.runAction(sequenceTxt);
            },
            close_effect_hu: function () {
                this.isshowNoHu = false;
                this.pn_effect_hu.setVisible(false);
                if (this.HuOrThung === "NOHU") {
                    this.sp_nohu.stopAllActions();
                    this.sp_nohu.setScale(1);
                } else {
                    this.sp_thungphasanh.stopAllActions();
                    this.sp_thungphasanh.setScale(1);
                }
                this.lb_money_earn_hu.stopAllActions();
                this.lb_money_earn_hu.setString("");
                this.lb_money_earn_hu.setScaleY(0);
                this.star_1.stopAllActions();
                this.star_2.stopAllActions();
                this.star_3.stopAllActions();
                this.circle.stopAllActions();
                this.circle.setRotation(0);
                var fadeOut1 = new cc.FadeOut(0);
                this.star_1.runAction(cc.spawn(fadeOut1, cc.scaleTo(0, 1)));
                var fadeOut2 = new cc.FadeOut(0);
                this.star_2.runAction(cc.spawn(fadeOut2, cc.scaleTo(0, 1)));
                var fadeOut3 = new cc.FadeOut(0);
                this.star_3.runAction(cc.spawn(fadeOut3, cc.scaleTo(0, 1)));
            },

            effectHuMiniPokerUp: function () {
                _miniPoker.valueOldHu = parseFloat(_miniPoker.valueOldHu) + parseFloat(_miniPoker.breakValueHu);
                //cc.log("Hũ poker = " +_miniPoker.valueOldHu);
                _miniPoker.txtHu.setString("" + formatMoney(0, 3, _miniPoker.valueOldHu));
                if (_miniPoker.valueOldHu < _miniPoker.valueNewHu) {
                    _miniPoker.txtHu.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(this.effectHuMiniPokerUp, this)));
                } else {
                    _miniPoker.txtHu.setString("" + formatMoney(0, 3, _miniPoker.valueNewHu));
                    _miniPoker.valueOldHu = _miniPoker.valueNewHu;
                    _miniPoker.isruneffecthu = false;
                }
            },
            effectHuMiniPokerDown: function () {
                _miniPoker.valueOldHu = parseFloat(_miniPoker.valueOldHu) + parseFloat(_miniPoker.breakValueHu);
                _miniPoker.txtHu.setString("" + formatMoney(0, 3, _miniPoker.valueOldHu));
                if (_miniPoker.valueOldHu > _miniPoker.valueNewHu) {
                    _miniPoker.txtHu.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(this.effectHuMiniPokerDown, this)));
                } else {
                    _miniPoker.txtHu.setString("" + formatMoney(0, 3, _miniPoker.valueNewHu));
                    _miniPoker.valueOldHu = _miniPoker.valueNewHu;
                    _miniPoker.isruneffecthu = false;
                }
            },

            responseUpdateMiniPoker: function (value, x2) {
                this._enableAutoSpin = true;
                cc.log("hu : " + value + " x2 : " + x2);
                value = parseFloat(value);
                this.pnx2.stopAllActions();
                this.pnx2.setVisible(false);
                if (this.ischangeroom === true) {
                    this.MINI_POKER_ROOM = this.roomjoint;
                    this.ischangeroom = false;
                    this.enebleStartRotate();
                }
                if (x2 === 1) {
                    this.pnx2.setVisible(true);
                    var seq = cc.sequence(cc.scaleTo(0.3, 1.15), cc.scaleTo(0.3, 1), cc.delayTime(0.5));
                    // this.pnx2.runAction(cc.repeatForever(seq));
                    this.time_event.setString("");
                }

                if (value > _miniPoker.valueOldHu) {
                    _miniPoker.valueNewHu = value;
                    if (_miniPoker.isruneffecthu === false) {
                        _miniPoker.isruneffecthu = true;
                        _miniPoker.breakValueHu = parseInt((value - _miniPoker.valueOldHu) / 10);
                        if (_miniPoker.breakValueHu === 0) _miniPoker.breakValueHu = 1;
                        this.effectHuMiniPokerUp();
                    } else {
                        _miniPoker.breakValueHu = parseInt((value - _miniPoker.valueOldHu) / 10);
                    }
                } else if (value < _miniPoker.valueOldHu) {
                    _miniPoker.valueNewHu = value;
                    if (_miniPoker.isruneffecthu === false) {
                        _miniPoker.isruneffecthu = true;
                        _miniPoker.breakValueHu = parseInt((value - _miniPoker.valueOldHu) / 10);
                        if (_miniPoker.breakValueHu === 0) _miniPoker.breakValueHu = -1;
                        this.effectHuMiniPokerDown();
                    } else {
                        _miniPoker.breakValueHu = parseInt((value - _miniPoker.valueOldHu) / 10);
                    }
                } else if (value === _miniPoker.valueOldHu) {
                    _miniPoker.txtHu.setString("" + formatMoney(0, 3, value));
                    this.checkRoomToEnable();
                }
            },
            responsePlayMiniPoker: function (result, prize, card1, card2, card3, card4, card5, currentmoney) {
                this._enableChangeRoom = true;
                cc.log("result: " + result + ", prize: " + prize + ", card: " + card1 + "," + card2 + "," + card3 + "," + card4 + "," + card5 + "currentmoney " + currentmoney);
                if (result === 100) {
                    this.btnTuQuay.setEnabled(false);
                    this.MiniPokerNotice2.setString("");
                    this.MiniPokerNotice1.setString("Quay không thành công!");
                    this.EffectError();
                } else if (result === 101) {
                    this.btnTuQuay.setEnabled(false);
                    this.MiniPokerNotice2.setString("");
                    this.MiniPokerNotice1.setString("Đặt cược không hợp lệ!");
                    this.EffectError();
                } else if (result === 102) {
                    this.btnTuQuay.setEnabled(false);
                    this.MiniPokerNotice2.setString("");
                    this.MiniPokerNotice1.setString("Bạn không đủ số dư!");
                    this.EffectError();
                } else {
                    if (userInfo.userData === null) {
                    } else {
                        if (this.moneyType === 1)
                            lobby.updateMoney((userInfo.userData.vinTotal - _miniPoker.valueMoney), MONEY_VIN);
                        else
                            lobby.updateMoney((userInfo.userData.xuTotal - _miniPoker.valueMoney), MONEY_XU);
                    }
                    if (this.isStartRotateMini === true) {
                        if (this.resultLB1 != card1 || this.resultLB2 != card2 || this.resultLB3 != card3 || this.resultLB4 != card4 || this.resultLB5 != card5) {
                            this.resultLB1 = card1;
                            this.resultLB2 = card2;
                            this.resultLB3 = card3;
                            this.resultLB4 = card4;
                            this.resultLB5 = card5;
                            this.PauseToReDraw();
                        }
                    } else {
                        this.resultLB1 = card1;
                        this.resultLB2 = card2;
                        this.resultLB3 = card3;
                        this.resultLB4 = card4;
                        this.resultLB5 = card5;
                        if (this.hideMiniPoker === false) {
                            this.RunRotate();
                        } else {
                            this.runAction(cc.sequence(cc.delayTime(4), cc.callFunc(function () {
                                if (userInfo.userData === null) {
                                } else {
                                    if (_miniPoker.moneyType === 1) {
                                        lobby.updateMoney(userInfo.userData.vinTotal, MONEY_VIN);
                                    } else if (_miniPoker.moneyType === 0) {
                                        lobby.updateMoney(userInfo.userData.xuTotal, MONEY_XU);
                                    }
                                }
                            })));
                        }
                        this.isStartRotateMini = true;
                    }

                    this.saveResutl = result;
                    if (result === 1) {
                        this.typeNoHu_Thung = 1;
                    } else if (result === 2) {
                        this.typeNoHu_Thung = 2;
                    } else {
                        this.typeNoHu_Thung = 0;
                    }

                    this.MoneyWin = prize;
                    this.btnCoin100.setEnabled(false);
                    this.btnCoin1000.setEnabled(false);
                    this.btnCoin10000.setEnabled(false);
                    if (_miniPoker.moneyType === 1) {
                        userInfo.userData.vinTotal = currentmoney;
                    } else {
                        userInfo.userData.xuTotal = currentmoney;
                    }
                }
            },
            responseStopAutoMiniPoker: function () {
                //cc.log("vao");
                _miniPoker.autoRotate = false;
                _miniPoker.pn_effect_muiten.setVisible(true);
                _miniPoker.CanGat.setEnabled(true);
                GuiUtil.changeSprite(this.sp_tuquay, "res/Minigame/ResMiniPoker/tuquay.png");
            },
            PauseToReDraw: function () {
                //cc.log("stop action");
                _miniPoker.stopAllActions();
                this.quanbai1_1.stopAllActions();
                this.quanbai1_2.stopAllActions();
                this.quanbai1_3.stopAllActions();
                this.quanbai1_4.stopAllActions();
                this.quanbai1_5.stopAllActions();
                this.quanbai1_6.stopAllActions();
                this.quanbai1_7.stopAllActions();
                this.quanbai1_8.stopAllActions();
                this.quanbai1_9.stopAllActions();
                this.quanbai1_10.stopAllActions();

                this.quanbai2_1.stopAllActions();
                this.quanbai2_2.stopAllActions();
                this.quanbai2_3.stopAllActions();
                this.quanbai2_4.stopAllActions();
                this.quanbai2_5.stopAllActions();
                this.quanbai2_6.stopAllActions();
                this.quanbai2_7.stopAllActions();
                this.quanbai2_8.stopAllActions();
                this.quanbai2_9.stopAllActions();
                this.quanbai2_10.stopAllActions();

                this.quanbai3_1.stopAllActions();
                this.quanbai3_2.stopAllActions();
                this.quanbai3_3.stopAllActions();
                this.quanbai3_4.stopAllActions();
                this.quanbai3_5.stopAllActions();
                this.quanbai3_6.stopAllActions();
                this.quanbai3_7.stopAllActions();
                this.quanbai3_8.stopAllActions();
                this.quanbai3_9.stopAllActions();
                this.quanbai3_10.stopAllActions();

                this.quanbai4_1.stopAllActions();
                this.quanbai4_2.stopAllActions();
                this.quanbai4_3.stopAllActions();
                this.quanbai4_4.stopAllActions();
                this.quanbai4_5.stopAllActions();
                this.quanbai4_6.stopAllActions();
                this.quanbai4_7.stopAllActions();
                this.quanbai4_8.stopAllActions();
                this.quanbai4_9.stopAllActions();
                this.quanbai4_10.stopAllActions();

                this.quanbai5_1.stopAllActions();
                this.quanbai5_2.stopAllActions();
                this.quanbai5_3.stopAllActions();
                this.quanbai5_4.stopAllActions();
                this.quanbai5_5.stopAllActions();
                this.quanbai5_6.stopAllActions();
                this.quanbai5_7.stopAllActions();
                this.quanbai5_8.stopAllActions();
                this.quanbai5_9.stopAllActions();
                this.quanbai5_10.stopAllActions();

                this.pnColum1.stopAllActions();
                this.pnColum2.stopAllActions();
                this.pnColum3.stopAllActions();
                this.pnColum4.stopAllActions();
                this.pnColum5.stopAllActions();

                this.pnColum1.y = this.save_pos_pn_1;
                this.pnColum2.y = this.save_pos_pn_2;
                this.pnColum3.y = this.save_pos_pn_3;
                this.pnColum4.y = this.save_pos_pn_4;
                this.pnColum5.y = this.save_pos_pn_5;

                this.quanbai1_1.y = this.save_pos_1_1;
                this.quanbai1_2.y = this.save_pos_1_2;
                this.quanbai1_3.y = this.save_pos_1_3;
                this.quanbai1_4.y = this.save_pos_1_4;
                this.quanbai1_5.y = this.save_pos_1_5;
                this.quanbai1_6.y = this.save_pos_1_6;
                this.quanbai1_7.y = this.save_pos_1_7;
                this.quanbai1_8.y = this.save_pos_1_8;
                this.quanbai1_9.y = this.save_pos_1_9;
                this.quanbai1_10.y = this.save_pos_1_10;

                this.quanbai2_1.y = this.save_pos_2_1;
                this.quanbai2_2.y = this.save_pos_2_2;
                this.quanbai2_3.y = this.save_pos_2_3;
                this.quanbai2_4.y = this.save_pos_2_4;
                this.quanbai2_5.y = this.save_pos_2_5;
                this.quanbai2_6.y = this.save_pos_2_6;
                this.quanbai2_7.y = this.save_pos_2_7;
                this.quanbai2_8.y = this.save_pos_2_8;
                this.quanbai2_9.y = this.save_pos_2_9;
                this.quanbai2_10.y = this.save_pos_2_10;

                this.quanbai3_1.y = this.save_pos_3_1;
                this.quanbai3_2.y = this.save_pos_3_2;
                this.quanbai3_3.y = this.save_pos_3_3;
                this.quanbai3_4.y = this.save_pos_3_4;
                this.quanbai3_5.y = this.save_pos_3_5;
                this.quanbai3_6.y = this.save_pos_3_6;
                this.quanbai3_7.y = this.save_pos_3_7;
                this.quanbai3_8.y = this.save_pos_3_8;
                this.quanbai3_9.y = this.save_pos_3_9;
                this.quanbai3_10.y = this.save_pos_3_10;

                this.quanbai4_1.y = this.save_pos_4_1;
                this.quanbai4_2.y = this.save_pos_4_2;
                this.quanbai4_3.y = this.save_pos_4_3;
                this.quanbai4_4.y = this.save_pos_4_4;
                this.quanbai4_5.y = this.save_pos_4_5;
                this.quanbai4_6.y = this.save_pos_4_6;
                this.quanbai4_7.y = this.save_pos_4_7;
                this.quanbai4_8.y = this.save_pos_4_8;
                this.quanbai4_9.y = this.save_pos_4_9;
                this.quanbai4_10.y = this.save_pos_4_10;

                this.quanbai5_1.y = this.save_pos_5_1;
                this.quanbai5_2.y = this.save_pos_5_2;
                this.quanbai5_3.y = this.save_pos_5_3;
                this.quanbai5_4.y = this.save_pos_5_4;
                this.quanbai5_5.y = this.save_pos_5_5;
                this.quanbai5_6.y = this.save_pos_5_6;
                this.quanbai5_7.y = this.save_pos_5_7;
                this.quanbai5_8.y = this.save_pos_5_8;
                this.quanbai5_9.y = this.save_pos_5_9;
                this.quanbai5_10.y = this.save_pos_5_10;

                var actionBack = cc.MoveTo.create(0.5, cc.p(this.pnColum1.x, this.pnColum1.y + 8));
                this.pnColum1.runAction(cc.sequence(actionBack, cc.callFunc(this.RotateColum1, this)));
                var actionBack2 = cc.MoveTo.create(0.5, cc.p(this.pnColum2.x, this.pnColum2.y + 8));
                this.pnColum2.runAction(cc.sequence(cc.delayTime(0.15), actionBack2, cc.callFunc(this.RotateColum2, this)));
                var actionBack3 = cc.MoveTo.create(0.5, cc.p(this.pnColum3.x, this.pnColum3.y + 8));
                this.pnColum3.runAction(cc.sequence(cc.delayTime(0.3), actionBack3, cc.callFunc(this.RotateColum3, this)));
                var actionBack4 = cc.MoveTo.create(0.5, cc.p(this.pnColum4.x, this.pnColum4.y + 8));
                this.pnColum4.runAction(cc.sequence(cc.delayTime(0.45), actionBack4, cc.callFunc(this.RotateColum4, this)));
                var actionBack5 = cc.MoveTo.create(0.5, cc.p(this.pnColum5.x, this.pnColum5.y + 8));
                this.pnColum5.runAction(cc.sequence(cc.delayTime(0.6), actionBack5, cc.callFunc(this.RotateColum5, this), cc.delayTime(0.6), cc.callFunc(this.ReDrawResultMini, this)));
            },

            ReDrawResultMini: function () {
                this.GetLinkImageMini(this.resultLB1);
                GuiUtil.changeSprite(this.spColum1_1, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                GuiUtil.changeSprite(this.sp_chat1_1, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                this.txt1_1.setString("" + this.text_quanbai);
                if (this.color_quanbai === "red") this.txt1_1.setColor(GuiUtil.color(255, 0, 0));
                else this.txt1_1.setColor(GuiUtil.color(0, 0, 0));
                this.GetLinkImageMini(this.resultLB2);
                GuiUtil.changeSprite(this.spColum2_1, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                GuiUtil.changeSprite(this.sp_chat2_1, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                this.txt2_1.setString("" + this.text_quanbai);
                if (this.color_quanbai === "red") this.txt2_1.setColor(GuiUtil.color(255, 0, 0));
                else this.txt2_1.setColor(GuiUtil.color(0, 0, 0));
                this.GetLinkImageMini(this.resultLB3);
                GuiUtil.changeSprite(this.spColum3_1, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                GuiUtil.changeSprite(this.sp_chat3_1, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                this.txt3_1.setString("" + this.text_quanbai);
                if (this.color_quanbai === "red") this.txt3_1.setColor(GuiUtil.color(255, 0, 0));
                else this.txt3_1.setColor(GuiUtil.color(0, 0, 0));
                this.GetLinkImageMini(this.resultLB4);
                GuiUtil.changeSprite(this.spColum4_1, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                GuiUtil.changeSprite(this.sp_chat4_1, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                this.txt4_1.setString("" + this.text_quanbai);
                if (this.color_quanbai === "red") this.txt4_1.setColor(GuiUtil.color(255, 0, 0));
                else this.txt4_1.setColor(GuiUtil.color(0, 0, 0));
                this.GetLinkImageMini(this.resultLB5);
                GuiUtil.changeSprite(this.spColum5_1, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                GuiUtil.changeSprite(this.sp_chat5_1, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                this.txt5_1.setString("" + this.text_quanbai);
                if (this.color_quanbai === "red") this.txt5_1.setColor(GuiUtil.color(255, 0, 0));
                else this.txt5_1.setColor(GuiUtil.color(0, 0, 0));
                this.GetLinkImageMini(this.resultLB1);
                GuiUtil.changeSprite(this.spColum1_6, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                GuiUtil.changeSprite(this.sp_chat1_6, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                this.txt1_6.setString("" + this.text_quanbai);
                if (this.color_quanbai === "red") this.txt1_6.setColor(GuiUtil.color(255, 0, 0));
                else this.txt1_6.setColor(GuiUtil.color(0, 0, 0));
                this.GetLinkImageMini(this.resultLB2);
                GuiUtil.changeSprite(this.spColum2_6, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                GuiUtil.changeSprite(this.sp_chat2_6, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                this.txt2_6.setString("" + this.text_quanbai);
                if (this.color_quanbai === "red") this.txt2_6.setColor(GuiUtil.color(255, 0, 0));
                else this.txt2_6.setColor(GuiUtil.color(0, 0, 0));
                this.GetLinkImageMini(this.resultLB3);
                GuiUtil.changeSprite(this.spColum3_6, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                GuiUtil.changeSprite(this.sp_chat3_6, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                this.txt3_6.setString("" + this.text_quanbai);
                if (this.color_quanbai === "red") this.txt3_6.setColor(GuiUtil.color(255, 0, 0));
                else this.txt3_6.setColor(GuiUtil.color(0, 0, 0));
                this.GetLinkImageMini(this.resultLB4);
                GuiUtil.changeSprite(this.spColum4_6, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                GuiUtil.changeSprite(this.sp_chat4_6, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                this.txt4_6.setString("" + this.text_quanbai);
                if (this.color_quanbai === "red") this.txt4_6.setColor(GuiUtil.color(255, 0, 0));
                else this.txt4_6.setColor(GuiUtil.color(0, 0, 0));
                this.GetLinkImageMini(this.resultLB5);
                GuiUtil.changeSprite(this.spColum5_6, "res/Minigame/ImageChung/DauNguoi/" + this.linkImage);
                GuiUtil.changeSprite(this.sp_chat5_6, "res/Minigame/ImageChung/DauNguoi/" + this.link_image_chat);
                this.txt5_6.setString("" + this.text_quanbai);
                if (this.color_quanbai === "red") this.txt5_6.setColor(GuiUtil.color(255, 0, 0));
                else this.txt5_6.setColor(GuiUtil.color(0, 0, 0));
            },

            checkRoomToEnable: function () {
                if (this.MINI_POKER_ROOM === 0 || this.MINI_POKER_ROOM === 3) {
                    this.btnCoin100.setEnabled(false);
                    this.btnCoin1000.setEnabled(true);
                    this.btnCoin10000.setEnabled(true);
                } else if (this.MINI_POKER_ROOM === 1 || this.MINI_POKER_ROOM === 4) {
                    this.btnCoin100.setEnabled(true);
                    this.btnCoin1000.setEnabled(false);
                    this.btnCoin10000.setEnabled(true);
                } else {
                    this.btnCoin100.setEnabled(true);
                    this.btnCoin1000.setEnabled(true);
                    this.btnCoin10000.setEnabled(false);
                }
                this.btnChangeMoneytype.setEnabled(true);
            },

            responseX2Date: function (datex2) {
                cc.log("date x2 : " + datex2);
                this.time_event.setString(datex2);
            },


            open: function () {
                if (_miniPoker) return;
                gI.miniPoker = _miniPoker = new codeMiniPoker();
                miniPokerX = _miniPoker.getPosition().x;
                miniPokerY = _miniPoker.getPosition().y;
                var curScene = SceneMgr.getInstance().getRunningScene();
                curScene.addGUI(_miniPoker, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_MINI_POKER);
                _miniPoker.hideMiniPoker = false;
                subScribeMiniPoker();
            },
            close: function () {
                if (!_miniPoker) return;
                if (mini_thanhtich != null) close_minipoker_bangthanhtich();
                if (mini_lichsu != null) close_minipoker_lichsu();
                if (gI.mainSocket.state === uc.WEBSOCKET_CONNECTED) {
                    var miniPokerSend = new CmdSendUnsubcriberMiniPoker();
                    miniPokerSend.putUnsubscriberMiniPoker(_miniPoker.MINI_POKER_ROOM);
                    Minigame.miniGameClient.send(miniPokerSend);
                    miniPokerSend.clean();
                }
                _miniPoker.removeFromParent();
                _miniPoker = null;
                cc.spriteFrameCache.removeSpriteFramesFromFile("res/Minigame/ResMiniPoker/PlistMiniPoker.plist");
                cc.spriteFrameCache.removeSpriteFramesFromFile("res/Minigame/ResMiniPoker/CanGatAnimation.plist");
                GuiUtil.removeTextureList(g_resources_mn_poker);
            }
        }
    );

    function actionCanGat() {
        cc.spriteFrameCache.addSpriteFrames("res/Minigame/ResMiniPoker/CanGatAnimation.plist");
        // var mostafaTexture = cc.textureCache.addImage("res/Minigame/ResMiniPoker/CanGatAnimation.png"),
        //     mostafaImages = cc.SpriteBatchNode.create(mostafaTexture);
        // _miniPoker.addChild(mostafaImages);
        var animFrames = [];
        var str = "";
        for (var i = 1; i < 12; i++) {
            str = "res/Minigame/ResMiniPoker/CanGat/Cangat" + i + ".png";
            var spriteFrame = GuiUtil.createFrame(str);
            animFrames.push(spriteFrame);
        }
        var animation = cc.Animation.create(animFrames, 0.05, 1);
        var animate = new cc.Animate(animation);
        return animate;
    };


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

