console.log(stage);
//alert("you are an idiot")
const jiro = document.getElementById("taro");
const chara1 = document.getElementById("chara1");
const chara2 = document.getElementById("chara2");
const chara3 = document.getElementById("chara3");
const chara4 = document.getElementById("chara4");
const block1 = document.getElementById("block");
const haikei = document.getElementById("haikei1");

//console.log(chara1);
let x = 0;
let y = 10;
let vx = 0;
let xx = 0;
let vy = 0;
let s = 1024;
let n = 1;
let Character = 1;
let chara;
let secchi = "uiteru";
const ctx = jiro.getContext("2d");

ctx.fillStyle = "#ff77cc";

setInterval(yuyuyuyuyu, 1000 / 60);

setInterval(stepCharacter, 200);

function yuyuyuyuyu() {
  ctx.clearRect(0, 0, 512, 480);

  const hajime = -((x / 12 + 512) % 1024) - 512;
  ctx.drawImage(haikei, hajime, 0);
  ctx.drawImage(haikei, hajime + 1024, 0);

  //console.log(Character)
  if (Character === 1) chara = chara1;
  else if (Character === 2) chara = chara2;
  else if (Character === 3) chara = chara3;
  else if (Character === 4) chara = chara4;

  ctx.drawImage(chara, 200, 480 - 64 - y);

  for (let i = 0; i < stage.length; i++) {
    for (let j = 0; j < stage[i].length; j++) {
      // 縦がi番目・横がj番目の数字はstage[i][j]
      //console.log(i, j, stage[i][j]);
      if (stage[i][j] === 1) {
        ctx.drawImage(block1, 32 * j - x + 200, 32 * i);
      }
    }
  }

  //if()
  y = y + vy;
  x = x + vx;
  x = x + xx;

  const j = Math.floor(x / 32);
  const i = 15 - Math.ceil(y / 32);
  if (
    i >= 0 &&
    j >= 0 &&
    i < stage.length &&
    (stage[i][j] === 1 || stage[i][j + 1] === 1)
  ) {
    // 地面についてる
    y = (15 - i) * 32;
    vy = 0;
    secchi = "tsuiteru";
  } else {
    // 空中の処理
    vy = vy - 0.2;
    secchi = "uiteru";
  }
}
function stepCharacter() {
  Character = Character + 1;
  if (Character === 5) Character = 1;
}

document.addEventListener("keydown", keydown_ivent);

function keydown_ivent(e) {
  if (e.code === "Space" && secchi === "tsuiteru") {
    vy = 5;
  }
  if (e.code === "KeyD") {
    vx = 5;
  }
  if (e.code === "KeyA") {
    xx = -5;
  }
}
document.addEventListener("keyup", keyup_ivent);

function keyup_ivent(e) {
  if (e.code === "KeyD") {
    vx = 0;
  }
  if (e.code === "KeyA") {
    xx = 0;
  }
}
setInterval(yoyoyo, 1);

function yoyoyo() {}
