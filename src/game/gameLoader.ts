import { generateRandomNums } from '../utils/generateRandomNums'
import { categories } from './categories'
import { gamePlayer } from './gamePlayer'
import { state } from './state'

export function generateAlphabets() {
  let alphabetLower = []
  for (let i = 97; i <= 122; i++) {
    alphabetLower.push(String.fromCharCode(i))
  }
  return alphabetLower
}

class GameLoader {
  loadGame: () => void
  setRandomWordFromCategory: (category: string) => void
  loadKeyboard: () => void
  constructor() {
    this.setRandomWordFromCategory = function (category) {
      const selectedCategoryWords = categories.categoryData[category]

      state.gameWord = categories.categoryData[category][
        generateRandomNums(0, selectedCategoryWords.length)
      ]
        .toLowerCase()
        .split('')
        .filter((ltr: string) => ltr !== ' ')
        .join('')
    }
    this.loadGame = function () {
      const menu: HTMLElement = document.querySelector('.menu') as HTMLElement
      const game: HTMLElement = document.querySelector('.game') as HTMLElement
      const currentCategory: HTMLElement = document.querySelector(
        '.current-category'
      ) as HTMLElement
      if (state.selectedCategory) {
        this.setRandomWordFromCategory(state.selectedCategory)
        menu.classList.add('hidden')
        game.classList.replace('hidden', 'block')
        currentCategory.innerText = state.selectedCategory

        const mysteryWordDOMElement = document.querySelector('.mystery-word')
        const gameWordArray = state.gameWord.split('')

        mysteryWordDOMElement!.innerHTML = gameWordArray
          .map(() => {
            return `
          <div class="rounded-xl p-10 size-20 bg-blue-500 opacity-50"></div>
          `
          })
          .join('')
        this.loadKeyboard()
      }
    }
    this.loadKeyboard = function () {
      const keyboard = document.querySelector('.keyboard')
      keyboard!.innerHTML = generateAlphabets()
        .map((alp) => {
          return `<button class='btn keyboard-btn btn-outline btn-accent text-white rounded-xl size-20 flex justify-center items-center text-5xl border-2 uppercase'>
            ${alp}
          </button>`
        })
        .join('')
      gamePlayer.selectLetter()
    }
  }
}

export const gameLoader = new GameLoader()
