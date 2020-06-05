(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{321:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));r(48);var n=r(12),o=r(44);r(339);function c(e,t){return l.apply(this,arguments)}function l(){return(l=Object(n.a)(regeneratorRuntime.mark((function e(t,r){var n,c,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=o.storage().ref("images/"),e.next=4,n.child(r).put(t);case 4:return c=e.sent,e.next=7,c.ref.getDownloadURL();case 7:return l=e.sent,e.abrupt("return",{success:1,file:{url:l}});case 11:return e.prev=11,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",{success:0,file:{url:""}});case 15:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}},322:function(e,t,r){},359:function(e,t,r){"use strict";var n=r(322);r.n(n).a},392:function(e,t,r){"use strict";r.r(t);r(200),r(26),r(90),r(48);var n=r(12),o=r(124),c=r.n(o),l=r(399),d=r(21),v=r(34),f=r(59),m=r.n(f),h=r(136),w=function(){function e(){Object(d.a)(this,e)}var t,r;return Object(v.a)(e,null,[{key:"getAllTopics",value:(r=Object(n.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.a.post(h.graphqlEndpoint,{query:"\n            query GetAllTopics {\n                getAllTopics {\n                    name\n                }\n            }\n        ",operationName:"GetAllTopics",variables:{}});case 3:if(!(t=e.sent)||!t.data){e.next=8;break}return e.abrupt("return",t.data);case 8:throw new Error("Some error occurred while following topic");case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0.response.data.errors);case 14:case"end":return e.stop()}}),e,null,[[0,11]])}))),function(){return r.apply(this,arguments)})},{key:"publishPost",value:(t=Object(n.a)(regeneratorRuntime.mark((function e(t,r,n,o){var c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.a.post(h.graphqlEndpoint,{query:"\n            mutation CreatePost($postInputVar: PostInput!) {\n                createPost(postInput: $postInputVar) {\n                    id\n                }\n            }\n        ",operationName:"CreatePost",variables:{postInputVar:{title:r,caption:n,description:o,topicName:t,published:!0}}});case 3:if(!(c=e.sent)||!c.data){e.next=8;break}return e.abrupt("return",c.data);case 8:throw new Error("Some error occurred while following topic");case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0.response.data.errors);case 14:case"end":return e.stop()}}),e,null,[[0,11]])}))),function(e,r,n,o){return t.apply(this,arguments)})}]),e}(),x=r(321),T={name:"PostEditor",middleware:"admin",layout:"default",components:{ClientOnly:c.a},asyncData:function(e){return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.error,t.prev=1,t.next=4,w.getAllTopics();case 4:if(!(n=t.sent)||!n.data||n.errors){t.next=13;break}return t.next=8,n.data.getAllTopics;case 8:return(o=t.sent).forEach((function(e,t){o[t]={text:e.name.match(/[A-Z][a-z]+|[0-9]+/g).join(" "),value:e.name}})),t.abrupt("return",{allTopics:o});case 13:r({statusCode:404,message:"Topic not found"});case 14:t.next=20;break;case 16:t.prev=16,t.t0=t.catch(1),r({statusCode:404,message:"Topic not found"}),console.log(t.t0);case 20:case"end":return t.stop()}}),t,null,[[1,16]])})))()},data:function(){return{editor:null,postTitle:"",postTopicName:"",postCaption:"",postDescription:null,published:!1,openUploadDialog:!1,allTopics:[],valid:!1,postCaptionRules:[function(e){return""===e?"Post caption is required.":!1!==new RegExp("^[A-Z][A-Za-z]*").test(e)||"Post caption must start with a captial letter."}],postTopicRules:[function(e){return""!==e||"A suitable topic for post is required."}]}},mounted:function(){this.editor=this.createEditorInstance(),r(350)(document.getElementById("post-title-input"))},methods:{publishPost:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.t0=JSON,t.next=4,e.editor.save();case 4:return t.t1=t.sent,r=t.t0.stringify.call(t.t0,t.t1),t.next=8,w.publishPost(e.postTopicName,e.postTitle,e.postCaption,r);case 8:if(!(n=t.sent)||!n.data||n.errors){t.next=13;break}return t.abrupt("return",e.$router.push("/"));case 13:throw new Error("Some error occurred while creating post");case 14:t.next=19;break;case 16:t.prev=16,t.t2=t.catch(0),console.log(t.t2);case 19:case"end":return t.stop()}}),t,null,[[0,16]])})))()},createEditorInstance:function(){var e=r(351),t=r(352),o=r(353),c=r(354);return new e({holder:"editorjs",autofocus:!1,placeholder:"Don't hold back, speak your heart out...",tools:{inlineCode:r(355),embed:r(356),marker:r(357),header:{class:r(358),config:{levels:[2],defaultLevel:2}},image:{class:t,inlineToolbar:!1,config:{uploader:{uploadByFile:function(e){return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(x.a)(e,"/posts/"+Object(l.a)());case 3:t.next=8;break;case 5:t.prev=5,t.t0=t.catch(0),console.log(t.t0);case 8:case"end":return t.stop()}}),t,null,[[0,5]])})))()}}}},list:o,code:c}})}}},k=(r(359),r(49)),y=r(89),C=r.n(y),R=r(296),P=r(314),j=r(397),V=r(386),_=r(130),E=r(391),O=r(306),D=r(387),A=r(40),I=r(323),component=Object(k.a)(T,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"ma-0 pa-0"},[r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.postTitle,expression:"postTitle"}],staticClass:"display-2 mb-1",attrs:{id:"post-title-input",placeholder:"Post Title",rows:"1"},domProps:{value:e.postTitle},on:{input:function(t){t.target.composing||(e.postTitle=t.target.value)}}}),e._v(" "),r("client-only",[r("div",{attrs:{id:"editorjs"}})]),e._v(" "),r("v-btn",{staticClass:"publish-btn elevation-4",attrs:{fab:"",color:"primary",large:""},on:{click:function(t){e.openUploadDialog=!0}}},[r("v-icon",{attrs:{color:"white"}},[e._v("\n      publish\n    ")])],1),e._v(" "),r("v-dialog",{attrs:{width:200,fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},model:{value:e.openUploadDialog,callback:function(t){e.openUploadDialog=t},expression:"openUploadDialog"}},[r("v-card",[r("v-toolbar",[r("v-btn",{attrs:{icon:"",dark:""},on:{click:function(t){e.openUploadDialog=!1}}},[r("v-icon",[e._v("close")])],1),e._v(" "),r("v-toolbar-title",{staticClass:"font-weight-bold"},[e._v("\n          Publish Post\n        ")]),e._v(" "),r("v-spacer"),e._v(" "),r("v-toolbar-items",[r("v-btn",{attrs:{text:"",dark:"",disabled:!e.valid,color:"primary"},on:{click:function(t){return e.publishPost()}}},[e._v("\n            Publish\n          ")])],1)],1),e._v(" "),r("div",{staticClass:"px-6 pb-2 pt-6"},[r("v-form",{ref:"publishPostForm",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("v-select",{attrs:{items:e.allTopics,label:"Select a topic",hint:"Select a suitable topic for your post.",rules:e.postTopicRules,required:""},model:{value:e.postTopicName,callback:function(t){e.postTopicName=t},expression:"postTopicName"}}),e._v(" "),r("v-textarea",{attrs:{label:"Enter a caption for your post...",hint:"This caption will be displayed along with title on other pages.",counter:100,rows:"10",rules:e.postCaptionRules,required:""},model:{value:e.postCaption,callback:function(t){e.postCaption=t},expression:"postCaption"}})],1)],1)],1)],1)],1)}),[],!1,null,"034b71d2",null);t.default=component.exports;C()(component,{VBtn:R.a,VCard:P.a,VDialog:j.a,VForm:V.a,VIcon:_.a,VSelect:E.a,VSpacer:O.a,VTextarea:D.a,VToolbar:A.a,VToolbarItems:I.a,VToolbarTitle:I.b})}}]);