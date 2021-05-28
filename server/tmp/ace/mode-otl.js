ace.define("ace/mode/otl",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var OTLHighlightRules = function() {

        // taken from http://download.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html
        var reservedKeywords = (
            "as|by|and|or" +
            "|AS|BY|AND|OR"
        );

        var buildinConstants = ("null|Infinity|NaN|undefined|true|false");


        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used

        var variableName = "[a-zA-Z_][a-zA-Z0-9_]*";
        var variable = "(?:" + variableName + "(?==))";

        var keywordMapper = this.createKeywordMapper({
            "keyword": reservedKeywords,
            "constant.language": buildinConstants

        }, "xz");

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
                    next : "Start"
                },
                {
                    token : "subSearchEnd",
                    regex : "\\]",
                    next : "Start"
                },
                {
                    token : ["functionName", "paren.lparen", "functionBody", "paren.rparen"],
                    regex : "(\\w+)(\\()(\\w+)(\\))"
                },
                {
                    token : ["variable", "keyword.operator", "value"],
                    regex : "(\\w+)(\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|~|<|>|<=|>=|=|!=|[%&|`])(\"?\\w+\"?)",
                },
                {
                    token : keywordMapper,
                    regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                },
                {
                    token : "EOL",
                    regex : "$",
                    next: "Start"
                },
                {
                    token : "Pipe",
                    regex : "\\|",
                    next: "Command"
                },

            ]
        };


        this.normalizeRules();
    };

    oop.inherits(OTLHighlightRules, TextHighlightRules);

    exports.OTLHighlightRules = OTLHighlightRules;
});
