(function () {
    var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;
    var counter = 0;


    uc.WebsocketClient = cc.Class.extend({
        ctor: function () {
            this.listener = null;
            this.ws = null;
            // if (!cc.sys.isNative) {
            //     cc.director.getScheduler().scheduleUpdate(this, 0, false);
            // }
            this.data = [];
            this.event = -1;
            this.state = uc.WEBSOCKET_NOT_CONNECTED;
        },

        connect: function (host, port, isSsl, listenner) {
            // cc.log("connect: " + host + " port: " + port);
            if (!useTCP) {
                if (port % 2 == 1) {
                    // port = port + 1;
                    port = port;
                }
            }
            if (isSsl) {
                port = port + 1;
            }
            // cc.log("create websocket client begin");
            this._host = host;
            this._port = port;
            this.ws = new WebSocket("ws" + (isSsl ? "s" : "") + "://" + host + ":" + port + "/websocket");
            this.state = uc.WEBSOCKET_CONNECTING;
            this.listener = listenner;
            this.ws.binaryType = "arraybuffer";
            this.ws.onopen = this.onSocketConnect.bind(this);
            this.ws.onclose = this.onSocketClose.bind(this);
            this.ws.onmessage = this.onSocketData.bind(this);
            this.ws.onerror = this.onSocketError.bind(this);
            // cc.log("create websocket client emd");
        },

        closeSocket: function () {
            if (!cc.sys.isNative || !useTCP) {
                this.ws.close();
            } else {
                this.ws.disconnect();
            }

        },

        onSocketConnect: function () {
            this.state = uc.WEBSOCKET_CONNECTED;
            if (this.listener && this.listener.onFinishConnect) {
                this.listener.target = this;
                this.listener.onFinishConnect.call(this.listener, true);
            }
        },

        onSocketClose: function () {
            this.state = uc.WEBSOCKET_NOT_CONNECTED;
            if (this.listener && this.listener.onDisconnected) {
                this.listener.target = this;
                this.listener.onDisconnected.call(this.listener);
            }
        },
        onSocketData: function (a) {
            var data = new Uint8Array(a.data);
            if (this.listener && this.listener.onReceived) {

                this.listener.onReceived.call(this.listener, 0, data);
            }
        },
        onSocketError: function () {
            this.state = uc.WEBSOCKET_NOT_CONNECTED;
            if (this.listener && this.listener.onFinishConnect) {
                this.listener.target = this;
                this.listener.onFinishConnect.call(this.listener, false);
            }
        },
        setPreventSpam: function (preventSpam) {
            if (preventSpam == undefined) preventSpam = true;
            this._preventSpam = preventSpam;
        },
        send: function (pk, callBackSendClient) {
            if (this._preventSpam) {
                if (this.state != uc.WEBSOCKET_CONNECTED) {
                    return false;
                } else {
                    var d = new Date().getTime();
                    if (!this["time" + pk._cmdId] || (d - this["time" + pk._cmdId] > 1000)) {
                        this["time" + pk._cmdId] = d;
                        if (callBackSendClient)
                            callBackSendClient();
                        this._send(pk);
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                this._send(pk);
                return true;
            }
            return false;
        },
        _send: function (packet) {

            if (!cc.sys.isNative || !useTCP) {
                var data = new Int8Array(packet._length);

                for (var i = 0; i < packet._length; i++) {
                    data[i] = packet._data[i];
                }

                this.ws.send(data.buffer);
            }
            else {
                this.ws.send(packet);
            }
        }

    });

    uc.WEBSOCKET_NOT_CONNECTED = 0;
    uc.WEBSOCKET_CONNECTING = 1;
    uc.WEBSOCKET_CONNECTED = 2;


})()

