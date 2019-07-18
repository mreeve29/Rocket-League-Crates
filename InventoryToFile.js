var fs = require('fs');
//var $ = require('jquery');
var csv = require('fast-csv');

//const FILE = process.argv[2];
const FILE = "inventory.csv";

var TEXT = "";
var total = 0;

var stream = fs.createReadStream(FILE);

var csvStream = csv()
    .on("data", function(data){
         if(data[2]=="Crates" && data[1]!="Key" && data[1]!="Decryptor"){
           total += parseInt(data[10]);
           TEXT += "[b]" + data[10]+ "[/b]x " + data[1].replace("Crate - ","") + "\n";
         }
    })
    .on("end", function(){
      TEXT += "Total Crates: " + total;
      fs.writeFile("Inventory.txt", TEXT, function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("The file was saved!");
        });
    });
stream.pipe(csvStream);
