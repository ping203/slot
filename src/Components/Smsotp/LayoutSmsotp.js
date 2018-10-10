/**
 * Created by PVC on 7/18/2017.
 */

var itemList = {
    name: "",
    width: 0,
    color: cc.color.WHITE,
    apiName: "",
    action: false
}

var LayoutSmsotp = ccui.Layout.extend(
    {
        _listView: null,
        _size: null,
        _layer: null,
        _btn_select_otp_forget:null,
        _sp_mui_ten_xuong_forget:null,

        ctor: function (layer, size) {
            this._super();
            this._layer = layer;
            this._size = size;
            this.setContentSize(size);

            var texType = ccui.Widget.LOCAL_TEXTURE;
            if (cc.spriteFrameCache.getSpriteFrame(res_Lobby + "/bg_2.png")) {
                texType = ccui.Widget.PLIST_TEXTURE;
            }

            this._listView = new ccui.ListView();
            this.addChild(this._listView);
            this._listView.setContentSize(cc.size(this._size.width, this._size.height - 50));
            this._listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
            this._listView.setTouchEnabled(false);
            this._listView.setBounceEnabled(true);
            this._listView.setClippingEnabled(true);
            this._listView.setAnchorPoint(cc.p(0.0, 0.0));
            this._listView.setPosition(cc.p(0, 0));
            this._listView.setScrollBarEnabled(0);
            this._btn_select_otp_forget = new ccui.Button();
            this._btn_select_otp_forget.loadTextures(res_Lobby + "/bg_2.png", res_Lobby + "/bg_2.png", res_Lobby + "/bg_2.png", texType);
            this._listView.addChild(this._btn_select_otp_forget);
            if(texType == ccui.Widget.PLIST_TEXTURE)
            {
                this._sp_mui_ten_xuong_forget = new cc.Sprite("#"+res_Lobby + "/muiten_xuong.png");
            }else
            {
                this._sp_mui_ten_xuong_forget = new cc.Sprite(res_Lobby + "/muiten_xuong.png");
            }
            this._listView.addChild(this._sp_mui_ten_xuong_forget);




        },
        scaleColumn: function () {
            var totalWidth = this._size.width;
            var sumWidth = 0;
            this._arrInfoColom.forEach(function (item, index) {
                sumWidth += item.width;
            });
            var ratio = totalWidth / sumWidth;
            this._arrInfoColom.forEach(function (item, index) {
                item.width *= ratio;
            });
        },



        genColor: function (color, index, moneyType) {
            if (color == LayoutListView.COLOR_NORMAL) {
                return cc.color(247,235,198);
            }
            if (color == LayoutListView.COLOR_TOP) {
                if (index == 0)
                    return cc.color(255, 223, 88);
                else
                    return cc.color(232, 218, 173);
            }
            if (color == LayoutListView.COLOR_MONEY) {
                if (moneyType == MONEY_VIN)
                    return GuiUtil.color("#FFFF00");
                else
                    return cc.color(192, 193, 195);
            }

            if (color == LayoutListView.COLOR_MONEY_LSGD) {
                if (moneyType == 1 || moneyType == 3 || moneyType == 5) {
                    return GuiUtil.color("#FFFF00");
                } else {
                    return cc.color(192, 193, 195);
                }
            }

            if(color == LayoutListView.COLOR_MONEY_VQV)
            {
                return cc.color(192,193,195);
            }


            return color;
        },
        reloadData: function () {
            this._listView.removeAllItems();
            for (var i = 0; i < this._datas.length; i++) {
                this._listView.pushBackCustomItem(this.createItemListView(this._datas[i], i));
            }
        },
        setData: function (datas) {
            this._datas = datas;
            this.reloadData();
        },

        onTouchEventHandler: function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    this._layer.onClickCell(sender.cell, sender.column);
                    break;
            }
        },
        setInfoColumn: function (arrInfoColom) {
            this._arrInfoColom = arrInfoColom;
            this._pTitle.removeAllChildren(true);
            this.initPTitle();
        }

    }
);
LayoutListView.COLOR_NORMAL = 0;
LayoutListView.COLOR_TOP = 1;
LayoutListView.COLOR_MONEY = 2;
LayoutListView.COLOR_MONEY_LSGD = 3;
LayoutListView.COLOR_MONEY_VQV = 4;




