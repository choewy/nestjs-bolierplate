import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Member } from '@domain/member/entity/member.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'varchar', length: 1024 })
  contents: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @ManyToOne(() => Member, (e) => e.posts, { onDelete: 'CASCADE' })
  @JoinColumn()
  readonly member: Member;
}
