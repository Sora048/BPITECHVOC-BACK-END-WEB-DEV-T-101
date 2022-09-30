const fs = require('fs');

const folderName = process.argv[2] || "Directory";
  

try {
    fs.mkdirSync(folderName);
    fs.writeFileSync(`${folderName}/index.html`, "");
    fs.writeFileSync(`${folderName}/style.css`, "");
    fs.writeFileSync(`${folderName}/app.js`, "");

} catch (e) {
    console.log("Error: ", e);
}