import { WordcutDict } from "./dict";
import { PathInfoBuilder } from "./path_info_builder";
import { PathSelector }  from "./path_selector";
import { Acceptors } from "./acceptors";
import { getLatinRules } from "./latin_rules";
import { getThaiRules} from "./thai_rules";
var _ = require("underscore");

export class WordcutCore {

  pathSelector = new PathSelector();
  acceptors = new Acceptors();
  pathInfoBuilder = new PathInfoBuilder();

  constructor() { 
    getThaiRules().forEach(x => {
      this.acceptors.creators.push(x);
    });

    getLatinRules().forEach(x => {
      this.acceptors.creators.push(x);
    });
  }

  initNoDict () {
    this.init(null, false, []);
  };

  public init(dict_path, withDefault, additionalWords) {
    var dict = new WordcutDict();
    dict.init(dict_path, withDefault, additionalWords);
    this.acceptors.creators.push(dict);
  }

  buildPath(text) {
    var self = this
      , path = self.pathSelector.createPath()
      , leftBoundary = 0;
    self.acceptors.reset();
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      self.acceptors.transit(ch);

      var possiblePathInfos = self .pathInfoBuilder .build(path, self.acceptors.getFinalAcceptors(), i, leftBoundary, text);
      var selectedPath = self.pathSelector.selectPath(possiblePathInfos)

      path.push(selectedPath);
      if (selectedPath.type !== "UNK") {
        leftBoundary = i;
      }
    }
    return path;
  }

  pathToRanges(path) {
    var e = path.length - 1
      , ranges = [];

    while (e > 0) {
      var info = path[e]
        , s = info.p;

      if (info.merge !== undefined && ranges.length > 0) {
        var r = ranges[ranges.length - 1];
        r.s = info.merge;
        s = r.s;
      } else {
        ranges.push({ s: s, e: e });
      }
      e = s;
    }
    return ranges.reverse();
  }

  rangesToText(text, ranges, delimiter) {
    return ranges.map(function (r) {
      return text.substring(r.s, r.e);
    }).join(delimiter);
  }

  public cut(text, delimiter?) {
    let path = this.buildPath(text);
    let ranges = this.pathToRanges(path);
    let del = (delimiter === undefined ? "|" : delimiter)
    let result = this.rangesToText(text, ranges, del);
    return result;
  }

  cutIntoRanges(text, noText) {
    var path = this.buildPath(text);
    var ranges = this.pathToRanges(path);

    if (!noText) {
      ranges.forEach(function (r) {
        r.text = text.substring(r.s, r.e);
      });
    }
    return ranges;
  }

  cutIntoArray(text) {
    var path = this.buildPath(text);
    var ranges = this.pathToRanges(path);

    return ranges.map(function (r) {
      return text.substring(r.s, r.e)
    });
  }
}