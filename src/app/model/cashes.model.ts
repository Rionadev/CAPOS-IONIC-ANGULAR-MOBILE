interface Brand {
    _id: number; // or string, depending on your schema
    reasons: string;
    transaction: string; // Define a more specific type if possible
    is_credit: string;
    private_web_address: string;
    outlet: string;
    user_id: string;
    register: string;
    created_at: string; // or Date, depending on your needs
}