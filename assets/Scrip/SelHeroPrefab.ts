const { ccclass, property } = cc._decorator;

@ccclass
export default class SelHeroPrefab extends cc.Component {

    @property(cc.Sprite)
    bgSprite: cc.Sprite = null;
    @property(cc.SpriteAtlas)
    gameUI: cc.SpriteAtlas = null;

    // onLoad () {}

    start() {

    }

    setStyle(style: number) {
        let frame: cc.SpriteFrame;
        switch (style) {
            case 0:
                frame = this.gameUI.getSpriteFrame('GameUI16');
                this.bgSprite.spriteFrame = frame;
                break;
            case 1:
                frame = this.gameUI.getSpriteFrame('GameUI17');
                this.bgSprite.spriteFrame = frame;
                break;
        }
    }

    // update (dt) {}
}
