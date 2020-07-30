import UIBase from "../UIBase";
import { SpeedDef, GameState, BuildType } from "../Define/GameDef";
import Floor from "./Floor";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FloorManager extends UIBase {

	@property(cc.Prefab)
	floorPref: cc.Prefab = null;

	gameState: GameState = null;
	floorPool: cc.NodePool[] = [];
	floorMap: cc.Node[] = [];
	floorX: number = 0;

	onLoad() {
		this.gameState = GameState.INIT;
		for (let i = BuildType.START; i <= BuildType.HIGHT; i++)
			this.floorPool[i] = new cc.NodePool();
		for (let i = 0; i < 15; i++) {
			if (i)
				this.newFloor(BuildType.MIDDLE1);
			else
				this.newFloor(BuildType.START);
		}
	}

	newFloor(type: BuildType) {
		let floor: cc.Node = null;
		if (this.floorPool[type].size() > 0)
			floor = this.floorPool[type].get();
		else
			floor = cc.instantiate(this.floorPref);
		floor.getComponent(Floor).init(type);
		floor.parent = this.node;
		floor.x = this.floorX;
		this.floorX += floor.width;
		this.floorMap.push(floor);
	}

	update(dt: number) {
		if (this.gameState < GameState.RUN || this.gameState == GameState.DIE)
			return true;
		this.floorX -= dt * SpeedDef.FLOOR_SPEED
		this.floorMap.forEach((floor, index) => {
			floor.x -= dt * SpeedDef.FLOOR_SPEED;
		});
		for (let i = this.floorMap.length - 1; i >= 0; i--) {
			if (this.floorMap[i].x + this.floorMap[i].width < 0) {
				let node = this.floorMap.splice(i, 1)[0];
				this.floorPool[node.getComponent(Floor).type].put(node);
				let floor: cc.Node = null;
				if (Math.random() * 10 < 5) {
					this.newFloor(BuildType.END);
					// this.floorX += Math.floor(Math.random() * 500) + 50;
					this.newFloor(BuildType.START);
				} else
					this.newFloor(BuildType.MIDDLE1);
			}
		}
	}

	onDestroy() {
		for (const pool of this.floorPool)
			pool.clear();
	}
}
