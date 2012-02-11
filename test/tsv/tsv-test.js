require("../env");
require("../../d3.tsv");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.tsv");

suite.addBatch({
  "tsv": {
    topic: function() {
      var cb = this.callback;
      return d3.tsv("examples/data/sample.tsv", function(tsv) {
        cb(null, tsv);
      });
    },
    "invokes the callback with the parsed TSV": function(tsv) {
      assert.deepEqual(tsv, [{"Hello":42,"World":"\"fish\""}]);
    },
    "overrides the mime type to text/tab-separated-values": function(tsv) {
      assert.equal(XMLHttpRequest._last._info.mimeType, "text/tab-separated-values");
    },
    "": {
      topic: function() {
        var cb = this.callback;
        return d3.tsv("//does/not/exist.tsv", function(tsv) {
          cb(null, tsv);
        });
      },
      "invokes the callback with null when an error occurs": function(tsv) {
        assert.isNull(tsv);
      }
    }
  }
});

suite.export(module);
