const fs = require("fs-extra");

try{
    // Setting up of test-results folder
    fs.ensureDir("test-results");
    fs.emptyDir("test-results"); 

}catch(error){
    console.log("Folder not created! "+ error);
}
