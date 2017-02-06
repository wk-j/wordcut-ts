var fs = require("fs");
var LEFT = 0;
var RIGHT = 1;
var path = require("path");
var glob = require("glob");

export class WordcutDict {

  dict = [];

  init(dictPathFile, withDefault, words) {
    withDefault = withDefault || false
    var defaultDict = path.normalize(__dirname + "/..") + "/data/tdict-*.txt";
    this.dict = []
    var dictPathIsDefined = dictPathFile !== undefined
    var dictPath = (withDefault || !dictPathIsDefined) ? [defaultDict] : [];
    var dictPathFile = dictPathFile || defaultDict

    if (dictPathIsDefined) {
      if (Array.isArray(dictPathFile)) {
        dictPath.concat.apply(dictPath, dictPathFile);
      } else {
        dictPath.push(dictPathFile)
      }
    }

    this.addFiles(dictPath, false)

    if (words !== undefined) {
      this.addWords(words, false)
    }
    this.finalizeDict();
  }

  addWords(words, finalize) {
    finalize = finalize === undefined || finalize;
    this.dict.push.apply(this.dict, words)
    if (finalize) {
      this.finalizeDict();
    }
  }

  finalizeDict() {
    this.dict = this.sortuniq(this.dict);
  }

  addFiles(files, finalize) {
    finalize = finalize === undefined || finalize;
    files = this.sortuniq(this.flatten(files.map(function (x) { return glob.sync(x) })))
    for (var i = 0; i < files.length; i++) {
      var words = fs.readFileSync(files[i], {
        encoding: "UTF-8"
      })
        .split(/[\r\n]+/)
        .filter(function (w) {
          return w.length > 1;
        })
      this.addWords(words, false)
    }
    if (finalize) {
      this.finalizeDict();
    }
  }

  dictSeek(l, r, ch, strOffset, pos) {
    var ans = null;
    while (l <= r) {
      var m = Math.floor((l + r) / 2),
        dict_item = this.dict[m],
        len = dict_item.length;
      if (len <= strOffset) {
        l = m + 1;
      } else {
        var ch_ = dict_item[strOffset];
        if (ch_ < ch) {
          l = m + 1;
        } else if (ch_ > ch) {
          r = m - 1;
        } else {
          ans = m;
          if (pos == LEFT) {
            r = m - 1;
          } else {
            l = m + 1;
          }
        }
      }
    }
    return ans;
  }

  isFinal(acceptor) {
    return this.dict[acceptor.l].length == acceptor.strOffset;
  }

  createAcceptor() {
    return {
      l: 0,
      r: this.dict.length - 1,
      strOffset: 0,
      isFinal: false,
      dict: this,
      transit: function (ch) {
        return this.dict.transit(this, ch);
      },
      isError: false,
      tag: "DICT",
      w: 1,
      type: "DICT"
    };
  }

  transit(acceptor, ch) {
    var l = this.dictSeek(acceptor.l,
      acceptor.r,
      ch,
      acceptor.strOffset,
      LEFT);
    if (l !== null) {
      var r = this.dictSeek(l,
        acceptor.r,
        ch,
        acceptor.strOffset,
        RIGHT);
      acceptor.l = l;
      acceptor.r = r;
      acceptor.strOffset++;
      acceptor.isFinal = this.isFinal(acceptor);
    } else {
      acceptor.isError = true;
    }
    return acceptor;
  }

  sortuniq(a) {
    return a.sort().filter(function (item, pos, arr) {
      return !pos || item != arr[pos - 1];
    })
  }

  flatten(a) {
    //[[1,2],[3]] -> [1,2,3]
    return [].concat.apply([], a);
  }
}