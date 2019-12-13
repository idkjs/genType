// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as List from "bs-platform/lib/es6/list.js";
import * as Block from "bs-platform/lib/es6/block.js";
import * as Hashtbl from "bs-platform/lib/es6/hashtbl.js";
import * as Parsing from "./parsing.bs.js";
import * as Caml_obj from "bs-platform/lib/es6/caml_obj.js";
import * as $$Location from "./location.bs.js";
import * as Warnings from "./warnings.bs.js";
import * as Pervasives from "bs-platform/lib/es6/pervasives.js";
import * as Caml_builtin_exceptions from "bs-platform/lib/es6/caml_builtin_exceptions.js";

var docstrings = {
  contents: /* [] */0
};

function warn_bad_docstrings(param) {
  if (Warnings.is_active(/* Bad_docstring */Block.__(34, [true]))) {
    return List.iter((function (ds) {
                  var match = ds.ds_attached;
                  switch (match) {
                    case /* Unattached */0 :
                        return $$Location.prerr_warning(ds.ds_loc, /* Bad_docstring */Block.__(34, [true]));
                    case /* Info */1 :
                        return /* () */0;
                    case /* Docs */2 :
                        var match$1 = ds.ds_associated;
                        if (match$1 >= 2) {
                          return $$Location.prerr_warning(ds.ds_loc, /* Bad_docstring */Block.__(34, [false]));
                        } else {
                          return /* () */0;
                        }
                    
                  }
                }), List.rev(docstrings.contents));
  } else {
    return 0;
  }
}

function docstring(body, loc) {
  return {
          ds_body: body,
          ds_loc: loc,
          ds_attached: /* Unattached */0,
          ds_associated: /* Zero */0
        };
}

function register(ds) {
  docstrings.contents = /* :: */[
    ds,
    docstrings.contents
  ];
  return /* () */0;
}

function docstring_body(ds) {
  return ds.ds_body;
}

function docstring_loc(ds) {
  return ds.ds_loc;
}

var doc_loc = {
  txt: "ocaml.doc",
  loc: $$Location.none
};

function docs_attr(ds) {
  var exp_pexp_desc = /* Pexp_constant */Block.__(1, [/* Pconst_string */Block.__(2, [
          ds.ds_body,
          undefined
        ])]);
  var exp_pexp_loc = ds.ds_loc;
  var exp = {
    pexp_desc: exp_pexp_desc,
    pexp_loc: exp_pexp_loc,
    pexp_attributes: /* [] */0
  };
  var item_pstr_desc = /* Pstr_eval */Block.__(0, [
      exp,
      /* [] */0
    ]);
  var item_pstr_loc = exp_pexp_loc;
  var item = {
    pstr_desc: item_pstr_desc,
    pstr_loc: item_pstr_loc
  };
  return /* tuple */[
          doc_loc,
          /* PStr */Block.__(0, [/* :: */[
                item,
                /* [] */0
              ]])
        ];
}

function add_docs_attrs(docs, attrs) {
  var match = docs.docs_pre;
  var attrs$1;
  if (match !== undefined) {
    var ds = match;
    attrs$1 = ds.ds_body === "" ? attrs : /* :: */[
        docs_attr(ds),
        attrs
      ];
  } else {
    attrs$1 = attrs;
  }
  var match$1 = docs.docs_post;
  if (match$1 !== undefined) {
    var ds$1 = match$1;
    if (ds$1.ds_body === "") {
      return attrs$1;
    } else {
      return Pervasives.$at(attrs$1, /* :: */[
                  docs_attr(ds$1),
                  /* [] */0
                ]);
    }
  } else {
    return attrs$1;
  }
}

function add_info_attrs(info, attrs) {
  if (info !== undefined) {
    var ds = info;
    if (ds.ds_body === "") {
      return attrs;
    } else {
      return Pervasives.$at(attrs, /* :: */[
                  docs_attr(ds),
                  /* [] */0
                ]);
    }
  } else {
    return attrs;
  }
}

var text_loc = {
  txt: "ocaml.text",
  loc: $$Location.none
};

function text_attr(ds) {
  var exp_pexp_desc = /* Pexp_constant */Block.__(1, [/* Pconst_string */Block.__(2, [
          ds.ds_body,
          undefined
        ])]);
  var exp_pexp_loc = ds.ds_loc;
  var exp = {
    pexp_desc: exp_pexp_desc,
    pexp_loc: exp_pexp_loc,
    pexp_attributes: /* [] */0
  };
  var item_pstr_desc = /* Pstr_eval */Block.__(0, [
      exp,
      /* [] */0
    ]);
  var item_pstr_loc = exp_pexp_loc;
  var item = {
    pstr_desc: item_pstr_desc,
    pstr_loc: item_pstr_loc
  };
  return /* tuple */[
          text_loc,
          /* PStr */Block.__(0, [/* :: */[
                item,
                /* [] */0
              ]])
        ];
}

