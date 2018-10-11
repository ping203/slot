var loginLayer = null;
var LobbyLayer = BaseLobby.extend({
    ctor: function () {
        this._super();
        this.loginLayer = null;
        return true;
    },
    customizeGUI: function () {
        this.initLogin();
    },
    onEnter: function () {
        this._super();
    },
    initLogin: function () {
        this.loginLayer = new LoginLayer();
        this.addChild(this.loginLayer);
    }
});

createLobby = function () {
    lobby = new LobbyLayer();
    baseLobby.getGuiLayer(BaseLobby.INDEX_BG_GUI).addChild(lobby);
};