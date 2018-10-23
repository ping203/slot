var loginLayer = null;
var supportLayer = null;
var menuLayer = null;
var LobbyLayer = BaseLobby.extend({
    ctor: function () {
        this._super();
        this.loginLayer = null;
        return true;
    },
    customizeGUI: function () {
        this.initLogin();
        this.initSupport();
        this.initMenu();
        this.initHistoryTransaction();
    },
    onEnter: function () {
        this._super();
    },
    initLogin: function () {
        this.loginLayer = new LoginLayer();
        this.addChild(this.loginLayer);
    },
    initSupport: function () {
        this.supportLayer = new SupportLayer();
        this.addChild(this.supportLayer);
    },
    initMenu: function () {
        this.menuLayer = new MenuLayer();
        this.addChild(this.menuLayer);
    },
    initHistoryTransaction: function () {
        var table = new BaseLayerTable();
        table.setTitleText("Lịch sử giao dịch");
        var layouttable = new LayoutTabView(table, cc.size(600, 65), ["chơi vàng", "nạp vàng", "tiêu vàng"], 0, 2);
        table.addChild(layouttable);
        var lvLSGD = new LayoutListView(table, cc.size(1100, 346), [{name: "Mã GD"}, {name: "Thời gian"}, {name: "Dịch vụ"}, {name: "Phát sinh"}, {name: "Số dư"}, {name: "Mô tả"}]);
        table.addChild(lvLSGD);
        // GuiUtil.setBackGroundColor(lvLSGD, cc.color.ORANGE, 200);
        this.addChild(table);
    }
});

createLobby = function () {
    lobby = new LobbyLayer();
    baseLobby.getGuiLayer(BaseLobby.INDEX_BG_GUI).addChild(lobby);
};