const fs = require("fs");
const path = require("path");

const reportsDir = path.join(__dirname, "reports");
const indexFilePath = path.join(__dirname, "index.html");

function generateIndexFile() {
  let indexContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reports Index</title>
    <style>
        body {
            background-color: #1e1e1e;
            color: #d4d4d4;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            margin: 0;
            padding: 20px;
        }
        h1 {
            text-align: center;
            color: #e7e7e7;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            padding: 10px;
            border: 1px solid #444;
            text-align: left;
        }
        th {
            background-color: #333;
        }
        tr:nth-child(even) {
            background-color: #2a2a2a;
        }
        a {
            color: #3794ff;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #252526;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
        .date {
            color: #888;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Reports Index</h1>
        <table>
            <thead>
                <tr>
                    <th>Report</th>
                    <th>Last Modified</th>
                </tr>
            </thead>
            <tbody>
`;

  function findIndexFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const relativePath = path.relative(__dirname, fullPath);
      if (fs.statSync(fullPath).isDirectory()) {
        if (!fullPath.includes("trace")) {
          findIndexFiles(fullPath);
        }
      } else if (
        file === "index.html" &&
        !relativePath.includes("trace") &&
        relativePath !== "index.html"
      ) {
        const stats = fs.statSync(fullPath);
        const modifiedDate = new Date(stats.mtime).toLocaleString();
        indexContent += `<tr><td><a href="${relativePath}">${relativePath}</a></td><td>${modifiedDate}</td></tr>\n`;
      }
    });
  }

  findIndexFiles(reportsDir);

  indexContent += `
            </tbody>
        </table>
    </div>
</body>
</html>
`;

  fs.writeFileSync(indexFilePath, indexContent);
}

generateIndexFile();
