import * as PIXI from "pixi.js";

let app = new PIXI.Application({ width: 1280, height: 720 });

document.body.appendChild(app.view); 

const graphics = new PIXI.Graphics();

console.log('hello');

graphics.beginFill(0x0000CC);
graphics.lineStyle(2, 0xaaaaff, 1);
graphics.moveTo(200,200);
graphics.lineTo(250,100);
graphics.lineTo(300,200);
graphics.lineTo(250,170);
graphics.closePath();
graphics.endFill();

app.stage.addChild(graphics);
