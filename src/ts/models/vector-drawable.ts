
export default abstract class Unit {
    posX: number = 0;
    posY: number = 0;
    velocity: number = 0;
    orientation: number = 0;

    protected abstract drawVectors: [number, number][];

    private degreesToRadians(degrees: number): number {
        return (degrees / 180.0) * Math.PI;
    }

    private rotateVector(a: [number, number], theta: number): [number, number] {
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);

        return [a[0] * cosTheta - a[1] * sinTheta, a[0] * sinTheta + a[1] * cosTheta];
    }

    private addVectors(a: [number, number], b: [number, number]): [number, number] {
        return [a[0] + b[0], a[1] + b[1]];
    }

    public update(): void {
        //this.posX += this.velocity * Math.cos(this.degreesToRadians(this.orientation));
        //this.posY += this.velocity * Math.sin(this.degreesToRadians(this.orientation));
        this.orientation = (this.orientation + 1) % 360;
    }

    public draw(graphics: PIXI.Graphics): void {
        graphics.beginFill(0x0000CC);
        graphics.lineStyle(2, 0xaaaaff, 1);
        let first: boolean = true;
        for (const vector of this.drawVectors) {
            const result = this.addVectors([this.posX, this.posY], this.rotateVector(vector, this.degreesToRadians(this.orientation)));
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
