interface Attribute {
  _id: number; // or string, depending on your schema
  products: string; // Define a more specific type if possible
  name: string;
  private_web_address: string;
  created_at: string; // or Date, depending on your needs
}