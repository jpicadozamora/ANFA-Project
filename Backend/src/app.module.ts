import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { ProjectModule } from './modules/projects/project.module';
import { PropertyModule } from './modules/properties/property.module';
import { AuthModule } from './modules/auth/auth.module';
import { ContactModule } from './modules/contact/contact.module';
import { RemodelationModule } from './modules/remodelations/remodelation.module';
import { SiteModule } from './modules/site/site.module';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    ProjectModule,
    PropertyModule,
    AuthModule,
    ContactModule,
    RemodelationModule,
    SiteModule,
  ],
})
export class AppModule {}
