import { PaginateModuleOptionsI } from '../interfaces';

const defaultOptions: PaginateModuleOptionsI = {
   isGlobal: true,
   url: null,
   showUrl: false,
};

export function mergeDefaults(
   options: PaginateModuleOptionsI,
   defaults: PaginateModuleOptionsI = defaultOptions,
) {
   return {
      ...defaults,
      ...options,
   };
}
