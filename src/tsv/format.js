d3.tsv.format = function(rows) {
  return rows.map(function (row) {
    return d3_formatRow(row, "\t");
  }).join("\n");
};

function d3_formatRow(row, separator) {
  return row.map(d3_formatValue).join(separator);
}

function d3_formatValue(text) {
  return /[",\n]/.test(text)
      ? "\"" + text.replace(/\"/g, "\"\"") + "\""
      : text;
}
