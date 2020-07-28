const { ccclass, property } = cc._decorator;
import { GameState } from '../Define/GameDef';

@ccclass
export default abstract class HeroBaseMng extends cc.Component {

    @property(cc.Animation)
    animation: cc.Animation = null;
    @property
    jumpMax: number = 0;

    //now jump stage, if jumpStage > jumpMax, can not jump next
    jumpStage: number = -1;
    baseY: number;
    state: GameState = 0;

    onLoad() {
    }

    abstract jump(): void;

    setGamerState(state: string) {
        this.state = GameState[state];
    }

    doClip(clip: string) {
        if (this.checkClip(clip)) {
            this[clip]();
        }
    }

    checkClip(clip: string): boolean {
        switch (this.state) {
            case GameState.init:
                return GameState.enter == GameState[clip];
            case GameState.enter:
                return false;
            case GameState.run:
                return GameState.jump == GameState[clip]
                    || GameState.slip == GameState[clip];
            case GameState.jump:
                return GameState.jump == GameState[clip]
                    || GameState.run == GameState[clip]
                    || GameState.slip == GameState[clip];
            case GameState.slip:
                return GameState.run == GameState[clip];
            default:
                break;
        }
        return false;
    }

    enter(target: cc.Component, callback: Function) {
        this.baseY = this.node.y;
        let act = cc.moveTo(2, cc.v2(250, this.node.y));
        let callFunc = cc.callFunc(function () {
            callback.call(target, GameState.run);
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