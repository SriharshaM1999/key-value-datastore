const express=require('express');
const prompt = require('prompt-sync')({sigint: true});
const Datastore=require("nedb");
 

const port=8000;
const app=express();  
 

var users;
 async function init() {
 users = new Datastore({ filename: 'users.db'});
await users.loadDatabase(function(err) {
    if(err){ console.log(err);  }
    console.log("loaded successfully");
});
}



console.log("Actions that are allowed to perform:   ")
console.log("Enter the number corresponding to the the action that you want to perform")
console.log("Enter 1 for  Creation ")
console.log("Enter 2 for  Reading")
console.log("Enter 3 for  Removal")
console.log("Enter 4 for  Exit")

 
// Code for adding the key and value
 
  function added(key,value){

     value = Object.fromEntries(value.trim().split('\n').map(s => s.split(' ')))

     users.find({
        key: key,
    }, function(err, docs) {
        if(docs.length!=0) console.log("Data already presents");
        else 
        {
 
 

     var doc = {key: key, value}; 

    users.insert(doc, function (error, newDoc) {   
        if (error) {
          console.log('ERROR: saving document: ' + JSON.stringify(doc) + '. Caused by: ' + error);
          throw error;
        }    
        console.log('INFO: successfully saved document: ' + JSON.stringify(newDoc));
      }); 
 
       console.log("created  successfully");
    }
    })
   }

   // Code for removal of a key 

   function removal(key){

    users.remove({
        key: key,
    }, function(err, n) {
        console.log('docs deleted:', n)
    })
        

   }

// Code for reading the data 

   function read(key){
    users.find({
        key: key,
    }, function(err, docs) {
        if(docs.length==0) console.log("No Data found");
        else console.log(`${key} found:', docs`,docs)
    })
   }
   
 function process(){

let option_selected=0;
option_selected=Number(prompt("Enter the option that u want to select\n "))

let key,value;
   
        switch(option_selected){

                case 1:   
                console.log("Creating\n ")
                 key=prompt("Enter the key")

console.log(" Enter values by spaces \n ")

                 value=prompt("Enter the value")

                 added(key,value); 

                  break;
   
                case 2: 
                 key=prompt("Enter the key ")
                read(key); break;
  
                case 3: 
                 key=prompt("Enter the key ")
                 removal(key);  break;

                default:  console.log("Enter either 1/2/3/4 \n"); break;

             
    
    }

}



init();
process();



app.listen(port,function(err){
    if(err){
        console.log(err);
    } 
    else{
        console.log(`Sytem is listening on port  ${port}`);
    }
})
  