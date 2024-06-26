import { generateAlphabets } from './gameLoader'
import { state } from './state'

class GamePlayer {
  selectLetter: () => void
  updateKeyboard: () => void
  updateMysteryWord: () => void
  matchedLetters: string[]
  constructor() {
    this.matchedLetters = []
    this.updateKeyboard = function () {
      const keyboard = document.querySelector('.keyboard')

      keyboard!.innerHTML = generateAlphabets()
        .map((alp) => {
          const isWrong = state.selectedLetters.has(alp.toLowerCase())

          return `<button class='btn keyboard-btn ${
            isWrong ? 'line-through btn-error' : ''
          } btn-outline btn-accent text-white rounded-xl size-20 flex justify-center items-center text-5xl border-2 uppercase'>
            ${alp}
          </button>`
        })
        .join('')
    }
    this.updateMysteryWord = function () {
      const gameWordArray = state.gameWord.split('')

      const mysteryWordDOMElement = document.querySelector('.mystery-word')

      const updatedMysteryWord = gameWordArray
        .map((ltr1) => {
          const matched = this.matchedLetters.find((ltr2) => ltr1 === ltr2)
          if (matched) {
            return `
          <div class="rounded-xl p-10 size-20 bg-blue-500 opacity-100">${matched}</div>
          `
          } else {
            return `
          <div class="rounded-xl p-10 size-20 bg-blue-500 opacity-50"></div>
          `
          }
        })
        .join('')
      mysteryWordDOMElement!.innerHTML = updatedMysteryWord
    }
    this.selectLetter = function () {
      const keyboardButtons = document.querySelectorAll('.keyboard-btn')

      keyboardButtons.forEach((btn) => {
        btn.addEventListener('click', (btn: any) => {
          console.log(state.gameWord)
          const letter = btn.target.innerText.toLowerCase()

          console.log(state.selectedLetters)

          if (!state.gameWord.includes(letter.toLowerCase())) {
            state.selectedLetters.add(letter)
            const health: any = document.querySelector('.range')

            // lower health by 10 if player chooses wrong letter
            health.value = health.value -= 10

            this.updateKeyboard()
            this.selectLetter()
          } else {
            const maxIndex = state.gameWord.length - 1
            this.matchedLetters.push(letter.toLowerCase())
            if (state.currentLetterIndex <= maxIndex) {
              state.currentLetterIndex++
            } else {
              state.currentLetterIndex = 0
            }
            this.updateMysteryWord()
          }
        })
      })
    }
  }
}

export const gamePlayer = new GamePlayer()
