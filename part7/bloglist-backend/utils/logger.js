const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') { 
    console.log('AQUI ESTAMOS PENANDO')
    console.log(...params)
  }
  }
  
  const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') { 
      console.error(...params)
    }
  }
  
  module.exports = {
    info, error
  }