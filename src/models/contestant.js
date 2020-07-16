export class Contestant {
  constructor(type, displayName) {
    this.type = type
    this.displayName = displayName;
    this.health = 100;
  }

  get isPlayer() {
    return this.type === 'player';
  }

  takeDamage(damage) {
    this.health -= damage;
  }

  heal() {
    this.health = this.health <= 90 ?
    this.health + 10 :
    100;
  }
}