const { ccclass, property } = cc._decorator;
import HeroBaseMng from './Manager/HeroBaseMng';
import GameDef from './GameDef';

@ccclass
export default class BaseView extends cc.Component {

  @property([cc.Prefab])
  heroPrf: cc.Prefab[] = [];
  @property([cc.Node])
  bg1: cc.Node[] = [];
  @property([cc.Node])
  bg2: cc.Node[] = [];
  @property([cc.Node])
  bg3: cc.Node[] = [];
  @property(cc.Button)
  btnSlip: cc.Button = null;

  hero: cc.Node;
  heroMng: HeroBaseMng;
  state: number;//game state => -1 : init, 0 : start, 1 : over

  onLoad() {
    this.hero = cc.instantiate(this.heroPrf[0]);
    this.node.addChild(this.hero);
    this.hero.position = cc.v2(-60, 120);
    this.heroMng = this.hero.getComponent('Hero0Mng');
    this.btnSlip.node.on(cc.Node.EventType.TOUCH_START, this.onSlipTouchStart, this);
    this.btnSlip.node.on(cc.Node.EventType.TOUCH_END, this.onSlipTouchEnd, this);
    this.btnSlip.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onSlipTouchEnd, this);
    this.changeGameState(-1);
  }

  changeGameState(state: number) {
    this.state = state;
  }

  start() {
    this.heroMng.enter(this, this.changeGameState);
  }

  moveBg(dt) {
    for (let i = 0; i < 2; i++) {
      this.bg1[i].x -= dt * GameDef.BG_MIDDLE_SPEED;
      if (this.bg1[i].x < -this.bg1[i].width)
        this.bg1[i].x += this.bg1[i].width * 2;
      this.bg2[i].x -= dt * GameDef.BG_NEAR_SPEED;
      if (this.bg2[i].x < -this.bg2[i].width)
        this.bg2[i].x += this.bg2[i].width * 2;
      this.bg3[i].x -= dt * GameDef.BG_RIVER_SPEED;
      if (this.bg3[i].x < -this.bg3[i].width)
        this.bg3[i].x += this.bg3[i].width * 2 - 2;
    }
  }

  onActTouch(target: cc.Node, data: any) {
    if (this.state < 0)
      return true;
    if (data == 'jump') {
      this.heroMng.doClip(data);
    }
  }

  onSlipTouchStart() {
    this.heroMng.doClip('slip');
  }

  onSlipTouchEnd() {
    this.heroMng.doClip('run');
  }

  update(dt) {
    if (this.state < 0)
      return true;
    this.moveBg(dt);
  }
}
