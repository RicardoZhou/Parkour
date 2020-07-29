namespace Utils {
    export interface BoxColliderListenner {
        onCollisionEnter?(other: cc.BoxCollider, self: cc.BoxCollider): void;
        onCollisionStay?(other: cc.BoxCollider, self: cc.BoxCollider): void;
        onCollisionExit?(other: cc.BoxCollider, self: cc.BoxCollider): void;
    }
}