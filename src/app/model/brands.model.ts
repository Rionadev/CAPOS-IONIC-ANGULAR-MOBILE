interface Brand {
    _id: number; // or string, depending on your schema
    description: string;
    products: string; // Define a more specific type if possible
    name: string;
    private_web_address: string;
    created_at: string; // or Date, depending on your needs
  }