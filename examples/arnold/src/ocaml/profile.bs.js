// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Gc from "bs-platform/lib/es6/gc.js";
import * as Sys from "bs-platform/lib/es6/sys.js";
import * as List from "bs-platform/lib/es6/list.js";
import * as Misc from "./misc.bs.js";
import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Format from "bs-platform/lib/es6/format.js";
import * as Printf from "bs-platform/lib/es6/printf.js";
import * as $$String from "bs-platform/lib/es6/string.js";
import * as Hashtbl from "bs-platform/lib/es6/hashtbl.js";
import * as Caml_array from "bs-platform/lib/es6/caml_array.js";
import * as Pervasives from "bs-platform/lib/es6/pervasives.js";
import * as Caml_format from "bs-platform/lib/es6/caml_format.js";
import * as Caml_primitive from "bs-platform/lib/es6/caml_primitive.js";
import * as Caml_external_polyfill from "bs-platform/lib/es6/caml_external_polyfill.js";
import * as Caml_builtin_exceptions from "bs-platform/lib/es6/caml_builtin_exceptions.js";

function create(param) {
  var stat = Gc.quick_stat(/* () */0);
  return {
          time: Caml_external_polyfill.resolve("caml_sys_time_include_children")(true),
          allocated_words: stat.minor_words + stat.major_words,
          top_heap_words: stat.top_heap_words
        };
}

var zero = {
  time: 0,
  allocated_words: 0,
  top_heap_words: 0
};

var r = {
  contents: -1
};

function zero$1(param) {
  return {
          timestamp: (r.contents = r.contents + 1 | 0, r.contents),
          duration: 0,
          allocated_words: 0,
          top_heap_words_increase: 0
        };
}

function accumulate(t, m1, m2) {
  return {
          timestamp: t.timestamp,
          duration: t.duration + (m2.time - m1.time),
          allocated_words: t.allocated_words + (m2.allocated_words - m1.allocated_words),
          top_heap_words_increase: t.top_heap_words_increase + (m2.top_heap_words - m1.top_heap_words | 0) | 0
        };
}

function of_diff(m1, m2) {
  return accumulate(zero$1(/* () */0), m1, m2);
}

var hierarchy = {
  contents: /* E */[Hashtbl.create(undefined, 2)]
};

var initial_measure = {
  contents: undefined
};

function reset(param) {
  hierarchy.contents = /* E */[Hashtbl.create(undefined, 2)];
  initial_measure.contents = undefined;
  return /* () */0;
}

function record_call($staropt$star, name, f) {
  var accumulate$1 = $staropt$star !== undefined ? $staropt$star : false;
  var match = hierarchy.contents;
  var prev_hierarchy = match[0];
  var start_measure = create(/* () */0);
  if (initial_measure.contents === undefined) {
    initial_measure.contents = start_measure;
  }
  var match$1;
  if (accumulate$1) {
    var exit = 0;
    var val;
    try {
      val = Hashtbl.find(prev_hierarchy, name);
      exit = 1;
    }
    catch (exn){
      if (exn === Caml_builtin_exceptions.not_found) {
        match$1 = /* tuple */[
          zero$1(/* () */0),
          Hashtbl.create(undefined, 2)
        ];
      } else {
        throw exn;
      }
    }
    if (exit === 1) {
      Hashtbl.remove(prev_hierarchy, name);
      match$1 = /* tuple */[
        val[0],
        val[1][0]
      ];
    }
    
  } else {
    match$1 = /* tuple */[
      zero$1(/* () */0),
      Hashtbl.create(undefined, 2)
    ];
  }
  var this_table = match$1[1];
  var this_measure_diff = match$1[0];
  hierarchy.contents = /* E */[this_table];
  return Misc.try_finally(f, (function (param) {
                hierarchy.contents = /* E */[prev_hierarchy];
                var end_measure = create(/* () */0);
                var measure_diff = accumulate(this_measure_diff, start_measure, end_measure);
                return Hashtbl.add(prev_hierarchy, name, /* tuple */[
                            measure_diff,
                            /* E */[this_table]
                          ]);
              }));
}

function record(accumulate, pass, f, x) {
  return record_call(accumulate, pass, (function (param) {
                return Curry._1(f, x);
              }));
}

function time_display(v) {
  var to_string_without_unit = function (v, width) {
    return Curry._2(Printf.sprintf(/* Format */[
                    /* Float */Block.__(8, [
                        /* Float_f */0,
                        /* Arg_padding */Block.__(1, [/* Zeros */2]),
                        /* Lit_precision */[3],
                        /* End_of_format */0
                      ]),
                    "%0*.03f"
                  ]), width, v);
  };
  var to_string = function (param, width) {
    return to_string_without_unit(v, width - 1 | 0) + "s";
  };
  var worth_displaying = function (param) {
    return Caml_format.caml_float_of_string(to_string_without_unit(v, 0)) !== 0;
  };
  return {
          to_string: to_string,
          worth_displaying: worth_displaying
        };
}

function bytes_of_words(words) {
  return words * (Sys.word_size / 8 | 0);
}

