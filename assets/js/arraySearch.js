const arraySearch = (arr, value, key = 'id') => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === value) {
      return true
    }
  }
  return false
}

export default arraySearch
