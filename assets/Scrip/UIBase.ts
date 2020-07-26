const { ccclass, property } = cc._decorator;

@ccclass
export default class UIBase extends cc.Component {

    @property
    isShowInit: boolean = false;

    onLoad() {
        this.isShowInit ? this.show() : this.hide();
    }

    show() {
        this.node.active = true;
    }

    hide() {
        this.node.active = false;
    }
}
