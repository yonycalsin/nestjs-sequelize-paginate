import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { PAGINATION_OPTIONS } from './paginate.constans';
import {
   PaginateOptionsI,
   PaginateReturnI,
   PaginateModuleOptionsI,
} from './interfaces';

@Injectable()
export class PaginateService {
   constructor(
      @Inject(PAGINATION_OPTIONS)
      private options: PaginateModuleOptionsI,
      private readonly sequelize: Sequelize,
   ) {}

   async findAllPaginate({
      page,
      offset,
      path,
      modelName,
      where = {},
      allowOffset,
      ...options
   }: PaginateOptionsI): Promise<PaginateReturnI> {
      const url = this.options.url;

      if (!offset) {
         throw new Error(
            '[NestPaginate] El valor de offset no puede estas vacio !',
         );
      }
      const end = page * offset;
      const start = end - offset;

      const data = await this.sequelize.models[modelName].findAndCountAll({
         ...where,
         limit: offset,
         offset: start,
      });

      const all_pages = Math.ceil(data.count / offset);

      let next_page = page + 1 <= all_pages ? page + 1 : null;
      let prev_page = page - 1 >= 1 ? page - 1 : null;

      let next_page_url: any = next_page
         ? `${url ? url : ''}${path}?page=${next_page}`
         : null;
      let prev_page_url = prev_page
         ? `${url ? url : ''}${path}?page=${prev_page}`
         : null;

      if (allowOffset) {
         next_page && (next_page_url += '&offset=' + offset);
         prev_page && (prev_page_url += '&offset=' + offset);
      }

      let payload: PaginateReturnI = {
         page,
         offset,
         all_pages,
         count_items: data.count,
         items: data.rows,
         next_page,
         prev_page,
      };

      if (this.options.showUrl) {
         payload = {
            ...payload,
            next_page_url,
            prev_page_url,
         };
      }

      return payload;
   }
}
