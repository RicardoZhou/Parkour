export enum GameState { INIT, ENTER, RUN, JUMP, SLIP, DIE };

export enum ColliderGroup {
    HERO = 'Hero',
    FLOOR = 'Floor',
}

export enum SpeedDef {
    GRAVITY = 50,
    BG_MIDDLE_SPEED = 50,
    BG_NEAR_SPEED = 80,
    BG_RIVER_SPEED = 100,
    FLOOR_SPEED = 250,
    HERO_SPEED_MIN = -600,
};

export enum BuildType {
    START,
    MIDDLE1,
    MIDDLE2,
    END,
    HIGHT,
};