function add_text_attrs(dsl, attrs) {
  var fdsl = List.filter((function (param) {
            if (param.ds_body === "") {
              return false;
            } else {
              return true;
            }
          }))(dsl);
  return Pervasives.$at(List.map(text_attr, fdsl), attrs);
}

function get_docstring(info, dsl) {
  var _param = dsl;
  while(true) {
    var param = _param;
    if (param) {
      var ds = param[0];
      var match = ds.ds_attached;
      if (match !== 1) {
        ds.ds_attached = info ? /* Info */1 : /* Docs */2;
        return ds;
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      return ;
    }
  };
}

function get_docstrings(dsl) {
  var _acc = /* [] */0;
  var _param = dsl;
  while(true) {
    var param = _param;
    var acc = _acc;
    if (param) {
      var ds = param[0];
      var match = ds.ds_attached;
      if (match !== 1) {
        ds.ds_attached = /* Docs */2;
        _param = param[1];
        _acc = /* :: */[
          ds,
          acc
        ];
        continue ;
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      return List.rev(acc);
    }
  };
}

function associate_docstrings(dsl) {
  return List.iter((function (ds) {
                var match = ds.ds_associated;
                if (match !== 0) {
                  ds.ds_associated = /* Many */2;
                  return /* () */0;
                } else {
                  ds.ds_associated = /* One */1;
                  return /* () */0;
                }
              }), dsl);
}

var pre_table = Hashtbl.create(undefined, 50);

function set_pre_docstrings(pos, dsl) {
  if (dsl !== /* [] */0) {
    return Hashtbl.add(pre_table, pos, dsl);
  } else {
    return 0;
  }
}

function get_pre_docs(pos) {
  try {
    var dsl = Hashtbl.find(pre_table, pos);
    associate_docstrings(dsl);
    return get_docstring(false, dsl);
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return ;
    } else {
      throw exn;
    }
  }
}

function mark_pre_docs(pos) {
  try {
    return associate_docstrings(Hashtbl.find(pre_table, pos));
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return /* () */0;
    } else {
      throw exn;
    }
  }
}

var post_table = Hashtbl.create(undefined, 50);

function set_post_docstrings(pos, dsl) {
  if (dsl !== /* [] */0) {
    return Hashtbl.add(post_table, pos, dsl);
  } else {
    return 0;
  }
}

function get_post_docs(pos) {
  try {
    var dsl = Hashtbl.find(post_table, pos);
    associate_docstrings(dsl);
    return get_docstring(false, dsl);
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return ;
    } else {
      throw exn;
    }
  }
}

function mark_post_docs(pos) {
  try {
    return associate_docstrings(Hashtbl.find(post_table, pos));
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return /* () */0;
    } else {
      throw exn;
    }
  }
}

function get_info(pos) {
  try {
    var dsl = Hashtbl.find(post_table, pos);
    return get_docstring(true, dsl);
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return ;
    } else {
      throw exn;
    }
  }
}

var floating_table = Hashtbl.create(undefined, 50);

function set_floating_docstrings(pos, dsl) {
  if (dsl !== /* [] */0) {
    return Hashtbl.add(floating_table, pos, dsl);
  } else {
    return 0;
  }
}

function get_text(pos) {
  try {
    return get_docstrings(Hashtbl.find(floating_table, pos));
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return /* [] */0;
    } else {
      throw exn;
    }
  }
}

var pre_extra_table = Hashtbl.create(undefined, 50);

function set_pre_extra_docstrings(pos, dsl) {
  if (dsl !== /* [] */0) {
    return Hashtbl.add(pre_extra_table, pos, dsl);
  } else {
    return 0;
  }
}

function get_pre_extra_text(pos) {
  try {
    return get_docstrings(Hashtbl.find(pre_extra_table, pos));
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return /* [] */0;
    } else {
      throw exn;
    }
  }
}

var post_extra_table = Hashtbl.create(undefined, 50);

function set_post_extra_docstrings(pos, dsl) {
  if (dsl !== /* [] */0) {
    return Hashtbl.add(post_extra_table, pos, dsl);
  } else {
    return 0;
  }
}

function get_post_extra_text(pos) {
  try {
    return get_docstrings(Hashtbl.find(post_extra_table, pos));
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return /* [] */0;
    } else {
      throw exn;
    }
  }
}

