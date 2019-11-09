const { ccclass, property } = cc._decorator;

@ccclass
export default class RoomScene extends cc.Component {

  @property([cc.Button])
  btnAction: cc.Button[] = [];
  @property([cc.Button])
  btnInfo: cc.Button[] = [];
  @property(cc.Node)
  mainView: cc.Node = null;
  @property(cc.Node)
  heroView: cc.Node = null;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.mainView.setPosition(0, 0);
    for (let btn of this.btnInfo) {
      btn.node.on(cc.Node.EventType.TOUCH_START, this.onBtnInfoStart);
      btn.node.on(cc.Node.EventType.TOUCH_END, this.onBtnInfoEnd);
      btn.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onBtnInfoCancel);
    }
  }

  start() {
    this.onShowMainView();
  }

  onShowMainView() {
    this.mainView.active = true;
    this.heroView.active = false;
  }

  onShowHeroView() {
    this.mainView.active = false;
    this.heroView.active = true;
  }

  onBtnInfoStart(event) {
    let sprite: cc.Node = event.target.getChildByName('Pressed');
    sprite.active = true;
  }

  onBtnInfoEnd(event) {
    let sprite: cc.Node = event.target.getChildByName('Pressed');
    sprite.active = false;
  }

  onBtnInfoCancel(event) {
    let sprite: cc.Node = event.target.getChildByName('Pressed');
    sprite.active = false;
  }

  onChangeScene() {
    cc.director.loadScene('GameScene');
  }

  // update (dt) {}
}
