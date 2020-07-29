import UIBase from "../UIBase";
import { BuildType } from "../Define/GameDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Floor extends UIBase {

	@property(cc.Sprite)
	sprite: cc.Sprite = null;
	@property(cc.SpriteAtlas)
	atlas: cc.SpriteAtlas = null;
	@property(cc.BoxCollider)
	collider: cc.BoxCollider = null;

	type: BuildType = 0;

	init(type: BuildType) {
		this.type = type;
		let frame: cc.SpriteFrame = null;
		switch (type) {
			case BuildType.START:
				frame = this.atlas.getSpriteFrame('6');
				break;
			case BuildType.MIDDLE1:
				frame = this.atlas.getSpriteFrame('7');
				break;
			case BuildType.MIDDLE2:
				frame = this.atlas.getSpriteFrame('8');
				break;
			case BuildType.END:
				frame = this.atlas.getSpriteFrame('9');
				break;
			case BuildType.HIGHT:
				frame = this.atlas.getSpriteFrame('10');
				break;
		}
		this.sprite.spriteFrame = frame;
		this.node.setContentSize(this.sprite.node.getContentSize());
		this.collider.size = cc.size(this.sprite.node.width, this.sprite.node.height - 20);
		this.collider.offset = cc.v2(this.collider.size.width / 2, this.collider.size.height / 2);
	}

}
