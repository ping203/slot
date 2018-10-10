/**
 * Created by Admin on 8/24/2016.
 */

var CmdSendUnscribe = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.setCmdId(MN_UNSUBSCRIBE);

        },
        putUnsubScribe:function(gameId, roomId){
            this.packHeader();
            this.putShort(gameId);
            this.putShort(roomId);
            this.updateSize();
        }
    }
);

var CmdSendChangeRoom = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.setCmdId(MN_CHANGE_ROOM);

        },
        putChangeRoom:function(gameId, lastRoomId,newRoomId){
            this.packHeader();
            this.putShort(gameId);
            this.putShort(lastRoomId);
            this.putShort(newRoomId);
            this.updateSize();
        }
    }
);

var CmdReceivedKickUser = CmdReceivedCommon.extend({

        readData: function(){
            this.error = this.getError();
        }
    }
);
