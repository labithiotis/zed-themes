use std::collections::HashMap;
use std::fs::File;
use std::io::{self, Read, Write};

#[derive(Debug, Clone)]
struct Point { x: f64, y: f64 }

impl Point {
  fn new(x: f64, y: f64) -> Self { Point { x, y } }
  fn distance(&self, other: &Point) -> f64 {
    ((self.x - other.x).powi(2) + (self.y - other.y).powi(2)).sqrt()
  }
}

enum Direction { North, South, East, West }

fn get_direction_name(direction: Direction) -> &'static str {
  match direction {
    Direction::North => "North",
    Direction::South => "South",
    Direction::East => "East",
    Direction::West => "West",
  }
}

fn largest<T: PartialOrd>(list: &[T]) -> &T {
  let mut largest = &list[0];
  for item in list.iter() {
    if item > largest { largest = item; }
  }
  largest
}

// Main function
fn main() -> io::Result<()> {
  let mut numbers = vec![34, 50, 25, 100, 65];
  numbers.push(42);
  println!("The largest number is {}", largest(&numbers));

  let mut scores = HashMap::new();
  scores.insert("Blue".to_string(), 10);
  scores.insert("Yellow".to_string(), 50);

  let mut file = File::create("output.txt")?;
  file.write_all(b"Hello, world!")?;
  let mut contents = String::new();
  File::open("output.txt")?.read_to_string(&mut contents)?;

  let p1 = Point::new(0.0, 0.0);
  let p2 = Point::new(3.0, 4.0);
  println!("Distance between points: {}", p1.distance(&p2));

  let direction = Direction::North;
  println!("Direction: {}", get_direction_name(direction));

  Ok(())
}
