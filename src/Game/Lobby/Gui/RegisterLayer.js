var RegisterLayer = BaseLayer.extend({
    ctor: function () {
        this._super();
    },
    customizeGUI: function () {
        this.addLayout(this, "registerLayout", cc.p(640, 360), null, cc.size(1280, 720), true);
        this.addImage(this.registerLayout, "bg-bar", cc.p(640, 360), res_Lobby + "/login/register/bgmain.png", cc.size(1163, 678));
    }
});