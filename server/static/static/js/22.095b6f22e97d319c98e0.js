webpackJsonp([22],{"/gOv":function(t,e){},"htZ/":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("9rMa"),s={name:"articleList",data:function(){return{loadMore:"加载更多"}},props:{articleData:{type:Array}},computed:Object(i.b)(["getCritical"]),components:{SplitView:function(t){a.e(27).then(function(){var e=[a("2Hta")];t.apply(null,e)}.bind(this)).catch(a.oe)}},methods:{detail:function(t){this.$store.dispatch("detail",t),this.$router.push("/detail")},addMore:function(){this.loadMore="正在加载中...",this.$store.dispatch("changePage")}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"article"},[a("split-view"),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:0==t.articleData.length,expression:"articleData.length == 0"}],staticClass:"card-body py-5 text-center text-warning"},[t._v("\n            暂无数据!    \n    ")]),t._v(" "),a("transition-group",{attrs:{name:"list",tag:"div"}},t._l(t.articleData,function(e,i){return a("div",{key:i,staticClass:"row",on:{click:function(a){t.detail(e.id)}}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.name,expression:"item.name"}],staticClass:"ribbon-zzsc-green"},[a("div",{staticClass:"ribbon-green"},[t._v(t._s(e.name))])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.img,expression:"item.img"}],staticClass:"col-md-4"},[a("img",{attrs:{src:e.img,width:"100%",height:"100%"}})]),t._v(" "),a("div",{staticClass:"col-md-8"},[a("h4",{staticClass:"card-title"},[t._v(t._s(e.title))]),t._v(" "),a("ul",{staticClass:"message"},[a("li",[a("span",{staticClass:"iconfont"},[t._v("")]),t._v(t._s(t._f("timeFormat")(e.post_time)))]),t._v(" "),a("li",[a("span",{staticClass:"iconfont"},[t._v("")]),t._v(t._s(e.username))]),t._v(" "),a("li",[a("span",{staticClass:"iconfont"},[t._v("")]),t._v("阅读("+t._s(e.read_num)+")")])]),t._v(" "),a("div",{staticClass:"card-text text-truncate"},[t._v(t._s(e.description))])])])})),t._v(" "),t.articleData.length%5!=0||0===t.articleData.length||t.getCritical?0!==t.articleData.length?a("div",{staticClass:"text-center py-4"},[t._v("\n        我是有底线的...\n    ")]):t._e():a("button",{staticClass:"btn btn-info btn-block",on:{click:function(e){t.addMore()}}},[t._v(t._s(t.loadMore))])],1)},staticRenderFns:[]};var c=a("Z0/y")(s,n,!1,function(t){a("/gOv")},"data-v-71ec53ef",null);e.default=c.exports}});
//# sourceMappingURL=22.095b6f22e97d319c98e0.js.map