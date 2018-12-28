var MovePosition = {
    getPos: cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            let target = event.getCurrentTarget();
            let locationInNode = target.convertToNodeSpace(touch.getLocation());
            let s = target.getContentSize();
            let rect = cc.rect(0, 0, s.width, s.height);
            if (cc.rectContainsPoint(rect, locationInNode)) {
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                target.opacity = 180;
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {
            //Move the position of current button sprite
            let target = event.getCurrentTarget();
            let delta = touch.getDelta();
            target.x += delta.x;
            target.y += delta.y;
        },
        onTouchEnded: function (touch, event) {
            let target = event.getCurrentTarget();
            cc.log("sprite onTouchesEnded.. ");
            target.setOpacity(255);
            console.log(target.getPosition());
            // Reset zOrder and the display sequence will change
            // if (target == sprite2) {
            //     sprite1.setLocalZOrder(100);
            // } else if (target == sprite1) {
            //     sprite1.setLocalZOrder(0);
            // }
        }
    })
};