export class WordRule  {
  createAcceptor(tag) {
    if (tag["WORD_RULE"])
      return null;

    return {
      strOffset: 0,
      isFinal: false,
      transit: function (ch) {
        var lch = ch.toLowerCase();
        if (lch >= "a" && lch <= "z") {
          this.isFinal = true;
          this.strOffset++;
        } else {
          this.isError = true;
        }
        return this;
      },
      isError: false,
      tag: "WORD_RULE",
      type: "WORD_RULE",
      w: 1
    };
  }
}

export class NumberRule {
  createAcceptor (tag) {
    if (tag["NUMBER_RULE"])
      return null;

    return {
      strOffset: 0,
      isFinal: false,
      transit: function (ch) {
        if (ch >= "0" && ch <= "9") {
          this.isFinal = true;
          this.strOffset++;
        } else {
          this.isError = true;
        }
        return this;
      },
      isError: false,
      tag: "NUMBER_RULE",
      type: "NUMBER_RULE",
      w: 1
    };
  }
}

export class SpaceRule {

  tag ="SPACE_RULE";
  createAcceptor (tag) {

    if (tag["SPACE_RULE"])
      return null;

    return {
      strOffset: 0,
      isFinal: false,
      transit: function (ch) {
        if (ch == " " || ch == "\t" || ch == "\r" || ch == "\n" ||
          ch == "\u00A0" || ch == "\u2003"//nbsp and emsp
        ) {
          this.isFinal = true;
          this.strOffset++;
        } else {
          this.isError = true;
        }
        return this;
      },
      isError: false,
      tag: this.tag,
      w: 1,
      type: "SPACE_RULE"
    }
  }
}

export class SingleSymbolRule {
  tag = "SINSYM";
  createAcceptor (tag) {
    return {
      strOffset: 0,
      isFinal: false,
      transit: function (ch) {
        if (this.strOffset == 0 && ch.match(/^[\@\(\)\/\,\-\."`]$/)) {
          this.isFinal = true;
          this.strOffset++;
        } else {
          this.isError = true;
        }
        return this;
      },
      isError: false,
      tag: "SINSYM",
      w: 1,
      type: "SINSYM"
    }
  }
}

var rules = [
  new WordRule(),
  new SpaceRule(),
  new SingleSymbolRule(),
  new NumberRule()
]

export class LatinRules {
  rules = rules;
}

//var LatinRules = [WordRule, SpaceRule, SingleSymbolRule, NumberRule];
//module.exports = LatinRules;