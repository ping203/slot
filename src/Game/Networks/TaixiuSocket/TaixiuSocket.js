/**
 * Created by Admin on 1/24/2018.
 */
uc.TaixiuSocket = uc.BaseSocket.extend({
    ctor: function () {
        this._super();
        this.setPreventSpam(true);
    },
    connectSocket: function (callback) {
        if (this.state == uc.WEBSOCKET_CONNECTED && this.listener.isLogged) {
            if (typeof callback === "function") callback();
            return;
        } else if (this.state == uc.WEBSOCKET_NOT_CONNECTED) {

            var listener = new uc.TaixiuListener(this, taixiuWebSocketCmd);
            callback && listener.setLoggedCallback(callback);
            var socketConfig = GameManager.appConfig.taixiu;
            var ip = socketConfig.ip;
            var port = socketConfig.port;
            var isHttps = false;
            this.connect(ip, port, isHttps, listener);
        } else {
            this.listener.addLoggedCallback(callback);
        }
    },

});

