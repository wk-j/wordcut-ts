var _ = require("underscore");

export class Acceptors {

  creators = [];
  current = [];
  tag = {};

  init() {
    this.creators = [];
    this.current = [];
    this.tag = {};
  }

  reset() {
    this.current = [];
    this.tag = {}
  }

  transit(ch) {
    var self = this;

    self.creators.forEach(function (creator) {
      var acceptor = creator.createAcceptor(self.tag);
      if (acceptor)
        self.current.push(acceptor);
    });

    var _current = [];
    self.tag = {};

    for (var i = 0; i < self.current.length; i++) {
      var _acceptor = self.current[i]
        , acceptor = _acceptor.transit(ch);

      if (!acceptor.isError) {
        _current.push(acceptor);
        self.tag[acceptor.tag] = acceptor;
      }
    }
    self.current = _current;

  }

  getFinalAcceptors() {
    return this.current.filter(function (acceptor) {
      return acceptor.isFinal;
    });
  }
};

/*
module.exports = function () {
  var acceptors = _.clone(_Acceptors);
  acceptors.init();
  return acceptors;
};
*/