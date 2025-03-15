const fs = require("fs");
const path = require("path");

// Function to recursively find all .vue files
function findVueFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findVueFiles(filePath, fileList);
    } else if (file.endsWith(".vue")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Function to update SASS syntax in a file
function updateSassSyntax(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Replace map-get with map.get
  content = content.replace(/map-get\(/g, "map.get(");

  // Replace map-keys with map.keys
  content = content.replace(/map-keys\(/g, "map.keys(");

  // Replace append with list.append
  content = content.replace(/append\(/g, "list.append(");

  // Remove any @use "sass:map" or @use "sass:list" that our script might have added
  content = content.replace(/@use "sass:map";\n@use "sass:list";/g, "");

  fs.writeFileSync(filePath, content);
  console.log(`Updated: ${filePath}`);
}

// Find all Vue files in the src directory
const vueFiles = findVueFiles(path.join(__dirname, "src"));

// Update SASS syntax in all Vue files
vueFiles.forEach(updateSassSyntax);

console.log(`\nUpdated ${vueFiles.length} Vue files.`);
