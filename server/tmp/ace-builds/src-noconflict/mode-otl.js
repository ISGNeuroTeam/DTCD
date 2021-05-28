ace.define("ace/mode/otl_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var OTLHighlightRules = function() {
        var reservedKeywords = (
            "as|by|and|or" +
            "|AS|BY|AND|OR"
        );
        var buildinConstants = ("null|Infinity|NaN|undefined|true|false");

        var keywordMapper = this.createKeywordMapper({
            "keyword": reservedKeywords,
            "constant.language": buildinConstants
        }, "positionalArgs");

        this.$rules = {
            "start" : [
                {
                    token : "Pipe",
                    regex : "\\|",
                    next  : "Command"
                },
            ],
            "Command" : [
                {
                    token : "keyword",
                    regex : "(\\w+)",
                    next  : "InCommand"
                },
            ],
            "InCommand" : [
                {
                    token : "subSearchStart",
                    regex : "\\[",
                    next : "start"
                },
                {
                    token : "subSearchEnd",
                    regex : "\\]",
                    next : "start"
                },
                {
                    token : ["functionName", "paren.lparen", "functionBody", "paren.rparen"],
                    regex : "(\\w+)(\\()(\\w+)(\\))"
                },
                {
                    token : ["variable", "text", "keyword.operator", "text", "value"],
                    regex : "(\\w+)(\\s*)(\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|~|<|>|<=|>=|=|!=|[%&|`])(\\s*)(\"?\\w+\"?)",
                },
                {
                    token : keywordMapper,
                    regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                },
                {
                    token : "EOL",
                    regex : "$",
                    next: "start"
                },
                {
                    token : "Pipe",
                    regex : "\\|",
                    next: "Command"
                }
            ]
        };
        this.normalizeRules();
    };

    oop.inherits(OTLHighlightRules, TextHighlightRules);

    exports.OTLHighlightRules = OTLHighlightRules;
});


ace.define("ace/mode/otl",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/python_highlight_rules","ace/range"], function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var OTLHighlightRules = require("./otl_highlight_rules").OTLHighlightRules;
    var Range = require("../range").Range;

    var Mode = function() {
        this.HighlightRules = OTLHighlightRules;
        this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);

    (function() {

        this.lineCommentStart = "#";

        this.getNextLineIndent = function(state, line, tab) {
            var indent = this.$getIndent(line);

            var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
            var tokens = tokenizedLine.tokens;

            if (tokens.length && tokens[tokens.length-1].type == "comment") {
                return indent;
            }

            if (state == "start") {
                var match = line.match(/^.*[\{\(\[:]\s*$/);
                if (match) {
                    indent += tab;
                }
            }

            return indent;
        };

        var outdents = {
            "pass": 1,
            "return": 1,
            "raise": 1,
            "break": 1,
            "continue": 1
        };

        this.checkOutdent = function(state, line, input) {
            if (input !== "\r\n" && input !== "\r" && input !== "\n")
                return false;

            var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;

            if (!tokens)
                return false;
            do {
                var last = tokens.pop();
            } while (last && (last.type == "comment" || (last.type == "text" && last.value.match(/^\s+$/))));

            if (!last)
                return false;

            return (last.type == "keyword" && outdents[last.value]);
        };

        this.autoOutdent = function(state, doc, row) {

            row += 1;
            var indent = this.$getIndent(doc.getLine(row));
            var tab = doc.getTabString();
            if (indent.slice(-tab.length) == tab)
                doc.remove(new Range(row, indent.length-tab.length, row, indent.length));
        };

        this.$id = "ace/mode/python";
        this.snippetFileId = "ace/snippets/python";
    }).call(Mode.prototype);

    exports.Mode = Mode;
});                (function() {
    ace.require(["ace/mode/otl"], function(m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
