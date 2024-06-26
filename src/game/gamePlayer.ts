import { categories } from './categories'
import { generateAlphabets } from './gameLoader'
import { resetState, state } from './state'

class GamePlayer {
  selectLetter: () => void
  updateKeyboard: () => void
  updateMysteryWord: () => void
  endGame: () => void
  resetEverything: () => void
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
          <div class="rounded-xl p-10 flex justify-center items-center text-3xl size-20 bg-blue-500 opacity-100 uppercase">${matched}</div>
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
      if (this.matchedLetters.join('') === state.gameWord) {
        this.endGame()
      }
      const keyboardButtons = document.querySelectorAll('.keyboard-btn')

      keyboardButtons.forEach((btn) => {
        btn.addEventListener('click', (btn: any) => {
          const letter = btn.target.innerText.toLowerCase()

          if (!state.gameWord.includes(letter.toLowerCase())) {
            state.selectedLetters.add(letter)
            const health: any = document.querySelector('.range')

            // lower health by 10 if player chooses wrong letter
            health.value = health.value -= 10

            if (Number(health.value) === 0) {
              this.endGame()
            }

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
    this.endGame = function () {
      const overlay = document.querySelector('.overlay')

      overlay!.innerHTML = `
      <dialog id="end_game_modal" class="modal">
        <div class="modal-box">
          <h3 class="text-lg font-bold">Game Over!</h3>
          <p class="py-4">You lost the game</p>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn restart-button btn-primary">Restart</button>
            </form>
          </div>
        </div>
      </dialog>`

      const endGameModal: any = document.getElementById('end_game_modal')

      // daisy ui way to open a modal
      endGameModal.showModal()

      const restartButton = document.querySelector('.restart-button')

      restartButton?.addEventListener('click', () => {
        this.resetEverything()
      })
    }
    this.resetEverything = function () {
      const game: HTMLElement = document.querySelector('.game') as HTMLElement
      const menu: HTMLElement = document.querySelector('.menu') as HTMLElement

      game.classList.replace('block', 'hidden')
      menu.classList.replace('hidden', 'block')

      resetState()
      this.matchedLetters = []
      const health: any = document.querySelector('.range')
      health.value = 80

      // load categories
      categories.loadCategories()

      // select categories
      categories.selectCategory()
    }
  }
}

export const gamePlayer = new GamePlayer()
