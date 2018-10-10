uc.BaseListener = cc.Class.extend({
        ctor: function (websocket, cmdDefine) {
            this.ws = websocket;
            this.isLogged = false;
            this.cmdDefine = cmdDefine;
            this._loggedCallbacks = [];
            this.gameWsState = CLIENT_STATE.NOT_CONNECTED;
        },
        setLoggedCallback: function (callback) {
            this._loggedCallbacks = [callback];
        },
        addLoggedCallback: function (callback, target, _arguments) {
            this._loggedCallbacks.push(callback)
        },
        onFinishConnect: function (isSuccess) {
            if (isSuccess) {
                this.gameWsState = CLIENT_STATE.CONNECTED;
                this.login();
            } else {
                this.gameWsState = CLIENT_STATE.NOT_CONNECTED;
                this.connectError();
            }
        },
        login: function () {
            var lo = new CmdSendLogin();
            var userData = userInfo.userData;
            var nn = userData.nickname;
            var accessToken = userInfo.accessToken;
            lo.putData(nn, accessToken);
            this.ws.send(lo);
        },
        connectError: function () {

        },
        onDisconnected: function () {
            this.t = false;
        },
        handleLogin: function () {
            this._loggedCallbacks.forEach(function (item, index) {
                if (typeof item === "function") item();
            })
        },
        onReceived: function (cmd, pkg) {
            var data = new InPacket();
            data.init(pkg);
            var cmdId = data.getCmdId();
            switch (cmdId) {
                case this.cmdDefine.LOGIN:
                    this.isLogged = true;
                    this.handleLogin(pkg, cmdId)
                    break;
                default :
                    this.handleData(pkg, cmdId);
                    break;
            }
        }
    }
);


var CmdSendLogin = CmdSendCommon.extend({
        ctor: function () {
            this._super(1, true);
        },
        putData: function (username, accessToken) {
            //pack
            this.packHeader();
            this.putString(username);
            this.putString(accessToken);
            //update
            this.updateSize();
        }
    }
);
