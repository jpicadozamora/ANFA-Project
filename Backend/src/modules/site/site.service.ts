import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteSettings } from './site.entity';
import { UpdateSiteSettingsDto } from './site.dto';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(SiteSettings)
    private repo: Repository<SiteSettings>,
  ) {}

  async getSettings(): Promise<SiteSettings> {
    const existing = await this.repo.find({ take: 1 });
    if (existing.length > 0) return existing[0];
    return this.repo.save(this.repo.create({}));
  }

  async updateSettings(dto: UpdateSiteSettingsDto): Promise<SiteSettings> {
    const settings = await this.getSettings();
    Object.assign(settings, dto);
    return this.repo.save(settings);
  }
}
