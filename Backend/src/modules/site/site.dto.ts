import { IsOptional, IsString } from 'class-validator';

export class UpdateSiteSettingsDto {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  schedule?: string;

  @IsOptional()
  @IsString()
  aboutParagraph1?: string;

  @IsOptional()
  @IsString()
  aboutParagraph2?: string;

  @IsOptional()
  @IsString()
  aboutParagraph3?: string;

  @IsOptional()
  @IsString()
  quote?: string;

  @IsOptional()
  @IsString()
  statYears?: string;

  @IsOptional()
  @IsString()
  statYearsLabel?: string;

  @IsOptional()
  @IsString()
  statProjects?: string;

  @IsOptional()
  @IsString()
  statProjectsLabel?: string;

  @IsOptional()
  @IsString()
  statClients?: string;

  @IsOptional()
  @IsString()
  statClientsLabel?: string;

  @IsOptional()
  @IsString()
  statTeam?: string;

  @IsOptional()
  @IsString()
  statTeamLabel?: string;
}
