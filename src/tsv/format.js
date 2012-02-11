d3.tsv.format = function(rows) {
  return rows.map(d3_tsv_formatRow).join("\n");
};

d3.tsv.separator = function() {
  return "\t";
}

function d3_tsv_formatRow(row) {
  return row.map(d3_tsv_formatValue).join(d3.tsv.separator());
}

function d3_tsv_formatValue(text) {
  return /[",\n]/.test(text)
      ? "\"" + text.replace(/\"/g, "\"\"") + "\""
      : text;
}
