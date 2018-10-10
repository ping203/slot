(function () {
    var width = 755, height = 455;
    var resourcePath = "res/Popup/";

    var popUp = uc.PopUp = BaseLayer.extend({

        ctor: function () {
            this._super();
        },

        openPanel_Alert_Lobby: function (message, time) {
            this.addChild(new smallAlert(message, time));
        },

        open_panel_message_confirm: function (title, message, txt_btn_OK, txt_btn_Cancel, callback, callbackerror) {

            this.addChild(new confirmPopup(title, message, txt_btn_OK, txt_btn_Cancel, callback, callbackerror));
        },

        open_panel_message_OK: function (title, message, txt_btn_OK, callback) {
            this.addChild(new alertPopup(title, message, txt_btn_OK, callback));
        },

        showLoading: function () {
            return sceneMgr.addLoading("Vui lòng chờ !!!");

            //popup.pn_loading.runAction()
            popup.pn_loading.setVisible(true);
            popup.sp_point1.runAction(cc.callFunc(popup.scalePoint1, this));
            popup.sp_point2.runAction(cc.sequence(cc.delayTime(0.15), cc.callFunc(popup.scalePoint2, this)));
            popup.sp_point3.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(popup.scalePoint3, this)));
            popup.sp_point4.runAction(cc.sequence(cc.delayTime(0.45), cc.callFunc(popup.scalePoint4, this)));
            popup.sp_point5.runAction(cc.sequence(cc.delayTime(0.6), cc.callFunc(popup.scalePoint5, this)));
        },

        closeLoading: function () {
            sceneMgr.clearLoading();
        }

    });

    var smallAlert = BaseLayer.extend({

        ctor: function (message, time) {
            this._super();
            this._time = time || 2;
            this._message = message;
            this.resourcePath = resourcePath;
        },

        customizeGUI: function () {
            this.addShadowPopup();
            this.addSmallAlertPopup();
            this.runAction(cc.sequence(cc.delayTime(this._time), cc.callFunc(this.close, this)));
        },

        addShadowPopup: function () {
            this.addLayout(this, "shadowPopup", cc.p(640, 360), null, cc.size(1920, 1080), true);
            this.shadowPopup.addTouchEventListener(this.onTouchEventHandler, this);
        },

        addSmallAlertPopup: function () {
            this.addLayout(this, "smallAlertP", cc.p(640, 360), null, cc.size(1280, 720), false);
            this.addSpriteStructure(this.smallAlertP, "_bg", cc.p(640, 360), "smallPopupBg.png");
            this._bg.setScaleY(1.2);
            this.addSpriteStructure(this.smallAlertP, "_title", cc.p(640, 402), "title.png").setScale(0.8);
            this.addTextStructure(this.smallAlertP, "_titleLabel", cc.p(640, 404), "THÔNG BÁO", UTMBebas.fontName, 35, cc.color(162, 105, 64));
            this.addTextStructure(this.smallAlertP, "smallAlertText",
                cc.p(640, 346), this._message, RobotoRegular.fontName, 28, null, {__size: cc.size(912, 80)});
        },

        onButtonRelease: function () {
            if (this.closing) return;
            this.closing = true;
            this.close();
        },
        close: function () {
            this.runAction(cc.sequence(cc.scaleTo(0, 1), cc.callFunc(function () {
                this.removeFromParent();
            }.bind(this))));
        }

    });

    var confirmPopup = BaseLayer.extend({

        ctor: function (title, content, txt_btn_OK, txt_btn_Cancel, callback, callbackerror) {
            this._title = title;
            this._content = content;
            this._txt_btn_OK = txt_btn_OK;
            this._txt_btn_Cancel = txt_btn_Cancel;
            this.confirmCallback = callback;
            this.rejectCallback = callbackerror;
            this.resourcePath = resourcePath;
            this._super();
        },

        customizeGUI: function () {

            this.addShadowPopup();
            this.addBigPopup();
        },

        addShadowPopup: function () {
            this.addLayout(this, "shadowPopup", cc.p(640, 360), null, cc.size(1920, 1080), true);
            this.shadowPopup.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.shadowPopup.setBackGroundColor(cc.color.BLACK);
            this.shadowPopup.setBackGroundColorOpacity(180);
            this.shadowPopup.setTag(-9999);
            this.shadowPopup.addTouchEventListener(this.onTouchEventHandler, this);
        },

        addBigPopup: function () {
            this.addLayoutStructure(this, "alertP", cc.p(640, 360), "alertBg.png", cc.size(width, height), true);
            this.addSpriteStructure(this.alertP, "title", cc.p(width / 2, height - 20), "title.png").setScale(0.8);
            this.addTextStructure(this.alertP, "titleLabel", cc.p(width / 2, height - 20), this._title, UTMBebas.fontName, 35, cc.color(162, 105, 64));
            if (typeof this._content === "string") {
                this.addTextStructure(this.alertP, "alertText",
                    cc.p(width / 2, height / 2), this._content, RobotoRegular.fontName, 23, null, {__size: cc.size(700, 200)});
            } else {
                this.addLayoutStructure(this.alertP, "content", cc.p(width / 2, height / 2), null, cc.size(0, 0), false);
                this.content.addChild(this._content);
            }


            this.addButtonStructure(this.alertP, "btnCancel", uc.PopUp.BTN_CANCEL, cc.p(width / 2 - 100, 40), true, this.resourcePath + "button.png", {
                titleText: this._txt_btn_Cancel,
                titleColor: cc.color(162, 105, 64),
                titleFontName: UTMBebas.fontName,
                titleFontSize: 26
            });
            this.addButtonStructure(this.alertP, "btnOk", uc.PopUp.BTN_OK, cc.p(width / 2 + 100, 40), true, this.resourcePath + "button.png", {
                titleText: this._txt_btn_OK,
                titleColor: cc.color(162, 105, 64),
                titleFontName: UTMBebas.fontName,
                titleFontSize: 26
            });
        },

        onButtonRelease: function (btn, id) {
            if (this.closing) return;
            this.closing = true;
            this.close();
            switch (id) {
                case this.shadowPopup.getTag():
                    if (typeof this.rejectCallback === "function") this.rejectCallback();
                    break;
                case uc.PopUp.BTN_OK:
                    if (typeof this.confirmCallback === "function") this.confirmCallback();
                    break;
                case uc.PopUp.BTN_CANCEL:
                    if (typeof this.rejectCallback === "function") this.rejectCallback();
                    break;
            }
        },
        close: function () {
            this.runAction(cc.sequence(cc.scaleTo(0, 1), cc.callFunc(function () {
                this.removeFromParent();
            }.bind(this))));
        }

    });


    var alertPopup = confirmPopup.extend({
        ctor: function (title, message, txt_btn_OK, callback) {
            this._super(title, message, txt_btn_OK, "", callback, null);
        },

        customizeGUI: function () {
            this._super();
            this.btnCancel.setVisible(false);
            this.btnOk.setPositionX(width / 2);
        },

    });


    uc.PopUp.BTN_OK = 1;
    uc.PopUp.BTN_CANCEL = 2;


})();



