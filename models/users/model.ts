import { prisma } from '../../libs/config/initializers/database'
export class User{
    dataSource:any
    constructor() {
      this.dataSource = prisma.user
    }
    
    async create(input:any){
      const user = this.dataSource.create({
        data: input || undefined,
      })
      return await prisma.$transaction([user])
    }

    async update(input:any, select:any){
      const user = this.dataSource.update({
        data: input || undefined,
        where: {
            id: input.id
        },
        select: select,
      })
    return await prisma.$transaction([user])
    }

    async destroy(input:any){
      const user = prisma.user.delete({
        where: {
            id: input.id
        },
      })
      return await prisma.$transaction([user])
    }
    
    async find(input:any){
      const paginationPosts = {
        skip: input.posts.skip,
        take: input.posts.take
      }
      const conditions = {id: input.id}
      if (input.posts == null){
        const users = await this.dataSource.findUniqueOrThrow({
          where: conditions,
        })
        return users;
      }
      const users = await this.dataSource.findUniqueOrThrow({
        where: conditions,
        include: {posts: input.posts}
      })
      return users;
    }

    async where(input:any){
      if (input.posts == null){
        const users = await this.dataSource.findMany({
          where: input.conditions, 
          take: input.take,
          skip: input.skip
        })
        return users;
      }
      const users = await this.dataSource.findMany({
        where: input.conditions, 
        include: {posts: input.posts}, 
        take: input.take,
        skip: input.skip
      })
      return users;
    }
}
