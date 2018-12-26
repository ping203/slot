var MiniPoker = BaseLayer.extend({
    ctor: function () {
        this._super();
        this.pokerlayout = null;
        this.btncheckauto = null;
        this.tran_pokerlayout = null;
        this.btncangiat = null;
        this.arrLaBaiCot1 = [];
        this.arrLaBaiCot2 = [];
        this.arrLaBaiCot3 = [];
        this.arrLaBaiCot4 = [];
        this.arrLaBaiCot5 = [];
        this.layoutCot1 = null;
        this.layoutCot2 = null;
        this.layoutCot3 = null;
        this.layoutCot4 = null;
        this.layoutCot5 = null;
        this.randomLaBaiCot1 = [];
        this.randomLaBaiCot2 = [];
        this.randomLaBaiCot3 = [];
        this.randomLaBaiCot4 = [];
        this.randomLaBaiCot5 = [];
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
        this.addLayout(this, "pokerlayout", cc.p(640, 360), null, cc.size(1280, 720), true);
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
        this.addLayout(this.tran_pokerlayout, "layoutCot1", cc.p(45, 0), null, cc.size(0, 0), true);
        this.addLayout(this.tran_pokerlayout, "layoutCot2", cc.p(129, 0), null, cc.size(0, 0), true);
        this.addLayout(this.tran_pokerlayout, "layoutCot3", cc.p(213, 0), null, cc.size(0, 0), true);
        this.addLayout(this.tran_pokerlayout, "layoutCot4", cc.p(296, 0), null, cc.size(0, 0), true);
        this.addLayout(this.tran_pokerlayout, "layoutCot5", cc.p(380, 0), null, cc.size(0, 0), true);
    },
    initPanel: function () {
        var sizeP = cc.size(78, 105);
        this.dsLaBai = this.randomPoker();
        // for (let j = 0; j < this.dsLaBai.length; j++) {
        //     this.arrLaBaiCot1.push(new Poker(this.layoutCot1, this.dsLaBai[j].num, this.dsLaBai[j].type, sizeP, cc.p(0, j * 105)));
        //     this.arrLaBaiCot2.push(new Poker(this.layoutCot2, this.dsLaBai[j].num, this.dsLaBai[j].type, sizeP, cc.p(0, j * 105)));
        //     this.arrLaBaiCot3.push(new Poker(this.layoutCot3, this.dsLaBai[j].num, this.dsLaBai[j].type, sizeP, cc.p(0, j * 105)));
        //     this.arrLaBaiCot4.push(new Poker(this.layoutCot4, this.dsLaBai[j].num, this.dsLaBai[j].type, sizeP, cc.p(0, j * 105)));
        //     this.arrLaBaiCot5.push(new Poker(this.layoutCot5, this.dsLaBai[j].num, this.dsLaBai[j].type, sizeP, cc.p(0, j * 105)));
        // }

    },
    initFade: function () {
        this.addImage(this.tran_pokerlayout, null, cc.p(213, 180), res_MinigamePoker + "/fade1.png", cc.size(421, 56));
        this.addImage(this.tran_pokerlayout, null, cc.p(213, 24), res_MinigamePoker + "/fade2.png", cc.size(421, 56));
        this.addImage(this.tran_pokerlayout, null, cc.p(213, 106), res_MinigamePoker + "/highlight.png", cc.size(418, 109));
    },
    //type: heart, diamond, club, spade = co, ro, tep, bich
    onButtonRelease: function (button, id) {
        let that = this;
        switch (id) {
            case MiniPoker.BTN_CANGAT:
                var timeSpin = 0;
                this.btncangiat.enabled = false;
                setTimeout(function () {
                    that.btncangiat.enabled = true;
                }, 3500);
                for (let i = 0; i < 5; i++) {
                    setTimeout(function () {
                        if (i === 0) {
                            that.play(that.layoutCot1);
                            that.layoutCot1.setPosition(45, 0);
                        }
                        if (i === 1) {
                            that.play(that.layoutCot2);
                            that.layoutCot2.setPosition(129, 0);
                        }
                        if (i === 2) {
                            that.play(that.layoutCot3);
                            that.layoutCot3.setPosition(213, 0);
                        }
                        if (i === 3) {
                            that.play(that.layoutCot4);
                            that.layoutCot4.setPosition(296, 0);
                        }
                        if (i === 4) {
                            that.play(that.layoutCot5);
                            that.layoutCot5.setPosition(380, 0);
                        }
                    }, timeSpin);
                    timeSpin += 200;
                }
                break;
        }
    },
    play: function (parent) {
        let that = this;
        let moveDown = new cc.MoveBy(3, cc.p(0, -105 * (that.dsLaBai.length - 3))).easing(cc.easeInOut(3.0));
        parent.runAction(moveDown);
        setTimeout(function () {
            // that.arrLaBaiCot1[0].updatePoker(that.arrLaBaiCot1[10].num, that.arrLaBaiCot1[10].type);
            // that.arrLaBaiCot1[1].updatePoker(that.arrLaBaiCot1[11].num, that.arrLaBaiCot1[11].type);
            // that.arrLaBaiCot1[2].updatePoker(that.arrLaBaiCot1[12].num, that.arrLaBaiCot1[12].type);
            // that.arrLaBaiCot2[0].updatePoker(that.arrLaBaiCot2[10].num, that.arrLaBaiCot2[10].type);
            // that.arrLaBaiCot2[1].updatePoker(that.arrLaBaiCot2[11].num, that.arrLaBaiCot2[11].type);
            // that.arrLaBaiCot2[2].updatePoker(that.arrLaBaiCot2[12].num, that.arrLaBaiCot2[12].type);
            // that.arrCot3[0].updatePoker(that.arrCot3[10].num, that.arrCot3[10].type);
            // that.arrCot3[1].updatePoker(that.arrCot3[11].num, that.arrCot3[11].type);
            // that.arrCot3[2].updatePoker(that.arrCot3[12].num, that.arrCot3[12].type);
            // that.arrCot4[0].updatePoker(that.arrCot4[10].num, that.arrCot4[10].type);
            // that.arrCot4[1].updatePoker(that.arrCot4[11].num, that.arrCot4[11].type);
            // that.arrCot4[2].updatePoker(that.arrCot4[12].num, that.arrCot4[12].type);
            // that.arrCot5[0].updatePoker(that.arrCot5[10].num, that.arrCot5[10].type);
            // that.arrCot5[1].updatePoker(that.arrCot5[11].num, that.arrCot5[11].type);
            // that.arrCot5[2].updatePoker(that.arrCot5[12].num, that.arrCot5[12].type);
        }, 3000)
    },
    randomPoker: function () {
        let result = [];
        let arrtype = ["co", "ro", "bich", "tep"];
        let arrnum = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"];
        while(result.length < 30){
            let randomType = arrtype[Math.floor(Math.random() * arrtype.length)];
            let randomNum = arrnum[Math.floor(Math.random() * arrnum.length)];
            let poker = {
                num: randomNum,
                type: randomType
            };
            let search = result.find(e =>
                e.num === poker.num && e.type === poker.type
            );
            if(!search)
                result.push(poker);
        }
        return result;
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