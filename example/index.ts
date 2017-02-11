import { Wordcut } from "wordcut-ts/lib/wordcut";

var wordcut = new Wordcut();
wordcut.initNoDict();

console.log(wordcut.cut("กากา"));