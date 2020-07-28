import ModelBase from "./ModelBase";
import { LocalKey } from "../Define/Define";

export default class PlayerModel extends ModelBase {
    selHeroId: number = null;
    gold: number = null;
    diamonds: number = null;

    constructor() {
        super();
        let heroId = cc.sys.localStorage.getItem(LocalKey.PLAYER_HERO)
        this.selHeroId = isNaN(heroId) ? 0 : Number(heroId);

        let goldStr = cc.sys.localStorage.getItem(LocalKey.PLAYER_GOLD)
        this.gold = isNaN(goldStr) ? 1000 : Number(goldStr);

        let diamondsStr = cc.sys.localStorage.getItem(LocalKey.PLAYER_DIAMONDS)
        this.diamonds = isNaN(diamondsStr) ? 0 : Number(diamondsStr);
    }

    private setGold(gold: number) {
        this.gold = gold;
        cc.sys.localStorage.setItem(LocalKey.PLAYER_GOLD, this.gold);
    }

    getGold() {
        return this.gold;
    }

    changeGold(offset: number): boolean {
        this.setGold(this.gold + offset);
        return true;
    }

    private setDiamonds(diamonds: number) {
        this.diamonds = diamonds;
        cc.sys.localStorage.setItem(LocalKey.PLAYER_DIAMONDS, this.diamonds);
    }

    getDiamonds() {
        return this.diamonds;
    }

    changeDiamonds(offset: number): boolean {
        this.setDiamonds(this.diamonds + offset);
        return true;
    }

    setSelId(id: number) {
        this.selHeroId = id;
        cc.sys.localStorage.setItem(LocalKey.PLAYER_HERO, this.selHeroId);
    }

    getSelId() {
        return this.selHeroId;
    }


}
