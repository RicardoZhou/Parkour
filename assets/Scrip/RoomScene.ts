import SelHeroPrefab from "./SelHeroPrefab";
import ScaleAdapter from "./Utils/UI/ScaleAdapter";
import { UIEventType } from "./Define/EventDef";

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
    @property(cc.Node)
    heroBodyContent: cc.Node = null;

    @property([cc.Prefab])//角色prefab
    heroBodyPref: cc.Prefab[] = [];

    @property(cc.Prefab)//选择角色Item prefab
    selHeroPref: cc.Prefab = null;
    @property(cc.Node)//选择角色容器
    selHeroContent: cc.Node = null;

    selHeroId: number = null;

    onLoad() {
        this.selHeroId = 0;

        this.mainView.setPosition(cc.v2(0, 0));

        for (let i = 0; i < this.heroBodyPref.length; i++) {
            let heroSel: cc.Node = cc.instantiate(this.selHeroPref);
            heroSel.parent = this.selHeroContent;
            let hero = cc.instantiate(this.heroBodyPref[i]);
            hero.parent = heroSel.getChildByName('Content');
            hero.addComponent(ScaleAdapter);
            let script = heroSel.getComponent(SelHeroPrefab);
            script.init(i);
            script.setSelType(this.selHeroId);
        }
        this.showSelHeroBody();
    }

    start() {
        this.onShowMainView();
    }

    onEnable() {
        for (let btn of this.btnInfo) {
            btn.node.on(cc.Node.EventType.TOUCH_START, this.onBtnInfoStart, this, false);
            btn.node.on(cc.Node.EventType.TOUCH_END, this.onBtnInfoEnd, this, false);
            btn.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onBtnInfoCancel, this, false);
        }
        this.selHeroContent.on(UIEventType.HERO_SEL, this.onSelHeroEvent, this, false);
    }

    onShowMainView() {
        this.mainView.active = true;
        this.heroView.active = false;
    }

    onShowHeroView() {
        this.mainView.active = false;
        this.heroView.active = true;
    }

    showSelHeroBody(id?: number) {
        if (id !== undefined)
            this.selHeroId = id;
        this.heroBodyContent.removeAllChildren();
        let body = cc.instantiate(this.heroBodyPref[this.selHeroId]);
        body.addComponent(ScaleAdapter);
        body.parent = this.heroBodyContent;
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

    onSelHeroEvent(id: number) {
        this.onShowMainView();
        this.showSelHeroBody(id);
        for (let body of this.selHeroContent.children)
            body.getComponent(SelHeroPrefab).setSelType(id);
    }

    onChangeScene() {
        cc.director.loadScene('GameScene');
    }

    onDisable() {
        for (let btn of this.btnInfo) {
            btn.node.off(cc.Node.EventType.TOUCH_START, this.onBtnInfoStart, this, false);
            btn.node.off(cc.Node.EventType.TOUCH_END, this.onBtnInfoEnd, this, false);
            btn.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onBtnInfoCancel, this, false);
        }
        this.selHeroContent.off(UIEventType.HERO_SEL, this.onSelHeroEvent, this, false);
    }
}
