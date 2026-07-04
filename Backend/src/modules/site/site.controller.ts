import { Controller, Get, Put, Body } from '@nestjs/common';
import { SiteService } from './site.service';
import { UpdateSiteSettingsDto } from './site.dto';

@Controller('site')
export class SiteController {
  constructor(private readonly service: SiteService) {}

  @Get()
  getSettings() {
    return this.service.getSettings();
  }

  @Put()
  updateSettings(@Body() dto: UpdateSiteSettingsDto) {
    return this.service.updateSettings(dto);
  }
}
