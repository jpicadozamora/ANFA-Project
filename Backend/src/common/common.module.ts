import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  exports: [ConfigModule],
})
export class CommonModule {}