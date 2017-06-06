extern crate csv;
extern crate serde;
#[macro_use]
extern crate serde_derive;

mod models;

use std::error::Error;
use std::fs::File;
use std::process;
use csv::StringRecord;

#[derive(Deserialize)]
struct Row {
    line: String,
    from_station: String,
    to_station: String,
}

fn read_in_data() -> Result<(), Box<Error>> {
    let file = File::open("../data/tube_data.csv")?;
    let mut rdr = csv::Reader::from_reader(file);
    let header = StringRecord::from(vec!
    [
        "line", "from_station", "to_station"
    ]);
    for result in rdr.records() {
        let record = result?;
        let row: Row = record.deserialize(Some(&header))?;
        println!("{:?}", row.from_station);
    }
    Ok(())
}

fn main() {
    if let Err(err) = read_in_data() {
        println!("error running readInData: {}", err);
        process::exit(1);
    }
}
