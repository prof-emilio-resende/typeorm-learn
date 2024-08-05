import "reflect-metadata"
import { DataSource, In } from "typeorm"
import { User } from "./entity/User"
import { Invoice } from "./entity/Invoice"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Invoice],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
})
