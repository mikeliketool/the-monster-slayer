<template>
  <div class="the_monster_slayer">
    <section class="row">
      <div class="small-6 columns">
        <h1 class="text-center">YOU</h1>
        <div class="healthbar">
            <div class="healthbar text-center"
                 style="background-color: green; margin: 0; color: white;"
                 :style="{width: `${this.player.health}%`}">
              {{ this.player.health }}
            </div>
        </div>
      </div>
      <div class="small-6 columns">
        <h1 class="text-center">MONSTER</h1>
        <div class="healthbar">
            <div class="healthbar text-center"
                 style="background-color: green; margin: 0; color: white;"
                 :style="{width: `${this.monster.health}%`}">
                {{ this.monster.health }}
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
    <section class="row log" v-if="turns.length > 0">
      <div class="small-12 columns">
        <ul>
            <li v-for="turn in turns" 
                :class="{'player-turn': turn.isPlayer, 'monster-turn': !turn.isPlayer}">
              {{ turn.text }}
            </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { Contestant } from '../models/contestant.js'
export default {
  name: 'TheMonsterSlayer',
  data() {
    return {
      player: new Contestant('player', 'You'),
      monster: new Contestant('monster', 'Monster'),
      gameIsRunning: false,
      turns: []
    }
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.player.health = 100;
      this.monster.health = 100;
      this.turns = [];
    },
    damageContestant(contestant, minDamage = 5, maxDamage = 12) {
      const damage = Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
      contestant.takeDamage(damage);
      this.turns.unshift({
        isPlayer: contestant.isPlayer,
        text: `${contestant.displayName} took ${damage} damage`
      });
    },
    checkForWin(contestant) {
      if (contestant.health <=0 ){
        if (confirm(`${contestant.displayName} Lost! Start another game?`)) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }

      return false;
    },
    doAttack(event, minDamage = 3, maxDamage = 10) {
      this.damageContestant(this.monster, minDamage, maxDamage);
      if (this.checkForWin(this.monster)) {
        return;
      }
      this.damageContestant(this.player);
      this.checkForWin(this.player);
    },
    doSpecialAttack() {
      this.doAttack(undefined, 20, 10);
    },
    doHealing() {
      this.player.heal();
      this.turns.unshift({
        isPlayer: this.player.isPlayer,
        text: `${this.player.displayName} heal for 10`
      });
      this.damageContestant(this.player);
    },
    giveUp() {
      this.gameIsRunning = false;
    }
  }
}
</script>
