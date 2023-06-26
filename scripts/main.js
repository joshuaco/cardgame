import MainScene from './scenes/MainScene.js';

const config = {
  width: 640,
  height: 1024,
  backgroundColor: '#333333',
  type: Phaser.AUTO,
  parent: 'phaser-game',
  scene: [MainScene],
};

new Phaser.Game(config);

const windowSize = document.querySelector(".window-size");
const width = document.createElement("p");
const height = document.createElement("p");

width.textContent = window.innerWidth;
height.textContent = window.innerHeight;

windowSize.appendChild(width);
windowSize.appendChild(height);