var LobbyLayer = BaseLobby.extend({
    ctor: function () {
        this._super();
        this.loginLayer = null;
        this.loginLayer = null;
        this.supportLayer = null;
        this.menuLayer = null;
        this.miniPoker = null;
        return true;
    },
    customizeGUI: function () {
        this.initSupport();
        this.initMenu();
        this.initLogin();
        this.initMiniPoker();
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
    initMiniPoker: function () {
        this.miniPoker = new MiniPoker();
        this.addChild(this.miniPoker);
    }

});

createLobby = function () {
    lobby = new LobbyLayer();
    baseLobby.getGuiLayer(BaseLobby.INDEX_BG_GUI).addChild(lobby);
};