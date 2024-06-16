import { Column, Entity, DeleteDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Entity({name : 'user'})
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({unique: true})
	macID: string;

	@Column()
	password: string;

	@Column()
	username: string;

	@Column()
	videoURL: string;

	@DeleteDateColumn()
	createdDt: Date;

	@UpdateDateColumn()
	updateDt: Date;

	@BeforeInsert()
	private BeforeInsert() {
		this.password = bcrypt.hashSync(this.password, 10);
	}
}
