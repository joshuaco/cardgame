import CardPlayer from '../cards/CardPlayer.js';
import Grid from './Grid.js';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image('armor', 'assets/images/armor.png');
    this.load.image('card', 'assets/images/card.png');
    this.load.image('dead', 'assets/images/dead.png');
    this.load.image('deathknight', 'assets/images/deathknight.png');
    this.load.image('firedrake', 'assets/images/firedrake.png');
    this.load.image('goldendragon', 'assets/images/goldendragon.png');
    this.load.image('healingpotion', 'assets/images/healingpotion.png');
    this.load.image('kobold', 'assets/images/kobold.png');
    this.load.image('ogre', 'assets/images/ogre.png');
    this.load.image('paladin', 'assets/images/paladin.png');
    this.load.image('playercard', 'assets/images/playercard.png');
    this.load.image('restartbutton', 'assets/images/restartbutton.png');
    this.load.image('shield', 'assets/images/shield.png');
    this.load.image('troll', 'assets/images/troll.png');
    this.load.bitmapFont(
      'pressstart',
      'assets/fonts/pressstart.png',
      'assets/fonts/pressstart.fnt'
    );
  }
  create() {
    this.grid = new Grid({
      scene: this,
      columns: 3,
      rows: 3,
    });

    this.player = new CardPlayer({
      scene: this,
      name: 'Paladin',
      x: this.game.config.width / 2,
      y: this.game.config.height - 200,
      card: 'playercard',
      image: 'paladin',
      health: 16,
      depth: 1,
      ondragend: (pointer, gameObject) => {
        this.player.x = this.player.originalX;
        this.player.y = this.player.originalY;

        if (this.highlighted) {
          switch (this.highlighted.cardtype) {
            case 'attack':
              this.player.attack(this.highlighted.value);
              this.highlighted.dead = true;
              break;
            case 'heal':
              this.player.health = Math.min(this.player.health + this.highlighted.value, this.player.maxHealth);
              break;
            case 'armor':
              this.player.armor = this.highlighted.value;
              break;
          }
        }
      },
    });
  }
  update(time, delta) {
    this.grid.cards[0].highlighted = false;
    this.grid.cards[1].highlighted = false;
    this.grid.cards[2].highlighted = false;
    this.highlighted = null;

    let columnWidth = this.game.config.width / this.grid.columns;

    if (this.player.y < 700) {
      if (this.player.x < columnWidth) {
        this.grid.cards[0].highlighted = true;
        this.highlighted = this.grid.cards[0];
      } else if (this.player.x > columnWidth * 2) {
        this.grid.cards[2].highlighted = true;
        this.highlighted = this.grid.cards[2];
      } else {
        this.grid.cards[1].highlighted = true;
        this.highlighted = this.grid.cards[1];
      }
    }
  }
}
