/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * A class inhert from cc.Node, use for saving some protected children in other list.
 * @class
 * @extends cc.Node
 */
cc.ProtectedNode = cc.Node.extend(/** @lends cc.ProtectedNode# */{
    _protectedChildren: null,
    _reorderProtectedChildDirty: false,

    _insertProtectedChild: function (child, z) {
        this._reorderProtectedChildDirty = true;
        this._protectedChildren.push(child);
        child._setLocalZOrder(z);
    },

    /**
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
     * @function
     */
    ctor: function () {
        cc.Node.prototype.ctor.call(this);
        this._protectedChildren = [];
    },

    visit: function (parent) {
        var cmd = this._renderCmd, parentCmd = parent ? parent._renderCmd : null;

        // quick return if not visible
        if (!this._visible) {
            cmd._propagateFlagsDown(parentCmd);
            return;
        }

        var renderer = cc.renderer;
        var i, children = this._children, len = children.length, child;
        var j, pChildren = this._protectedChildren, pLen = pChildren.length, pChild;

        cmd.visit(parentCmd);

        var locGrid = this.grid;
        if (locGrid && locGrid._active)
            locGrid.beforeDraw();

        if (this._reorderChildDirty) this.sortAllChildren();
        if (this._reorderProtectedChildDirty) this.sortAllProtectedChildren();

        // draw children zOrder < 0
        for (i = 0; i < len; i++) {
            child = children[i];
            if (child._localZOrder < 0) {
                child.visit(this);
            }
            else {
                break;
            }
        }
        for (j = 0; j < pLen; j++) {
            pChild = pChildren[j];
            if (pChild && pChild._localZOrder < 0) {
                cmd._changeProtectedChild(pChild);
                pChild.visit(this);
            }
            else
                break;
        }

        renderer.pushRenderCommand(cmd);

        for (; i < len; i++) {
            children[i].visit(this);
        }
        for (; j < pLen; j++) {
            pChild = pChildren[j];
            if (!pChild) continue;
            cmd._changeProtectedChild(pChild);
            pChild.visit(this);
        }

        if (locGrid && locGrid._active)
            locGrid.afterDraw(this);

        cmd._dirtyFlag = 0;
    },

    /**
     * <p>
     *  Adds a child to the container with z order and tag                                                                         <br/>
     *  If the child is added to a 'running' node, then 'onEnter' and 'onEnterTransitionDidFinish' will be called immediately.     <br/>
     *  </p>
     * @param {cc.Node} child  A child node
     * @param {Number} [localZOrder]  Z order for drawing priority. Please refer to `setLocalZOrder(int)`
     * @param {Number} [tag]  An integer to identify the node easily. Please refer to `setTag(int)`
     */
    addProtectedChild: function (child, localZOrder, tag) {
        cc.assert(child != null, "child must be non-nil");
        cc.assert(!child.parent, "child already added. It can't be added again");

        localZOrder = localZOrder || child.getLocalZOrder();
        if (tag)
            child.setTag(tag);

        this._insertProtectedChild(child, localZOrder);
        child.setParent(this);
        child.setOrderOfArrival(cc.s_globalOrderOfArrival);

        if (this._running) {
            child._performRecursive(cc.Node._stateCallbackType.onEnter);
            // prevent onEnterTransitionDidFinish to be called twice when a node is added in onEnter
            if (this._isTransitionFinished)
                child._performRecursive(cc.Node._stateCallbackType.onEnterTransitionDidFinish);
        }
        if (this._cascadeColorEnabled)
            this._renderCmd.setCascadeColorEnabledDirty();
        if (this._cascadeOpacityEnabled)
            this._renderCmd.setCascadeOpacityEnabledDirty();
    },

    /**
     * Gets a child from the container with its tag
     * @param {Number} tag An identifier to find the child node.
     * @return {cc.Node} a Node object whose tag equals to the input parameter
     */
    getProtectedChildByTag: function (tag) {
        cc.assert(tag !== cc.NODE_TAG_INVALID, "Invalid tag");
        var locChildren = this._protectedChildren;
        for (var i = 0, len = locChildren.length; i < len; i++)
            if (locChildren.getTag() === tag)
                return locChildren[i];
        return null;
    },

    /**
     * Removes a child from the container. It will also cleanup all running actions depending on the cleanup parameter.
     * @param {cc.Node} child  The child node which will be removed.
     * @param {Boolean} [cleanup=true] true if all running actions and callbacks on the child node will be cleanup, false otherwise.
     */
    removeProtectedChild: function (child, cleanup) {
        if (cleanup == null)
            cleanup = true;
        var locChildren = this._protectedChildren;
        if (locChildren.length === 0)
            return;
        var idx = locChildren.indexOf(child);
        if (idx > -1) {
            if (this._running) {
                child._performRecursive(cc.Node._stateCallbackType.onExitTransitionDidStart);
                child._performRecursive(cc.Node._stateCallbackType.onExit);
            }

            // If you don't do cleanup, the child's actions will not get removed and the
            // its scheduledSelectors_ dict will not get released!
            if (cleanup)
                child._performRecursive(cc.Node._stateCallbackType.cleanup);

            // set parent nil at the end
            child.setParent(null);
            locChildren.splice(idx, 1);
        }
    },

    /**
     * Removes a child from the container by tag value.                                    <br/>
     * It will also cleanup all running actions depending on the cleanup parameter
     * @param {Number} tag
     * @param {Boolean} [cleanup=true]
     */
    removeProtectedChildByTag: function (tag, cleanup) {
        cc.assert(tag !== cc.NODE_TAG_INVALID, "Invalid tag");

        if (cleanup == null)
            cleanup = true;

        var child = this.getProtectedChildByTag(tag);

        if (child == null)
            cc.log("cocos2d: removeChildByTag(tag = %d): child not found!", tag);
        else
            this.removeProtectedChild(child, cleanup);
    },

    /**
     * Removes all children from the container with a cleanup.
     * @see cc.ProtectedNode#removeAllProtectedChildrenWithCleanup
     */
    removeAllProtectedChildren: function () {
        this.removeAllProtectedChildrenWithCleanup(true);
    },

    /**
     * Removes all children from the container, and do a cleanup to all running actions depending on the cleanup parameter.
     * @param {Boolean} [cleanup=true] true if all running actions on all children nodes should be cleanup, false otherwise.
     */
    removeAllProtectedChildrenWithCleanup: function (cleanup) {
        if (cleanup == null)
            cleanup = true;
        var locChildren = this._protectedChildren;
        // not using detachChild improves speed here
        for (var i = 0, len = locChildren.length; i < len; i++) {
            var child = locChildren[i];
            // IMPORTANT:
            //  -1st do onExit
            //  -2nd cleanup
            if (this._running) {
                child._performRecursive(cc.Node._stateCallbackType.onExitTransitionDidStart);
                child._performRecursive(cc.Node._stateCallbackType.onExit);
            }

            if (cleanup)
                child._performRecursive(cc.Node._stateCallbackType.cleanup);
            // set parent nil at the end
            child.setParent(null);
        }
        locChildren.length = 0;
    },

    /**
     * Reorders a child according to a new z value.
     * @param {cc.Node} child An already added child node. It MUST be already added.
     * @param {Number} localZOrder Z order for drawing priority. Please refer to setLocalZOrder(int)
     */
    reorderProtectedChild: function (child, localZOrder) {
        cc.assert(child != null, "Child must be non-nil");
        this._reorderProtectedChildDirty = true;
        child.setOrderOfArrival(cc.s_globalOrderOfArrival++);
        child._setLocalZOrder(localZOrder);
    },

    /**
     * <p>
     *     Sorts the children array once before drawing, instead of every time when a child is added or reordered.       <br/>
     *     This approach can improves the performance massively.                                                         <br/>
     *     @note Don't call this manually unless a child added needs to be removed in the same frame
     * </p>
     */
    sortAllProtectedChildren: function () {
        if (this._reorderProtectedChildDirty) {
            var _children = this._protectedChildren;

            // insertion sort
            var i, j, len = _children.length, tmp;
            for (i = 1; i < len; i++) {
                tmp = _children[i];
                j = i - 1;

                //continue moving element downwards while zOrder is smaller or when zOrder is the same but mutatedIndex is smaller
                while (j >= 0) {
                    if (tmp._localZOrder < _children[j]._localZOrder) {
                        _children[j + 1] = _children[j];
                    } else if (tmp._localZOrder === _children[j]._localZOrder && tmp.arrivalOrder < _children[j].arrivalOrder) {
                        _children[j + 1] = _children[j];
                    } else
                        break;
                    j--;
                }
                _children[j + 1] = tmp;
            }

            //don't need to check children recursively, that's done in visit of each child
            this._reorderProtectedChildDirty = false;
        }
    },

    _changePosition: function () {
    },

    _createRenderCmd: function () {
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return new cc.ProtectedNode.CanvasRenderCmd(this);
        else
            return new cc.ProtectedNode.WebGLRenderCmd(this);
    }
});

/**
 * create a cc.ProtectedNode object;
 * @deprecated since v3.0, please use new cc.ProtectedNode() instead.
 * @return cc.ProtectedNode
 */
cc.ProtectedNode.create = function () {
    return new cc.ProtectedNode();
};
