import * as PIXI from "pixi.js";
import Game from "./game";

let app = new PIXI.Application({ width: 1280, height: 720 });

document.body.appendChild(app.view);

const game = new Game(app.stage);

document.addEventListener("keydown", (k) => {
    return game.onKeyDown(k);
});
document.addEventListener("keyup", (k) => {
    return game.onKeyUp(k);
});

game.reset().then(() => {
    app.ticker.add(async (delta: number) => {
        await game.update(delta);
        await game.draw();
    });
}).catch((e) => {
    console.error(`failed to start game: ${e}`);
});
