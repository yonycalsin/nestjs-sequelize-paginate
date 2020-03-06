import { ModelCtor } from 'sequelize/types';
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
   defaultPage?: number;
   defaultOffset?: number;
   showOffset?: boolean;
}

export interface PaginateOptions {
   model?: ModelCtor<Model<any, any>>;
   page?: number;
   offset?: number;
   path?: string;
   url?: string;
   showOffset?: boolean;
   showUrl?: boolean;
   structure?: 'simple' | 'segmented';
   details?: 'necessary' | 'complete';
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
