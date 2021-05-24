const filename = process.argv[2];
const output = process.argv[3];

const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const content = fs.readFileSync(filename);
const csv = parse(content, {
  columns: true,
  skip_empty_lines: true,
});
const brands = [];
csv.forEach((line) => {
  const brand = line.brand.trim();
  if (brand && brands.indexOf(brand) === -1) {
    brands.push(brand);
  }
});
fs.writeFileSync(output, JSON.stringify(brands.sort()));
