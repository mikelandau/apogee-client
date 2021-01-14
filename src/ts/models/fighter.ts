export default class Fighter {
    posX: number = 0;
    posY: number = 0;
    velocity: number = 0;
    orientation: number = 0;

    // most of this stuff will be extracted into more generic types.
    private drawVectors: [number, number][] = [
        [-25, -25],
        [25, 0],
        [-25, 25],
        [-10, 0]
    ];

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

    public updatePosition(): void {
        this.posX += this.velocity * Math.cos(this.degreesToRadians(this.orientation));
        this.posY += this.velocity * Math.sin(this.degreesToRadians(this.orientation));
    }

    public draw(graphics: PIXI.Graphics): void {
        graphics.beginFill(0x0000CC);
        graphics.lineStyle(2, 0xaaaaff, 1);
        let first: boolean = true;
        for (const vector of this.drawVectors) {
            const result = this.addVectors([this.posX, this.posY], this.rotateVector(vector, this.orientation));
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
