import { generateRandomNums } from '../utils/generateRandomNums'
import { gameLoader } from './gameLoader'
import { state } from './state'

const parsedData = await fetch('../../data/data.json').then((response) =>
  response.json()
)

const BUTTON_TYPES = ['btn-info', 'btn-success', 'btn-warning', 'btn-error']

class Categories {
  categories: string[]
  categoryData: typeof parsedData
  loadCategories: () => void
  generateRandomButton: () => string
  selectCategory: () => void
  constructor(data: { categories: string[] }) {
    this.categories = Object.keys(data.categories)
    this.categoryData = data.categories
    this.generateRandomButton = function () {
      return BUTTON_TYPES[generateRandomNums(0, BUTTON_TYPES.length)]
    }
    this.loadCategories = function () {
      const categorySelector = document.querySelector('.categories')
      categorySelector!.innerHTML = this.categories
        .map((category) => {
          return `<button class="btn btn-category ${this.generateRandomButton()}">${category}</button>`
        })
        .join('')
    }
    this.selectCategory = function () {
      const categoryButtons = document.querySelectorAll('.btn-category')

      categoryButtons.forEach((btn) => {
        btn.addEventListener('click', (btn: any) => {
          state.selectedCategory = btn.target.innerText
          gameLoader.loadGame()
        })
      })
    }
  }
}

export const categories = new Categories(parsedData)
