import CardGrid from '../cards/CardGrid.js';
import cardTypes from '../cards/cardTypes.js';

export default class Grid {
  constructor(data) {
    let { scene, columns, rows } = data;
    this.xOffset = 120;
    this.yOffset = 280;
    this.yStart = scene.game.config.height / 2;
    this.columns = columns;
    this.rows = rows;
    this.scene = scene;
    this.cards = [];
    this.addCards(0);
  }

  addCards(startIndex) {
    for (let index = startIndex; index < this.columns * this.rows; index++) {
      const cardtype = cardTypes[Math.floor(Math.random() * cardTypes.length)];

      let card = new CardGrid({
        scene: this.scene,
        x:
          this.xOffset +
          (this.scene.game.config.width / 2 - this.xOffset) * (index % this.columns),
        y: this.yStart - this.yOffset * Math.floor(index / this.columns),
        card: 'card',
        image: cardtype.image,
        value: cardtype.value,
        name: cardtype.name,
        type: cardtype.type,
      });
      card.depth = 0;
      this.cards.push(card);
    }
  }
}
