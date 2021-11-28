import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './note.entity';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  getNotes(): Promise<Note[]> {
    return this.notesService.getNotes();
  }

  @Get(':id')
  findNote(@Param('id') id): Promise<Note> {
    return this.notesService.findNote(id);
  }

  @Post()
  createNote(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.notesService.createNote(createNoteDto);
  }

  @Patch(':id/note')
  editNote(@Param('id') id: string, @Body() note: Note): Promise<void> {
    return this.notesService.editNote(id, note);
  }
}
