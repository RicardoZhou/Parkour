const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

  @property(cc.Sprite)
  bgSprite: cc.Sprite = null;
  @property(cc.SpriteAtlas)
  gameUI: cc.SpriteAtlas = null;

  @property
  text: string = 'hello';

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {

  }

  setStyle(style: number) {

  }

  // update (dt) {}
}
