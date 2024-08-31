import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { Exclude, classToPlain } from 'class-transformer';
import bcrypt from 'bcryptjs';

@Entity()
export class Artist {
  private static readonly saltRounds = 10;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(Artist.saltRounds);
      this.password = salt;
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Column('simple-array')
  genre: string[];

  @Column()
  website: string;

  @Column()
  nationality: string;

  @Column('json')
  social_media_url: { name: string; link: string };

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column()
  picture: string;
  toJSON() {
    return classToPlain(this);
  }
}
