import CardDraggable from './CardDraggable.js';

export default class CardPlayer extends CardDraggable {
  constructor(data) {
    let { health } = data;
    super(data);
    this.textHealth = new Phaser.GameObjects.BitmapText(
      this.scene,
      0,
      -103,
      'pressstart',
      health
    );
    this.textMaxHealth = new Phaser.GameObjects.BitmapText(
      this.scene,
      -20,
      -90,
      'pressstart',
      health,
      12
    );
    this.textArmor = new Phaser.GameObjects.BitmapText(
      this.scene,
      0,
      -100,
      'pressstart',
      5
    );
    this.spriteArmor = new Phaser.GameObjects.Sprite(
      this.scene,
      50,
      -80,
      'armor'
    );
    this.textHealth.tint = 0;
    this.textMaxHealth.tint = 0;
    this.add([
      this.spriteArmor,
      this.textArmor,
      this.textHealth,
      this.textMaxHealth,
    ]);
    this.health = health;
    this.maxHealth = health;
    this.armor = 0;
  }

  set health(newHealth) {
    this._health = newHealth;
    this.textHealth.text = this._health;
    this.textHealth.x = -44 - this.textHealth.width / 2;
  }

  get health() {
    return this._health;
  }

  set maxHealth(newMaxHealth) {
    this._maxHealth = newMaxHealth;
  }

  get maxHealth() {
    return this._maxHealth;
  }

  set armor(newArmor) {
    this._armor = newArmor;
    this.textArmor.x = 48 - this.textArmor.width / 2;

    //if armor is 0 then armor will not be visible
    this.textArmor.alpha = this._armor == 0 ? 0 : 1;
    this.spriteArmor.alpha = this._armor == 0 ? 0 : 1;
  }

  get armor() {
    return this._armor;
  }

  attack(attackValue) {
    if (attackValue <= this.armor) {
      this.armor = this.armor - attackValue;
    } else {
      this.health = this.health - (attackValue - this.armor);
      this.armor = 0;
    }
    if (this.health <= 0) this.dead = true;
  }

  set dead(dead) {
    this.health = 0;
    this.cardname = 'DEAD';
    this.draggable = false;
  }

  get dead() {
    return (this._cardname = 'DEAD');
  }
}
