import Unit from "./unit";

export default class Fighter extends Unit {
    protected drawVectors: [number, number][] = [
        [-25, -25],
        [25, 0],
        [-25, 25],
        [-10, 0]
    ];
}