function to_string_without_unit(v, width, scale) {
  var v_rescaled = bytes_of_words(v) / scale;
  var v_rounded = Math.floor(v_rescaled * 1e3 + 0.5) / 1e3;
  var v_str = Curry._2(Printf.sprintf(/* Format */[
            /* Float */Block.__(8, [
                /* Float_f */0,
                /* No_padding */0,
                /* Arg_precision */1,
                /* End_of_format */0
              ]),
            "%.*f"
          ]), 3, v_rounded);
  var index_of_dot = $$String.index(v_str, /* "." */46);
  var v_str_truncated = $$String.sub(v_str, 0, index_of_dot >= 3 ? index_of_dot : 4);
  return Curry._2(Printf.sprintf(/* Format */[
                  /* String */Block.__(2, [
                      /* Arg_padding */Block.__(1, [/* Right */1]),
                      /* End_of_format */0
                    ]),
                  "%*s"
                ]), width, v_str_truncated);
}

var units = /* array */[
  "B",
  "kB",
  "MB",
  "GB"
];

function choose_memory_scale(words) {
  var bytes = bytes_of_words(words);
  var scale = units.length - 1 | 0;
  while(scale > 0 && bytes < Math.pow(1024, scale)) {
    scale = scale - 1 | 0;
  };
  return /* tuple */[
          Math.pow(1024, scale),
          Caml_array.caml_array_get(units, scale)
        ];
}

