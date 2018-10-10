var LoginLayer = BaseLayer.extend({
    ctor: function (parent) {
        this._super();
        this.lobby = parent;
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
        this.addLayout(this, "login", cc.p(640, 670), null, cc.size(1280, 100), true);
        GuiUtil.setBackGroundColor(this.login, cc.color.RED, 200);
        this.addButton(this.login, "btn_facebook", 1, cc.p(500, 50), true, res_Lobby+"/login/facebook.png", res_Lobby+"/login/facebook.png", ccui.Widget.LOCAL_TEXTURE);
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    },
    onEnter: function () {
        this._super();
    }
});