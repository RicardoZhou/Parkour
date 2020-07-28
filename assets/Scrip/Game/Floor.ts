import UIBase from "../UIBase";
import { BuildType } from "../Define/GameDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Floor extends UIBase {

    @property(cc.Sprite)
    sprite: cc.Sprite = null;
    @property(cc.SpriteAtlas)
    atlas: cc.SpriteAtlas = null;

    type: BuildType = 0;

    init(type: BuildType) {
        this.type = type;
        let frame: cc.SpriteFrame = null;
        switch (type) {
            case BuildType.start:
                frame = this.atlas.getSpriteFrame('6');
                break;
            case BuildType.middle1:
                frame = this.atlas.getSpriteFrame('7');
                break;
            case BuildType.middle2:
                frame = this.atlas.getSpriteFrame('8');
                break;
            case BuildType.end:
                frame = this.atlas.getSpriteFrame('9');
                break;
            case BuildType.high:
                frame = this.atlas.getSpriteFrame('10');
                break;
        }
        this.sprite.spriteFrame = frame;
        this.node.setContentSize(this.sprite.node.getContentSize());
    }

}
