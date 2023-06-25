export default class CardBase extends Phaser.GameObjects.Container {
  constructor(data) {
    let { scene, name,  x, y, card, image, depth } = data;
    let spriteCard = new Phaser.GameObjects.Sprite(scene, 0, 0, card);
    let spriteImage = new Phaser.GameObjects.Sprite(scene, 0, 10, image);
    let textName = new Phaser.GameObjects.BitmapText(
      scene,
      0,
      0,
      'pressstart',
      name,
      16,
      Phaser.GameObjects.BitmapText.ALIGN_CENTER
    );
    super(scene, x, y, [spriteCard, spriteImage, textName]);
    this.spriteCard = spriteCard;
    this.spriteImage = spriteImage;
    this.textName = textName;
    this.cardname = name;
    this.depth = depth;
    this.scene = scene;
    this.scene.add.existing(this);
  }

  set cardname(newName) {
    this._cardname = newName;
    this.textName.text = this._cardname;
    this.textName.maxWidth = this.spriteCard.width;
    this.textName.tint = 0;
    this.textName.x = -this.textName.width / 2;
    this.textName.y = 120 - this.textName.height;
  }
}
