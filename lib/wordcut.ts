var sys = require("sys");
import { WordcutDict } from "./dict";
var WordcutCore = require("./wordcut_core");
var PathInfoBuilder = require("./path_info_builder");
var PathSelector = require("./path_selector");
var Acceptors = require("./acceptors");
var latinRules = require("./latin_rules");
var thaiRules = require("./thai_rules");
var _ = require("underscore");


var Wordcut = Object.create(WordcutCore);
Wordcut.defaultPathInfoBuilder = PathInfoBuilder;
Wordcut.defaultPathSelector = PathSelector;
Wordcut.defaultAcceptors = Acceptors;
Wordcut.defaultLatinRules = latinRules;
Wordcut.defaultThaiRules = thaiRules;
Wordcut.defaultDict = new WordcutDict();


Wordcut.initNoDict = function (dict_path) {
  var self = this;
  self.pathInfoBuilder = new self.defaultPathInfoBuilder;
  self.pathSelector = new self.defaultPathSelector;
  self.acceptors = new self.defaultAcceptors;
  self.defaultLatinRules.forEach(function (rule) {
    self.acceptors.creators.push(rule);
  });
  self.defaultThaiRules.forEach(function (rule) {
    self.acceptors.creators.push(rule);
  });
};

Wordcut.init = function (dict_path, withDefault, additionalWords) {
  withDefault = withDefault || false;
  this.initNoDict();
  //var dict = _.clone(this.defaultDict);
  var dict = this.defaultDict;
  dict.init(dict_path, withDefault, additionalWords);
  this.acceptors.creators.push(dict);
};

module.exports = Wordcut;
