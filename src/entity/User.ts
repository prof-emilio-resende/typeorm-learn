import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Invoice } from "./Invoice"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @OneToMany(() => Invoice, (invoice) => invoice.user)
    invoices: Invoice[]
}
