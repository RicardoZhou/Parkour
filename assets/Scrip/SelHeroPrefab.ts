import { UIEventType } from "./Define/EventDef";

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
        const { TOUCH } = cc.Event;
        TOUCH
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

    onSelHeroTouch(event: cc.Event.EventTouch) {
        this.node.parent.emit(UIEventType.HERO_SEL, this.heroId);
    }

    onSelHeroEvent(id: number) {
        this.setSelType(id == this.heroId ? 1 : 0);
    }

    onEnable() {
        this.node.on(UIEventType.HERO_SEL, this.onSelHeroEvent, this);
    }

    onDisable() {
        this.node.off(UIEventType.HERO_SEL, this.onSelHeroEvent, this);
    }
}
