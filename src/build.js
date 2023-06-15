const babel = require("@babel/core");
const fs = require("fs");
const path = require("path");

// Source and destination paths
const srcPath = path.join(__dirname, "src");
const destPath = path.join(__dirname, "dist");

// Transpile the code
babel.transformFile(srcPath, { presets: ["@babel/preset-env"] }, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  // Write the transpiled code to the destination folder
  fs.mkdir(destPath, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    fs.writeFile(path.join(destPath, "index.js"), result.code, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Transpilation completed successfully!");
    });
  });
});

// Source and destination paths for functions
const srcPathFunctions = path.join(__dirname, "functions/src");
const destPathFunctions = path.join(__dirname, "functions/dist");

// Transpile the functions
babel.transformFile(srcPathFunctions, { presets: ["@babel/preset-env"] }, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  // Write the transpiled functions code to the destination folder
  fs.mkdir(destPathFunctions, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    fs.writeFile(path.join(destPathFunctions, "index.js"), result.code, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Functions transpilation completed successfully!");
    });
  });
});
