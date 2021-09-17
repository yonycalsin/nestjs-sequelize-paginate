import { PaginateModuleOptions } from '../interfaces'

const defaultOptions: PaginateModuleOptions = {
  isGlobal: true,
  url: null,
  showUrl: false,
  structure: 'simple',
  details: 'complete',
  defaultPage: 1,
  defaultOffset: 5,
  showOffset: false,
}

export function MergeDefaults(options: PaginateModuleOptions, defaults: PaginateModuleOptions = defaultOptions) {
  return {
    ...defaults,
    ...options,
  }
}
