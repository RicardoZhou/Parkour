import PlayerModel from "./PlayerModel";

export class ModelManager {
    private static playerModel: PlayerModel = undefined;

    static getPlayer() {
        if (!this.playerModel)
            this.playerModel = new PlayerModel;
        return this.playerModel;
    }
}
