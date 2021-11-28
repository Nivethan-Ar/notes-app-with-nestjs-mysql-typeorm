import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './note.entity';
import { NotesRepository } from './notes.repository';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesRepository)
    private notesRepository: NotesRepository,
  ) {}

  async getNotes(): Promise<Note[]> {
    return this.notesRepository.getNotes();
  }

  findNote(id: string): Promise<Note> {
    return this.notesRepository.findOne(id);
  }

  async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    return this.notesRepository.createNote(createNoteDto);
  }

  async removeNote(id: string): Promise<void> {
    await this.notesRepository.delete(id);
  }

  async editNote(id: string, note: Note): Promise<void> {
    const { title, description } = note;

    const result = await this.notesRepository.update(id, {
      title: title,
      description: description,
    });

    if (result.affected === 0)
      throw new NotFoundException(`Note with the id #${id} not found`);
  }
}
