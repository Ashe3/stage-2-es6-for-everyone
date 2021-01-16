import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    const firstFighterHealthBar = document.getElementById('right-fighter-indicator');
    const secondFighterHealthBar = document.getElementById('left-fighter-indicator');
    
    if (firstFighter === secondFighter) {
      firstFighter = { ...firstFighter }
    }

    firstFighter.currenthealth = firstFighter.health;
    secondFighter.currenthealth = secondFighter.health;

    const hit = (attacker, defender, bar) => {
      defender.currenthealth -= getDamage(attacker, defender);
      bar.style.width = defender.currenthealth >= 0 ? `${defender.currenthealth / defender.health * 100}%` : '0%';
      if (defender.currenthealth <= 0) {
        resolve(attacker);
      }
    }

    document.addEventListener('keydown', event => {
      switch (event.code) {
        case controls.PlayerOneBlock:
          firstFighter.isBlock = true;
          break;
        case controls.PlayerTwoBlock:
          secondFighter.isBlock = true;
          break;
        default:
          console.log('any  DOWN');
          break;
      }
    });

    document.addEventListener('keyup', event => {
      switch (event.code) {
        case controls.PlayerOneAttack:
          hit(firstFighter, secondFighter, firstFighterHealthBar);
          break;
        case controls.PlayerOneBlock:
          firstFighter.isBlock = false;
          break;
        case controls.PlayerTwoAttack:
          hit(secondFighter, firstFighter, secondFighterHealthBar);
          break;
        case controls.PlayerTwoBlock:
          secondFighter.isBlock = false;
          break;
        default:
          console.log('any  UP');
          break;
      }
    });
  });
}

export function getDamage(attacker, defender) {
  const damage = getHitPower(attacker) - getBlockPower(defender);
  return damage >= 0 ? damage : 0;
}

export function getHitPower(fighter) {
  return fighter.isBlock ? 0 : fighter.attack * Math.random() + 1;
}

export function getBlockPower(fighter) {
  return !fighter.isBlock ? 0 : fighter.defense * Math.random() + 1;
}
