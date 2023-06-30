import { prisma } from '../../libs/config/initializers/database'
export class Post {
    dataSource:any
    constructor() {
      this.dataSource = prisma.post
    }
    
    async create(input:any){
      const post = this.dataSource.create({
        data: input || undefined,
      })
      return await prisma.$transaction([post])
    }

    async update(input:any, select:any){
      const post = this.dataSource.update({
        data: input || undefined,
        where: {
            id: input.id
        },
        select: select,
      })
      return await prisma.$transaction([post])
    }

    async destroy(input:any){
      const post = prisma.user.delete({
        where: {
            id: input.id
        },
      })
      return await prisma.$transaction([post])
    }

    async find_by(input:any){
        return await this.dataSource.findMany({
            where: input,
          });
    }

    async where(input:any){
        if (input.pagination.page == null || input.pagination.limit == null){
            return await this.dataSource.findMany()
        }else{
            return await this.dataSource.findMany({
                skip: input.pagination.page*input.pagination.limit,
                take: input.pagination.limit,
              })
        }
    }
}