const { ccclass, property } = cc._decorator;

@ccclass
export default class UIBase extends cc.Component {

    @property
    text: string = 'hello';

    show() {

    }

    hide() {

    }
}
