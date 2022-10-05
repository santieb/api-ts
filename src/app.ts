import 'reflect-metadata'
import 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { UserRouter } from './user/user.router'
import { ConfigServer } from './config/config'
import { DataSource } from 'typeorm'
import { ProductRouter } from './product/product.router'
import { CategorytRouter } from './category/category.router'
import { CustomerRouter } from './customer/customer.router'

class ServerBootstrap extends ConfigServer {
  private app: express.Application = express()
  private port: number = this.getNumberEnv('PORT')

  constructor () {
    super()

    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.dbConnect()
    this.app.use(morgan('dev'))
    this.app.use(cors())

    this.app.use('/api', this.routers())
    this.listen()
  }

  async dbConnect (): Promise<DataSource | void> {
    return this.initConnect
      .then(() => console.log('Connect Sucess'))
      .catch(err => console.error(err))
  }

  routers (): Array<express.Router> {
    return [
      new UserRouter().router,
      new ProductRouter().router,
      new CategorytRouter().router,
      new CustomerRouter().router]
  }

  private listen () {
    this.app.listen(this.port, () =>
      console.log(`Server listening on port => ${this.port}`))
  }
}

new ServerBootstrap()
