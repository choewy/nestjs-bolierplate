import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Member } from '@domain/member/entity/member.entity';
import { DateTime } from 'luxon';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  @ManyToOne(() => Member, { onDelete: 'CASCADE' })
  @JoinColumn()
  fromMember: Member;

  @ManyToOne(() => Member, { onDelete: 'CASCADE' })
  @JoinColumn()
  toMember: Member;

  createdAtToString() {
    return DateTime.fromJSDate(this.createdAt).toISO();
  }
}
