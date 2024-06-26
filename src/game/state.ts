export let state = {
  selectedCategory: '',
  gameWord: '',
  selectedLetters: new Set(),
  currentLetterIndex: 0,
}

export const resetState = () =>
  (state = {
    selectedCategory: '',
    gameWord: '',
    selectedLetters: new Set(),
    currentLetterIndex: 0,
  })
