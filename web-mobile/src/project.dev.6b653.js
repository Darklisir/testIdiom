window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  BlockSpritePrefab: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "25a6fB9yr5P4LNPFMY94zhc", "BlockSpritePrefab");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        id: cc.Label,
        wordName: cc.Label
      },
      start: function start() {},
      initdata: function initdata(data) {
        this.id.string = data.id;
        this.wordName.string = data.wordName;
      },
      setWord: function setWord(data) {
        this.wordName.string = data.wordName;
      },
      clickBtn: function clickBtn(event, tag) {
        cc.log("\u6d4b\u8bd5\u70b9\u51fb\u3002\u3002\u3002", tag);
      }
    });
    cc._RF.pop();
  }, {} ],
  CreateIdiom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ba83jQJHJIBLa4ZC8Y0Wt8", "CreateIdiom");
    "use strict";
    var CreateIdiom = {};
    module.exports = CreateIdiom;
    cc._RF.pop();
  }, {} ],
  GameConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aca97QYrStIWZqdopry66XT", "GameConfig");
    "use strict";
    var GameConfig = {
      gameLevel: [ 0, 1e3, 3e3, 5e3, 8e3, 1e4, 15e3, 2e4, 25e3, 3e4 ],
      blockColor: {
        black: {
          color: "#000000",
          coin: 1e3
        },
        blue: {
          color: "#0000FF",
          coin: 800
        },
        green: {
          color: "#00FF00",
          coin: 500
        },
        yellow: {
          color: "#FFFF00",
          coin: 250
        },
        white: {
          color: "#FFFFFF",
          coin: 100
        },
        red: {
          color: "#FF0000",
          coin: 50
        }
      },
      blockArray: {
        1: [ "black", "green", "white", "red", "white", "green", "black" ],
        2: [ "black", "blue", "green", "white", "red", "white", "green", "blue", "black" ],
        3: [ "black", "blue", "green", "yellow", "white", "red", "white", "yellow", "green", "blue", "black" ]
      },
      toHanzi: [ "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341" ]
    };
    module.exports = GameConfig;
    cc._RF.pop();
  }, {} ],
  GameCreatePrefab: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5b91d+t/qdLmqA5NSZx3Ohj", "GameCreatePrefab");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        gameArea: cc.Node,
        blockSpritePrefab: cc.Prefab,
        idiomList: {
          default: null,
          type: cc.JsonAsset
        },
        idiomHeadList: {
          default: null,
          type: cc.JsonAsset
        },
        idiomLevelsList: {
          default: null,
          type: cc.JsonAsset
        },
        levelLabel: cc.Label
      },
      onLoad: function onLoad() {
        this.loopTimes = 10;
        this.levelWords = 6;
        this.createLevels = 1;
        this.blockArray = [];
        var interval = 2;
        for (var y = 0; y < 9; y++) for (var x = 0; x < 9; x++) {
          var item = cc.instantiate(this.blockSpritePrefab);
          var itemW = item.width;
          var itemH = item.height;
          item.setPosition(interval + x * interval + (itemW * x + itemW / 2), interval + y * interval + (itemH * y + itemH / 2));
          item.cl = cc.v2(x, y);
          this.gameArea.addChild(item);
          this.blockArray[[ x, y ]] = item;
          item.getComponent("BlockSpritePrefab").initdata({
            id: x + "." + y,
            wordName: ""
          });
          item.getComponent(cc.Button).clickEvents[0].customEventData = x + "." + y;
        }
        cc.log("item", this.blockArray);
      },
      start: function start() {
        this.setlevel = 0;
        this.idiomLevelJson = this.idiomLevelsList.json;
        this.idiomArray = this.idiomLevelJson[this.setlevel][0];
        this.levelLabel.string = "\u7b2c" + (this.setlevel + 1) + "\u5173";
        this.refreshBoard();
      },
      startBuild: function startBuild() {
        var idiomJson = this.idiomList.json;
        var idiomHeadJson = this.idiomHeadList.json;
        this.idiomArray = {};
        this.levelArrays = [];
        this.levelAr = [ [], [] ];
        for (var crei = 0; crei < this.createLevels; crei++) {
          this.idiom = [ idiomHeadJson[crei], idiomJson ];
          this.amountIdiom = 0;
          this.addWords = 0;
          this.levelAr = [ [], [] ];
          this.idiomArray = {};
          this.levelAr[1].push(this.returnHeadWord(this.idiom[0]));
          var headWordAr = this.idiom[0].split("");
          this.tempArray = [];
          for (var hi = 0; hi < headWordAr.length; hi++) {
            var element = headWordAr[hi];
            this.idiomArray[[ 3 + hi, 4 ]] = {
              pos: cc.v2(3 + hi, 4),
              str: element,
              cl: "x"
            };
            this.tempArray[hi] = {
              pos: cc.v2(3 + hi, 4),
              str: element,
              cl: "x"
            };
          }
          this.makeIdioms();
          if (crei == this.createLevels - 1 && cc.sys.isNative) {
            jsb.fileUtils.writeStringToFile(JSON.stringify(this.levelArrays), "test.json");
            cc.log(this.levelArrays);
          }
        }
      },
      makeIdioms: function makeIdioms() {
        idiomTag: for (var pId = 0; pId < this.idiom[1].length; pId++) {
          var words = this.idiom[1][pId].word;
          var wordAr = words.split("");
          var isTrue = false;
          var tempLength = this.tempArray.length;
          for (var idA = 1; idA < 4; idA++) {
            for (var idB = 0; idB < wordAr.length; idB++) {
              var elementA = this.tempArray[tempLength - idA];
              var elementB = wordAr[idB];
              if (elementA.str == elementB && elementA.str == elementB) {
                var eaX = elementA.pos.x;
                var eaY = elementA.pos.y;
                if ("x" == elementA.cl) {
                  if (0 == idB) {
                    if (this.idiomArray[[ eaX - 1, eaY - 1 ]] || this.idiomArray[[ eaX + 1, eaY - 1 ]] || this.idiomArray[[ eaX - 1, eaY - 2 ]] || this.idiomArray[[ eaX + 1, eaY - 2 ]] || this.idiomArray[[ eaX - 1, eaY - 3 ]] || this.idiomArray[[ eaX + 1, eaY - 3 ]] || this.idiomArray[[ eaX, eaY - 4 ]]) break;
                    var cIs = this.contantIs([ eaY - 1, eaY - 2, eaY - 3 ]);
                    if (0 == cIs) ; else {
                      if (!this.isallMoves(cIs, "y")) break;
                      this.setIdiomArry(cIs, "y");
                    }
                    var cc0 = cc.v2(eaX, eaY - 1 - cIs);
                    var cc1 = cc.v2(eaX, eaY - 2 - cIs);
                    var cc2 = cc.v2(eaX, eaY - 3 - cIs);
                    var obj0 = {
                      pos: cc0,
                      str: wordAr[1],
                      cl: "y"
                    };
                    var obj1 = {
                      pos: cc1,
                      str: wordAr[2],
                      cl: "y"
                    };
                    var obj2 = {
                      pos: cc2,
                      str: wordAr[3],
                      cl: "y"
                    };
                    this.idiomArray[[ cc0.x, cc0.y ]] = obj0;
                    this.idiomArray[[ cc1.x, cc1.y ]] = obj1;
                    this.idiomArray[[ cc2.x, cc2.y ]] = obj2;
                    this.tempArray = [];
                    this.tempArray[0] = obj0;
                    this.tempArray[1] = obj1;
                    this.tempArray[2] = obj2;
                    this.searchSuccess(pId, this.tempArray, words, elementB);
                    isTrue = true;
                    break;
                  }
                  if (1 == idB) {
                    if (this.idiomArray[[ eaX - 1, eaY + 1 ]] || this.idiomArray[[ eaX + 1, eaY + 1 ]] || this.idiomArray[[ eaX - 1, eaY - 1 ]] || this.idiomArray[[ eaX + 1, eaY - 1 ]] || this.idiomArray[[ eaX - 1, eaY - 2 ]] || this.idiomArray[[ eaX + 1, eaY - 2 ]] || this.idiomArray[[ eaX, eaY + 2 ]] || this.idiomArray[[ eaX, eaY - 3 ]]) break;
                    var _cIs = this.contantIs([ eaY + 1, eaY - 1, eaY - 2 ]);
                    if (0 == _cIs) ; else {
                      if (!this.isallMoves(_cIs, "y")) break;
                      this.setIdiomArry(_cIs, "y");
                    }
                    var _cc = cc.v2(eaX, eaY + 1 - _cIs);
                    var _cc2 = cc.v2(eaX, eaY - 1 - _cIs);
                    var _cc3 = cc.v2(eaX, eaY - 2 - _cIs);
                    var _obj = {
                      pos: _cc,
                      str: wordAr[0],
                      cl: "y"
                    };
                    var _obj2 = {
                      pos: _cc2,
                      str: wordAr[2],
                      cl: "y"
                    };
                    var _obj3 = {
                      pos: _cc3,
                      str: wordAr[3],
                      cl: "y"
                    };
                    this.idiomArray[[ _cc.x, _cc.y ]] = _obj;
                    this.idiomArray[[ _cc2.x, _cc2.y ]] = _obj2;
                    this.idiomArray[[ _cc3.x, _cc3.y ]] = _obj3;
                    this.tempArray = [];
                    this.tempArray[0] = _obj;
                    this.tempArray[1] = _obj2;
                    this.tempArray[2] = _obj3;
                    this.searchSuccess(pId, this.tempArray, words, elementB);
                    isTrue = true;
                    break;
                  }
                  if (2 == idB) {
                    if (this.idiomArray[[ eaX - 1, eaY + 1 ]] || this.idiomArray[[ eaX + 1, eaY + 1 ]] || this.idiomArray[[ eaX - 1, eaY + 2 ]] || this.idiomArray[[ eaX + 1, eaY + 2 ]] || this.idiomArray[[ eaX - 1, eaY - 1 ]] || this.idiomArray[[ eaX + 1, eaY - 1 ]] || this.idiomArray[[ eaX, eaY + 3 ]] || this.idiomArray[[ eaX, eaY - 2 ]]) break;
                    var _cIs2 = this.contantIs([ eaY + 2, eaY + 1, eaY - 1 ]);
                    if (0 == _cIs2) ; else {
                      if (!this.isallMoves(_cIs2, "y")) break;
                      this.setIdiomArry(_cIs2, "y");
                    }
                    var _cc4 = cc.v2(eaX, eaY + 2 - _cIs2);
                    var _cc5 = cc.v2(eaX, eaY + 1 - _cIs2);
                    var _cc6 = cc.v2(eaX, eaY - 1 - _cIs2);
                    var _obj4 = {
                      pos: _cc4,
                      str: wordAr[0],
                      cl: "y"
                    };
                    var _obj5 = {
                      pos: _cc5,
                      str: wordAr[1],
                      cl: "y"
                    };
                    var _obj6 = {
                      pos: _cc6,
                      str: wordAr[3],
                      cl: "y"
                    };
                    this.idiomArray[[ _cc4.x, _cc4.y ]] = _obj4;
                    this.idiomArray[[ _cc5.x, _cc5.y ]] = _obj5;
                    this.idiomArray[[ _cc6.x, _cc6.y ]] = _obj6;
                    this.tempArray = [];
                    this.tempArray[0] = _obj4;
                    this.tempArray[1] = _obj5;
                    this.tempArray[2] = _obj6;
                    this.searchSuccess(pId, this.tempArray, words, elementB);
                    isTrue = true;
                    break;
                  }
                  if (3 == idB) {
                    if (this.idiomArray[[ eaX - 1, eaY + 1 ]] || this.idiomArray[[ eaX + 1, eaY + 1 ]] || this.idiomArray[[ eaX - 1, eaY + 2 ]] || this.idiomArray[[ eaX + 1, eaY + 2 ]] || this.idiomArray[[ eaX - 1, eaY + 3 ]] || this.idiomArray[[ eaX + 1, eaY + 3 ]] || this.idiomArray[[ eaX, eaY + 4 ]] || this.idiomArray[[ eaX, eaY - 1 ]]) break;
                    var _cIs3 = this.contantIs([ eaY + 3, eaY + 2, eaY + 1 ]);
                    if (0 == _cIs3) ; else {
                      if (!this.isallMoves(_cIs3, "y")) break;
                      this.setIdiomArry(_cIs3, "y");
                    }
                    var _cc7 = cc.v2(eaX, eaY + 3 - _cIs3);
                    var _cc8 = cc.v2(eaX, eaY + 2 - _cIs3);
                    var _cc9 = cc.v2(eaX, eaY + 1 - _cIs3);
                    var _obj7 = {
                      pos: _cc7,
                      str: wordAr[0],
                      cl: "y"
                    };
                    var _obj8 = {
                      pos: _cc8,
                      str: wordAr[1],
                      cl: "y"
                    };
                    var _obj9 = {
                      pos: _cc9,
                      str: wordAr[2],
                      cl: "y"
                    };
                    this.idiomArray[[ _cc7.x, _cc7.y ]] = _obj7;
                    this.idiomArray[[ _cc8.x, _cc8.y ]] = _obj8;
                    this.idiomArray[[ _cc9.x, _cc9.y ]] = _obj9;
                    this.tempArray = [];
                    this.tempArray[0] = _obj7;
                    this.tempArray[1] = _obj8;
                    this.tempArray[2] = _obj9;
                    this.searchSuccess(pId, this.tempArray, words, elementB);
                    isTrue = true;
                    break;
                  }
                } else {
                  if (0 == idB) {
                    if (this.idiomArray[[ eaX + 1, eaY + 1 ]] || this.idiomArray[[ eaX + 1, eaY - 1 ]] || this.idiomArray[[ eaX + 2, eaY + 1 ]] || this.idiomArray[[ eaX + 2, eaY - 1 ]] || this.idiomArray[[ eaX + 3, eaY + 1 ]] || this.idiomArray[[ eaX + 3, eaY - 1 ]] || this.idiomArray[[ eaX - 1, eaY ]] || this.idiomArray[[ eaX + 4, eaY ]]) break;
                    var _cIs4 = this.contantIs([ eaX + 1, eaX + 2, eaX + 3 ]);
                    if (0 == _cIs4) ; else {
                      if (!this.isallMoves(_cIs4, "x")) break;
                      this.setIdiomArry(_cIs4, "x");
                    }
                    var _cc10 = cc.v2(eaX + 1 - _cIs4, eaY);
                    var _cc11 = cc.v2(eaX + 2 - _cIs4, eaY);
                    var _cc12 = cc.v2(eaX + 3 - _cIs4, eaY);
                    var _obj10 = {
                      pos: _cc10,
                      str: wordAr[1],
                      cl: "x"
                    };
                    var _obj11 = {
                      pos: _cc11,
                      str: wordAr[2],
                      cl: "x"
                    };
                    var _obj12 = {
                      pos: _cc12,
                      str: wordAr[3],
                      cl: "x"
                    };
                    this.idiomArray[[ _cc10.x, _cc10.y ]] = _obj10;
                    this.idiomArray[[ _cc11.x, _cc11.y ]] = _obj11;
                    this.idiomArray[[ _cc12.x, _cc12.y ]] = _obj12;
                    this.tempArray = [];
                    this.tempArray[0] = _obj10;
                    this.tempArray[1] = _obj11;
                    this.tempArray[2] = _obj12;
                    this.searchSuccess(pId, this.tempArray, words, elementB);
                    isTrue = true;
                    break;
                  }
                  if (1 == idB) {
                    if (this.idiomArray[[ eaX - 1, eaY + 1 ]] || this.idiomArray[[ eaX - 1, eaY - 1 ]] || this.idiomArray[[ eaX + 1, eaY + 1 ]] || this.idiomArray[[ eaX + 1, eaY - 1 ]] || this.idiomArray[[ eaX + 2, eaY + 1 ]] || this.idiomArray[[ eaX + 2, eaY - 1 ]] || this.idiomArray[[ eaX - 2, eaY ]] || this.idiomArray[[ eaX + 3, eaY ]]) break;
                    var _cIs5 = this.contantIs([ eaX - 1, eaX + 1, eaX + 2 ]);
                    if (0 == _cIs5) ; else {
                      if (!this.isallMoves(_cIs5, "x")) break;
                      this.setIdiomArry(_cIs5, "x");
                    }
                    var _cc13 = cc.v2(eaX - 1 - _cIs5, eaY);
                    var _cc14 = cc.v2(eaX + 1 - _cIs5, eaY);
                    var _cc15 = cc.v2(eaX + 2 - _cIs5, eaY);
                    var _obj13 = {
                      pos: _cc13,
                      str: wordAr[0],
                      cl: "x"
                    };
                    var _obj14 = {
                      pos: _cc14,
                      str: wordAr[2],
                      cl: "x"
                    };
                    var _obj15 = {
                      pos: _cc15,
                      str: wordAr[3],
                      cl: "x"
                    };
                    this.idiomArray[[ _cc13.x, _cc13.y ]] = _obj13;
                    this.idiomArray[[ _cc14.x, _cc14.y ]] = _obj14;
                    this.idiomArray[[ _cc15.x, _cc15.y ]] = _obj15;
                    this.tempArray = [];
                    this.tempArray[0] = _obj13;
                    this.tempArray[1] = _obj14;
                    this.tempArray[2] = _obj15;
                    this.searchSuccess(pId, this.tempArray, words, elementB);
                    isTrue = true;
                    break;
                  }
                  if (2 == idB) {
                    if (this.idiomArray[[ eaX - 1, eaY + 1 ]] || this.idiomArray[[ eaX - 1, eaY - 1 ]] || this.idiomArray[[ eaX - 2, eaY + 1 ]] || this.idiomArray[[ eaX - 2, eaY - 1 ]] || this.idiomArray[[ eaX + 1, eaY + 1 ]] || this.idiomArray[[ eaX + 1, eaY - 1 ]] || this.idiomArray[[ eaX - 3, eaY ]] || this.idiomArray[[ eaX + 2, eaY ]]) break;
                    var _cIs6 = this.contantIs([ eaX - 2, eaX - 1, eaX + 1 ]);
                    if (0 == _cIs6) ; else {
                      if (!this.isallMoves(_cIs6, "x")) break;
                      this.setIdiomArry(_cIs6, "x");
                    }
                    var _cc16 = cc.v2(eaX - 2 - _cIs6, eaY);
                    var _cc17 = cc.v2(eaX - 1 - _cIs6, eaY);
                    var _cc18 = cc.v2(eaX + 1 - _cIs6, eaY);
                    var _obj16 = {
                      pos: _cc16,
                      str: wordAr[0],
                      cl: "x"
                    };
                    var _obj17 = {
                      pos: _cc17,
                      str: wordAr[1],
                      cl: "x"
                    };
                    var _obj18 = {
                      pos: _cc18,
                      str: wordAr[3],
                      cl: "x"
                    };
                    this.idiomArray[[ _cc16.x, _cc16.y ]] = _obj16;
                    this.idiomArray[[ _cc17.x, _cc17.y ]] = _obj17;
                    this.idiomArray[[ _cc18.x, _cc18.y ]] = _obj18;
                    this.tempArray = [];
                    this.tempArray[0] = _obj16;
                    this.tempArray[1] = _obj17;
                    this.tempArray[2] = _obj18;
                    this.searchSuccess(pId, this.tempArray, words, elementB);
                    isTrue = true;
                    break;
                  }
                  if (3 == idB) {
                    if (this.idiomArray[[ eaX - 1, eaY + 1 ]] || this.idiomArray[[ eaX - 1, eaY - 1 ]] || this.idiomArray[[ eaX - 2, eaY + 1 ]] || this.idiomArray[[ eaX - 2, eaY - 1 ]] || this.idiomArray[[ eaX - 3, eaY + 1 ]] || this.idiomArray[[ eaX - 3, eaY - 1 ]] || this.idiomArray[[ eaX - 4, eaY ]] || this.idiomArray[[ eaX + 1, eaY ]]) break;
                    var _cIs7 = this.contantIs([ eaX - 3, eaX - 2, eaX - 1 ]);
                    if (0 == _cIs7) ; else {
                      if (!this.isallMoves(_cIs7, "x")) break;
                      this.setIdiomArry(_cIs7, "x");
                    }
                    var _cc19 = cc.v2(eaX - 3 - _cIs7, eaY);
                    var _cc20 = cc.v2(eaX - 2 - _cIs7, eaY);
                    var _cc21 = cc.v2(eaX - 1 - _cIs7, eaY);
                    var _obj19 = {
                      pos: _cc19,
                      str: wordAr[0],
                      cl: "x"
                    };
                    var _obj20 = {
                      pos: _cc20,
                      str: wordAr[1],
                      cl: "x"
                    };
                    var _obj21 = {
                      pos: _cc21,
                      str: wordAr[2],
                      cl: "x"
                    };
                    this.idiomArray[[ _cc19.x, _cc19.y ]] = _obj19;
                    this.idiomArray[[ _cc20.x, _cc20.y ]] = _obj20;
                    this.idiomArray[[ _cc21.x, _cc21.y ]] = _obj21;
                    this.tempArray = [];
                    this.tempArray[0] = _obj19;
                    this.tempArray[1] = _obj20;
                    this.tempArray[2] = _obj21;
                    this.searchSuccess(pId, this.tempArray, words, elementB);
                    isTrue = true;
                    break;
                  }
                }
                console.log("**", this.tempArray, "**");
              }
            }
            if (isTrue) break;
          }
          if (isTrue) {
            this.idiom[1].splice(pId, 1);
            break idiomTag;
          }
          pId == this.idiom[1].length - 1 && this.amountIdiom == this.loopTimes && this.setIdomData();
          console.log("-----");
        }
        console.log("$$", this.idiomArray, "$$");
        if (this.amountIdiom < this.loopTimes && this.addWords < this.levelWords) {
          this.amountIdiom++;
          this.makeIdioms();
        }
      },
      searchSuccess: function searchSuccess(index, arg1, arg2, arg3) {
        this.addWords++;
        console.log("\u76f8\u540c\u8bcd\uff1a", arg1, "  ", arg2, "  ", arg3);
        this.levelAr[1].push(this.idiom[1][index]);
        this.amountIdiom != this.loopTimes && this.addWords != this.levelWords || this.setIdomData();
      },
      setIdomData: function setIdomData() {
        this.levelAr[0] = this.idiomArray;
        this.levelArrays.push(this.levelAr);
        this.refreshBoard();
        console.log(" ## \u5173\u5361\u6570\u91cf" + this.levelArrays.length + " ##", this.levelArrays);
      },
      contantIs: function contantIs(argAr) {
        var tempArgAr = [];
        argAr.forEach(function(element) {
          element < 0 ? tempArgAr.push(element) : element > 8 && tempArgAr.push(element - 8);
        });
        if (tempArgAr.length > 0) {
          var xn = 0;
          xn = tempArgAr[0] > 0 ? Math.max.apply(null, tempArgAr) : Math.min.apply(null, tempArgAr);
          return xn;
        }
        return 0;
      },
      isallMoves: function isallMoves(moveNum, xy) {
        var isXY = xy;
        for (var y = 0; y < 9; y++) for (var x = 0; x < 9; x++) if (this.idiomArray[[ x, y ]]) {
          if ("x" == isXY && (x - moveNum < 0 || x - moveNum > 8)) return false;
          if ("y" == isXY && (y - moveNum < 0 || y - moveNum > 8)) return false;
        }
        return true;
      },
      setIdiomArry: function setIdiomArry(moveNum, xy) {
        var isXY = xy;
        if (moveNum > 0) {
          for (var y = 0; y < 9; y++) for (var x = 0; x < 9; x++) if (this.idiomArray[[ x, y ]]) {
            var element = this.idiomArray[[ x, y ]];
            if ("x" == isXY) {
              var mx = x - moveNum;
              this.idiomArray[[ x, y ]] = null;
              this.idiomArray[[ mx, y ]] = element;
              element.pos.x = mx;
            } else if ("y" == isXY) {
              var my = y - moveNum;
              this.idiomArray[[ x, y ]] = null;
              this.idiomArray[[ x, my ]] = element;
              element.pos.y = my;
            }
          }
        } else if (moveNum < 0) for (var _y = 8; _y >= 0; _y--) for (var _x = 8; _x >= 0; _x--) if (this.idiomArray[[ _x, _y ]]) {
          var _element = this.idiomArray[[ _x, _y ]];
          if ("x" == isXY) {
            var _mx = _x - moveNum;
            this.idiomArray[[ _x, _y ]] = null;
            this.idiomArray[[ _mx, _y ]] = _element;
            _element.pos.x = _mx;
          } else if ("y" == isXY) {
            var _my = _y - moveNum;
            this.idiomArray[[ _x, _y ]] = null;
            this.idiomArray[[ _x, _my ]] = _element;
            _element.pos.y = _my;
          }
        }
      },
      returnHeadWord: function returnHeadWord(word) {
        for (var index = 0; index < this.idiom[1].length; index++) {
          var words = this.idiom[1][index].word;
          if (word == words) return this.idiom[1][index];
        }
      },
      refreshBoard: function refreshBoard() {
        for (var y = 0; y < 9; y++) for (var x = 0; x < 9; x++) if (this.idiomArray[[ x, y ]]) {
          var element = this.idiomArray[[ x, y ]];
          element.pos.x == x && element.pos.y == y && this.blockArray[[ x, y ]].getComponent("BlockSpritePrefab").setWord({
            wordName: element.str
          });
        } else this.blockArray[[ x, y ]].getComponent("BlockSpritePrefab").setWord({
          wordName: ""
        });
      },
      clickBtn: function clickBtn(event, tag) {
        if ("start" == tag) this.startBuild(); else if ("prelevel" == tag) {
          this.setlevel > 0 && this.setlevel--;
          this.idiomArray = this.idiomLevelJson[this.setlevel][0];
          this.refreshBoard();
          this.levelLabel.string = "\u7b2c" + (this.setlevel + 1) + "\u5173";
        } else if ("nextlevel" == tag) {
          this.setlevel < 9 && this.setlevel++;
          this.idiomArray = this.idiomLevelJson[this.setlevel][0];
          this.refreshBoard();
          this.levelLabel.string = "\u7b2c" + (this.setlevel + 1) + "\u5173";
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  GameLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cfb79fLW2VGcbwdAVt1vR52", "GameLayer");
    "use strict";
    var gameConfig = require("GameConfig");
    cc.Class({
      extends: cc.Component,
      properties: {
        gameArea: cc.Node,
        selectArea: cc.Node,
        blockSpritePrefab: cc.Prefab,
        idiomLevelsList: {
          default: null,
          type: cc.JsonAsset
        },
        levelLabel: cc.Label
      },
      onLoad: function onLoad() {
        this.blockArray = [];
        var interval = 2;
        for (var y = 0; y < 9; y++) for (var x = 0; x < 9; x++) {
          var item = cc.instantiate(this.blockSpritePrefab);
          var itemW = item.width;
          var itemH = item.height;
          item.setPosition(interval + x * interval + (itemW * x + itemW / 2), interval + y * interval + (itemH * y + itemH / 2));
          item.cl = cc.v2(x, y);
          this.gameArea.addChild(item);
          this.blockArray[[ x, y ]] = item;
          item.getComponent("BlockSpritePrefab").initdata({
            id: x + "." + y,
            wordName: ""
          });
          item.getComponent(cc.Button).clickEvents[0].customEventData = x + "." + y;
        }
        cc.log("item", this.blockArray);
        this.selectArray = [];
        var selectinterval = 4.5;
        for (var ys = 0; ys < 4; ys++) for (var xs = 0; xs < 8; xs++) {
          var item = cc.instantiate(this.blockSpritePrefab);
          var _itemW = item.width = 85;
          var _itemH = item.height = 85;
          item.setPosition(selectinterval + xs * selectinterval + (_itemW * xs + _itemW / 2), selectinterval + ys * selectinterval + (_itemH * ys + _itemH / 2));
          item.cl = cc.v2(xs, ys);
          this.selectArea.addChild(item);
          this.selectArray[[ xs, ys ]] = item;
          item.getComponent("BlockSpritePrefab").initdata({
            id: xs + "." + ys,
            wordName: "\u5b57"
          });
          item.getComponent(cc.Button).clickEvents[0].customEventData = xs + "." + ys;
        }
      },
      start: function start() {
        this.setlevel = 0;
        this.idiomLevelJson = this.idiomLevelsList.json;
        this.idiomArray = this.idiomLevelJson[this.setlevel][0];
        this.levelLabel.string = "\u7b2c" + (this.setlevel + 1) + "\u5173";
        this.refreshBoard();
      },
      rgbFc: function rgbFc() {
        var loop = 50;
        var startColor = [ 220, 20, 60 ];
        var endColor = [ 124, 252, 0 ];
        var r = (endColor[0] - startColor[0]) / loop;
        var g = (endColor[1] - startColor[1]) / loop;
        var b = (endColor[2] - startColor[2]) / loop;
        var callback1 = cc.callFunc(function() {
          cc.log("jianbian", startColor[0], " ", startColor[1], " ", startColor[2], "");
          this.gameArea.color = new cc.Color(startColor[0], startColor[1], startColor[2]);
        }, this);
        var isz = 1;
        var callback2 = cc.callFunc(function() {
          function setColor(arg, start, end, r) {
            arg != end ? arg += r * isz : arg >= end ? isz = -1 : arg <= start && (isz = 1);
            return arg;
          }
          startColor[0] = setColor(startColor[0], 220, 124, r);
          startColor[1] = setColor(startColor[1], 20, 252, r);
          startColor[2] = setColor(startColor[2], 60, 0, r);
        }, this);
        var delay = cc.delayTime(.5);
        var rep = cc.repeat(cc.sequence(callback1, delay, callback2), 60);
        this.gameArea.runAction(rep);
      },
      refreshBoard: function refreshBoard() {
        for (var y = 0; y < 9; y++) for (var x = 0; x < 9; x++) if (this.idiomArray[[ x, y ]]) {
          var element = this.idiomArray[[ x, y ]];
          element.pos.x == x && element.pos.y == y && this.blockArray[[ x, y ]].getComponent("BlockSpritePrefab").setWord({
            wordName: element.str
          });
        } else this.blockArray[[ x, y ]].getComponent("BlockSpritePrefab").setWord({
          wordName: ""
        });
      },
      clickBtn: function clickBtn(event, tag) {
        if ("start" == tag) ; else if ("prelevel" == tag) {
          this.setlevel > 0 && this.setlevel--;
          this.idiomArray = this.idiomLevelJson[this.setlevel][0];
          this.refreshBoard();
          this.levelLabel.string = "\u7b2c" + (this.setlevel + 1) + "\u5173";
        } else if ("nextlevel" == tag) {
          this.setlevel < 9 && this.setlevel++;
          this.idiomArray = this.idiomLevelJson[this.setlevel][0];
          this.refreshBoard();
          this.levelLabel.string = "\u7b2c" + (this.setlevel + 1) + "\u5173";
        }
      }
    });
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ],
  MainScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3822dGbDBJNgrKf6sVycRyl", "MainScene");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "BlockSpritePrefab", "GameConfig", "GameCreatePrefab", "GameLayer", "MainScene", "CreateIdiom" ]);