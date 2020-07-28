import UIBase from "../UIBase";
import { ModelManager } from "../Model/ModelManager";
import ScaleAdapter from "../Utils/UI/ScaleAdapter";
import UIManager from "./UIManager";
import SelHeroPrefab from "./SelHeroPrefab";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SelHeroView extends UIBase {

    @property([cc.Prefab])//角色prefab
    heroBodyPref: cc.Prefab[] = [];
    @property(cc.Prefab)//选择角色Item prefab
    selHeroItemPref: cc.Prefab = null;
    @property(cc.Node)//选择角色容器
    selHeroContent: cc.Node = null;
    @property(cc.Label)
    textGold: cc.Label = null;
    @property(cc.Label)
    textDiamonds: cc.Label = null;
    @property(cc.Node)
    btnGold: cc.Node = null;
    @property(cc.Node)
    btnDiamonds: cc.Node = null;
    @property(cc.Node)
    btnClose: cc.Node = null;

    onLoad() {
        super.onLoad();
    }

    init(uiManager: UIManager) {
        let selId = ModelManager.getPlayer().getSelId();
        this.heroBodyPref.forEach((pref, id) => {
            let item = cc.instantiate(this.selHeroItemPref);
            let node = cc.instantiate(pref);
            node.addComponent(ScaleAdapter);
            item.getComponent(SelHeroPrefab).init(id);
            item.getComponent(SelHeroPrefab).setSelType(selId);
            item.getChildByName('Content').addChild(node);
            item.getChildByName('BtnSel').on(cc.Node.EventType.TOUCH_END, () => {
                ModelManager.getPlayer().setSelId(id);
                uiManager.selHero(id);
            })
            this.selHeroContent.addChild(item);
        });

        this.btnClose.on(cc.Node.EventType.TOUCH_END, () => {
            uiManager.closeSelHeroView();
        });
    }

    show() {
        super.show();
        let selId = ModelManager.getPlayer().getSelId();
        for (const item of this.selHeroContent.children)
            item.getComponent(SelHeroPrefab).setSelType(selId);
        this.textGold.string = String(ModelManager.getPlayer().getGold());
        this.textDiamonds.string = String(ModelManager.getPlayer().getDiamonds());
    }

    // update (dt) {}
}
