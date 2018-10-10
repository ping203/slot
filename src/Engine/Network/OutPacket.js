var INDEX_SIZE_PACKET = 1;

var OutPacket = cc.Class.extend(
    {
        ctor: function () {
            this._controllerId = 1;
            this._cmdId = 0;
            this.reset();
        },
        setCmdId: function (cmdId) {
            this._cmdId = cmdId;
        },
        setControllerId: function (controllerId) {
            this._controllerId = controllerId;
        },
        initData: function (capacity) {
            this._data = [capacity];
            this._capacity = capacity;
        },
        reset: function () {
            this._pos = 0;
            this._length = 0;
            this._isPackedHeader = false;
        },
        packHeader: function () {
            if (this._isPackedHeader) {
                return;
            }
            this._isPackedHeader = true;

            var header = PacketHeaderAnalyze.genHeader(false, false);
            this.putByte(header);
            this.putUnsignedShort(this._length);
            this.putByte(this._controllerId);
            this.putShort(this._cmdId);
        },
        putByte: function (b) {
            this._data[this._pos++] = b;
            this._length = this._pos;
            return this;
        },
        putByteArray: function (bytes) {
            this.putShort(bytes.length);
            this.putBytes(bytes);
            return this;
        },

        putBytes: function (bytes) {
            for (var i = 0; i < bytes.length; i++) {
                this.putByte(bytes[i]);
            }
            return this;
        },

        putShort: function (v) {
            this.putByte((v >> 8) & 0xFF);
            this.putByte((v >> 0) & 0xFF);
            return this;
        },
        putUnsignedShort: function (v) {
            this.putByte(v >> 8);
            this.putByte(v >> 0);
            return this;
        },
        putInt: function (v) {
            this.putByte((v >> 24) & 0xff);
            this.putByte((v >> 16) & 0xff);
            this.putByte((v >> 8) & 0xff);
            this.putByte((v >> 0) & 0xff);
            return this;
        },

        putLong: function (v) {
            if (v < 0) {
                cc.log("hahaha");
            }
            var data = [];
            //if(v < 0){
            //    data[7] = 1 & 0xff;
            //}else{
            //    data[7] = 0 & 0xff;
            //}

            for (var k = 0; k < 8; k++) {
                data[k] = (v & (0xff));
                v = Math.floor(v / 256);
            }

            for (var i = 7; i >= 0; i--) {
                this.putByte(data[i]);
            }
        },


        putDouble: function (v) {
            this.putByte((v >> 24) & 0xff);
            this.putByte((v >> 16) & 0xff);
            this.putByte((v >> 8) & 0xff);
            this.putByte((v >> 0) & 0xff);
            this.putByte((v >> 24) & 0xff);
            this.putByte((v >> 16) & 0xff);
            this.putByte((v >> 8) & 0xff);
            this.putByte((v >> 0) & 0xff);
            return this;
        },

        putString: function (str) {
            //TODO: add this
            this.putByteArray(this._stringConvertToByteArray(str));
            return this;
        },
        updateUnsignedShortAtPos: function (v, pos) {
            this._data[pos] = v >> 8;
            this._data[pos + 1] = v >> 0;
        },
        updateSize: function () {
            this.updateUnsignedShortAtPos(this._length - 3, INDEX_SIZE_PACKET);
        },
        getData: function () {
            return this._data.slice(0, this._length);
        },
        _stringConvertToByteArray: function (strData) {
            if (strData == null)
                return null;
            var arrData = new Uint8Array(strData.length);
            for (var i = 0; i < strData.length; i++) {
                arrData[i] = strData.charCodeAt(i);
            }
            return arrData;
        },
        clean: function () {

        }
    }
);


var CmdSendCommon = OutPacket.extend({
        ctor: function (cmdID, data) {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            if (!isNaN(cmdID)) {
                this.setCmdId(cmdID);
                this.packHeader();
                if (data === "undefined") {
                    this.updateSize();
                }
            }

        }
    }
)