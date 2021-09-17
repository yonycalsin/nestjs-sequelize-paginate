import { Module, DynamicModule } from '@nestjs/common'
import { PaginateService } from './paginate.service'
import { PAGINATE_SERVICE_TOKEN, PAGINATE_OPTIONS } from './paginate.constans'
import { PaginateModuleOptions } from './interfaces'
import { MergeDefaults } from './utils'

@Module({
  providers: [
    {
      provide: PaginateService,
      useExisting: PAGINATE_SERVICE_TOKEN,
    },
  ],
  exports: [PaginateService],
})
export class PaginateModule {
  static forRoot(options: PaginateModuleOptions = {}): DynamicModule {
    options = MergeDefaults(options)
    return {
      module: PaginateModule,
      providers: [
        {
          provide: PAGINATE_OPTIONS,
          useValue: options,
        },
        PaginateService,
      ],
      global: options.isGlobal,
      exports: [PaginateService],
    }
  }
}
