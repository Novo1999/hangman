import { state } from './state'

class GameLoader {
  loadGame: () => void
  constructor() {
    this.loadGame = function () {
      const menu: HTMLElement = document.querySelector('.menu') as HTMLElement
      const game: HTMLElement = document.querySelector('.game') as HTMLElement
      const currentCategory: HTMLElement = document.querySelector(
        '.current-category'
      ) as HTMLElement
      if (state.selectedCategory) {
        menu.classList.add('hidden')
        game.classList.replace('hidden', 'block')
        currentCategory.innerText = state.selectedCategory
      }
    }
  }
}

export const gameLoader = new GameLoader()
