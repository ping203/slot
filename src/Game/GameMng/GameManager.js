//
var userGameData = cc.sys.localStorage;

var GameManager = cc.Class.extend({
    ctor: function(){
        this.lastGame = -1;
        this.currentGame = -1;
        this.outRoom = true;
        this.nickName = "";
        this.inGame = false;
        this.hasLoadGameList = [];
    },

    checkType: function(type){
        return true;
    },
    getNameSk: function(gameType)
    {
        for(var i = 0; i < gameListGameBai.length; i++)
        {
            if(gameListGameBai[i].gameKey == gameType)
            {
                return gameListGameBai[i].nameSocket;
            }
        }
        return "poker_tour";
    },
    openGame: function(type){
        cc.log("type: " + type);
        var config = GameManager.appConfig[this.getNameSk(type)];
        //cc.log("status: " + config.status);
        //if(config && config.status == 0){
        if(config){
            if(waitingJoinGame) {
                cc.log("doi xu ly vao game");
                return;
            }
            waitingJoinGame = true;
            cc.log("before showLoading");
           gI.popUp.showLoading();
            cc.log("showLoading");
            this.currentGame = type;
            gameData.setGameType(type);
            this.connectToGameServer(type);
        }
        else{
            // cc.log("game status: " + config.status);
             gI.popUp.openPanel_Alert_Lobby("Game đang bảo trì. Vui lòng đợi!!!");
        }
    },

    openGameSlot: function(type){
        // cc.log("type: " + type);
        var config = lobby.getConfigByType(type);
        //cc.log("status: " + config.status);
        if(config && config.status == 0){

            loadResoureGame(g_resources_slots_kho_bau, slotKhoBau ,function(){
                if(waitingJoinGame) {
                    cc.log("doi xu ly vao game");
                    return;
                }
                waitingJoinGame = true;
               gI.popUp.showLoading();
                cc.log("showLoading");
                this.currentGame = type;
                gameData.setGameType(type);
                this.connectToGameServer(type);
            }.bind(this));
        }
        else{
            //cc.log("game status: " + config.status);
             gI.popUp.openPanel_Alert_Lobby("Game đang bảo trì. Vui lòng đợi!!!");
        }
    },
    openGameNuDiepVien: function(type){
        cc.log("type: " + type);
        var config = lobby.getConfigByType(type);
        //cc.log("status: " + config.status);
        if(config && config.status == 0){
                if(waitingJoinGame) {
                    cc.log("doi xu ly vao game");
                    return;
                }
                waitingJoinGame = true;
               gI.popUp.showLoading();
                cc.log("showLoading");
                this.currentGame = type;
                gameData.setGameType(type);
                this.connectToGameServer(type);
        }
        else{
             gI.popUp.openPanel_Alert_Lobby("Game đang bảo trì. Vui lòng đợi!!!");
        }
    },

	initAndOpenGame: function(type){

        for(var i = 0; i < gameListGameBai.length; i++)
        {
            if(gameListGameBai[i].gameKey == type)
            {
                loadResoureGame(gameListGameBai[i].resource, this.hasLoadGameList[type] ,function(){
                    this.hasLoadGameList[type] = true;
                    this.openGame(type);
                }.bind(this));
                break;
            }
        }
    },
    initAndOpenGamePokerTour:function(type){
                loadResoureGame(g_resources_pokertour, this.hasLoadGameList[type] ,function(){
                    this.hasLoadGameList[type] = true;
                    this.openGame(type);
                }.bind(this));

    },

    getGameName : function(gameType){
        var name = "";
        if (gameType == GameList.TienLenSoLo)
            name = "TLMN Solo";
        else if(gameType == GameList.TienLenThuong)
            name = "Tiến Lên Miền Nam";
        else if(gameType == GameList.BaCay)
            name = "Ba Cây";
        else if(gameType == GameList.BaiCao)
            name = "Bài Cào";
        else if(gameType == GameList.MauBinh)
            name = "Mậu Binh";
        else if(gameType == GameList.MauBinhTinhAt)
            name = "Mậu Binh Tính Át";
        else if(gameType == GameList.SamSoLo)
            name = "Sâm Solo";
        else if(gameType == GameList.SamThuong)
            name = "Sâm Solo";
        else if(gameType == GameList.Poker)
            name = "Poker Texas";
        else if(gameType == GameList.Lieng)
            name = "Liêng";
        else if(gameType == GameList.XiZach)
            name = "Xì Dzach";
        else if(gameType == GameList.CoCaro)
            name = "Cờ Caro";
        else if(gameType == GameList.CoTuong)
            name = "Cờ Tướng";
        else if(gameType == GameList.CoUp)
            name = "Cờ Úp";
        else if(gameType == GameList.XocDia)
            name = "Xóc Đĩa";

        return name;
    },

    backToLobby: function(){
        cc.log("backToLobby");
        SceneMgr.getInstance().getRunningScene().removeGameGui();
        if(gameLobbyInstance) {
            GameLobby.getInstance().setVisible(false);
            GameLobby.getInstance().pn_create_room.setVisible(false);
        }
        if(pokerLobbyInstance){
            PokerTourLobby.getInstance().hide();
        }
        this.inGame = false;
        cc.log("backToLobby2");
        menutab.showAllInfo();
        cc.log("backToLobby end");
    },

    disconnectNetworkSlow: function(){
        cc.log("disconnect network slow");
         gI.popUp.openPanel_Alert_Lobby("Mạng yếu kiểm tra lại kết nối mạng");
        //this.disconnect();
    },

    clickOnBack: function(){
        cc.log("click on back");
        userGameData.setItem("currentGame", "-1");
        this.disconnect();
    },

    disconnect: function(){
        cc.log("gameWsclient disconnect");
        if(gameWsClient != null && gameWsClient != undefined)
            gameWsClient.disconnect();
    },

    openPlayingGame: function(){
        return;
        var curGame = userGameData.getItem("currentGame");
        var inRoom = userGameData.getItem("inRoom");

        if(!curGame || curGame == "-1" || !inRoom || inRoom == "false"){
            return;
        }
        else{
            cc.log("PlayingGame: " + curGame);
            //this.openGame(parseInt(curGame));
        }
    },

    //01697135555 900925
    connectToGameServer: function(gameType) {
        cc.log("connectTo GameType: " + gameType);

        if (gameType == GameList.SamSoLo || gameType == GameList.SamThuong) {
            gameWsClient = new Sam.SamWebSocket();
        }
        else if (gameType == GameList.BaCay) {
            gameWsClient = new BaCay.BaCayWebSocket();
        }
        else if (gameType == GameList.MauBinh || gameType == GameList.MauBinhTinhAt) {
            gameWsClient = new MauBinh.WebSocket();
        }
        else if(gameType == GameList.TienLenSoLo || gameType == GameList.TienLenThuong){
            gameWsClient = new TienLen.TienLenWebSocket();
        }
        else if(gameType == GameList.BaiCao){
            gameWsClient = new BaiCao.BaiCaoWebSocket();
        }
        else if(gameType == GameList.SlotKhoBau) {
            gameWsClient = new Slots.SlotsWebSocket();
            }
        else if(gameType == GameList.NuDiepVien){
            gameWsClient = new Slots.SlotsWebSocket();
            }
        else if(gameType == GameList.Avenger){
            gameWsClient = new Slots.SlotsWebSocket();
            }
        else if(gameType == GameList.Poker){
            gameWsClient = new Poker.PokerSocket();
        }
        else if(gameType == GameList.PokerTour){
            gameWsClient = new PokerTour.PokerTourSocket();
        }
        else if(gameType == GameList.Lieng){
            gameWsClient = new Lieng.LiengSocket();
        }
        else if(gameType == GameList.CoCaro)
        {
            gameWsClient = new CoCaro.CoCaroSocket();
        }else if(gameType == GameList.XiZach)
        {
            gameWsClient = new XiZach.XiZachSocket();
        }
        else if(gameType == GameList.CoTuong)
        {
            gameWsClient = new CoTuong.CoTuongSocket();
        }
        else if(gameType == GameList.CoUp)
        {
            gameWsClient = new CoUp.CoUpSocket();
        }else if(gameType == GameList.XocDia)
        {
            gameWsClient = new XocDia.XocDiaSocket();
        }


        gameWsClient.connectToServer(gameType);
        this.startCountLogin();
    },



    showYesNoDialog: function(title,message,target,selector,parent){

        this.dialog = new Dialog();
        if(parent)
        {
            parent.addChild(this.dialog);
        }
        else
            this.getRunningScene().getMainLayer().addChild(this.dialog);
        this.dialog.setLocalZOrder(Dialog.ZODER);
        this.dialog.setTag(Dialog.TAG);
        this.dialog.set(title,message,target,selector);
        return this.dialog;
    },

    startCountLogin: function(){
        cc.log("start Count Login");
        EventHandlerManager.getInstance().addHandler("login", function(){
            cc.log("Login time out");
             gI.popUp.openPanel_Alert_Lobby("Kết nối tới game không thành công. Vui lòng thử lại sau.");
            //EventHandlerManager.getInstance().removeHandler("login");
            this.disconnect();
            gI.popUp.closeLoading();
        }.bind(this));
        EventHandlerManager.getInstance().getHandler("login").setTimeOut(5);
    },
	
	// add Some comment

    addStartJoinRoom: function(){
        cc.log("start Count Join Room");
        //showLoading();
        EventHandlerManager.getInstance().addHandler("joinRoom", function(){
            cc.log("join room time out");
            waitingJoinRoom = false;
            cc.log("waitingJoint Room = false");
            //EventHandlerManager.getInstance().removeHandler("joinRoom");
        }.bind(this));

        EventHandlerManager.getInstance().getHandler("joinRoom").setTimeOut(2);
    },

    //
    sendRequestTopCaoThu: function(){
        //gameData.clearTopServer();
        sendRequest(this.getUrlTopCaoThuVin(),null,false,this.callBackGetTopCaoThuVin,this.callBackError);
        sendRequest(this.getUrlTopCaoThuXu(),null,false,this.callBackGetTopCaoThuXu,this.callBackError);
    },

    sendRequestTopCaoThuVin: function(){
        sendRequest(this.getUrlTopCaoThuVin(),null,false,this.callBackGetTopCaoThuVin,this.callBackError);
    },

    sendRequestTopCaoThuXu: function(){
        sendRequest(this.getUrlTopCaoThuXu(),null,false,this.callBackGetTopCaoThuXu,this.callBackError);
    },

    callBackGetTopCaoThuVin: function(response){
        var jsonData = JSON.parse(response);

        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];
        if(success)
        {
            var userList = jsonData["userList"];
            cc.log("UserList: " + userList);
            if(userList != "" && userList != undefined){
                gameData.updateCaothuListVin(userList);
            }
        }else
        {
        }
    },

    callBackError: function(error){

    },


    callBackGetTopCaoThuXu: function(response){
        var jsonData = JSON.parse(response);

        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];
        if(success)
        {
            var userList = jsonData["userList"];
            gameData.updateCaothuListXu(userList);
        }else
        {
        }
    },


    getUrlTopCaoThuVin: function()
    {
        var hh = BASE_URL;
        //var hh = "http://104.155.193.15:8081/api?";
        //var kk =  hh + "c=123&n="+5+"&mt=vin&date="+ "29-09-2016";
        var kk =  hh + "c=123&n="+5+"&mt=vin&date="+ this.getCurrentDate();
        cc.log(kk);
        return kk;
    },

    getUrlTopCaoThuXu: function()
    {
        var hh = BASE_URL;
        //var hh = "http://104.155.193.15:8081/api?";
        //var kk =  hh + "c=123&n="+5+"&mt=vin&date="+ "29-09-2016";
        var kk =  hh + "c=123&n="+5+"&mt=xu&date="+ this.getCurrentDate();
        cc.log(kk);
        return kk;
    },

    getCurrentDate : function(){
        var time = new Date();
            var date = time.getDate();
            var month = time.getMonth() +1;
            var year = time.getFullYear();
            if(date < 10)
                date = '0'+date;
            if(month < 10){
                month = '0' + month;
            }

            var today = date+'-'+month+'-'+year;
            return today;
    },

    startPingPong: function(){
        if(gameWsState != CLIENT_STATE.CONNECTED){
            return;
        }

        if(gameWsClient){
            gameWsClient.sendPingPong();
        }

        EventHandlerManager.getInstance().addHandler("pingpong", function(){
            GameManager.getInstance().disconnectNetworkSlow();
        });

        EventHandlerManager.getInstance().addHandler("networkSlow", function(){
            if(GameScene.getMainLayer() && GameScene.getMainLayer().networkSlow){
                GameScene.getMainLayer().networkSlow(true);
            }
            this.startPingPong();
        }.bind(this));

        EventHandlerManager.getInstance().getHandler("pingpong").setTimeOut(20);
        EventHandlerManager.getInstance().getHandler("networkSlow").setTimeOut(5);
    },


    //startPingPong2: function(){
    //}

    receivedPingPong: function(){
        EventHandlerManager.getInstance().addHandler("receivedPingPong", function(){
            GameManager.getInstance().startPingPong();
        });

        EventHandlerManager.getInstance().getHandler("receivedPingPong").setTimeOut(5);
        //fast network check

        if(EventHandlerManager.getInstance().getHandler("networkSlow") != null)      // goi tin tra ve nhanh hon 5s
        {
            if(GameScene.getMainLayer() && GameScene.getMainLayer().networkSlow){
                GameScene.getMainLayer().networkSlow(false);
            }
        }
        else
        {
            if(GameScene.getMainLayer() && GameScene.getMainLayer().networkSlow){
                GameScene.getMainLayer().networkSlow(true);
            }
        }

        EventHandlerManager.getInstance().removeHandler("pingpong");
        EventHandlerManager.getInstance().removeHandler("networkSlow");
    },

    backToSelectRoom: function(){
        cc.log("backToSelectRoom");
        GameScene.removeGameGui();
        cc.log("backToSelectRoom 1");
        GameLobby.getInstance().setVisible(true);
        GameLobby.getInstance().showAndSendTopServer();
        if(gameWsClient){
            gameWsClient.sendGetMoneyBetConfig(GameLobby.getInstance().typeBan, 0, -1, 0, CARD_FROM, CARD_TO);
        }

        cc.log("backToSelectRoom 2");
    },

    backToTestScene: function(){
        cc.log("backToTestRoom");
        GameScene.removeGameGui();
        testLobby.setVisible(true);
    },

    backToLobbyPokerTour: function(){
        cc.log("backToPokerLobby");
        //GameScene.removeGameGui();
        SceneMgr.getInstance().getRunningScene().getMainLayer().setVisible(false);
        PokerTourLobby.getInstance().clearDataUser();
        PokerTourLobby.getInstance().show();
        PokerTourLobby.getInstance().sendGetListTour();
    },

    getHotroLink: function(gameType) {
        if(gameType == GameList.SamThuong) {
            return GameManager.webViewLink.guildSam;
        }
        else if(gameType == GameList.SamSoLo){
            return GameManager.webViewLink.guildSamSolo;
        }
        else if(gameType == GameList.BaCay){
            return GameManager.webViewLink.guildBacay;
        }
        else if(gameType == GameList.MauBinh){
            return GameManager.webViewLink.guildMauBinh;
        }
        else if(gameType == GameList.MauBinhTinhAt){
            return GameManager.webViewLink.guildMauBinhTinhAt;
        }
        else if(gameType == GameList.TienLenSoLo){
            return GameManager.webViewLink.guildTienLenSolo;
        }
        else if(gameType == GameList.TienLenThuong){
            return GameManager.webViewLink.guildTienLen;
        }
        else if(gameType == GameList.BaiCao){
            return GameManager.webViewLink.guildBaiCao;
        }
        else if(gameType == GameList.Poker){
            return GameManager.webViewLink.guildPoker;
        }
        else if(gameType == GameList.PokerTour){
            return GameManager.webViewLink.guildPokerTour;
        }
        else if(gameType == GameList.Lieng){
            return GameManager.webViewLink.guildLieng;
        }
        else if(gameType == GameList.CoCaro){
            return GameManager.webViewLink.guildCoCaro;
        }
        else if(gameType == GameList.XiZach){
            return GameManager.webViewLink.guildXiZach;
        }
        else if(gameType == GameList.CoTuong){
            return GameManager.webViewLink.guildCoTuong;
        }
        else if(gameType == GameList.CoUp){
            return GameManager.webViewLink.guildCoUp;
        }else if(gameType == GameList.XocDia){
            return GameManager.webViewLink.guildXocDia;
        }
    }


});

