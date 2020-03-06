import { WhereOptions, ModelCtor } from 'sequelize/types';
import { Model } from 'sequelize';

interface MoreI {
   [key: string]: any;
}

export interface PaginateModuleOptions {
   isGlobal?: boolean;
   url?: string;
   showUrl?: boolean;
   structure?: 'simple' | 'segmented';
   details?: 'necessary' | 'complete';
}

export interface PaginateOptions {
   model?: ModelCtor<Model<any, any>>;
   page: number;
   offset?: number;
   path?: string;
   url?: string;
   showOffset?: boolean;
}
export interface PaginateReturn extends MoreI {
   page: number;
   offset: number;
   all_pages?: number;
   count_items: number;
   items: any;
   next_page?: number;
   prev_page?: number;
   next_page_url?: string;
   prev_page_url?: string;
}
export interface PaginateQueryInterface {
   page: number;
   path: string;
   url: string;
   offset?: number;
}
