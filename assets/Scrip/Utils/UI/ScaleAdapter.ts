const { ccclass, property } = cc._decorator;

@ccclass
export default class ScaleAdapter extends cc.Component {

    @property(Boolean)
    xAdp: Boolean = true;
    @property(Boolean)
    yAdp: Boolean = true;

    onEnable() {
        if (!this.node.parent)
            return;
        let parentSize = this.node.parent.getContentSize();
        let size: cc.Size = this.node.getContentSize();

        if (this.xAdp && parentSize.width && parentSize.height)
            this.node.scaleX = parentSize.width / size.width;

        if (this.yAdp && parentSize.height && parentSize.height)
            this.node.scaleY = parentSize.height / size.height;
    }

    // update (dt) {}
}