function symbol_docs(param) {
  return {
          docs_pre: get_pre_docs(Parsing.symbol_start_pos(/* () */0)),
          docs_post: get_post_docs(Parsing.symbol_end_pos(/* () */0))
        };
}

function symbol_docs_lazy(param) {
  var p1 = Parsing.symbol_start_pos(/* () */0);
  var p2 = Parsing.symbol_end_pos(/* () */0);
  return Caml_obj.caml_lazy_make((function (param) {
                return {
                        docs_pre: get_pre_docs(p1),
                        docs_post: get_post_docs(p2)
                      };
              }));
}

function rhs_docs(pos1, pos2) {
  return {
          docs_pre: get_pre_docs(Parsing.rhs_start_pos(pos1)),
          docs_post: get_post_docs(Parsing.rhs_end_pos(pos2))
        };
}

function rhs_docs_lazy(pos1, pos2) {
  var p1 = Parsing.rhs_start_pos(pos1);
  var p2 = Parsing.rhs_end_pos(pos2);
  return Caml_obj.caml_lazy_make((function (param) {
                return {
                        docs_pre: get_pre_docs(p1),
                        docs_post: get_post_docs(p2)
                      };
              }));
}

function mark_symbol_docs(param) {
  mark_pre_docs(Parsing.symbol_start_pos(/* () */0));
  return mark_post_docs(Parsing.symbol_end_pos(/* () */0));
}

function mark_rhs_docs(pos1, pos2) {
  mark_pre_docs(Parsing.rhs_start_pos(pos1));
  return mark_post_docs(Parsing.rhs_end_pos(pos2));
}

function symbol_info(param) {
  return get_info(Parsing.symbol_end_pos(/* () */0));
}

function rhs_info(pos) {
  return get_info(Parsing.rhs_end_pos(pos));
}

function symbol_text(param) {
  return get_text(Parsing.symbol_start_pos(/* () */0));
}

function symbol_text_lazy(param) {
  var pos = Parsing.symbol_start_pos(/* () */0);
  return Caml_obj.caml_lazy_make((function (param) {
                return get_text(pos);
              }));
}

function rhs_text(pos) {
  return get_text(Parsing.rhs_start_pos(pos));
}

function rhs_text_lazy(pos) {
  var pos$1 = Parsing.rhs_start_pos(pos);
  return Caml_obj.caml_lazy_make((function (param) {
                return get_text(pos$1);
              }));
}

function symbol_pre_extra_text(param) {
  return get_pre_extra_text(Parsing.symbol_start_pos(/* () */0));
}

function symbol_post_extra_text(param) {
  return get_post_extra_text(Parsing.symbol_end_pos(/* () */0));
}

function rhs_pre_extra_text(pos) {
  return get_pre_extra_text(Parsing.rhs_start_pos(pos));
}

function rhs_post_extra_text(pos) {
  return get_post_extra_text(Parsing.rhs_end_pos(pos));
}

function init(param) {
  docstrings.contents = /* [] */0;
  Hashtbl.reset(pre_table);
  Hashtbl.reset(post_table);
  Hashtbl.reset(floating_table);
  Hashtbl.reset(pre_extra_table);
  return Hashtbl.reset(post_extra_table);
}

var empty_docs = {
  docs_pre: undefined,
  docs_post: undefined
};

var empty_info = undefined;

var info_attr = docs_attr;

var empty_text = /* [] */0;

var empty_text_lazy = /* [] */0;

export {
  init ,
  warn_bad_docstrings ,
  docstring ,
  register ,
  docstring_body ,
  docstring_loc ,
  set_pre_docstrings ,
  set_post_docstrings ,
  set_floating_docstrings ,
  set_pre_extra_docstrings ,
  set_post_extra_docstrings ,
  empty_docs ,
  docs_attr ,
  add_docs_attrs ,
  symbol_docs ,
  symbol_docs_lazy ,
  rhs_docs ,
  rhs_docs_lazy ,
  mark_symbol_docs ,
  mark_rhs_docs ,
  empty_info ,
  info_attr ,
  add_info_attrs ,
  symbol_info ,
  rhs_info ,
  empty_text ,
  empty_text_lazy ,
  text_attr ,
  add_text_attrs ,
  symbol_text ,
  symbol_text_lazy ,
  rhs_text ,
  rhs_text_lazy ,
  symbol_pre_extra_text ,
  symbol_post_extra_text ,
  rhs_pre_extra_text ,
  rhs_post_extra_text ,
  
}
/* pre_table Not a pure module */