/**
 * Created by Admin on 3/20/2018.
 */
var GameInstance = cc.Class.extend({
    getGameByName: function (name) {
        return this[name];
    },
    addGame: function (game, name, callback, target, args) {
        this[name] = game;
        if (typeof callback == "function") {
            callback.apply(target, args);
        }
        return this[name];
    },
    removeGame: function (game, name, callback, target, args) {
        // this[name] = game;
        if (typeof callback == "function") {
            callback.apply(target, args);
        }
        return this[name];
    },
    setGameType: function () {

        gameInstance.gameType = {
            'taiXiu': uc.TaiXiu,
            'bauCua': uc.TaiXiu,
            'miniPoker': uc.TaiXiu,
            'vongQuay': uc.TaiXiu,
            'caoThap': uc.TaiXiu,
            'miniSlot': uc.TaiXiu

        };
    }
});
var gameInstance = new GameInstance();
var gI = gameInstance;
gI.resPath = "res";
// gI.resPath = "precompliedRes/cocosstudio/res";
