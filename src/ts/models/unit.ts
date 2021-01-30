import { addVectors, degreesToRadians, getVectorComponents, radiansToDegrees, rotateVector } from "../util/vector";

export default abstract class Unit {
    posX: number = 0;
    posY: number = 0;
    velocity: number = 0;
    velocityAngle: number = 0;
    acceleration: number = 0;
    orientation: number = 0;
    rotateSpeed: number = 0;

    protected abstract drawVectors: [number, number][];



    public rotateTick(delta: number): void {
        this.orientation = (this.orientation + this.rotateSpeed * delta + 360) % 360;
    }

    public updateVelocityTick(delta: number): void {
        const [velX, velY] = getVectorComponents(this.velocity, degreesToRadians(this.velocityAngle));
        const [accX, accY] = getVectorComponents(this.acceleration, degreesToRadians(this.orientation));

        let newVelX = velX + accX * delta;
        let newVelY = velY + accY * delta;

        if (newVelX === 0) {
            this.velocityAngle = newVelY >= 0 ? 90 : 270;
        } else if (newVelX < 0) {
            this.velocityAngle = (radiansToDegrees(Math.atan(newVelY/newVelX)) + 180) % 360;
            
        } else {
            this.velocityAngle = (radiansToDegrees(Math.atan(newVelY/newVelX)) + 360) % 360;
        }

        this.velocity = Math.sqrt(newVelX * newVelX + newVelY * newVelY);
    }

    public updatePositionTick(delta: number): void {
        this.posX += this.velocity * Math.cos(degreesToRadians(this.velocityAngle)) * delta;
        this.posY += this.velocity * Math.sin(degreesToRadians(this.velocityAngle)) * delta;
    }

    public drawToGraphicsScene(graphics: PIXI.Graphics, viewOffsetX: number, viewOffsetY: number): void {
        const effectiveX = this.posX - viewOffsetX;
        const effectiveY = this.posY - viewOffsetY;
        
        graphics.beginFill(0x0000CC);
        graphics.lineStyle(2, 0xaaaaff, 1);
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
