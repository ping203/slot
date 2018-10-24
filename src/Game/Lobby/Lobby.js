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
        var arrLSGD = [
            {name: "Mã GD", width: 140, apiName: ["1234565", "18:00:59 - 01/01/2018", "Tài xỉu - Đặt cược", "-1000000", "0", "nt"], textAlignment: cc.TEXT_ALIGNMENT_CENTER},
            {name: "Thời gian", width: 240, apiName: 1, textAlignment: cc.TEXT_ALIGNMENT_CENTER},
            {name: "Dịch vụ", width: 255, apiName: 1, textAlignment: cc.TEXT_ALIGNMENT_CENTER},
            {name: "Phát sinh", width: 150, apiName: 1, textAlignment: cc.TEXT_ALIGNMENT_CENTER},
            {name: "Số dư", width: 150, apiName: 1, textAlignment: cc.TEXT_ALIGNMENT_CENTER},
            {name: "Mô tả", width: 150, apiName: 1, textAlignment: cc.TEXT_ALIGNMENT_CENTER}
        ];
        var lvLSGD = new LayoutListView(table, cc.size(1100, 360), arrLSGD);
        lvLSGD.setData(arrLSGD);
        table.addChild(lvLSGD);
        // GuiUtil.setBackGroundColor(lvLSGD, cc.color.ORANGE, 100);
        var page = new LayoutControlTable(table, 10);
        table.addChild(page);
        this.addChild(table);
    }
});

createLobby = function () {
    lobby = new LobbyLayer();
    baseLobby.getGuiLayer(BaseLobby.INDEX_BG_GUI).addChild(lobby);
};