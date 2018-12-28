var MiniPoker = BaseLayer.extend({
    arrtype: ["co", "ro", "bich", "tep"],
    arrnum: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"],
    ctor: function () {
        this._super();
        this.pokerlayout = null;
        this.chk_auto_quay = null;
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
        this.autoSpin();
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

        this.addCheckBox2(this.pokerlayout, "chk_auto_quay", cc.p(858, 315), false, res_MinigamePoker + "/check.png", res_MinigamePoker + "/checked.png", res_MinigamePoker + "/checked.png");

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

        this.chk_auto_quay.addEventListener(this.autoSpin, this);
    },
    initPanel: function () {
        var sizeP = cc.size(78, 105);
        this.dsLaBai = GeneratePoker.generate5col();
        this.randomLaBaiCot1 = this.dsLaBai.slice(0, 30);
        this.randomLaBaiCot2 = this.dsLaBai.slice(30, 60);
        this.randomLaBaiCot3 = this.dsLaBai.slice(60, 90);
        this.randomLaBaiCot4 = this.dsLaBai.slice(90, 120);
        this.randomLaBaiCot5 = this.dsLaBai.slice(120, 150);

        for (let i = 0; i < this.randomLaBaiCot1.length; i++) {
            this.arrLaBaiCot1.push(new Poker(this.layoutCot1, this.randomLaBaiCot1[i].num, this.randomLaBaiCot1[i].type, sizeP, cc.p(0, i * 105)));
            this.arrLaBaiCot2.push(new Poker(this.layoutCot2, this.randomLaBaiCot2[i].num, this.randomLaBaiCot2[i].type, sizeP, cc.p(0, i * 105)));
            this.arrLaBaiCot3.push(new Poker(this.layoutCot3, this.randomLaBaiCot3[i].num, this.randomLaBaiCot3[i].type, sizeP, cc.p(0, i * 105)));
            this.arrLaBaiCot4.push(new Poker(this.layoutCot4, this.randomLaBaiCot4[i].num, this.randomLaBaiCot4[i].type, sizeP, cc.p(0, i * 105)));
            this.arrLaBaiCot5.push(new Poker(this.layoutCot5, this.randomLaBaiCot5[i].num, this.randomLaBaiCot5[i].type, sizeP, cc.p(0, i * 105)));
        }
    },
    initFade: function () {
        this.addImage(this.tran_pokerlayout, null, cc.p(213, 180), res_MinigamePoker + "/fade1.png", cc.size(421, 56));
        this.addImage(this.tran_pokerlayout, null, cc.p(213, 24), res_MinigamePoker + "/fade2.png", cc.size(421, 56));
        this.addImage(this.tran_pokerlayout, null, cc.p(213, 106), res_MinigamePoker + "/highlight.png", cc.size(418, 109));
    },
    interval: null,
    isDone: null,
    autoSpin: function (sender, type) {
        let that = this;
        switch (type) {
            case ccui.CheckBox.EVENT_UNSELECTED:
                console.log("Not seclected");

                if (this.interval)
                    clearInterval(this.interval);
                break;
            case ccui.CheckBox.EVENT_SELECTED:
                console.log("Seclected");
                this.interval = setInterval(function () {
                    that.spin();
                }, 6000);
                break;
        }
    },
    //type: heart, diamond, club, spade = co, ro, tep, bich
    onButtonRelease: function (button, id) {
        switch (id) {
            case MiniPoker.BTN_CANGAT:
                this.spin();
                break;
        }
    },
    spin: function () {
        let timeSpin = 0;
        let fakeServer = GeneratePoker.randomPoker(5, true);
        console.log(fakeServer);
        let labai = GeneratePoker.randomPokerDiffArr(10, fakeServer);
        let labaicot1 = labai.slice(0, 3);
        let labaicot2 = labai.slice(3, 6);
        let labaicot3 = labai.slice(6, 9);
        let labaicot4 = labai.slice(9, 12);
        let labaicot5 = labai.slice(12, 15);
        // this.btncangiat.enabled = false;
        // setTimeout(function () {
        //     this.btncangiat.enabled = true;
        // }, 4500);
        let that = this;
        for (let i = 0; i < 5; i++) {
            setTimeout(function () {
                if (i === 0) {
                    that.playColumn(that.layoutCot1);
                    that.layoutCot1.setPosition(45, 0);
                    for (let j = 0; j < 3; j++) {
                        that.arrLaBaiCot1[j + 27].updatePoker(labaicot1[j].num, labaicot1[j].type);
                    }
                }
                if (i === 1) {
                    that.playColumn(that.layoutCot2);
                    that.layoutCot2.setPosition(129, 0);
                    for (let j = 0; j < 3; j++) {
                        that.arrLaBaiCot2[j + 27].updatePoker(labaicot2[j].num, labaicot2[j].type);
                    }
                }
                if (i === 2) {
                    that.playColumn(that.layoutCot3);
                    that.layoutCot3.setPosition(213, 0);
                    for (let j = 0; j < 3; j++) {
                        that.arrLaBaiCot3[j + 27].updatePoker(labaicot3[j].num, labaicot3[j].type);
                    }
                }
                if (i === 3) {
                    that.playColumn(that.layoutCot4);
                    that.layoutCot4.setPosition(296, 0);
                    for (let j = 0; j < 3; j++) {
                        that.arrLaBaiCot4[j + 27].updatePoker(labaicot4[j].num, labaicot4[j].type);
                    }
                }
                if (i === 4) {
                    that.playColumn(that.layoutCot5);
                    that.layoutCot5.setPosition(380, 0);
                    for (let j = 0; j < 3; j++) {
                        that.arrLaBaiCot5[j + 27].updatePoker(labaicot5[j].num, labaicot5[j].type);
                    }
                }
            }, timeSpin);
            timeSpin += 200;
        }
    },
    playColumn: function (parent) {
        let that = this;
        let moveDown = new cc.MoveBy(4, cc.p(0, -105 * (that.randomLaBaiCot1.length - 3))).easing(cc.easeInOut(3.0));
        parent.runAction(moveDown);
        setTimeout(function () {
            for (let i = 0; i < 3; i++) {
                that.arrLaBaiCot1[i].updatePoker(that.arrLaBaiCot1[i + 27].num, that.arrLaBaiCot1[i + 27].type);
                that.arrLaBaiCot2[i].updatePoker(that.arrLaBaiCot2[i + 27].num, that.arrLaBaiCot2[i + 27].type);
                that.arrLaBaiCot3[i].updatePoker(that.arrLaBaiCot3[i + 27].num, that.arrLaBaiCot3[i + 27].type);
                that.arrLaBaiCot4[i].updatePoker(that.arrLaBaiCot4[i + 27].num, that.arrLaBaiCot4[i + 27].type);
                that.arrLaBaiCot5[i].updatePoker(that.arrLaBaiCot5[i + 27].num, that.arrLaBaiCot5[i + 27].type);
            }
        }, 2000)
    },

});

MiniPoker.MONEY100 = 0;
MiniPoker.MONEY1K = 1;
MiniPoker.MONEY10K = 2;
MiniPoker.CHECK_AUTO = 3;
MiniPoker.LICHSU = 4;
MiniPoker.CUP = 5;
MiniPoker.HELP = 6;
MiniPoker.CANGIAT = 7;