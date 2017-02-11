function isMatch(pat, offset, ch) {
  if (pat.length <= offset)
    return false;
  var _ch = pat[offset];
  return _ch == ch ||
    (_ch.match(/[กข]/) && ch.match(/[ก-ฮ]/)) ||
    (_ch.match(/[มบ]/) && ch.match(/[ก-ฮ]/)) ||
    (_ch.match(/\u0E49/) && ch.match(/[\u0E48-\u0E4B]/));
}

export class R0 {
      strOffset = 0;
      isFinal= false;

      isError= false;
      tag= "THAI_RULE";
      type= "THAI_RULE";
      w= 1;

      constructor(private pat) { }

      transit = (ch) => {
        if (isMatch(this.pat, this.strOffset, ch)) {
          this.isFinal = (this.strOffset + 1 == this.pat.length);
          this.strOffset++;
        } else {
          this.isError = true;
        }
        return this;
      }
}

export class Rule0  {
  createAcceptor(tag) {
    var pat = "เหก็ม";
    var r0 = new R0(pat);
    return r0;
  }
}

export class PartRule {
  createAcceptor (tag) {
    return {
      strOffset: 0,
      patterns: [
        "แก", "เก", "ก้", "กก์", "กา", "กี", "กิ", "กืก"
      ],
      isFinal: false,
      transit: function (ch) {
        var offset = this.strOffset;
        this.patterns = this.patterns.filter(function (pat) {
          return isMatch(pat, offset, ch);
        });

        if (this.patterns.length > 0) {
          var len = 1 + offset;
          this.isFinal = this.patterns.some(function (pat) {
            return pat.length == len;
          });
          this.strOffset++;
        } else {
          this.isError = true;
        }
        return this;
      },
      isError: false,
      tag: "PART",
      type: "PART",
      unk: 1,
      w: 1
    };
  }
}

export function getThaiRules() {
  return [
    new Rule0(),
    new PartRule()
  ];
}