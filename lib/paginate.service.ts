import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { PAGINATE_OPTIONS } from './paginate.constans';
import { PaginateOptions, PaginateModuleOptions } from './interfaces';
import { FindAndCountOptions } from 'sequelize/types';

@Injectable()
export class PaginateService {
   constructor(
      @Inject(PAGINATE_OPTIONS)
      private options: PaginateModuleOptions,
      private readonly sequelize: Sequelize,
   ) {}

   async findAllPaginate(
      options: PaginateOptions,
      optionsSequelize: FindAndCountOptions = {},
   ): Promise<any> {
      let url = this.options.url;
      const structure = this.options.structure;
      const details = this.options.details;
      const isComplete = details === 'complete';

      const modelName = options.model.name;

      const offset = options.offset || null;
      const page = options.page || null;
      const path = options.path || null;
      const allowOffset = options.showOffset || false;
      const end = page * offset;
      const start = end - offset;

      let totalItems = 0;
      let totalPages = 0;
      const itemCount = offset;

      // Pages
      let nextPage = null;
      let prevPage = null;

      // Urls
      let nextUrl = null;
      let prevUrl = null;
      let firstUrl = null;
      let lastUrl = null;

      // Aux
      let aux: any;

      // Data variables
      let payload: { [key: string]: any } = {};
      let items: any[] = [];

      const data = await this.sequelize.models[modelName].findAndCountAll({
         ...optionsSequelize,
         limit: offset,
         offset: start,
      });

      totalItems = data.count;
      totalPages = Math.ceil(totalItems / offset);
      items = data.rows;

      aux = page + 1;
      nextPage = aux <= totalPages ? aux : null;
      aux = page - 1;
      prevPage = aux >= 1 ? aux : null;

      url += path + '?page=';

      firstUrl = url + 1;
      lastUrl = url + totalPages;

      nextPage && (nextUrl = url + nextPage);
      prevPage && (prevUrl = url + prevPage);

      if (allowOffset) {
         nextPage && (nextUrl += '&offset=' + offset);
         prevPage && (prevUrl += '&offset=' + offset);
      }

      const meta = {
         page,
         // offset,
         // itemCount,
         // totalItems,
         // totalPages,
      };

      isComplete && (meta['offset'] = offset),
         ((meta['totalItems'] = totalItems),
         (meta['totalPages'] = totalPages),
         (meta['itemCount'] = itemCount));

      const links = {
         nextUrl,
         prevUrl,
      };

      isComplete &&
         ((links['firstUrl'] = firstUrl), (links['lastUrl'] = lastUrl));

      switch (structure) {
         case 'segmented':
            payload = {
               meta,
               links,
               items,
            };
            break;
         case 'simple':
         default:
            payload = {
               ...meta,
               ...links,
               items,
            };
            break;
      }

      return payload;
   }
}
