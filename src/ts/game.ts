import Fighter from "./models/fighter";
import * as PIXI from "pixi.js";
import Controls from "./controls";
import Planet from "./models/planet";
import { segmentIntersectsCirlce } from "./util/collision";
import { degreesToRadians, getAngleDegreeDifference, getMagnitudeAndAngle, getVectorComponents, radiansToDegrees } from "./util/vector";

export default class Game { 

    stage: PIXI.Container;
    graphics: PIXI.Graphics;
    controls: Controls;
    fighter: Fighter;
    planet: Planet;

    lockReverse: boolean = false;
    collision: boolean = false;

    debugText: PIXI.Text;

    constructor(stage: PIXI.Container) {
        this.stage = stage;

        this.graphics = new PIXI.Graphics();
        stage.addChild(this.graphics);

        this.controls = new Controls();

        this.fighter = new Fighter();

        this.debugText = new PIXI.Text('', new PIXI.TextStyle({ fill: "#ffffff" }));
        this.debugText.x = 0;
        this.debugText.y = 0;
        stage.addChild(this.debugText);

        this.planet = new Planet();
        this.planet.posX = 500;
        this.planet.posY = 300;
    }

    public async onKeyDown(k: KeyboardEvent): Promise<void> {
        switch (k.key.toLowerCase()) {
            case "w":
                this.controls.thrust = true;
                break;
            case "s":
                this.controls.reverse = true;
                break;
            case "a":
                this.controls.rotateLeft = true;
                break;
            case "d":
                this.controls.rotateRight = true;
                break;
        }
    }

    public async onKeyUp(k: KeyboardEvent): Promise<void> {
        switch (k.key.toLowerCase()) {
            case "w":
                this.controls.thrust = false;
                break;
            case "s":
                this.controls.reverse = false;
                break;
            case "a":
                this.controls.rotateLeft = false;
                break;
            case "d":
                this.controls.rotateRight = false;
                break;
        }
    }

    public async reset(): Promise<void> {
        this.fighter.posX = 200;
        this.fighter.posY = 200;
        this.fighter.orientation = 0;
        this.fighter.velocity = 0;
        this.fighter.rotateSpeed = 2;
    }

    public async update(delta: number): Promise<void> {
        if (this.controls.thrust) {
            this.fighter.attachedPlanet = undefined;
            this.fighter.acceleration = 0.1;
        } else {
            this.fighter.acceleration = 0;
        }

        if (this.fighter.attachedPlanet) {
            const [x, y] = getVectorComponents(Planet.radius + 25, degreesToRadians(this.fighter.attachedPlanetAngle));
            this.fighter.posX = this.fighter.attachedPlanet.posX + x;
            this.fighter.posY = this.fighter.attachedPlanet.posY + y;
            this.fighter.orientation = this.fighter.attachedPlanetAngle;
            this.fighter.acceleration = 0;
            this.fighter.velocity = 0;
        } else {
            if (this.controls.rotateLeft && !this.controls.rotateRight) {
                this.fighter.rotateTick(-delta);
            } else if (this.controls.rotateRight && !this.controls.rotateLeft) {
                this.fighter.rotateTick(delta);
            }
    
            if (this.controls.reverse && !this.lockReverse) {
                this.lockReverse = true;
                this.fighter.reverse();
            } else if (!this.controls.reverse) {
                this.lockReverse = false;
            }
    
            this.fighter.updateVelocityTick(delta, [ this.planet ]);
            this.fighter.updatePositionTick(delta);
    
            const collision = this.fighter.checkPlanetCollision(this.planet);
    
            const angleToShip = radiansToDegrees(getMagnitudeAndAngle([this.planet.posX, this.planet.posY], [this.fighter.posX, this.fighter.posY])[1]);
    
            if (collision && getAngleDegreeDifference(angleToShip, this.fighter.orientation) < 20 && this.fighter.velocity < 1) {
                this.fighter.attachedPlanet = this.planet;
                this.fighter.attachedPlanetAngle = angleToShip;
                this.fighter.velocity = 0;
                this.fighter.acceleration = 0;
            } else if (collision) {
                this.reset();
            }
        }
    }

    public async draw(): Promise<void> {
        this.graphics.clear();
        this.planet.drawToGraphicsScene(this.graphics, 0, 0);
        this.fighter.drawToGraphicsScene(this.graphics, 0, 0);
        this.debugText.text = ``;
    }
}