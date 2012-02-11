require("../env");
require("../../d3.tsv");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.tsv.parse");

suite.addBatch({
  "parse": {
    topic: function() {
      return d3.tsv.parse;
    },
    "returns an array of objects": function(parse) {
      assert.deepEqual(parse("a\tb\tc\n1\t2\t3\n", "\t"), [{a: "1", b: "2", c: "3"}]);
    },
    "does not strip whitespace": function(parse) {
      assert.deepEqual(parse("a\tb\tc\n 1\t 2\t3\n", "\t"), [{a: " 1", b: " 2", c: "3"}]);
    },
    "parses quoted values": function(parse) {
      assert.deepEqual(parse("a\tb\tc\n\"1\"\t2\t3", "\t"), [{a: "1", b: "2", c: "3"}]);
      assert.deepEqual(parse("a\tb\tc\n\"1\"\t2\t3\n", "\t"), [{a: "1", b: "2", c: "3"}]);
    },
    "parses quoted values with quotes": function(parse) {
      assert.deepEqual(parse("a\n\"\"\"hello\"\"\"", "\t"), [{a: "\"hello\""}]);
    },
    "parses quoted values with newlines": function(parse) {
      assert.deepEqual(parse("a\n\"new\nline\"", "\t"), [{a: "new\nline"}]);
      assert.deepEqual(parse("a\n\"new\rline\"", "\t"), [{a: "new\rline"}]);
      assert.deepEqual(parse("a\n\"new\r\nline\"", "\t"), [{a: "new\r\nline"}]);
    },
    "parses unix newlines": function(parse) {
      assert.deepEqual(parse("a\tb\tc\n1\t2\t3\n4\t5\t\"6\"\n7\t8\t9", "\t"), [
        {a: "1", b: "2", c: "3"},
        {a: "4", b: "5", c: "6"},
        {a: "7", b: "8", c: "9"}
      ]);
    },
    "parses mac newlines": function(parse) {
      assert.deepEqual(parse("a\tb\tc\r1\t2\t3\r4\t5\t\"6\"\r7\t8\t9", "\t"), [
        {a: "1", b: "2", c: "3"},
        {a: "4", b: "5", c: "6"},
        {a: "7", b: "8", c: "9"}
      ]);
    },
    "parses dos newlines": function(parse) {
      assert.deepEqual(parse("a\tb\tc\r\n1\t2\t3\r\n4\t5\t\"6\"\r\n7\t8\t9", "\t"), [
        {a: "1", b: "2", c: "3"},
        {a: "4", b: "5", c: "6"},
        {a: "7", b: "8", c: "9"}
      ]);
    }
  },
  "parseRows": {
    topic: function() {
      return d3.tsv.parseRows;
    },
    "returns an array of arrays": function(parse) {
      assert.deepEqual(parse("a\tb\tc\n", "\t"), [["a", "b", "c"]]);
    },
    "parses quoted values": function(parse) {
      assert.deepEqual(parse("\"1\"\t2\t3\n", "\t"), [["1", "2", "3"]]);
      assert.deepEqual(parse("\"hello\"", "\t"), [["hello"]]);
    },
    "parses quoted values with quotes": function(parse) {
      assert.deepEqual(parse("\"\"\"hello\"\"\"", "\t"), [["\"hello\""]]);
    },
    "parses quoted values with newlines": function(parse) {
      assert.deepEqual(parse("\"new\nline\"", "\t"), [["new\nline"]]);
      assert.deepEqual(parse("\"new\rline\"", "\t"), [["new\rline"]]);
      assert.deepEqual(parse("\"new\r\nline\"", "\t"), [["new\r\nline"]]);
    },
    "parses unix newlines": function(parse) {
      assert.deepEqual(parse("a\tb\tc\n1\t2\t3\n4\t5\t\"6\"\n7\t8\t9", "\t"), [
        ["a", "b", "c"],
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"]
      ]);
    },
    "parses mac newlines": function(parse) {
      assert.deepEqual(parse("a\tb\tc\r1\t2\t3\r4\t5\t\"6\"\r7\t8\t9", "\t"), [
        ["a", "b", "c"],
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"]
      ]);
    },
    "parses dos newlines": function(parse) {
      assert.deepEqual(parse("a\tb\tc\r\n1\t2\t3\r\n4\t5\t\"6\"\r\n7\t8\t9", "\t"), [
        ["a", "b", "c"],
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"]
      ]);
    }
  }
});

suite.export(module);
