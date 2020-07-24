import SelHeroPrefab from "./SelHeroPrefab";
import ScaleAdapter from "./Utils/UI/ScaleAdapter";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RoomScene extends cc.Component {

    @property([cc.Button])//游戏模式与开始游戏按钮
    btnAction: cc.Button[] = [];
    @property([cc.Button])//坐骑、角色、宠物选择按钮
    btnInfo: cc.Button[] = [];
    @property(cc.Node)//主界面
    mainView: cc.Node = null;
    @property(cc.Node)//英雄选择界面
    heroView: cc.Node = null;

    @property([cc.Prefab])//角色prefab
    heroPref: cc.Prefab[] = [];

    @property(cc.Prefab)//选择角色prefab
    selHeroPref: cc.Prefab = null;
    @property(cc.Node)//选择角色容器
    selHeroContent: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.mainView.setPosition(cc.v2(0, 0));
        for (let btn of this.btnInfo) {
            btn.node.on(cc.Node.EventType.TOUCH_START, this.onBtnInfoStart);
            btn.node.on(cc.Node.EventType.TOUCH_END, this.onBtnInfoEnd);
            btn.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onBtnInfoCancel);
        }

        let layout: cc.Layout = this.selHeroContent.getComponent(cc.Layout);

        for (let i = 0; i < 5; i++) {
            let heroSel: cc.Node = cc.instantiate(this.selHeroPref);
            this.selHeroContent.addChild(heroSel);
            let hero = cc.instantiate(this.heroPref[i == 0 ? 0 : 1]);
            hero.parent = heroSel.getChildByName('Content');
            hero.addComponent(ScaleAdapter);
            if (i == 0)
                heroSel.getComponent(SelHeroPrefab).setStyle(0);
            else
                heroSel.getComponent(SelHeroPrefab).setStyle(1);
        }
    }

    start() {
        this.onShowMainView();
    }

    onShowMainView() {
        this.mainView.active = true;
        this.heroView.active = false;
    }

    onShowHeroView() {
        this.mainView.active = false;
        this.heroView.active = true;
    }

    onBtnInfoStart(event: cc.Event.EventTouch) {
        let sprite: cc.Node = event.target.getChildByName('Pressed');
        sprite.active = true;
    }

    onBtnInfoEnd(event: cc.Event.EventTouch) {
        let sprite: cc.Node = event.target.getChildByName('Pressed');
        sprite.active = false;
    }

    onBtnInfoCancel(event: cc.Event.EventTouch) {
        let sprite: cc.Node = event.target.getChildByName('Pressed');
        sprite.active = false;
    }

    onChangeScene() {
        cc.director.loadScene('GameScene');
    }

    // update (dt) {}
}
