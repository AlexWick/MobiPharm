const functions = require("firebase-functions");
const path = require("path");
const shell = require("shelljs");

exports.buildFunctions = functions.runWith({
  timeoutSeconds: 540,
  memory: "1GB",
}).https.onCall(async (data, context) => {
  console.log("Building functions...");

  // Set the working directory to the functions folder
  shell.cd(path.join(__dirname, "functions"));

  // Install dependencies
  console.log("Installing dependencies...");
  const installResult = shell.exec("npm install");
  if (installResult.code !== 0) {
    console.error("Failed to install dependencies");
    return {success: false};
  }

  // Build the functions
  console.log("Building functions...");
  const buildResult = shell.exec("npm run build");
  if (buildResult.code !== 0) {
    console.error("Failed to build functions");
    return {success: false};
  }

  console.log("Functions built successfully");
  return {success: true};
});
