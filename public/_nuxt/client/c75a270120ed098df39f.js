(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{394:function(e,t,n){"use strict";n.r(t);n(48);var r=n(12),o=n(59),c=n.n(o),l=n(132),d=(n(204),n(136)),h={name:"SignUp",layout:"default",middleware:"signUp",methods:{signInWithGoogle:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,o,h,data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,new l.a.auth.GoogleAuthProvider;case 3:return n=t.sent,t.next=6,l.a.auth().signInWithPopup(n);case 6:if(!(r=t.sent).user){t.next=23;break}return t.next=10,r.user.getIdToken();case 10:return o=t.sent,t.next=13,c.a.post(d.authEndpoint,{id_token:o});case 13:if(!((h=t.sent)&&h.data&&h.data.custom_token)){t.next=23;break}return t.next=17,l.a.auth().signInWithCustomToken(h.data.custom_token);case 17:return data=t.sent,t.next=20,e.$cookies.set("currentUser",data.user);case 20:return t.next=22,e.$router.push("/");case 22:window.location.reload(!0);case 23:t.next=28;break;case 25:t.prev=25,t.t0=t.catch(0),console.log(t.t0);case 28:case"end":return t.stop()}}),t,null,[[0,25]])})))()}}},f=n(49),w=n(89),x=n.n(w),k=n(296),component=Object(f.a)(h,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"ma-0 pa-0"},[n("v-btn",{staticClass:"d-flex flex-row justify-space-between",on:{click:function(t){return e.signInWithGoogle()}}},[n("span",[e._v("Sign in with Google")])])],1)}),[],!1,null,"c70bb22a",null);t.default=component.exports;x()(component,{VBtn:k.a})}}]);