import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteSettings } from './site.entity';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SiteSettings])],
  controllers: [SiteController],
  providers: [SiteService],
  exports: [SiteService],
})
export class SiteModule {}
