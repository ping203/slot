var MiniPoker = BaseLayer.extend({
    ctor: function () {
        this._super();
        this.pokerlayout = null;
        this.btncheckauto = null;
        this.tran_pokerlayout = null;
        this.dsLaBai = null;
    },
    customizeGUI: function () {
        this.initBg();
        this.initPanel();
        this.initFade();
    },
    onEnter: function () {
        this._super();
    },
    initBg: function () {
        this.addLayout(this, "pokerlayout", cc.p(640, 360), null, cc.size(1280, 720), false);
        this.addImage(this.pokerlayout, "bg", cc.p(589, 328), res_MinigamePoker + "/bg.png", cc.size(714, 404));
        this.addImage(this.pokerlayout, "title", cc.p(571, 558), res_MinigamePoker + "/title.png", cc.size(316, 105));
        this.addImage(this.pokerlayout, "bgcoin", cc.p(579, 464), res_MinigamePoker + "/pot.png", cc.size(278, 62));
        this.addImage(this.pokerlayout, "in_bg", cc.p(599, 310), res_MinigamePoker + "/in_bg.png", cc.size(427, 228));
        this.addLayout(this.pokerlayout, "tran_pokerlayout", cc.p(599, 312), res_MinigamePoker + "/in_bg.png", cc.size(427, 200), true);
        this.tran_pokerlayout.setClippingEnabled(true);
        this.addButton(this.pokerlayout, "btnmoney1", MiniPoker.MONEY100, cc.p(327, 406), true, res_MinigamePoker + "/active.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btnmoney2", MiniPoker.MONEY1K, cc.p(327, 325), true, res_MinigamePoker + "/money.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btnmoney3", MiniPoker.MONEY10K, cc.p(327, 241), true, res_MinigamePoker + "/money.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btncheckauto", MiniPoker.CHECK_AUTO, cc.p(858, 315), true, res_MinigamePoker + "/check.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btncangiat", MiniPoker.BTN_CANGAT, cc.p(951, 369), false, res_MinigamePoker + "/cangiat.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btnlichsu", MiniPoker.LICHSU, cc.p(505, 134), true, res_MinigamePoker + "/history.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btncup", MiniPoker.CUP, cc.p(582, 134), true, res_MinigamePoker + "/cup.png", null, ccui.Widget.LOCAL_TEXTURE);
        this.addButton(this.pokerlayout, "btnhelp", MiniPoker.HELP, cc.p(660, 134), true, res_MinigamePoker + "/help.png", null, ccui.Widget.LOCAL_TEXTURE);
        // GuiUtil.setBackGroundColor(this.tran_pokerlayout, cc.color.GREEN, 200);
    },
    initPanel: function(){
        var sizeP = cc.size(78, 105);

        this.dsLaBai = [
            {num: "A", type: "co"},
            {num: "2", type: "ro"},
            {num: "3", type: "tep"},
            {num: "4", type: "bich"},
            {num: "5", type: "co"},
            {num: "6", type: "ro"},
            {num: "7", type: "tep"},
            {num: "8", type: "bich"},
            {num: "9", type: "co"},
            {num: "10", type: "ro"},
            {num: "j", type: "tep"},
            {num: "q", type: "bich"},
            {num: "k", type: "co"}
        ];
        for (let i = 0; i < 5; i++) {
            let layout = new ccui.Layout();
            layout.setAnchorPoint(0.5, 0.5);
            layout.setTouchEnabled(true);
            layout.setCascadeOpacityEnabled(true);
            layout.setTag(i);
            switch (i) {
                case 0:
                    layout.setPosition(45, 0);
                    break;
                case 1:
                    layout.setPosition(129, 0);
                    break;
                case 2:
                    layout.setPosition(213, 0);
                    break;
                case 3:
                    layout.setPosition(296, 0);
                    break;
                case 4:
                    layout.setPosition(380, 0);
                    break;
            }
            this.tran_pokerlayout.addChild(layout);
            for (let j = 0; j < 20; j++) {
                new Poker(layout, "A", "co", sizeP, cc.p(0, j * 105));
            }
        }
    },
    initFade: function(){
        this.addImage(this.tran_pokerlayout, null, cc.p(213, 180), res_MinigamePoker + "/fade1.png", cc.size(421, 56));
        this.addImage(this.tran_pokerlayout, null, cc.p(213, 24), res_MinigamePoker + "/fade2.png", cc.size(421, 56));
        this.addImage(this.tran_pokerlayout, null, cc.p(213, 106), res_MinigamePoker + "/highlight.png", cc.size(418, 109));
    },
    //type: heart, diamond, club, spade = co, ro, tep, bich
    onButtonRelease: function (button, id) {
        var that = this;
        switch (id) {
            case MiniPoker.BTN_CANGAT:
                var timeSpin = 0;
                for (let i = 0; i < 5; i++) {
                    setTimeout(function () {
                        that.play(that.tran_pokerlayout.getChildByTag(i));
                    }, timeSpin);
                    timeSpin += 200;
                }
                break;
        }
    },
    play: function (parent) {
        let arr = parent.getChildren();
        console.log(arr.length);
        for (let i = 0; i < arr.length; i++) {
            arr[i].runAction(new cc.MoveBy(2, cc.p(0, -105 * (arr.length - 3))).easing(cc.easeBackIn()));
        }
    }

});

MiniPoker.MONEY100 = 0;
MiniPoker.MONEY1K = 1;
MiniPoker.MONEY10K = 2;
MiniPoker.CHECK_AUTO = 3;
MiniPoker.LICHSU = 4;
MiniPoker.CUP = 5;
MiniPoker.HELP = 6;
MiniPoker.CANGIAT = 7;