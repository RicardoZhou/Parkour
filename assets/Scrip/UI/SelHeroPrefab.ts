import { UIEventType } from "../Define/EventDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SelHeroPrefab extends cc.Component {

    @property(cc.Sprite)
    bgSprite: cc.Sprite = null;
    @property(cc.SpriteAtlas)
    gameUI: cc.SpriteAtlas = null;

    heroId: number = null;

    init(id: number) {
        this.heroId = id;
    }

    setSelType(selId: number) {
        let frame: cc.SpriteFrame;
        switch (selId) {
            case this.heroId:
                frame = this.gameUI.getSpriteFrame('GameUI17');
                this.bgSprite.spriteFrame = frame;
                break;
            default:
                frame = this.gameUI.getSpriteFrame('GameUI16');
                this.bgSprite.spriteFrame = frame;
                break;
        }
    }
}
