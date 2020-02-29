import { Module, DynamicModule } from '@nestjs/common';
import { PaginateService } from './paginate.service';
import {
   PAGINATION_SERVICE_TOKEN,
   PAGINATION_OPTIONS,
} from './paginate.constans';
import { PaginateModuleOptionsI } from './interfaces';
import { mergeDefaults } from './utils';

@Module({
   providers: [
      {
         provide: PaginateService,
         useExisting: PAGINATION_SERVICE_TOKEN,
      },
   ],
   exports: [PaginateService],
})
export class PaginateModule {
   static forRoot(options: PaginateModuleOptionsI = {}): DynamicModule {
      options = mergeDefaults(options);
      return {
         module: PaginateModule,
         providers: [
            {
               provide: PAGINATION_OPTIONS,
               useValue: options,
            },
            PaginateService,
         ],
         global: options.isGlobal,
         exports: [PaginateService],
      };
   }
}
