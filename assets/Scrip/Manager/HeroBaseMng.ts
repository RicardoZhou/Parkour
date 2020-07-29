const { ccclass, property } = cc._decorator;
import { GameState, GRAVITY, ColliderGroup } from '../Define/GameDef';
import UIBase from '../UIBase';

@ccclass
export default class HeroBaseMng extends UIBase implements Utils.BoxColliderListenner {

	@property(cc.Animation)
	animation: cc.Animation = null;
	@property(cc.Vec2)
	speed: cc.Vec2 = cc.v2(0, 0);
	@property([Number])
	jumpSpeed: number[] = [1000, 1000];

	//now jump stage, if jumpStage > jumpMax, can not jump next
	jumpStage: number = -1;
	baseY: number;
	gameState: GameState = 0;

	onLoad() {
	}

	setGamerState(state: GameState) {
		this.gameState = state;
	}

	doClip(state: GameState) {
		switch (state) {
			case GameState.RUN:
				this.run();
				break;
			case GameState.JUMP:
				if (this.gameState >= GameState.RUN && this.gameState < GameState.DIE)
					this.jump();
				break;
			case GameState.SLIP:
				if (this.gameState == GameState.RUN || this.gameState == GameState.JUMP)
					this.slip();
				break;
			default:
				break;
		}
	}

	enter(target: cc.Component, callback: Function) {
		this.baseY = this.node.y;
		let act = cc.moveTo(2, cc.v2(400, this.node.y));
		let callFunc = cc.callFunc(function () {
			callback.call(target, GameState.RUN);
			this.setGamerState(GameState.RUN);
		}.bind(this));
		this.node.runAction(cc.sequence(act, callFunc));
		this.setGamerState(GameState.ENTER);
	}

	run() {
		this.jumpStage = -1;
		this.animation.play('run');
		this.setGamerState(GameState.RUN);
	}

	slip() {
		this.animation.play('slip');
		this.setGamerState(GameState.SLIP);
	}

	jump() {
		if (this.jumpStage + 1 >= this.jumpSpeed.length)
			return;
		this.jumpStage++;
		this.animation.play('jump' + this.jumpStage);
		this.setGamerState(GameState.JUMP);
		this.speed.y = this.jumpSpeed[this.jumpStage];
	}


	onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
		switch (other.node.group) {
			case ColliderGroup.FLOOR:
				if (self.world.aabb.yMin < other.world.aabb.yMax)
					this.node.y = other.world.aabb.yMax;
				if (this.gameState == GameState.JUMP)
					this.run();
				break;
		}
	}

	onCollisionStay(other: cc.BoxCollider, self: cc.BoxCollider) {
		// this.node.color = cc.Color.RED;
	}

	onCollisionExit(other: cc.BoxCollider, self: cc.BoxCollider) {
		// this.node.color = cc.Color.WHITE;
	}

	update(dt: number) {
		if (this.jumpStage >= 0) {
			this.node.y += this.speed.y * dt;
			this.speed.y -= GRAVITY;
		}
	}
}