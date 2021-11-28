import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesService } from './notes.service';
import { NotesRepository } from './notes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NotesRepository])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
