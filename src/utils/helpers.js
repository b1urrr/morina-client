export const formatPrice = (num) => {
    return new Intl.NumberFormat('bg-BG', {
      style: 'currency',
      currency: 'BGN',
    }).format(num / 100)
  }

  export const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type])
    if (type === 'colors') {
      unique = unique.flat()
    }
  
    return ['all', ...new Set(unique)]
  }