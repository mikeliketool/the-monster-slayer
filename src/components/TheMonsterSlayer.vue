<template>
  <div class="the_monster_slayer">
    <section class="row">
      <div class="small-6 columns">
        <h1 class="text-center">YOU</h1>
        <div class="healthbar">
            <div class="healthbar text-center"
                 style="background-color: green; margin: 0; color: white;"
                 :style="{width: `${playerHealth}%`}">
              {{ playerHealth }}
            </div>
        </div>
      </div>
      <div class="small-6 columns">
        <h1 class="text-center">MONSTER</h1>
        <div class="healthbar">
            <div class="healthbar text-center"
                 style="background-color: green; margin: 0; color: white;"
                 :style="{width: `${monsterHealth}%`}">
                {{ monsterHealth }}
            </div>
        </div>
      </div>
    </section>
    <section class="row controls" v-if="!gameIsRunning">
      <div class="small-12 columns">
        <button id="start-game" @click="startGame">START NEW GAME</button>
      </div>
    </section>
    <section class="row controls" v-else>
      <div class="small-12 columns">
        <button id="attack" @click="doAttack">ATTACK</button>
        <button id="special-attack" @click="doSpecialAttack">SPECIAL ATTACK</button>
        <button id="heal" @click="doHealing">HEAL</button>
        <button id="give-up" @click="giveUp">GIVE UP</button>
      </div>
    </section>
    <section class="row log">
      <div class="small-12 columns">
        <ul>
            <li>

            </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TheMonsterSlayer',
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      gameIsRunning: false
    }
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.displayNames = {
        'playerHealth': 'You',
        'monsterHealth': 'Monster'
      }
    },
    damageOpponent(opponentHealth = 'playerHealth', minDamage = 5, maxDamage = 12) {
      const damage = Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
      this[opponentHealth] -= damage;
    },
    checkForWin(opponentHealth) {
      if (this[opponentHealth] <=0 ){
        if (confirm(`${this.displayNames[opponentHealth]} Lost! Start another game?`)) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }

      return false;
    },
    doAttack(event, minDamage = 3, maxDamage = 10) {
      this.damageOpponent('monsterHealth', minDamage, maxDamage);
      if (this.checkForWin('monsterHealth')) {
        return;
      }
      this.damageOpponent();
      this.checkForWin('playerHealth');
    },
    doSpecialAttack() {
      this.doAttack(undefined, 20, 10);
    },
    doHealing() {
      this.playerHealth = this.playerHealth <= 90 ?
        this.playerHealth + 10 :
        100;
      this.damageOpponent();
    },
    giveUp() {
      this.gameIsRunning = false;
    }
  }
}
</script>
