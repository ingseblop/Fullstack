const config = require('./config')
const mongoose = require('mongoose')
const logger = require('./logger')

const conectDB = async () =>{
   try{
    await mongoose.connect(config.MONGODB_URI)
    logger.info('connected to MongoDB')
    console.log('connected')
  } catch(error){
    logger.error('error connecting to MongoDB:', error.message)
  }
}

module.exports = conectDB