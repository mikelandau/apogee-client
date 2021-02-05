import { segmentIntersectsCirlce } from "../util/collision";
import { addVectors, degreesToRadians, getMagnitudeAndAngle, getVectorComponents, multiplyVector, radiansToDegrees, rotateVector } from "../util/vector";
import Planet from "./planet";

export default abstract class Unit {
    posX: number = 0;
    posY: number = 0;
    velocity: number = 0;
    velocityAngle: number = 0;
    acceleration: number = 0;
    orientation: number = 0;
    rotateSpeed: number = 0;

    attachedPlanet: Planet | undefined = undefined;
    attachedPlanetAngle: number = 0;

    protected abstract drawVectors: [number, number][];

    public rotateTick(delta: number): void {
        this.orientation = (this.orientation + this.rotateSpeed * delta + 360) % 360;
    }

    public reverse(): void {
        this.orientation = (this.orientation + 180) % 360;
    }

    public updateVelocityTick(delta: number, planets: Planet[]): void {
        const [oldVelX, oldVelY] = getVectorComponents(this.velocity, degreesToRadians(this.velocityAngle));
        
        let [accX, accY] = getVectorComponents(this.acceleration, degreesToRadians(this.orientation));

        for (const planet of planets) {
            const [distance, angle] = getMagnitudeAndAngle([this.posX, this.posY], [planet.posX, planet.posY]);
            let [planetGravX, planetGravY] = getVectorComponents(.02, angle);
            [planetGravX, planetGravY] = multiplyVector([planetGravX, planetGravY], 200 / (distance === 0 ? 1 : distance));
            accX += planetGravX;
            accY += planetGravY;
        }

        let newVelX = oldVelX + accX * delta;
        let newVelY = oldVelY + accY * delta;

        const [magnitude, velocityAngle] = getMagnitudeAndAngle([0,0], [newVelX, newVelY]);

        this.velocity = magnitude;
        this.velocityAngle = radiansToDegrees(velocityAngle);
    }

    public updatePositionTick(delta: number): void {
        this.posX += this.velocity * Math.cos(degreesToRadians(this.velocityAngle)) * delta;
        this.posY += this.velocity * Math.sin(degreesToRadians(this.velocityAngle)) * delta;
    }

    public checkPlanetCollision(planet: Planet):  boolean  {
        for (let i = 0; i < this.drawVectors.length; ++i) {
            const thisPoint = addVectors([this.posX, this.posY], rotateVector(this.drawVectors[i], degreesToRadians(this.orientation)));
            const nextPoint = addVectors([this.posX, this.posY], rotateVector(this.drawVectors[(i + 1) % this.drawVectors.length], degreesToRadians(this.orientation)));

            if (segmentIntersectsCirlce(thisPoint, nextPoint, [ planet.posX, planet.posY ], 128)) {
                return true;
            }
        }
        return false;
    }

    public drawToGraphicsScene(graphics: PIXI.Graphics, viewOffsetX: number, viewOffsetY: number): void {
        const effectiveX = this.posX - viewOffsetX;
        const effectiveY = this.posY - viewOffsetY;
        
        graphics.beginFill(0x000022);
        graphics.lineStyle(3, 0x0c0cff, 1);
        let first: boolean = true;
        for (const vector of this.drawVectors) {
            const result = addVectors([effectiveX, effectiveY], rotateVector(vector, degreesToRadians(this.orientation)));
            if (first) {
                graphics.moveTo(...result);
                first = false;
            } else {
                graphics.lineTo(...result);
            }
        }
        graphics.closePath();
        graphics.endFill();
    }
}
