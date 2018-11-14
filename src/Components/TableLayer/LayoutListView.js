/**
 * Created by PVC on 7/18/2017.
 */

var itemList = {
    name: "",
    width: 0,
    color: cc.color.WHITE,
    apiName: "",
    action: false
};

var LayoutListView = ccui.Layout.extend({
    _bgImg: null,
    _listView: null,
    _size: null,
    _arrInfoColom: null,
    _layer: null,
    _pTitle: null,
    _cellHeight: 50,
    _datas: null,

    ctor: function (layer, size, arrInfoColom) {
        this._super();
        this._layer = layer;
        this._size = size;
        this._arrInfoColom = arrInfoColom;
        this.scaleColumn();
        this.setContentSize(size);
        this.setPosition(cc.p(89, 145));

        this._listView = new ccui.ListView();
        this._listView.setContentSize(cc.size(this._size.width, this._size.height - 60));
        this._listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this._listView.setTouchEnabled(false);
        this._listView.setBounceEnabled(true);
        this._listView.setClippingEnabled(true);
        this._listView.setAnchorPoint(cc.p(0.0, 0.0));
        this._listView.setPosition(cc.p(0, 0));
        this._listView.setScrollBarEnabled(0);
        this.addChild(this._listView);

        this._pTitle = new ccui.Layout();
        this._pTitle.setAnchorPoint(0.5, 0.5);
        this._pTitle.setContentSize(this._size.width, 60);
        this._pTitle.setTouchEnabled(false);
        this._pTitle.setCascadeOpacityEnabled(true);
        this._pTitle.setPosition(cc.p(this._size.width / 2, this._size.height - 30));
        this._pTitle.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        // this._pTitle.setBackGroundColor(colorBgCell1);
        this._pTitle.setBackGroundColorOpacity(120);
        this._pTitle.setBackGroundColor("#000");
        this.addChild(this._pTitle);
        this.initPTitle();
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
    initPTitle: function () {
        for (var i = 0; i < this._arrInfoColom.length; i++) {
            var titleName = new ccui.Text(this._arrInfoColom[i].name, fontSwissCondensed.fontName, 24);
            titleName.setAnchorPoint(0.5, 0.5);
            if (cc.sys.isNative) {
                titleName.setFontName("res/Font/" + titleName.getFontName() + ".ttf");
            }
            titleName.ignoreContentAdaptWithSize(false);
            titleName.setContentSize(cc.size(this._arrInfoColom[i].width, 60));
            titleName.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            titleName.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            titleName.setColor(cc.color("#e8c14c"));
            titleName.setTag(i);
            var position = cc.p(0, 0);
            if (i === 0) {
                position = cc.p(this._arrInfoColom[i].width / 2, 30);
            } else {
                var positionW = this._pTitle.getChildByTag(i - 1).getPosition().x + this._pTitle.getChildByTag(i - 1).getContentSize().width / 2 + this._arrInfoColom[i].width / 2;
                position = cc.p(positionW, 30);
            }
            titleName.setPosition(position);
            this._pTitle.addChild(titleName);
        }
    },

    createItemListView: function (data, index) {
        var marginCell = 10;
        var cell = new ccui.Layout();
        cell.height = this._cellHeight;
        cell.width = this._size.width;
        //cell.setPosition(cc.p(378,0));
        cell.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        cell.setClippingEnabled(true);

        if (index % 2 === 1) {
            cell.setBackGroundColor(cc.color("#000"));
            cell.setBackGroundColorOpacity(50);
        } else {
            cell.setBackGroundColor(cc.color("#FFF"));
            cell.setBackGroundColorOpacity(7);
        }

        for (var i = 0; i < this._arrInfoColom.length; i++) {
            var text = this._arrInfoColom[index].apiName[i];
            if (text === undefined) text = "";
            var titleName = new ccui.Text(text, fontSwissCondensed.fontName, 21);
            titleName.setAnchorPoint(0.5, 0.5);
            if (cc.sys.isNative) {
                titleName.setFontName("res/Font/" + titleName.getFontName() + ".ttf");
            }
            titleName.ignoreContentAdaptWithSize(false);
            titleName.setContentSize(cc.size(this._arrInfoColom[i].width - marginCell, 40));
            titleName.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            titleName.setTextHorizontalAlignment(this._arrInfoColom[i].textAlignment);
            // titleName.setColor(data._color ? data._color : this.genColor(this._arrInfoColom[i].color, index, this._layer._moneyType));
            titleName.setTag(i);
            if (this._arrInfoColom[i].fontSize)
                titleName.setFontSize(this._arrInfoColom[i].fontSize);
            var position = cc.p(0, 0);
            if (i === 0) {
                position = cc.p(this._arrInfoColom[i].width / 2, 25);
            } else {
                var positionW = cell.getChildByTag(i - 1).getPosition().x + cell.getChildByTag(i - 1).getContentSize().width / 2 + this._arrInfoColom[i].width / 2 + marginCell / 2;
                position = cc.p(positionW, 25);
            }
            titleName.setPosition(position);

            var action = this._arrInfoColom[i].action;
            if (action || action === 0) {
                titleName.setTouchEnabled(true);
                titleName.cell = index;
                titleName.column = i;
                titleName._rowData = data;
                titleName._action = action;
                titleName.addTouchEventListener(this.onTouchEventHandler, this);
            }
            cell.addChild(titleName);
            // if (i !== this._arrInfoColom.length - 1) {
            //     var spNganCot = GuiUtil.createSprite("res/Minigame/ImageChung/vachdung.png");
            //     spNganCot.setPosition(cc.p(position.x + this._arrInfoColom[i].width / 2, 20));
            //     cell.addChild(spNganCot);
            // }
        }
        return cell;
    },
    genColor: function (color, index, moneyType) {
        if (color === LayoutListView.COLOR_NORMAL) {
            return cc.color(247, 235, 198);
        }
        if (color === LayoutListView.COLOR_TOP) {
            if (index === 0)
                return cc.color(255, 223, 88);
            else
                return cc.color(232, 218, 173);
        }
        if (color === LayoutListView.COLOR_MONEY) {
            if (moneyType === MONEY_VIN)
                return GuiUtil.color("#FFFF00");
            else
                return cc.color(192, 193, 195);
        }
        if (color === LayoutListView.COLOR_MONEY_LSGD) {
            if (moneyType === 1 || moneyType === 3 || moneyType === 5) {
                return GuiUtil.color("#FFFF00");
            } else {
                return cc.color(192, 193, 195);
            }
        }
        if (color === LayoutListView.COLOR_MONEY_VQV) {
            return cc.color(192, 193, 195);
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

});
LayoutListView.COLOR_NORMAL = 0;
LayoutListView.COLOR_TOP = 1;
LayoutListView.COLOR_MONEY = 2;
LayoutListView.COLOR_MONEY_LSGD = 3;
LayoutListView.COLOR_MONEY_VQV = 4;




