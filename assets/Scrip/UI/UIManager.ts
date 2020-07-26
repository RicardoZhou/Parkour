import UIBase from "../UIBase";
import MainView from "./MainView";
import { UIType } from "../Define/Define";
import SelHeroView from "./SelHeroView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager extends UIBase {

    @property(cc.Prefab)
    mainView: cc.Prefab = null;
    @property(cc.Prefab)
    selHeroView: cc.Prefab = null;

    uiMap = new Map<UIType, UIBase>()

    onLoad() {
        this.initMainView();
        this.initSelHeroView();
    }

    private initMainView() {
        let ui = cc.instantiate(this.mainView);
        this.node.addChild(ui);
        ui.setPosition(0, 0);
        let comp = ui.getComponent(MainView);
        comp.init(this);
        this.uiMap.set(UIType.MainView, comp);
    }

    private initSelHeroView() {
        let ui = cc.instantiate(this.selHeroView);
        this.node.addChild(ui);
        ui.setPosition(0, 0);
        let comp = ui.getComponent(SelHeroView);
        comp.init(this);
        this.uiMap.set(UIType.SelHeroView, comp);
    }

    showUI(showTypes: UIType[]) {
        this.uiMap.forEach((ui, type) => {
            if (showTypes.includes(type))
                ui.show();
            else
                ui.hide();
        });
    }

    showSelHero() {
        this.showUI([UIType.SelHeroView]);
    }

    closeSelHeroView() {
        this.showUI([UIType.MainView]);
    }

    selHero(id: number) {
        this.showUI([UIType.MainView]);
        (<MainView>this.uiMap.get(UIType.MainView)).showSelHeroBody(id);
    }

    // update (dt) {}
}
