var RegisterLayer = BaseLayer.extend({
    ctor: function () {
        this._super();
        this.registerLayout = null;
        this.tf_name = null;
        this.tf_pass = null;
        this.tf_repass1 = null;
        this.tf_repass2 = null;
    },
    customizeGUI: function () {
        this.addLayout(this, "registerLayout", cc.p(640, 360), null, cc.size(1280, 720), true);

        this.addImage(this.registerLayout, "bg-bar", cc.p(640, 360), res_Lobby + "/login/register/bgmain.png", cc.size(1163, 678));
        this.addImage(this.registerLayout, "light", cc.p(795, 575), res_Lobby + "/login/register/light.png", cc.size(490, 84));
        this.addText(this.registerLayout, "register-text", cc.p(800, 610), "Đăng ký tài khoản", UTMBebas.fontName, 60);
        this.addButton(this.registerLayout, "btn_close", RegisterLayer.BTN_CLOSE, cc.p(1150, 614), true, res_Lobby + "/login/register/close.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addEditBox(this.registerLayout, "tf_name", cc.p(800, 524), null, "Tên đăng nhập", fontSwissCondensed.fontName, 24, cc.size(387, 62), res_Lobby + "/login/register/input.png", cc.TEXT_ALIGNMENT_CENTER, 30);
        this.addEditBox(this.registerLayout, "tf_pass", cc.p(800, 444), null, "Mật khẩu", fontSwissCondensed.fontName, 24, cc.size(387, 62), res_Lobby + "/login/register/input.png", cc.TEXT_ALIGNMENT_CENTER, 30);
        this.tf_pass.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.addEditBox(this.registerLayout, "tf_repass1", cc.p(800, 364), null, "Nhập lại mật khẩu", fontSwissCondensed.fontName, 24, cc.size(387, 62), res_Lobby + "/login/register/input.png", cc.TEXT_ALIGNMENT_CENTER, 30);
        this.tf_repass1.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.addEditBox(this.registerLayout, "tf_repass2", cc.p(800, 284), null, "Nhập lại mật khẩu", fontSwissCondensed.fontName, 24, cc.size(387, 62), res_Lobby + "/login/register/input.png", cc.TEXT_ALIGNMENT_CENTER, 30);
        this.tf_repass2.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.addButton(this.registerLayout, "btn_accept", RegisterLayer.BTN_ACCEPT, cc.p(732, 152), true, res_Lobby + "/login/register/accept.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.registerLayout, "btn_cancel", RegisterLayer.BTN_CANCEL, cc.p(884, 152), true, res_Lobby + "/login/register/cancel.png", null, ccui.Widget.LOCAL_TEXTURE);
    },
    onButtonRelease: function (button, id) {
        switch (id) {
            case RegisterLayer.BTN_CLOSE:
                this.closeReg();
                break;
            case RegisterLayer.BTN_ACCEPT:
                this.accept();
                break;
            case RegisterLayer.BTN_CANCEL:
                this.cancel();
                break;

        }
    },
    closeReg: function () {
        this.removeFromParent();
    },
    accept: function () {

    },
    cancel: function () {

    }
});
RegisterLayer.BTN_CLOSE = 0;
RegisterLayer.BTN_ACCEPT = 1;
RegisterLayer.BTN_CANCEL = 2;