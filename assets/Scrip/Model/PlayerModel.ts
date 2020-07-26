import ModelBase from "./ModelBase";

export default class PlayerModel extends ModelBase {
    selHeroId: number = null;
    gold: number = null;

    constructor() {
        super();
        this.selHeroId = 0;
        this.gold = 1000;
    }

    setGold(gold: number) {
        this.gold = gold;
    }

    getGold() {
        return this.gold;
    }

    setSelId(id: number) {
        this.selHeroId = id;
    }

    getSelId() {
        return this.selHeroId;
    }


}
