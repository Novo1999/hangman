import { generateAlphabets } from './gameLoader'
import { state } from './state'

class GamePlayer {
  selectLetter: () => void
  constructor() {
    this.selectLetter = function () {
      const keyboardButtons = document.querySelectorAll('.keyboard-btn')

      keyboardButtons.forEach((btn) => {
        btn.addEventListener('click', (btn: any) => {
          console.log(state.gameWord)
          const letter = btn.target.innerText.toLowerCase()

          console.log(state.selectedLetters)

          if (!state.gameWord.includes(letter.toLowerCase())) {
            state.selectedLetters.add(letter)
            const keyboard = document.querySelector('.keyboard')
            keyboard!.innerHTML = generateAlphabets()
              .map((alp) => {
                return `<button class='btn keyboard-btn ${
                  state.selectedLetters.has(alp.toLowerCase())
                    ? 'line-through'
                    : ''
                } btn-outline btn-accent text-white rounded-xl size-20 flex justify-center items-center text-5xl border-2 uppercase'>
            ${alp}
          </button>`
              })
              .join('')
            this.selectLetter()
          }
        })
      })
    }
  }
}

export const gamePlayer = new GamePlayer()
