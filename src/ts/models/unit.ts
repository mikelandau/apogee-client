
export default abstract class Unit {
    posX: number = 0;
    posY: number = 0;
    velocity: number = 0;
    velocityAngle: number = 0;
    acceleration: number = 0;
    orientation: number = 0;
    rotateSpeed: number = 0;

    protected abstract drawVectors: [number, number][];

    private degreesToRadians(degrees: number): number {
        return (degrees / 180.0) * Math.PI;
    }

    private radiansToDegrees(radians: number): number {
        return (radians / Math.PI) * 180.0
    }

    private rotateVector(a: [number, number], theta: number): [number, number] {
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);

        return [a[0] * cosTheta - a[1] * sinTheta, a[0] * sinTheta + a[1] * cosTheta];
    }

    private addVectors(a: [number, number], b: [number, number]): [number, number] {
        return [a[0] + b[0], a[1] + b[1]];
    }

    private getVectorComponents(magnitude: number, angleDegrees: number): [number, number] {
        return [magnitude * Math.cos(this.degreesToRadians(angleDegrees)),
            magnitude * Math.sin(this.degreesToRadians(angleDegrees))];
    }

    public rotateTick(delta: number): void {
        this.orientation = (this.orientation + this.rotateSpeed * delta + 360) % 360;
    }

    public updateVelocityTick(delta: number): void {
        const [velX, velY] = this.getVectorComponents(this.velocity, this.velocityAngle);
        const [accX, accY] = this.getVectorComponents(this.acceleration, this.orientation);

        let newVelX = velX + accX * delta;
        let newVelY = velY + accY * delta;

        if (newVelX === 0) {
            this.velocityAngle = newVelY >= 0 ? 90 : 270;
        } else if (newVelX < 0) {
            this.velocityAngle = (this.radiansToDegrees(Math.atan(newVelY/newVelX)) + 180) % 360;
            
        } else {
            this.velocityAngle = (this.radiansToDegrees(Math.atan(newVelY/newVelX)) + 360) % 360;
        }

        this.velocity = Math.sqrt(newVelX * newVelX + newVelY * newVelY);
    }

    public updatePositionTick(delta: number): void {
        this.posX += this.velocity * Math.cos(this.degreesToRadians(this.velocityAngle)) * delta;
        this.posY += this.velocity * Math.sin(this.degreesToRadians(this.velocityAngle)) * delta;
    }

    public drawToGraphicsScene(graphics: PIXI.Graphics, viewOffsetX: number, viewOffsetY: number): void {
        const effectiveX = this.posX - viewOffsetX;
        const effectiveY = this.posY - viewOffsetY;
        
        graphics.beginFill(0x0000CC);
        graphics.lineStyle(2, 0xaaaaff, 1);
        let first: boolean = true;
        for (const vector of this.drawVectors) {
            const result = this.addVectors([effectiveX, effectiveY], this.rotateVector(vector, this.degreesToRadians(this.orientation)));
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
