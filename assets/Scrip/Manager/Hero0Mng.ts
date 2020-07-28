const { ccclass, property } = cc._decorator;
import HeroBaseMng from './HeroBaseMng';

@ccclass
export default class Hero0Mng extends HeroBaseMng {

  // onLoad () {}

  start() {

  }

  jump() {
    this.jumpStage ++;
    if(this.jumpStage > this.jumpMax)
      return;
    let time = 0.9;
    this.node.stopAllActions()
    let moveUp = cc.moveBy(time, cc.v2(0, 200)).easing(cc.easeCubicActionOut());
    let moveDown = cc.moveTo(time, cc.v2(this.node.x, this.baseY)).easing(cc.easeCubicActionIn());
    let callFunc = cc.callFunc(this.run, this)
    let act = cc.sequence(moveUp, moveDown, callFunc)
    this.node.runAction(act);
    this.animation.play('jump' + this.jumpStage);
    this.setGamerState('jump');
}

  // update (dt) {}
}
