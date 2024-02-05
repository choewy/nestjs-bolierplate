import { DateTime } from 'luxon';
import { Column, CreateDateColumn, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { MemberNicknameHistory } from './member-nickname-history.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'varchar', length: 400 })
  readonly email: string;

  @Column({ type: 'date' })
  readonly birthday: Date;

  @Column({ type: 'varchar', length: 20 })
  nickname: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @OneToMany(() => MemberNicknameHistory, (e) => e.member, { cascade: ['insert', 'remove'] })
  @JoinTable()
  nicknameHistories: MemberNicknameHistory[];

  birthdayToString() {
    return DateTime.fromJSDate(this.birthday).toSQLDate();
  }

  createdAtToString() {
    return DateTime.fromJSDate(this.createdAt).toISO();
  }
}
