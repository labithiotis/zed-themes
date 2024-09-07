use std::collections::HashMap;
use create::module::user_service::UserService;

// Define a struct for user
struct User {
    id: string,
    name: string,
    age: u32,
}

fn main() {
    let mut user_service = UserService::new();

    let user = User {
        id: "123".to_string(),
        name: "Alice".to_string(),
        age: 30,
    };

    match user_service.add_user(user) {
        Ok(_) => println!("User added successfully"),
        Err(e) => eprintln!("Error adding user: {e}"),
    }
}
