import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Member } from '@domain/member/entity/member.entity';

@Index('post_index_member_id_date', ['member.id', 'date'])
@Entity()
export class Post {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  readonly id: number;

  @Column({ type: 'varchar', length: 1024 })
  contents: string;

  @Column({ type: 'date' })
  date: Date;

  @CreateDateColumn()
  readonly createdAt: Date;

  @ManyToOne(() => Member, (e) => e.posts, { onDelete: 'CASCADE' })
  @JoinColumn()
  readonly member: Member;
}
