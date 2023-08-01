import { Post } from '@prisma/client';

export class PostEntity implements Post {
  id: number;
  published: boolean;
  title: string;
  content: string;
  creatdAt: Date;
  updatedAt: Date;
  authorId: number;
}