function memory_word_display(previous, v) {
  var to_string = function (max, width) {
    var match = choose_memory_scale(max);
    var scale_str = match[1];
    var width$1 = width - scale_str.length | 0;
    return to_string_without_unit(v, width$1, match[0]) + scale_str;
  };
  var worth_displaying = function (max) {
    var match = choose_memory_scale(max);
    var scale = match[0];
    if (Caml_format.caml_float_of_string(to_string_without_unit(v, 0, scale)) !== 0) {
      if (previous !== undefined) {
        return to_string_without_unit(previous, 0, scale) !== to_string_without_unit(v, 0, scale);
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  return {
          to_string: to_string,
          worth_displaying: worth_displaying
        };
}

function profile_list(param) {
  var l = Hashtbl.fold((function (k, d, l) {
          return /* :: */[
                  /* tuple */[
                    k,
                    d
                  ],
                  l
                ];
        }), param[0], /* [] */0);
  return List.sort((function (param, param$1) {
                return Caml_primitive.caml_int_compare(param[1][0].timestamp, param$1[1][0].timestamp);
              }), l);
}

function compute_other_category(param, total) {
  var r = {
    contents: total
  };
  Hashtbl.iter((function (_pass, param) {
          var p2 = param[0];
          var p1 = r.contents;
          r.contents = {
            timestamp: p1.timestamp,
            duration: p1.duration - p2.duration,
            allocated_words: p1.allocated_words - p2.allocated_words,
            top_heap_words_increase: p1.top_heap_words_increase - p2.top_heap_words_increase | 0
          };
          return /* () */0;
        }), param[0]);
  return r.contents;
}

function rows_of_hierarchy(nesting, make_row, name, measure_diff, hierarchy, env) {
  var rows = rows_of_hierarchy_list(nesting + 1 | 0, make_row, hierarchy, measure_diff, env);
  var match = Curry._3(make_row, env, measure_diff, nesting === 0 && name === "other");
  return /* tuple */[
          /* R */[
            name,
            match[0],
            rows
          ],
          match[1]
        ];
}

function rows_of_hierarchy_list(nesting, make_row, hierarchy, total, env) {
  var list = profile_list(hierarchy);
  var list$1 = list !== /* [] */0 || nesting === 0 ? Pervasives.$at(list, /* :: */[
          /* tuple */[
            "other",
            /* tuple */[
              compute_other_category(hierarchy, total),
              /* E */[Hashtbl.create(undefined, 2)]
            ]
          ],
          /* [] */0
        ]) : /* [] */0;
  var env$1 = {
    contents: env
  };
  return List.map((function (param) {
                var match = param[1];
                var match$1 = rows_of_hierarchy(nesting, make_row, param[0], match[0], match[1], env$1.contents);
                env$1.contents = match$1[1];
                return match$1[0];
              }), list$1);
}

function rows_of_hierarchy$1(hierarchy, measure_diff, initial_measure, columns) {
  var make_row = function (prev_top_heap_words, p, toplevel_other) {
    var top_heap_words = (prev_top_heap_words + p.top_heap_words_increase | 0) - (
      toplevel_other ? initial_measure.top_heap_words : 0
    ) | 0;
    return /* tuple */[
            List.map((function (param) {
                    if (param >= 885068885) {
                      if (param >= 936769581) {
                        var value = p.duration;
                        return /* tuple */[
                                value,
                                time_display(value)
                              ];
                      } else {
                        var value$1 = p.allocated_words;
                        return /* tuple */[
                                value$1,
                                (function (eta) {
                                      return memory_word_display(undefined, eta);
                                    })(value$1)
                              ];
                      }
                    } else if (param >= 208707190) {
                      var value$2 = p.top_heap_words_increase;
                      return /* tuple */[
                              value$2,
                              (function (eta) {
                                    return memory_word_display(undefined, eta);
                                  })(value$2)
                            ];
                    } else {
                      var partial_arg = prev_top_heap_words;
                      var f = function (param) {
                        return memory_word_display(partial_arg, param);
                      };
                      var value$3 = top_heap_words;
                      return /* tuple */[
                              value$3,
                              Curry._1(f, value$3)
                            ];
                    }
                  }), columns),
            top_heap_words
          ];
  };
  return rows_of_hierarchy_list(0, make_row, hierarchy, measure_diff, initial_measure.top_heap_words);
}

function max_by_column(n_columns, rows) {
  var a = Caml_array.caml_make_vect(n_columns, 0);
  var loop = function (param) {
    List.iteri((function (i, param) {
            return Caml_array.caml_array_set(a, i, Caml_primitive.caml_float_max(Caml_array.caml_array_get(a, i), param[0]));
          }), param[1]);
    return List.iter(loop, param[2]);
  };
  List.iter(loop, rows);
  return a;
}

function width_by_column(n_columns, display_cell, rows) {
  var a = Caml_array.caml_make_vect(n_columns, 1);
  var loop = function (param) {
    List.iteri((function (i, cell) {
            var match = Curry._3(display_cell, i, cell, 0);
            return Caml_array.caml_array_set(a, i, Caml_primitive.caml_int_max(Caml_array.caml_array_get(a, i), match[1].length));
          }), param[1]);
    return List.iter(loop, param[2]);
  };
  List.iter(loop, rows);
  return a;
}

function print(ppf, columns) {
  if (columns) {
    var match = initial_measure.contents;
    var initial_measure$1 = match !== undefined ? match : zero;
    var total = of_diff(zero, create(/* () */0));
    var ppf$1 = ppf;
    var rows = rows_of_hierarchy$1(hierarchy.contents, total, initial_measure$1, columns);
    var n_columns = rows ? List.length(rows[0][1]) : 0;
    var maxs = max_by_column(n_columns, rows);
    var display_cell = function (i, param, width) {
      var c = param[1];
      var display_cell$1 = Curry._1(c.worth_displaying, Caml_array.caml_array_get(maxs, i));
      return /* tuple */[
              display_cell$1,
              display_cell$1 ? Curry._2(c.to_string, Caml_array.caml_array_get(maxs, i), width) : $$String.make(width, /* "-" */45)
            ];
    };
    var widths = width_by_column(n_columns, display_cell, rows);
    var loop = function (param, indentation) {
      var match = List.split(List.mapi((function (i, cell) {
                  return display_cell(i, cell, Caml_array.caml_array_get(widths, i));
                }), param[1]));
      if (List.exists((function (b) {
                return b;
              }), match[0])) {
        Curry._3(Format.fprintf(ppf$1, /* Format */[
                  /* String */Block.__(2, [
                      /* No_padding */0,
                      /* String */Block.__(2, [
                          /* No_padding */0,
                          /* Char_literal */Block.__(12, [
                              /* " " */32,
                              /* String */Block.__(2, [
                                  /* No_padding */0,
                                  /* Formatting_lit */Block.__(17, [
                                      /* Force_newline */3,
                                      /* End_of_format */0
                                    ])
                                ])
                            ])
                        ])
                    ]),
                  "%s%s %s@\n"
                ]), indentation, $$String.concat(" ", match[1]), param[0]);
      }
      var arg = "  " + indentation;
      return List.iter((function (param) {
                    return loop(param, arg);
                  }), param[2]);
    };
    return List.iter((function (param) {
                  return loop(param, "");
                }), rows);
  } else {
    return /* () */0;
  }
}

var column_mapping = /* :: */[
  /* tuple */[
    "time",
    /* Time */936769581
  ],
  /* :: */[
    /* tuple */[
      "alloc",
      /* Alloc */885068885
    ],
    /* :: */[
      /* tuple */[
        "top-heap",
        /* Top_heap */208707190
      ],
      /* :: */[
        /* tuple */[
          "absolute-top-heap",
          /* Abs_top_heap */-494364893
        ],
        /* [] */0
      ]
    ]
  ]
];

var column_names = List.map((function (prim) {
        return prim[0];
      }), column_mapping);

var options_doc = Curry._1(Printf.sprintf(/* Format */[
          /* String_literal */Block.__(11, [
              " Print performance information for each pass\n    The columns are: ",
              /* String */Block.__(2, [
                  /* No_padding */0,
                  /* Char_literal */Block.__(12, [
                      /* "." */46,
                      /* End_of_format */0
                    ])
                ])
            ]),
          " Print performance information for each pass\n    The columns are: %s."
        ]), $$String.concat(" ", column_names));

var all_columns = List.map((function (prim) {
        return prim[1];
      }), column_mapping);

var generate = "generate";

var transl = "transl";

var typing = "typing";

export {
  reset ,
  record_call ,
  record ,
  print ,
  options_doc ,
  all_columns ,
  generate ,
  transl ,
  typing ,
  
}
/* hierarchy Not a pure module */