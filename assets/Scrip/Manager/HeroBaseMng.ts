const { ccclass, property } = cc._decorator;
import { GAMER_STATE } from '../Define/GameDef';

@ccclass
export default abstract  class HeroBaseMng extends cc.Component {

    @property(cc.Animation)
    animation: cc.Animation = null;
    @property
    jumpMax: number = 0;

    //now jump stage, if jumpStage > jumpMax, can not jump next
    jumpStage: number = -1;
    baseY: number;
    state: GAMER_STATE = 0;

    onLoad() {
    }

    abstract jump(): void;

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
                return GAMER_STATE.jump == GAMER_STATE[clip]
                    || GAMER_STATE.run == GAMER_STATE[clip]
                    || GAMER_STATE.slip == GAMER_STATE[clip];
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

    run() {
        this.jumpStage = -1;
        this.animation.play('run');
        this.setGamerState('run');
    }

    slip() {
        this.animation.play('slip');
        this.setGamerState('slip');
    }
}