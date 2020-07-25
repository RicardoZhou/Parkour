const { ccclass, property } = cc._decorator;
import { GAMER_STATE } from '../Define/GameDef';

@ccclass
export default class HeroBaseMng extends cc.Component {

    @property(cc.Animation)
    animation: cc.Animation = null;

    baseY: number;
    state: GAMER_STATE = 0;

    onLoad() {
    }

    start() {

    }

    onEnable() {
    }

    update(dt) {
    }

    setGamerState(state: string) {
        this.state = GAMER_STATE[state];
    }

    doClip(clip: string) {
        if (this.checkClip(clip)) {
            this[clip]();
        }
    }

    checkClip(clip: string): boolean {
        switch (this.state) {
            case GAMER_STATE.init:
                return GAMER_STATE.enter == GAMER_STATE[clip];
            case GAMER_STATE.enter:
                return false;
            case GAMER_STATE.run:
                return GAMER_STATE.jump == GAMER_STATE[clip]
                    || GAMER_STATE.slip == GAMER_STATE[clip];
            case GAMER_STATE.jump:
            case GAMER_STATE.slip:
                return GAMER_STATE.run == GAMER_STATE[clip];
            default:
                break;
        }
        return false;
    }

    enter(target: cc.Component, callback: Function) {
        this.baseY = this.node.y;
        let act = cc.moveTo(2, cc.v2(200, this.node.y));
        let callFunc = cc.callFunc(function () {
            callback.call(target, 0);
            this.setGamerState('run');
        }.bind(this));
        this.node.runAction(cc.sequence(act, callFunc));
        this.setGamerState('enter');
    }

    jump() {
        let time = 0.9;
        this.node.stopAllActions()
        let moveUp = cc.moveBy(time, cc.v2(0, 200)).easing(cc.easeCubicActionOut());
        let moveDown = cc.moveTo(time, cc.v2(this.node.x, this.baseY)).easing(cc.easeCubicActionIn());
        let callFunc = cc.callFunc(this.run, this)
        let act = cc.sequence(moveUp, moveDown, callFunc)
        this.node.runAction(act);
        this.animation.play('roll');
        this.setGamerState('jump');
    }

    run() {
        this.animation.play('run');
        this.setGamerState('run');
    }

    slip() {
        this.animation.play('slip');
        this.setGamerState('slip');
    }
}