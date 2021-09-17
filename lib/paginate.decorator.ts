import { createParamDecorator } from '@nestjs/common'

export const PaginateQuery = createParamDecorator((param: 'all', input) => {
  const {
    route: { path },
    query,
  } = input

  const offset: any = query.offset ? parseFloat(query.offset) : null
  const page: any = query.page ? parseFloat(query.page) : null

  let payload: { [key: string]: any } = {
    path: path,
    page: page,
    offset: offset,
    showOffset: param === 'all' || false,
  }
  return payload
})
