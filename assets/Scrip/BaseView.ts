const { ccclass, property } = cc._decorator;
import HeroBaseMng from './Manager/HeroBaseMng';
import { SpeedDef, GameState } from './Define/GameDef';
import FloorManager from './Game/FloorManager';

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
    @property(FloorManager)
    floorManager: FloorManager = null;

    hero: cc.Node;
    heroMng: HeroBaseMng;
    gameState: GameState;

    onLoad() {
        this.hero = cc.instantiate(this.heroPrf[0]);
        this.node.addChild(this.hero);
        this.hero.position = cc.v2(-60, 120);
        this.heroMng = this.hero.getComponent('Hero0Mng');
        this.btnSlip.node.on(cc.Node.EventType.TOUCH_START, this.onSlipTouchStart, this);
        this.btnSlip.node.on(cc.Node.EventType.TOUCH_END, this.onSlipTouchEnd, this);
        this.btnSlip.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onSlipTouchEnd, this);
        this.changeGameState(GameState.init);
    }

    changeGameState(state: GameState) {
        this.gameState = state;
        this.floorManager.gameState = state;
    }

    start() {
        this.heroMng.enter(this, this.changeGameState);
    }

    moveBg(dt: number) {
        for (let i = 0; i < 2; i++) {
            this.bg1[i].x -= dt * SpeedDef.BG_MIDDLE_SPEED;
            if (this.bg1[i].x < -this.bg1[i].width)
                this.bg1[i].x += this.bg1[i].width * 2;
            this.bg2[i].x -= dt * SpeedDef.BG_NEAR_SPEED;
            if (this.bg2[i].x < -this.bg2[i].width)
                this.bg2[i].x += this.bg2[i].width * 2;
            this.bg3[i].x -= dt * SpeedDef.BG_RIVER_SPEED;
            if (this.bg3[i].x < -this.bg3[i].width)
                this.bg3[i].x += this.bg3[i].width * 2 - 2;
        }
    }

    onActTouch(target: cc.Node, data: any) {
        if (this.gameState < GameState.run)
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
        if (this.gameState < GameState.run || this.gameState == GameState.die)
            return true;
        this.moveBg(dt);
    }
}
