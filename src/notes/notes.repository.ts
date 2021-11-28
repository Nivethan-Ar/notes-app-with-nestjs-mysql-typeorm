import { EntityRepository, Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './note.entity';

@EntityRepository(Note)
export class NotesRepository extends Repository<Note> {
  async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    const { title, description } = createNoteDto;

    const task = this.create({
      title,
      description,
    });

    await this.save(task);

    return task;
  }

  async getNotes(): Promise<Note[]> {
    const query = this.createQueryBuilder('note');

    const tasks = await query.getMany();

    return tasks;
  }
}
