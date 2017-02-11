
var expect = require("chai").expect;
import { WordcutCore } from "../lib/wordcut";

describe("Wordcut with custom dictionary", function () {

  it("should recognize custom dict as glob", function () {
    var wordcut = new WordcutCore(); 
    wordcut.init(__dirname + '/custom*.txt', true, []);
    var segmentedResult = wordcut.cutIntoArray("ฉันชอบกินข้าวอร่อยมากมาก");
    expect(segmentedResult).to.deep.equal(["ฉัน", "ชอบ", "กินข้าว", "อร่อยมากมาก"])
  });

  it("should recognize word in custom dict", function () {
    var wordcut = new WordcutCore(); 
    wordcut.init(__dirname + '/customdict.txt', true, []);
    var segmentedResult = wordcut.cutIntoArray("ฉันชอบกินข้าวอร่อยมากมาก");
    expect(segmentedResult).to.deep.equal(["ฉัน", "ชอบ", "กินข้าว", "อร่อยมากมาก"])
  });

  it("should recognize word in custom dict and additionalWords", function () {
    var wordcut = new WordcutCore(); 
    wordcut.init(__dirname + '/customdict.txt', true, ["ข้าวอร่อยมากมาก", "ชอบกิน"]);
    var segmentedResult = wordcut.cutIntoArray("ฉันชอบกินข้าวอร่อยมากมาก");
    expect(segmentedResult).to.deep.equal(["ฉัน", "ชอบกิน", "ข้าวอร่อยมากมาก"])
  });
});
