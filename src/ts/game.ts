import Fighter from "./models/fighter";
import * as PIXI from "pixi.js";

export default class Game {

    stage: PIXI.Container;
    graphics: PIXI.Graphics;

    fighter: Fighter;

    constructor(stage: PIXI.Container) {
        this.stage = stage;

        this.graphics = new PIXI.Graphics();
        stage.addChild(this.graphics);

        this.fighter = new Fighter();
    }

    public async reset(): Promise<void> {
        this.fighter.posX = 200;
        this.fighter.posY = 200;
        this.fighter.orientation = 0;
        this.fighter.velocity = 0;
    }

    public async update(): Promise<void> {
        this.fighter.update();
    }

    public async draw(): Promise<void> {
        this.graphics.clear();
        this.fighter.draw(this.graphics);
    }
}