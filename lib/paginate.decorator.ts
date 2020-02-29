import { createParamDecorator } from '@nestjs/common';

export const PaginateQuery = createParamDecorator((param: 'all', input) => {
   const {
      route: { path },
      query,
      url,
   } = input;
   const offset: any = query.offset ? parseFloat(query.offset) : null;
   const page: any = query.page ? parseFloat(query.page) : null;

   let payload: { [key: string]: any } = {
      [path && 'path']: path,
      [url && 'url']: url,
      [page && 'page']: page,
      [offset && 'offset']: offset,
      origin: 'paginate.query',
   };
   if (param === 'all') {
      payload['allowOffset'] = true;
   }

   if (typeof param === 'string') {
      if (param == 'all') {
         payload = {
            ...payload,
            [offset && 'offset']: offset,
         };
      }
   }
   return payload;
});
