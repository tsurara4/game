console.log(stage);
//alert("you are an idiot")
const jiro = document.getElementById("taro");
const chara1 = document.getElementById("chara1");
const chara2 = document.getElementById("chara2");
const chara3 = document.getElementById("chara3");
const chara4 = document.getElementById("chara4");
const chara5 = document.getElementById("chara5");
const chara6 = document.getElementById("chara6");
const chara1R = document.getElementById("chara1R");
const chara2R = document.getElementById("chara2R");
const chara3R = document.getElementById("chara3R");
const chara4R = document.getElementById("chara4R");
const chara5R = document.getElementById("chara5R");
const chara6R = document.getElementById("chara6R");
const block1 = document.getElementById("block");
const haikei = document.getElementById("haikei1");
const gameover = document.getElementById("gameover");
const stageClear = document.getElementById("stage-clear");
const start = document.getElementById("yuhi");
const start2 = document.getElementById("torii");
const bgm = document.getElementById("bgm");
const play = document.getElementById("play");
const hata = document.getElementById("hata");

//console.log(chara1);
let x = 0;
let y = 100;
let vx = 0;
let vy = 0;
let s = 1024;
let n = 1;
let step = 1;
let chara;
let secchi = "uiteru";
let isGameover = false;
let isStageCleared = false;
let direction = "right";

let started = false;

let right = false;
let left = false;

const ctx = jiro.getContext("2d");

ctx.fillStyle = "#ff77cc";

setInterval(yuyuyuyuyu, 1000 / 60);

function yuyuyuyuyu() {
  if (isStageCleared) return;

  ctx.clearRect(0, 0, 512, 480);

  const hajime = -((x / 12 + 512) % 1024) - 512;
  ctx.drawImage(haikei, hajime, 0);
  ctx.drawImage(haikei, hajime + 1024, 0);

  if (y < -1500 && !isGameover) {
    console.log("si");
    gameover.style.display = "block";
    isGameover = true;
    setTimeout(function respawn() {
      isGameover = false;
      gameover.style.display = "none";
      y = 50;
      x = 0;
      vy = 1;
    }, 3000);
  }

  if (x > 1550 && !isStageCleared) {
    console.log("cleared");
    stageClear.style.display = "block";
    isStageCleared = true;
  
  }

  // 一周60fとする
  const c = step % 60;
  // ↑を6等分し易いようにする
  const s = c / 10;
  // 小数点以下を切り捨てる
  const t = Math.floor(s);

  if (direction === "right") {
    if (t === 0) chara = chara1R;
    else if (t === 1) chara = chara2R;
    else if (t === 2) chara = chara3R;
    else if (t === 3) chara = chara4R;
    else if (t === 4) chara = chara5R;
    else if (t === 5) chara = chara6R;
  } else if (direction === "left") {
    if (t === 0) chara = chara1;
    else if (t === 1) chara = chara2;
    else if (t === 2) chara = chara3;
    else if (t === 3) chara = chara4;
    else if (t === 4) chara = chara5;
    else if (t === 5) chara = chara6;
  }

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

  ctx.drawImage(hata, 1300-x, 100);

  // 速度分進める
  y = y + vy;
  x = x + vx;

  // キー入力による加速度設定
  vx = right ? 5 : left ? -5 : 0;

  /*
   * 衝突判定
   */
  // 横方向の衝突判定
  function collideX(modifier, modifier2) {
    const xIndex = x / 32;
    const yIndex = 15 - y / 32;
    const targetXIndex = Math.round(xIndex);
    const targetYIndex = Math.round(yIndex) + (modifier2 || 0);

    if (
      (targetYIndex - 2 >= 0 &&
        targetYIndex - 2 < stage.length &&
        stage[targetYIndex - 2][targetXIndex + modifier] === 1) ||
      (targetYIndex - 1 >= 0 &&
        targetYIndex - 1 < stage.length &&
        stage[targetYIndex - 1][targetXIndex + modifier] === 1)
    ) {
      vx = 0;
      x = targetXIndex * 32;
      return true;
    }

    return false;
  }

  // 縦方向の衝突判定
  function collideY(modifier1, modifier2, modifier3) {
    const xIndex = x / 32;
    const yIndex = 15 - y / 32;
    const targetXIndex = Math.round(xIndex);
    const targetYIndex = Math.round(yIndex);

    if (
      targetYIndex + modifier1 >= 0 &&
      targetYIndex + modifier1 < stage.length &&
      stage[targetYIndex + modifier1][targetXIndex + modifier3] === 1
    ) {
      vy = 0;
      y = (15 - targetYIndex + modifier2) * 32;
    }
  }

  // 計算の振り分け
  let xIndex = x / 32;
  let yIndex = 15 - y / 32;
  let fractionX = xIndex - Math.floor(xIndex);
  let fractionY = yIndex - Math.floor(yIndex);

  if (vx > 0 && fractionX < 0.5) {
    // 右に進んでいる
    collideX(1);
    if (fractionY > 0.1 && fractionY < 0.9) {
      if (fractionY > 0.5) collideX(1, -1);
      else collideX(1, 1);
    }
  }

  if (vx < 0 && fractionX > 0.5) {
    // 左に進んでいる
    collideX(-1);
    if (fractionY > 0.1 && fractionY < 0.9) {
      if (fractionY > 0.5) collideX(-1, -1);
      else collideX(-1, 1);
    }
  }

  // x軸の再計算
  xIndex = x / 32;
  fractionX = xIndex - Math.floor(xIndex);

  if (vy > 0 && fractionY > 0.5) {
    // 上に飛んでいる
    collideY(-3, 0, 0);
    if (fractionX > 0.1 && fractionX < 0.9) {
      if (fractionX < 0.5) collideY(-3, 0, 1);
      else collideY(-3, 0, -1);
    }
  }

  if (vy < 0 && fractionY < 0.5) {
    // 下に落ちている
    collideY(0, 0, 0);
    if (fractionX > 0.1 && fractionX < 0.9) {
      if (fractionX < 0.5) collideY(0, 0, 1);
      else collideY(0, 0, -1);
    }
  }

  // 接地チェック
  const floorYIndex = 15 - y / 32;
  const floorXIndex = x / 32;

  if (
    floorYIndex === Math.floor(floorYIndex) &&
    floorYIndex >= 0 &&
    floorYIndex < stage.length &&
    (stage[floorYIndex][Math.floor(floorXIndex)] === 1 ||
      (floorXIndex !== Math.floor(floorXIndex) &&
        stage[floorYIndex][Math.ceil(floorXIndex)] === 1))
  ) {
    secchi = "tsuiteru";
  } else {
    secchi = "uiteru";
    vy = vy - 0.2;
  }

  step++;
}

document.addEventListener("keydown", keydown_ivent);

function keydown_ivent(e) {
  if (e.code === "Space" && secchi === "tsuiteru" && started === "true") {
    vy = 7;
  }

  if (e.code === "Space") {
    started = "true";
    start.style.display = "none";
    start2.style.display = "none";
    bgm.play();
  play.style.display = "none";
  }

  if (e.code === "KeyD" && started === "true") {
    right = true;
    direction = "right";
  }
  if (e.code === "KeyA" && started === "true") {
    left = true;
    direction = "left";
  }
}
document.addEventListener("keyup", keyup_ivent);

function keyup_ivent(e) {
  if (e.code === "KeyD") {
    right = false;
  }
  if (e.code === "KeyA") {
    left = false;
  }
}

setInterval(yoyoyo, 1);

function yoyoyo() {}

