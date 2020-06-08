(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{324:function(t,e,o){},360:function(t,e,o){"use strict";var r=o(324);o.n(r).a},390:function(t,e,o){"use strict";o.r(e);o(202),o(28),o(92),o(29);var r=o(5),n=o(126),l=o.n(n),c=o(397),d={name:"PostEditor",middleware:"admin",layout:"default",components:{ClientOnly:l.a},asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var o,r,n,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=t.app,r=t.error,e.prev=1,e.next=4,o.$postEditorViewModel.getAllTopics();case 4:if(!(n=e.sent)||!n.data||n.errors){e.next=13;break}return e.next=8,n.data.getAllTopics;case 8:return(l=e.sent).forEach((function(t,e){l[e]={text:t.name.match(/[A-Z][a-z]+|[0-9]+/g).join(" "),value:t.name}})),e.abrupt("return",{allTopics:l});case 13:r({statusCode:404,message:"Topic not found"});case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(1),console.log(e.t0);case 19:case"end":return e.stop()}}),e,null,[[1,16]])})))()},data:function(){return{editor:null,postTitle:"",postTopicName:"",postCaption:"",postDescription:null,published:!1,openUploadDialog:!1,allTopics:[],valid:!1,postCaptionRules:[function(t){return""===t?"Post caption is required.":!1!==new RegExp("^[A-Z][A-Za-z]*").test(t)||"Post caption must start with a captial letter."}],postTopicRules:[function(t){return""!==t||"A suitable topic for post is required."}]}},mounted:function(){this.editor=this.createEditorInstance(),o(351)(document.getElementById("post-title-input"))},methods:{publishPost:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var o,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.t0=JSON,e.next=4,t.editor.save();case 4:return e.t1=e.sent,o=e.t0.stringify.call(e.t0,e.t1),e.next=8,t.$postEditorViewModel.publishPost(t.postTopicName,t.postTitle,t.postCaption,o);case 8:if(!(r=e.sent)||!r.data||r.errors){e.next=13;break}return e.abrupt("return",t.$router.push("/"));case 13:throw new Error("Some error occurred while creating post");case 14:e.next=19;break;case 16:e.prev=16,e.t2=e.catch(0),console.log(e.t2);case 19:case"end":return e.stop()}}),e,null,[[0,16]])})))()},createEditorInstance:function(){var t=this,e=o(352),n=o(353),l=o(354),d=o(355);return new e({holder:"editorjs",autofocus:!1,placeholder:"Don't hold back, speak your heart out...",tools:{inlineCode:o(356),embed:o(357),marker:o(358),header:{class:o(359),config:{levels:[2],defaultLevel:2}},image:{class:n,inlineToolbar:!1,config:{uploader:{uploadByFile:function(e){return Object(r.a)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,t.$uploadImageToFirebase(e,"/posts/"+Object(c.a)());case 3:o.next=8;break;case 5:o.prev=5,o.t0=o.catch(0),console.log(o.t0);case 8:case"end":return o.stop()}}),o,null,[[0,5]])})))()}}}},list:l,code:d}})}}},v=(o(360),o(50)),m=o(91),f=o.n(m),h=o(300),w=o(318),T=o(395),x=o(384),k=o(133),C=o(388),y=o(310),_=o(385),V=o(42),P=o(325),component=Object(v.a)(d,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"ma-0 pa-0"},[o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.postTitle,expression:"postTitle"}],staticClass:"display-2 mb-1",attrs:{id:"post-title-input",placeholder:"Post Title",rows:"1"},domProps:{value:t.postTitle},on:{input:function(e){e.target.composing||(t.postTitle=e.target.value)}}}),t._v(" "),o("client-only",[o("div",{attrs:{id:"editorjs"}})]),t._v(" "),o("v-btn",{staticClass:"publish-btn elevation-4",attrs:{fab:"",color:"primary",large:""},on:{click:function(e){t.openUploadDialog=!0}}},[o("v-icon",{attrs:{color:"white"}},[t._v("\n      publish\n    ")])],1),t._v(" "),o("v-dialog",{attrs:{width:200,fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},model:{value:t.openUploadDialog,callback:function(e){t.openUploadDialog=e},expression:"openUploadDialog"}},[o("v-card",[o("v-toolbar",[o("v-btn",{attrs:{icon:"",dark:""},on:{click:function(e){t.openUploadDialog=!1}}},[o("v-icon",[t._v("close")])],1),t._v(" "),o("v-toolbar-title",{staticClass:"font-weight-bold"},[t._v("\n          Publish Post\n        ")]),t._v(" "),o("v-spacer"),t._v(" "),o("v-toolbar-items",[o("v-btn",{attrs:{text:"",dark:"",disabled:!t.valid,color:"primary"},on:{click:function(e){return t.publishPost()}}},[t._v("\n            Publish\n          ")])],1)],1),t._v(" "),o("div",{staticClass:"px-6 pb-2 pt-6"},[o("v-form",{ref:"publishPostForm",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[o("v-select",{attrs:{items:t.allTopics,label:"Select a topic",hint:"Select a suitable topic for your post.",rules:t.postTopicRules,required:""},model:{value:t.postTopicName,callback:function(e){t.postTopicName=e},expression:"postTopicName"}}),t._v(" "),o("v-textarea",{attrs:{label:"Enter a caption for your post...",hint:"This caption will be displayed along with title on other pages.",counter:100,rows:"10",rules:t.postCaptionRules,required:""},model:{value:t.postCaption,callback:function(e){t.postCaption=e},expression:"postCaption"}})],1)],1)],1)],1)],1)}),[],!1,null,"0af5e5ce",null);e.default=component.exports;f()(component,{VBtn:h.a,VCard:w.a,VDialog:T.a,VForm:x.a,VIcon:k.a,VSelect:C.a,VSpacer:y.a,VTextarea:_.a,VToolbar:V.a,VToolbarItems:P.a,VToolbarTitle:P.b})}}]);