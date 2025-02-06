import { Injectable, signal, WritableSignal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const DB_USERS = 'myuserdb';

export interface User {
  id: number;
  name: string;
  acitve: number;

}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private users: WritableSignal<User[]> = signal<User[]>([]);
  // private users: any;
  constructor() { }

  async initializePlugin() {
    try {
      this.db = await this.sqlite.createConnection(
        DB_USERS,
        false,
        'no-encryption',
        1,
        false
      );
      await this.db.open();

      const schema = `CREATE TABLE IF NOT EXISTS users(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          active INTEGER DEFAULT 1
        )`;

      await this.db.execute(schema);
      this.loadUsers();
      return true;
    } catch (error) {
      console.error('Error initializing plugin:', error);
      return false;  // Or handle the error as needed
    }
  }


  async loadUsers() {
    const users = await this.db.query('SELECT * FROM users');
    this.users.set(users.values || []);

  }
  async addUser(name: string) {
    const query = `INSERT INTO users (name) VALUES ('${name}')`;
    const result = await this.db.query(query);

    this.loadUsers();
    return result;
  }
  getUsers() {
    return this.users;
  }
 
}
