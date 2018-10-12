var MenuLayer = BaseLayer.extend({
    ctor: function () {
        this._super();
        this.lvMenuGameBai = null;
    },
    customizeGUI: function () {
        this.addLayout(this, "menuLayout", cc.p(640, 360), null, cc.size(1280, 720), true);

        this.addButton(this.menuLayout, "effect", 0, cc.p(146, 402), true, res_Lobby + "/menu/effect.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.menuLayout, "tournament", 0, cc.p(152, 378), true, res_Lobby + "/menu/tournament.png", null, ccui.Widget.LOCAL_TEXTURE);

        this.addButton(this.menuLayout, "vuongtu", 0, cc.p(441, 378), true, res_Lobby + "/menu/vuongtu.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.menuLayout, "bienxanh", 0, cc.p(690, 349), true, res_Lobby + "/menu/bienxanh.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.menuLayout, "como", 0, cc.p(938, 368), true, res_Lobby + "/menu/como.png", null, ccui.Widget.LOCAL_TEXTURE);

        this.addButton(this.menuLayout, "minislot", 0, cc.p(1170, 472), true, res_Lobby + "/menu/minislot.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.menuLayout, "taixiu", 0, cc.p(1166, 258), true, res_Lobby + "/menu/taixiu.png", null, ccui.Widget.LOCAL_TEXTURE);
    },
    onEnter: function () {
        this._super();
    },
    initMenuGame: function () {
        this.lvMenuGameBai = new ccui.ListView();
    }
});