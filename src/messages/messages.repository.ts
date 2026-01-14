import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesRepository {
  async findOne(id: string): Promise<string | undefined> {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents) as Record<string, string>;
    return messages[id];
  }

  async findAll() {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents) as Record<string, string>;
    return messages;
  }

  async create(content: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents) as Record<
      string,
      { id: string; content: string }
    >;

    const id = Math.floor(Math.random() * 999).toString();
    messages[id] = { id, content };

    await writeFile('messages.json', JSON.stringify(messages));
  }
}
