var SupportLayer = BaseLayer.extend({
    ctor: function () {
        this._super();
    },
    customizeGUI: function () {
        this.addLayout(this, "supportLayout", cc.p(640, 360), null, cc.size(1280, 720), false);
        this.addImage(this.supportLayout, "bg_support", cc.p(640, -41), res_Lobby + "/support/bar.png", cc.size(1920, 438));
        this.addButton(this.supportLayout, "btn_free_gold", 0, cc.p(148, 41.25), true, res_Lobby + "/support/gold.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.supportLayout, "btn_vqmm", 1, cc.p(299, 41.25), true, res_Lobby + "/support/vqmm.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.supportLayout, "btn_giftcode", 2, cc.p(450, 41.25), true, res_Lobby + "/support/giftcode.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.supportLayout, "btn_shop", 3, cc.p(648, 57), true, res_Lobby + "/support/shop.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.supportLayout, "btn_quydinh", 4, cc.p(823, 41.25), true, res_Lobby + "/support/quydinh.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.supportLayout, "btn_fanpage", 5, cc.p(982, 41.25), true, res_Lobby + "/support/fanpage.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.supportLayout, "btn_banbe", 6, cc.p(1143, 41.25), true, res_Lobby + "/support/banbe.png", null, ccui.Widget.LOCAL_TEXTURE);

        this.addText(this.supportLayout, "txtHotline", cc.p(511, -41), "Hotline: 0943 002 868", fontSwissCondensed.fontName, 18);
        this.addText(this.supportLayout, "txtEmail", cc.p(741, -41), "|   E-mail: hotroSlotClub@gmail.com", fontSwissCondensed.fontName, 18);

        this.addButton(this.supportLayout, "btn_ios", 7, cc.p(418, -93), true, res_Lobby + "/support/ios.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.supportLayout, "btn_android", 8, cc.p(640, -93), true, res_Lobby + "/support/android.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.supportLayout, "btn_wp", 9, cc.p(863, -93), true, res_Lobby + "/support/wp.png", null, ccui.Widget.LOCAL_TEXTURE);
    },
    onEnter: function () {
        this._super();
    }
});
