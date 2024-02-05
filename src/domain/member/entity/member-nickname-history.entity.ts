import { DateTime } from 'luxon';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Member } from './member.entity';

@Entity()
export class MemberNicknameHistory {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'varchar', length: 20 })
  readonly beforeNickname: string;

  @Column({ type: 'varchar', length: 20 })
  readonly updatedNickname: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @ManyToOne(() => Member, (e) => e.nicknameHistories, { onDelete: 'CASCADE' })
  @JoinColumn()
  readonly member: Member;

  createdAtToString() {
    return DateTime.fromJSDate(this.createdAt).toISO();
  }
}
