export default class Planet {
    public posX: number = 0;
    public posY: number = 0;

    public static radius: number = 128;

    public drawToGraphicsScene(graphics: PIXI.Graphics, viewOffsetX: number, viewOffsetY: number) {
        const effectiveX = this.posX - viewOffsetX;
        const effectiveY = this.posY - viewOffsetY;

        graphics.beginFill(0x000000);
        graphics.lineStyle(3, 0x00ff00);
        graphics.drawCircle(effectiveX, effectiveY, Planet.radius);
    }
}