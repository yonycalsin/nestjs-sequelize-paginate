import { FindAndCountOptions } from 'sequelize/types';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

interface MoreI {
   [key: string]: any;
}

export interface PaginateModuleOptionsI {
   isGlobal?: boolean;
   url?: string;
   showUrl?: boolean;
}

export interface PaginateOptionsI extends MoreI {
   modelName?: string;
   where?: FindAndCountOptions;
   page: number;
   offset?: number;
   path?: string;
   url?: string;
   allowOffset?: boolean;
}
export interface PaginateReturnI extends MoreI {
   page: number;
   offset: number;
   all_pages: number;
   count_items: number;
   items: any;
   next_page?: number;
   prev_page?: number;
   next_page_url?: string;
   prev_page_url?: string;
}
export interface PaginateQueryI {
   page: number;
   path: string;
   url: string;
   offset?: number;
}
