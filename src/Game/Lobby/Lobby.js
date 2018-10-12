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
    }

});

createLobby = function () {
    lobby = new LobbyLayer();
    baseLobby.getGuiLayer(BaseLobby.INDEX_BG_GUI).addChild(lobby);
};