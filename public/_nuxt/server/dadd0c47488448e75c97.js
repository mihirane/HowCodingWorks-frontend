exports.ids=[2],exports.modules={117:function(t,e,o){"use strict";var r=o(1),n=o.n(r),l=(o(118),o(46)),c=o(5),d=o(13),h=o(47),m=o(4),f=o(0),y=o(3);var v=Object(y.a)(c.a,Object(d.b)(["absolute","fixed","top","bottom"]),h.a,m.a).extend({name:"v-progress-linear",props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data(){return{internalLazyValue:this.value||0}},computed:{__cachedBackground(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:Object(f.f)(this.normalizedValue,"%")}}))},__cachedIndeterminate(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:Object(f.f)(100-this.normalizedBuffer,"%")}})):null},backgroundStyle(){return{opacity:null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity),[this.$vuetify.rtl?"right":"left"]:Object(f.f)(this.normalizedValue,"%"),width:Object(f.f)(this.normalizedBuffer-this.normalizedValue,"%")}},classes(){return{"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped,...this.themeClasses}},computedTransition(){return this.indeterminate?l.c:l.d},normalizedBuffer(){return this.normalize(this.bufferValue)},normalizedValue(){return this.normalize(this.internalLazyValue)},reactive(){return Boolean(this.$listeners.change)},styles(){const t={};return this.active||(t.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(t.width=Object(f.f)(this.normalizedBuffer,"%")),t}},methods:{genContent(){const slot=Object(f.m)(this,"default",{value:this.internalLazyValue});return slot?this.$createElement("div",{staticClass:"v-progress-linear__content"},slot):null},genListeners(){const t=this.$listeners;return this.reactive&&(t.click=this.onClick),t},genProgressBar(t){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:{[t]:!0}}))},onClick(t){if(!this.reactive)return;const{width:e}=this.$el.getBoundingClientRect();this.internalValue=t.offsetX/e*100},normalize:t=>t<0?0:t>100?100:parseFloat(t)},render(t){return t("div",{staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,style:{bottom:this.bottom?0:void 0,height:this.active?Object(f.f)(this.height):0,top:this.top?0:void 0},on:this.genListeners()},[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}});e.a=n.a.extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress(){return!1===this.loading?null:this.$slots.progress||this.$createElement(v,{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}})},118:function(t,e){t.exports={}},119:function(t,e,o){"use strict";o.d(e,"a",(function(){return c})),o.d(e,"b",(function(){return d}));var r=o(120),n=o(0);const l=Object(n.g)("v-card__actions"),c=Object(n.g)("v-card__subtitle"),d=Object(n.g)("v-card__text"),h=Object(n.g)("v-card__title");r.a},120:function(t,e,o){"use strict";o(121);var r=o(48),n=o(117),l=o(12),c=o(3);e.a=Object(c.a)(n.a,l.a,r.a).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},outlined:Boolean,raised:Boolean,shaped:Boolean},computed:{classes(){return{"v-card":!0,...l.a.options.computed.classes.call(this),"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--outlined":this.outlined,"v-card--raised":this.raised,"v-card--shaped":this.shaped,...r.a.options.computed.classes.call(this)}},styles(){const style={...r.a.options.computed.styles.call(this)};return this.img&&(style.background=`url("${this.img}") center center / cover no-repeat`),style}},methods:{genProgress(){const t=n.a.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render(t){const{tag:e,data:data}=this.generateRouteLink();return data.style=this.styles,this.isClickable&&(data.attrs=data.attrs||{},data.attrs.tabindex=0),t(e,this.setBackgroundColor(this.color,data),[this.genProgress(),this.$slots.default])}})},121:function(t,e){t.exports={}},122:function(t,e){t.exports={}},126:function(t,e,o){"use strict";var r=o(11),n=o.n(r);const l=o(63);e.a=class{static async getTopicContainerData(t,e){try{const o=await n.a.post(l.graphqlEndpoint,{query:"\n            query GetTopicContainerData($userIdVar: String!, $topicNameVar: String!) {\n                getTopicFromTopicName(topicName: $topicNameVar){\n                    name\n                    description\n                    thumbnailLink\n                    followersCount\n                    posts {\n                        id\n                        title\n                        caption\n                    }\n                }\n                checkIfTopicIsFollowedByUser(userId: $userIdVar, topicName: $topicNameVar)\n            }\n        ",operationName:"GetTopicContainerData",variables:{userIdVar:t,topicNameVar:e}});if(o&&o.data)return o.data;throw new Error("Some error occurred while fetching topic container data")}catch(t){console.log(t.response.data.errors)}}static async getTopicContainerDataWithoutUser(t){try{const e=await n.a.post(l.graphqlEndpoint,{query:"\n            query GetTopicContainerDataWithoutUser($topicNameVar: String!) {\n                getTopicFromTopicName(topicName: $topicNameVar) {\n                    name\n                    description\n                    thumbnailLink\n                    followersCount\n                    posts {\n                        id\n                        title\n                        caption\n                    }\n                }\n            }\n        ",operationName:"GetTopicContainerDataWithoutUser",variables:{topicNameVar:t}});if(e&&e.data)return e.data;throw new Error("Some error occurred while fetching topic container data")}catch(t){console.log(t.response.data.errors)}}static async checkIfTopicIsFollowedByUser(t,e){try{const o=await n.a.post(l.graphqlEndpoint,{query:"\n            query CheckIfTopicIsFollowedByUser($userIdVar: String!, $topicNameVar: String!) {      \n                checkIfTopicIsFollowedByUser(userId: $userIdVar, topicName: $topicNameVar)\n            }\n        ",operationName:"CheckIfTopicIsFollowedByUser",variables:{userIdVar:t,topicNameVar:e}});if(o&&o.data)return o.data;throw new Error("Some error occurred while checking if topic is followed by user")}catch(t){console.log(t.response.data.errors)}}static async followTopic(t,e){try{const o=await n.a.post(l.graphqlEndpoint,{query:"\n            mutation FollowTopic($userIdVar: String!, $topicNameVar: String!) {\n                followTopic(userId: $userIdVar, topicName: $topicNameVar) {\n                    name\n                }\n            }\n        ",operationName:"FollowTopic",variables:{userIdVar:t,topicNameVar:e}});if(o&&o.data)return o.data;throw new Error("Some error occurred while following topic")}catch(t){console.log(t.response.data.errors)}}static async unfollowTopic(t,e){try{const o=await n.a.post(l.graphqlEndpoint,{query:"\n            mutation UnfollowTopic($userIdVar: String!, $topicNameVar: String!) {\n                unfollowTopic(userId: $userIdVar, topicName: $topicNameVar) {\n                    name\n                }\n            }\n        ",operationName:"UnfollowTopic",variables:{userIdVar:t,topicNameVar:e}});if(o&&o.data)return o.data;throw new Error("Some error occurred while following topic")}catch(t){console.log(t)}}}},140:function(t,e,o){"use strict";o.r(e);var r=o(122),n=o.n(r);for(var l in r)"default"!==l&&function(t){o.d(e,t,(function(){return r[t]}))}(l);e.default=n.a},143:function(t,e){t.exports={}},145:function(t,e,o){"use strict";var r={name:"PostCard",components:{},props:{postId:{type:String,default:null},postTopicName:{type:String,default:null},postTitle:{type:String,default:null},postCaption:{type:String,default:null}},computed:{getTopicName(){return this.$props.postTopicName.match(/[A-Z][a-z]+|[0-9]+/g).join(" ").toUpperCase()}},methods:{goToBlogPost(){return this.$router.push("/"+this.$props.postTopicName+"/"+this.$props.postTitle.split(" ").join("_")+"--"+this.$props.postId)}}},n=o(10),l=o(23),c=o.n(l),d=o(120),h=o(119),m=o(37);var component=Object(n.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-card",{staticClass:"post-card",on:{click:function(e){return t.goToBlogPost()}}},[o("v-card-subtitle",{staticClass:"pb-0",staticStyle:{"letter-spacing":"1px"}},[t._v("\n    "+t._s(t.getTopicName)+"\n  ")]),t._v(" "),o("v-responsive",{staticClass:"px-4 pt-2 pb-0 title",staticStyle:{"line-height":"28px"}},[t._v("\n    "+t._s(t.postTitle)+"\n  ")]),t._v(" "),o("v-card-text",{staticClass:"pt-3"},[t._v("\n    "+t._s(t.postCaption)+"\n  ")])],1)}),[],!1,(function(t){var e=o(140);e.__inject__&&e.__inject__(t)}),"190f3ae7","5dcd6574");e.a=component.exports;c()(component,{VCard:d.a,VCardSubtitle:h.a,VCardText:h.b,VResponsive:m.a})},164:function(t,e,o){"use strict";o.r(e);var r=o(143),n=o.n(r);for(var l in r)"default"!==l&&function(t){o.d(e,t,(function(){return r[t]}))}(l);e.default=n.a},178:function(t,e,o){"use strict";o.r(e);var r=o(126),n={name:"TopicContainer",layout:"default",watchQuery:!0,components:{PostCard:o(145).a},async asyncData({params:t,store:e,error:o}){try{if(null==e.state.currentUser){const e=await r.a.getTopicContainerDataWithoutUser(t.topicName);if(e&&e.data)return{apolloData:e.data};throw new Error("Some error occurred in apolloData")}{const n=await r.a.getTopicContainerData(e.state.currentUser.uid,t.topicName);if(n&&n.data&&!n.errors&&null!=n.data.getTopicFromTopicName)return{apolloData:n.data};o({statusCode:404,message:"Topic not found"})}}catch(o){o({statusCode:404,message:"Topic not found"})}},computed:{getTopicName(){return this.apolloData.getTopicFromTopicName.name.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}},async mounted(){const t=await this.apolloData.checkIfTopicIsFollowedByUser,e=document.getElementById("follow-btn"),o=document.getElementById("unfollow-btn");t?o.style="display: initial;":e.style="display: initial;"},methods:{async followTopic(){try{if(!this.$store.state.currentUser.uid||null==this.$store.state.currentUser.uid)return this.$router.push("/signUp");{if(!(await r.a.followTopic(this.$store.state.currentUser.uid,this.$route.params.topicName)).data)throw new Error("Some error occurred while following topic");const t=document.getElementById("follow-btn"),e=document.getElementById("unfollow-btn");t.style="display: none;",e.style="display: initial;";const o=document.getElementById("follow-count"),n=document.getElementById("follow-count-increment"),l=document.getElementById("follow-count-decrement");this.apolloData.checkIfTopicIsFollowedByUser?(o.style="display: initial;",n.style="display: none;",l.style="display: none;"):(o.style="display: none;",n.style="display: initial;",l.style="display: none;")}}catch(t){console.log(t)}},async unfollowTopic(){try{if(!this.$store.state.currentUser.uid||null==this.$store.state.currentUser.uid)return this.$router.push("/signUp");{if(!(await r.a.unfollowTopic(this.$store.state.currentUser.uid,this.$route.params.topicName)).data)throw new Error("Some error occurred while unfollowing topic");const t=document.getElementById("follow-btn"),e=document.getElementById("unfollow-btn");t.style="display: initial;",e.style="display: none;";const o=document.getElementById("follow-count"),n=document.getElementById("follow-count-increment"),l=document.getElementById("follow-count-decrement");this.apolloData.checkIfTopicIsFollowedByUser?(o.style="display: none;",n.style="display: none;",l.style="display: initial;"):(o.style="display: initial;",n.style="display: none;",l.style="display: none;")}}catch(t){console.log(t)}}},head(){return{title:this.apolloData.getTopicFromTopicName.name.match(/[A-Z][a-z]+|[0-9]+/g).join(" "),meta:[{hid:"description",name:"description",content:this.apolloData.getTopicFromTopicName.description}]}}},l=o(10),c=o(23),d=o.n(c),h=o(103),m=o(100),f=o(60),y=o(19),v=o(40),_=o(41),w=o(7);var component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"ma-0 pa-0"},[t._ssrNode('<div class="mb-6 px-2" data-v-04c4c1a1>',"</div>",[o("v-list-item",{staticClass:"pl-1"},[o("v-list-item-avatar",{attrs:{size:"14%",left:""}},[o("v-img",{attrs:{src:t.apolloData.getTopicFromTopicName.thumbnailLink,alt:t.getTopicName+"Thumbnail"}})],1),t._v(" "),o("span",{staticClass:"mr-4"},[o("v-list-item-title",{staticClass:"font-weight-bold mb-1 topic-name"},[o("h1",{staticClass:"font-weight-bold headline"},[t._v(t._s(t.getTopicName))])]),t._v(" "),o("v-list-item-subtitle",{staticClass:"font-weight-light followers-count"},[o("span",{attrs:{id:"follow-count"}},[t._v(t._s(t.apolloData.getTopicFromTopicName.followersCount))]),t._v(" "),o("span",{staticStyle:{display:"none"},attrs:{id:"follow-count-increment"}},[t._v(t._s(t.apolloData.getTopicFromTopicName.followersCount+1))]),t._v(" "),o("span",{staticStyle:{display:"none"},attrs:{id:"follow-count-decrement"}},[t._v(t._s(t.apolloData.getTopicFromTopicName.followersCount-1))]),t._v(" "),o("span",[t._v("Following")])])],1),t._v(" "),o("v-list-item-action",{staticClass:"d-flex justify-center"},[o("v-btn",{attrs:{id:"follow-btn",small:"",outlined:""},on:{click:function(e){return t.followTopic()}}},[t._v("\n          Follow\n        ")]),t._v(" "),o("v-btn",{staticClass:"elevation-0",attrs:{id:"unfollow-btn",small:"",color:"primary"},on:{click:function(e){return t.unfollowTopic()}}},[t._v("\n          Following\n        ")])],1)],1),t._ssrNode(' <h3 class="font-weight-regular topic-description" style="font-size: 18px;" data-v-04c4c1a1>'+t._ssrEscape("\n      "+t._s(t.apolloData.getTopicFromTopicName.description)+"\n    ")+"</h3>")],2),t._ssrNode(" "),o("v-divider"),t._ssrNode(" "),t._ssrNode('<div class="posts-grid-container" data-v-04c4c1a1>',"</div>",t._l(t.apolloData.getTopicFromTopicName.posts,(function(e){return t._ssrNode('<div class="ma-0 pa-0" data-v-04c4c1a1>',"</div>",[o("post-card",{attrs:{"post-topic-name":t.apolloData.getTopicFromTopicName.name,"post-id":e.id,"post-title":e.title,"post-caption":e.caption}})],1)})),0)],2)}),[],!1,(function(t){var e=o(164);e.__inject__&&e.__inject__(t)}),"04c4c1a1","1229131c");e.default=component.exports;d()(component,{VBtn:h.a,VDivider:m.a,VImg:f.a,VListItem:y.a,VListItemAction:v.a,VListItemAvatar:_.a,VListItemSubtitle:w.b,VListItemTitle:w.c})}};