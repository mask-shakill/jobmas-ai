struct User {
    name: String,
    age: u32,
}

impl User {
    fn new(name: String, age: u32) -> Self {
        Self { name, age }
    }

    fn introduce(&self) {
        println!("Hi, I'm {} and I'm {} years old.", self.name, self.age);
    }
}

fn main() {
    let user = User::new(String::from("Shakil"), 25);
    user.introduce();
}
