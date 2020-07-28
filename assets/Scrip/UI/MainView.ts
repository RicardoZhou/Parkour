import UIBase from "../UIBase";
import { ModelManager } from "../Model/ModelManager";
import ScaleAdapter from "../Utils/UI/ScaleAdapter";
import UIManager from "./UIManager";
import { Scene } from "../Define/Define";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainView extends UIBase {

    @property([cc.Node])//坐骑、角色、宠物选择按钮
    btnInfo: cc.Node[] = [];
    @property([cc.Prefab])
    heroBodyPref: cc.Prefab[] = [];
    @property(cc.Node)
    heroBodyContent: cc.Node = null;

    selHeroId: number = null;

    onLoad() {
        super.onLoad();
    }

    init(uiManager: UIManager) {
        this.showSelHeroBody();
        const { TOUCH_START, TOUCH_END, TOUCH_CANCEL } = cc.Node.EventType;

        this.btnInfo.forEach((btn, index) => {
            btn.on(TOUCH_START, () => {
                btn.getChildByName('Pressed').active = true;
            }, this, false);
            btn.on(TOUCH_END, () => {
                btn.getChildByName('Pressed').active = false;
                switch (index) {
                    case 1:
                        uiManager.showSelHero();
                        break;
                }
            }, this, false);
            btn.on(TOUCH_CANCEL, () => {
                btn.getChildByName('Pressed').active = false;
            }, this, false);
        });
    }

    showSelHeroBody(id?: number) {
        if (id === this.selHeroId)
            return;
        this.selHeroId = id === undefined ? ModelManager.getPlayer().getSelId() : id;
        this.heroBodyContent.removeAllChildren();
        let body = cc.instantiate(this.heroBodyPref[this.selHeroId]);
        body.addComponent(ScaleAdapter);
        this.heroBodyContent.addChild(body);
    }

    startGame() {
        cc.director.loadScene(Scene.Game);
    }

    // update (dt) {}
}