var gameWsClient = null;
var waitingJoinGame = false;
var waitingJoinRoom = false;
GameManager.CLOSED = 0;
GameManager.OPEN = 1;
var gameWsState = GameManager.CLOSED;

var gameManagerInstance = null;

GameManager.getInstance = function(){
    if(gameManagerInstance == null){
        gameManagerInstance = new GameManager();

    }
    return gameManagerInstance;
}
GameManager.platform = "web";
if (cc.sys.isNative) {
    if (cc.sys.os == cc.sys.OS_ANDROID) {
        GameManager.platform = "ad";
    } else if (cc.sys.os == cc.sys.OS_IOS) {
        GameManager.platform = "ios";
    } else if (cc.sys.os == cc.sys.OS_WINRT) {
        GameManager.platform = "wp";
    }
} else {
    GameManager.platform = "web";
}
GameManager.appConfig = {

};
GameManager.config = {
    moneyName : "Gem",
    moneyNameUpper : "GEM",
    moneyNameLower : "gem",
    hiddenXu : true,
    cuphap : "GEM",
    open_payment_ios:false,
    facebook_canvas:false
};

GameManager.webViewLink = {
    productName : "GemClub",
    productName2 : "GEMCLUB",
    baseLink  : "https://gamebaidoithuongquocte.blogspot.com",
    gameLink : "http://gem.club/",
    fanpage : "https://www.facebook.com/gem.club.fanpage/",
    groupFB : "https://www.facebook.com/groups/gem.club/",
    email : " hotrogemclub@gmail.com",
    OTPApp : "GEMPLUS",
    OTPMessage : "GEM OTP",
    timePopUp: 2,
    cskh : "19006697",
    sms_otp : "8079",
    dieuKhoanSD : "http://gamebaidoithuongquocte.blogspot.com/2018/04/ieu-khoan-su-dung-tren-gemclub.html",
    theLeHuVang : "http://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-su-kien-hu-vang-game-bai.html",
    eventMiniPoker : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-su-kien-x2-hu-minipoker.html",
    guildMiniePoker : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gem-club-huong-dan-choi-mini-poker.html",
    eventMiniSlot : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-choi-kim-cuong.html",
    x2MiniSlot : "http://gamebaidoithuongquocte.blogspot.com/2018/04/gem-club-su-kien-x3-hu-kiem-cuong.html",
    guildMiniSlot : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-choi-kim-cuong.html",
    caothapSanBai : "http://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-su-kien-thung-pha-sanh-game-cao.html",
    guildCaoThap : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-choi-game-mini-cao.html",
    thanhDuTheLe : "http://gamebaidoithuongquocte.blogspot.com/2018/04/su-kien-tai-xiu-choi-hay-nhan-ngay.html",
    bannerLobby1 : "http://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-choi-tai-xiu-hay-trung-ngay-cao.html",
    bannerLobby2 : "http://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-tung-bung-cung-chuoi-su-kien.html",
    downloadIOS : "http://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-tai-game-cho-he-ieu.html",
    downloadAndroid : "http://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-tai-game-cho-he-ieu_17.html",
    downloadWindowPhone : "https://www.microsoft.com/vi-vn/store/p/vinplay-vua-bai-%C4%90oi-thuong/9nblggh406qp",
    downloadPC : "http://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-dowloand-pc.html",
    hoiDap : "http://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-hoi-ap.html",
    guildSam : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-cach-choi-sam-loc.html",
    guildSamSolo : "http://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-choi-sam-loc-solo.html",
    guildBacay : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-cach-choi-ba-cay.html",
    guildMauBinh : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-choi-mau-binh.html",
    guildMauBinhTinhAt : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-choi-game-mau-binh.html",
    guildTienLen : "http://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-cach-choi-tien-len.html",
    guildTienLenSolo : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-choi-tien-len-mien.html",
    guildBaiCao : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-choi-bai-cao.html",
    guildPoker : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-choi-poker-texas.html",
    guildPokerTour : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-tham-gia-poker-tour.html",
    guildLieng : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-choi-lieng.html",
    guildCoCaro : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-choi-co-caro.html",
    guildXiZach : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-choi-xi-dzach.html",
    guildCoTuong : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-choi-co-tuong.html",
    guildCoUp: "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-choi-co-up.html",
    guildXocDia : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-choi-xoc-xoc.html",
    guildTaiXiu : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-choi-tai-xiu.html",
    guildBauCua : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-choi-tom.html",
    guildVQMM : "http://gamebaidoithuongquocte.blogspot.com/2018/04/quay-ngay-e-nhan-qua-cung-vong-quay-may.html",
    linkTanThu : "http://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-tan-thu-nhan-va-su.html",
    thuongVip : "http://gamebaidoithuongquocte.blogspot.com/2018/04/thuong-vip-gemclub.html",
    theLeVipPoint : "http://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-le-tham-du-chum-su-kien-vinpro.html",
    eventBauCua : "https://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-le-tham-gia-su-kien-san-tom-rom.html",
    guildVongQuayVip : "http://gamebaidoithuongquocte.blogspot.com/2018/04/gemclub-huong-dan-vong-quay-vip.html"

}

