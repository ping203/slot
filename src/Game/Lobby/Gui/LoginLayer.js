var LoginLayer = BaseLayer.extend({
    ctor: function () {
        this._super();
        this.loginLayout = null;
        this.loggedLayout = null;
        this.btn_facebook = null;
        this.btn_google = null;
        this.tf_username = null;
        this.tf_password = null;
        this.btn_signin = null;
        this.btn_signup = null;
        this.btn_losspass = null;
        this.btn_avatar = null;
        this.btn_gold = null;
        this.btn_slots = null;
        this.btn_all = null;
        this.btn_minigame = null;
        this.btn_hu = null;
        this.btn_lichsu = null;
        this.btn_caidat = null;
        this.btn_chat = null;
        this.message = null;
        return true;
    },
    customizeGUI: function () {
        // not login
        this.addLayout(this, "loginLayout", cc.p(640, 663), null, cc.size(1280, 115), true);

        this.addImage(this.loginLayout, "bg-bar", cc.p(640, 57), res_Lobby + "/login/bar.png", cc.size(1916, 115));
        this.addText(this.loginLayout, "login_with", cc.p(62, 66), "Đăng nhập\nvới", fontSwissCondensed.fontName, 22);
        this.login_with.setColor(cc.color("#ffffff"));
        this.login_with.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.login_with.setOpacity(200);
        this.addButton(this.loginLayout, "btn_facebook", LoginLayer.BTN_FACEBOOK_TAB, cc.p(258, 66), true, res_Lobby + "/login/facebook.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.loginLayout, "btn_google", LoginLayer.BTN_GOOGLE_TAB, cc.p(177, 66), true, res_Lobby + "/login/google.png", null, ccui.Widget.LOCAL_TEXTURE);

        this.addEditBox(this.loginLayout, "tf_username", cc.p(442, 53), null, "Tên đăng nhập", fontSwissCondensed.fontName, 22, cc.size(214, 59), res_Lobby + "/login/input.png", cc.TEXT_ALIGNMENT_CENTER, 30);
        this.addEditBox(this.loginLayout, "tf_password", cc.p(665, 53), null, "Mật khẩu", fontSwissCondensed.fontName, 22, cc.size(214, 59), res_Lobby + "/login/input.png", cc.TEXT_ALIGNMENT_CENTER, 30);
        this.tf_username.children[1].x = 40;
        this.tf_username.children[1].y = 45;

        this.tf_password.children[1].x = 70;
        this.tf_password.children[1].y = 45;
        this.tf_password.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);

        this.addButton(this.loginLayout, "btn_signin", LoginLayer.BTN_DANG_NHAP_TAB, cc.p(859, 53), true, res_Lobby + "/login/btnsignin.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.loginLayout, "btn_signup", LoginLayer.BTN_DANG_KY_TAB, cc.p(1066, 66), true, res_Lobby + "/login/btnsignup.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.loginLayout, "btn_losspass", LoginLayer.BTN_QUEN_MK, cc.p(1200, 66), true, res_Lobby + "/login/btnlosspass.png", null, ccui.Widget.LOCAL_TEXTURE);
        //login
        this.addLayout(this, "loggedLayout", cc.p(640, 663), null, cc.size(1280, 115), false);
        this.addImage(this.loggedLayout, "logged_bar", cc.p(640, 57), res_Lobby + "/logged/bar.png", cc.size(1916, 115));
        this.addButton(this.loggedLayout, "btn_avatar", LoginLayer.BTN_AVATAR, cc.p(60, 62), false, res_Lobby + "/logged/avatar.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.loggedLayout, "btn_gold", LoginLayer.BTN_GOLD, cc.p(252, 55), false, res_Lobby + "/logged/gold.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.loggedLayout, "btn_slots", LoginLayer.BTN_SLOTS, cc.p(481, 53), true, res_Lobby + "/logged/slots.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.loggedLayout, "btn_all", LoginLayer.BTN_ALL, cc.p(640, 53), true, res_Lobby + "/logged/all.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.loggedLayout, "btn_minigame", LoginLayer.BTN_MINIGAME, cc.p(796, 53), true, res_Lobby + "/logged/mini.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.loggedLayout, "btn_hu", LoginLayer.BTN_HU, cc.p(960, 60), true, res_Lobby + "/logged/hu.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.loggedLayout, "btn_lichsu", LoginLayer.BTN_LICHSU, cc.p(1129, 65), true, res_Lobby + "/logged/lichsu.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.loggedLayout, "btn_caidat", LoginLayer.BTN_CAIDAT, cc.p(1224, 65), true, res_Lobby + "/logged/caidat.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.loggedLayout, "btn_chat", LoginLayer.BTN_CHAT, cc.p(153, -459), true, res_Lobby + "/logged/chat.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addImage(this.loggedLayout, "message", cc.p(181, -435), res_Lobby + "/logged/message.png", cc.size(29, 29));
        this.loggedLayout.visible = false;
    },
    onEnter: function () {
        this._super();
    },
    onButtonRelease: function (button, id) {
        switch (id) {
            case LoginLayer.BTN_FACEBOOK_TAB:
                break;
            case LoginLayer.BTN_GOOGLE_TAB:
                break;
            case LoginLayer.BTN_DANG_NHAP_TAB:
                this.login();
                break;
            case LoginLayer.BTN_DANG_KY_TAB:
                this.register();
                break;
            case LoginLayer.BTN_QUEN_MK:
                break;
            //logged
            case LoginLayer.BTN_AVATAR:
                this.changeAvatar();
                break;
            case LoginLayer.BTN_GOLD:
                break;
            case LoginLayer.BTN_SLOTS:
                break;
            case LoginLayer.BTN_ALL:
                break;
            case LoginLayer.BTN_MINIGAME:
                break;
            case LoginLayer.BTN_HU:
                break;
            case LoginLayer.BTN_LICHSU:
                this.historyTransaction();
                break;
            case LoginLayer.BTN_CAIDAT:
                break;
            case LoginLayer.BTN_CHAT:
                break;
        }
    },
    login: function () {
        this.loginLayout.visible = false;
        this.loggedLayout.visible = true;
    },
    register: function () {

    },
    historyTransaction: function () {
        var table = new BaseLayerTable();
        table.setTitleText("Lịch sử giao dịch");
        var layouttab = new LayoutTabView(table, cc.size(600, 65), ["chơi vàng", "nạp vàng", "tiêu vàng"], 0, 2);
        layouttab.setPosition(cc.p(350, 520));
        table.addChild(layouttab);
        var arrLSGD = [
            {
                name: "Mã GD",
                width: 140,
                apiName: ["1234565", "18:00:59 - 01/01/2018", "Tài xỉu - Đặt cược", "-1000000", "0", "nt"],
                textAlignment: cc.TEXT_ALIGNMENT_CENTER
            },
            {name: "Thời gian", width: 240, apiName: 1, textAlignment: cc.TEXT_ALIGNMENT_CENTER},
            {name: "Dịch vụ", width: 255, apiName: 1, textAlignment: cc.TEXT_ALIGNMENT_CENTER},
            {name: "Phát sinh", width: 150, apiName: 1, textAlignment: cc.TEXT_ALIGNMENT_CENTER},
            {name: "Số dư", width: 150, apiName: 1, textAlignment: cc.TEXT_ALIGNMENT_CENTER},
            {name: "Mô tả", width: 150, apiName: 1, textAlignment: cc.TEXT_ALIGNMENT_CENTER}
        ];
        var lvLSGD = new LayoutListView(table, cc.size(1100, 360), arrLSGD);
        lvLSGD.setData(arrLSGD);
        table.addChild(lvLSGD);
        var page = new LayoutControlTable(table, 5);
        page.setPosition(cc.p(640, 100));
        table.addChild(page);
        this.addChild(table);
    },
    changeAvatar: function () {
        this.loginLayout.visible = true;
        this.loggedLayout.visible = false;
    }
});

LoginLayer.BTN_FACEBOOK_TAB = 1;
LoginLayer.BTN_GOOGLE_TAB = 2;
LoginLayer.BTN_DANG_NHAP_TAB = 3;
LoginLayer.BTN_DANG_KY_TAB = 4;
LoginLayer.BTN_QUEN_MK = 5;
LoginLayer.BTN_AVATAR = 6;
LoginLayer.BTN_GOLD = 7;
LoginLayer.BTN_SLOTS = 8;
LoginLayer.BTN_ALL = 9;
LoginLayer.BTN_MINIGAME = 10;
LoginLayer.BTN_LICHSU = 11;
LoginLayer.BTN_CAIDAT = 12;
LoginLayer.BTN_HU = 13;
LoginLayer.BTN_CHAT = 14;