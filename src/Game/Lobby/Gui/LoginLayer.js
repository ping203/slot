var LoginLayer = BaseLayer.extend({
    ctor: function () {
        this._super();
        this.login = null;

        this.btn_facebook = null;
        this.btn_google = null;
        this.btn_signin = null;
        this.btn_signup = null;
        this.btn_losspass = null;
        this.tf_username = null;
        this.tf_password = null;
        return true;
    },
    customizeGUI: function () {
        this.addLayout(this, "login", cc.p(640, 663), null, cc.size(1280, 115), true);

        this.addImage(this.login, "bg-bar", cc.p(640, 57), res_Lobby+"/login/bar.png", cc.size(1916, 115));
        this.addText(this.login, "login_with", cc.p(62, 66), "Đăng nhập\nvới", fontSwissCondensed.fontName, 22);
        this.login_with.setColor(cc.color("#ffffff"));
        this.login_with.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.login_with.setOpacity(200);
        this.addButton(this.login, "btn_facebook", LoginLayer.BTN_FACEBOOK_TAB, cc.p(258, 66), true, res_Lobby+"/login/facebook.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.login, "btn_google", LoginLayer.BTN_GOOGLE_TAB, cc.p(177, 66), true, res_Lobby+"/login/google.png", null, ccui.Widget.LOCAL_TEXTURE);

        this.addEditBox(this.login, "tf_username", cc.p(442, 53), null, "Tên đăng nhập", fontSwissCondensed.fontName, 22, cc.size(214, 59), res_Lobby+"/login/input.png", cc.TEXT_ALIGNMENT_CENTER, 30);
        this.addEditBox(this.login, "tf_password", cc.p(665, 53), null, "Mật khẩu", fontSwissCondensed.fontName, 22, cc.size(214, 59), res_Lobby+"/login/input.png", cc.TEXT_ALIGNMENT_CENTER, 30);
        this.tf_username.children[1].x = 40;
        this.tf_username.children[1].y = 45;

        this.tf_password.children[1].x = 70;
        this.tf_password.children[1].y = 45;
        this.tf_password.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);

        this.addButton(this.login, "btn_signin", LoginLayer.BTN_DANG_NHAP_TAB, cc.p(859, 53), true, res_Lobby+"/login/btnsignin.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.login, "btn_signup", LoginLayer.BTN_DANG_KY_TAB, cc.p(1066, 66), true, res_Lobby+"/login/btnsignup.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.login, "btn_losspass", LoginLayer.BTN_QUEN_MK, cc.p(1200, 66), true, res_Lobby+"/login/btnlosspass.png", null, ccui.Widget.LOCAL_TEXTURE);
    },
    onEnter: function () {
        this._super();
    }
});
LoginLayer.BTN_FACEBOOK_TAB = 1;
LoginLayer.BTN_GOOGLE_TAB = 2;
LoginLayer.BTN_DANG_NHAP_TAB = 3;
LoginLayer.BTN_DANG_KY_TAB = 4;
LoginLayer.BTN_QUEN_MK = 5;