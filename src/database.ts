import mongoose, { ConnectionOptions } from 'mongoose'
import config from './config/config'

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
}

mongoose.connect(config.DB.URI, dbOptions)

const connection = mongoose.connection

connection.once('open', () => {
  console.log('Mongodb Connection established')
})

connection.on('error', (err) => {
  console.log('Mongodb connection error:', err)
  process.exit()
})
