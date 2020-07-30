const { ccclass, property } = cc._decorator;
import { GameState, ColliderGroup, SpeedDef } from '../Define/GameDef';
import UIBase from '../UIBase';

@ccclass
export default class HeroBaseMng extends UIBase implements Utils.BoxColliderListenner {

	@property(cc.Animation)
	animation: cc.Animation = null;
	@property
	acceleration: number = 1;
	@property([Number])
	jumpSpeed: number[] = [1000, 1000];

	//hero stay at centerX
	centerX: number = 400;
	//hero move speed in x and y
	speed: cc.Vec2 = cc.v2(0, 0);
	//now jump stage, if jumpStage > jumpMax, can not jump next
	jumpStage: number = -1;
	gameState: GameState = 0;
	//direction of collider between hero and other
	colliderDir: cc.Vec2 = cc.v2(0, 0);
	//collider in x-axis
	colliderTarget: cc.Node = null;
	colliderNum: number = 0;

	onLoad() {
		this.node.setPosition(cc.v2(100, 500));
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

	//todo aabb reset, but still check by preAabb, result 'this.colliderTarget = other.node'
	onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
		let selfW = self.world;
		let otherW = other.world;
		switch (other.node.group) {
			case ColliderGroup.FLOOR:
				if (otherW.preAabb.xMin > selfW.preAabb.xMax && otherW.aabb.xMin < selfW.aabb.xMax) {
					if (otherW.preAabb.yMax <= selfW.preAabb.yMin) {//left-top to right-bottom
						if (otherW.aabb.yMax - selfW.aabb.yMin < selfW.aabb.xMax - otherW.aabb.xMin) {
							this.speed.y = 0;
							this.node.y = other.world.aabb.yMax;
						}
						else {
							this.colliderTarget = other.node;
						}
					} else if (otherW.preAabb.yMin >= selfW.preAabb.yMax) {//left-bottom to right-top
						if (selfW.aabb.yMax - otherW.aabb.yMin < selfW.aabb.xMax - otherW.aabb.xMin) {
							this.speed.y *= -1;
							this.node.y = other.world.aabb.yMin - this.node.height;
						} else {
							this.colliderTarget = other.node;
						}
					} else {
						this.colliderTarget = other.node;
					}
				} else if (otherW.preAabb.yMax <= selfW.preAabb.yMin) {//top to bottom
					this.speed.y = 0;
					this.node.y = other.world.aabb.yMax;
				} else if (otherW.preAabb.yMin >= selfW.preAabb.yMax) {//bottom to top
					this.speed.y *= -1;
					this.node.y = other.world.aabb.yMin - this.node.height;
				}
				break;
		}
		this.colliderNum++;
	}

	onCollisionStay(other: cc.BoxCollider, self: cc.BoxCollider) {
		if (this.colliderTarget && this.colliderTarget == other.node)
			return;
		switch (other.node.group) {
			case ColliderGroup.FLOOR:
				this.speed.y = 0;
				this.node.y = other.world.aabb.yMax;
				if (this.gameState == GameState.JUMP)
					this.run();
				break;
		}
		this.node.color = cc.Color.RED;
	}

	onCollisionExit(other: cc.BoxCollider, self: cc.BoxCollider) {
		this.node.color = cc.Color.WHITE;
		if (this.colliderTarget && this.colliderTarget == other.node)
			this.colliderTarget = null;
		this.colliderNum--;
	}

	update(dt: number) {
		if (this.speed.y)
			this.node.y += this.speed.y * dt;
		this.speed.y = Math.max(this.speed.y - SpeedDef.GRAVITY, SpeedDef.HERO_SPEED_MIN);
		if (this.colliderTarget) {
			this.node.x = this.colliderTarget.x;
			this.speed.x = this.acceleration;
		} else if (this.speed.x) {
			this.node.x = Math.min(this.node.x + this.speed.x, this.centerX);
			if (this.node.x == this.centerX)
				this.speed.x = 0;
		}
	}
}