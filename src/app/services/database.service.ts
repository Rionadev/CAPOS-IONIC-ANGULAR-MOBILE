import { Injectable, signal, WritableSignal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const DB_USERS = 'capos_db';

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

      //attributes
      const attributes_schema = `CREATE TABLE IF NOT EXISTS attributes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        _id TEXT,
        products TEXT,
        name TEXT ,
        private_web_address TEXT,
        created_at TEXT
      )`;
      await this.db.execute(attributes_schema);

      //brands
      const brands_scheam = `CREATE TABLE IF NOT EXISTS brands(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          _id TEXT,
          description TEXT,
          products TEXT,
          name TEXT ,
          private_web_address TEXT,
          created_at TEXT
        )`;
      await this.db.execute(brands_scheam);

      //brands
      const cashes_scheam = `CREATE TABLE IF NOT EXISTS cashes(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          _id TEXT,
          reasons TEXT,
          transactions TEXT,
          is_credit TEXT ,
          private_web_address TEXT,
          outlet TEXT,
          user_id TEXT,
          register TEXT,
          created_at TEXT
        )`;
      await this.db.execute(cashes_scheam);

      return true;
    } catch (error) {
      console.error('Error initializing plugin:', error);
      return false;  // Or handle the error as needed
    }
  }


  async addAttributes(arr_attributes: any): Promise<any[]> {
    const results: any[] = [];

    try {
      if (!this.db) {
        throw new Error("Database connection is not initialized.");
      }

      if (arr_attributes.length > 0) {
        for (const element of arr_attributes) {
          const query = `
          INSERT INTO attributes (_id, products, name, private_web_address, created_at) 
          VALUES (?, ?, ?, ?, ?)`;

          const result = await this.db.query(query, [
            element._id,
            element.products,
            element.name,
            element.private_web_address,
            element.created_at
          ]);

          results.push(result);
        }
      } else {
        console.warn("No attributes to add.");
      }
    } catch (error) {
      console.error("Error adding attributes:", error);
      throw error; // Rethrow the error if needed
    }

    return results;
  }
  async getAttributes() {
    const attributes = await this.db.query('SELECT * FROM attributes');
    return attributes;
  }

  async getTableData(table_name: string) {
    const table_data = await this.db.query(`SELECT * FROM ${table_name}`);
    console.log(`SQLite ${table_name}: `, table_data);
    return table_data;
  }
  //brands
  async addBrands(arr_brands: any): Promise<any[]> {
    const results: any[] = [];

    try {
      if (!this.db) {
        throw new Error("Database connection is not initialized.");
      }

      if (arr_brands.length > 0) {
        for (const element of arr_brands) {
          const query = `
          INSERT INTO brands (_id, description,products, name, private_web_address, created_at) 
          VALUES (?, ?, ?, ?, ?,?)`;

          const result = await this.db.query(query, [
            element?._id,
            element?.description,
            element?.products,
            element?.name,
            element?.private_web_address,
            element?.created_at
          ]);

          results.push(result);
        }
      } else {
        console.warn("No brands to add.");
      }
    } catch (error) {
      console.error("Error adding brands:", error);
      throw error; // Rethrow the error if needed
    }

    return results;
  }

  //cashes
  //brands
  async addCashes(arr_cashes: any): Promise<any[]> {
    const results: any[] = [];

    try {
      if (!this.db) {
        throw new Error("Database connection is not initialized.");
      }

      if (arr_cashes.length > 0) {
        for (const element of arr_cashes) {
          const query = `
          INSERT INTO cashes (_id, reasons, transactions, is_credit, private_web_address,
          outlet, user_id,register,created_at) 
          VALUES (?, ?, ?, ?, ?, ?,?,?,?)`;

          const result = await this.db.query(query, [
            element?._id,
            element?.reasons,
            element?.transaction,
            element?.is_credit,
            element?.private_web_address,
            element?.outlet,
            element?.user_id,
            element?.register,
            element?.created_at
          ]);

          results.push(result);
        }
      } else {
        console.warn("No cashes to add.");
      }
    } catch (error) {
      console.error("Error adding cashes:", error);
      throw error; // Rethrow the error if needed
    }

    return results;
  }
  // async getBrands() {
  //   const brands = await this.db.query('SELECT * FROM brands');
  //   return brands;
  // }
  //

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


  //at

}
