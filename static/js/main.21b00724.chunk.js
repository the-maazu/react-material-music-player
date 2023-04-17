(this["webpackJsonpreact-material-music-player"]=this["webpackJsonpreact-material-music-player"]||[]).push([[0],{131:function(e,t,a){},132:function(e,t,a){},154:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),i=a(31),c=a.n(i),o=(a(131),a(4)),s=a(10),l=a.p+"static/media/logo.103b5fa1.svg",u=(a(132),a(221)),d=a(209),p=a(222),h=a(228),b=a(220),j=a(225),f=a(214),x=a(210),m=a(211),g=a(212),v=a(16),O=a(17),y=a(5),w=a(18),k=a(226),S=a(218),T=a(1),E=Object(y.a)("img")((function(){return{height:"100%",width:"100%",border:"0px"}}));function R(e){var t=e.src,a=e.sx;return Object(T.jsx)(p.a,{sx:Object(v.a)({border:1,borderColor:"divider",borderRadius:2,overflow:"hidden"},a),children:Object(T.jsx)(E,{src:t,alt:""})})}function C(e){var t=Object(O.d)((function(e){var t=e.playlist[e.currentTrack];return{title:t.title,artist:t.artist}}),O.b),a=t.title,r=t.artist,n=e.sx;return Object(T.jsxs)(p.a,{sx:n,children:[Object(T.jsx)(p.a,{sx:{typography:"subtitl3",whiteSpace:"nowrap",overflow:"hidden"},children:a}),Object(T.jsx)(p.a,{sx:{typography:"subtitle2",whiteSpace:"nowrap",overflow:"hidden"},children:r})]})}var A=a(46),L=a(47),M=a(72),P=a(77),I=a(115);function z(e,t,a,r,n){this.ID=e,this.coverArt=t,this.title=a,this.artist=r,this.source=n,this.getSource=function(){return n}}var D="STOPPED",N="PLAYING",B="PAUSED",_="NORMAL",G="REPEAT_ALL",H="REPEAT_ONE",F="PLAY",V="PLAY_LATER",W="PLAY_NEXT",U=function(e){Object(M.a)(a,e);var t=Object(P.a)(a);function a(){var e;return Object(A.a)(this,a),(e=t.call(this)).track=new z("","","","",""),e}return Object(L.a)(a,[{key:"setSrc",value:function(e){void 0!==e&&(this.isCurrent(e)||(this.src=e.source,this.track=e,this.setMediaMetadata(e)))}},{key:"setMediaMetadata",value:function(e){"mediaSession"in navigator&&(navigator.mediaSession.metadata=e?new window.MediaMetadata({title:e.title,artist:e.artist,album:"",artwork:[{src:e.coverArt}]}):null)}},{key:"clear",value:function(){""!==this.src&&(this.setSrc(new z("","","","","")),this.setMediaMetadata(null))}},{key:"isCurrent",value:function(e){return this.track.ID===e.ID}}]),a}(Object(I.a)(Audio)),Y="CHANGE_TRACK",K="PLAY",q="PAUSE",J="STOP",X="SHUFFLE",$="UPDATE_PLAYLIST",Q="CHANGE_VOLUME",Z="SET_CURRENT_TIME",ee="SET_TIME_LEFT",te="SEEK",ae="SET_REPEAT_MODE",re="SKIP_NEXT",ne="SKIP_PREV",ie={changeTrack:function(e){return{type:Y,payload:{index:e}}},play:function(){return{type:K}},pause:function(){return{type:q}},stop:function(){return{type:J}},updatePlaylist:function(e){return{type:$,payload:{playlist:e}}},volumeChange:function(e){return{type:Q,payload:{volume:e}}},shuffle:function(e){return{type:X,payload:{shuffle:e}}},setCurrentTime:function(e){return{type:Z,payload:{currentTime:e}}},setTimeLeft:function(e){return{type:ee,payload:{timeLeft:e}}},seek:function(e){return{type:te,payload:{time:e}}},changeVolume:function(e){return{type:Q,payload:{volume:e}}},setRepeatMode:function(){return{type:ae}},skipNext:function(){return{type:re}},skipPrev:function(){return{type:ne}}},ce=a(216),oe=a(223);var se=function(e){var t=Math.floor(e/60).toString(),a=Math.floor(e%60).toString();return t+":"+(a.length<2?"0":"")+a};function le(e){var t=e.sx,a=Object(O.d)((function(e){return{timeLeft:e.timeLeft,currentTime:e.currentTime}}),O.b),r=a.timeLeft,n=a.currentTime,i=n/(r+n)*100||0,c=Object(O.c)();return Object(T.jsxs)(p.a,{sx:Object(v.a)({display:"flex",flexDirection:"row",wrap:"nowrap",alignItems:"center","& > .children":{mx:1}},t),children:[Object(T.jsx)(oe.a,{className:"children",children:se(n)}),Object(T.jsx)(ce.a,{className:"children","aria-labelledby":"continuous-slider",value:i,onChange:function(e,t){var a;a=t/100*(n+r),c(ie.seek(a))}}),Object(T.jsx)(oe.a,{className:"children",children:se(r)})]})}var ue=a(224),de=a(111),pe=a.n(de),he=a(108),be=a.n(he),je=a(110),fe=a.n(je),xe=a(109),me=a.n(xe);var ge=function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),r=1;r<t;r++)a[r-1]=arguments[r];return function(t){t.stopPropagation(),e.apply(void 0,a)}};function ve(e){var t=e.sx,a=Object(O.d)((function(e){return e.mediaState})),r=Object(O.c)(),n=a===N;return Object(T.jsxs)(p.a,{sx:Object(v.a)({display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",flexWrap:"nowrap"},t),children:[Object(T.jsx)(ue.a,{onClick:ge((function(){return r(ie.skipPrev())})),size:"large",children:Object(T.jsx)(be.a,{fontSize:"large"})}),Object(T.jsx)(ue.a,{onClick:ge(n?function(){return r(ie.pause())}:function(){return r(ie.play())}),size:"large",children:n?Object(T.jsx)(me.a,{fontSize:"large"}):Object(T.jsx)(fe.a,{fontSize:"large"})}),Object(T.jsx)(ue.a,{onClick:ge((function(){return r(ie.skipNext())})),size:"large",children:Object(T.jsx)(pe.a,{fontSize:"large"})})]})}var Oe=a(198),ye=a(199);function we(e){var t=e.sx,a=Object(O.c)(),r=function(e){return a(ie.changeVolume(e))},n=Object(O.d)((function(e){return e.volume}));return Object(T.jsxs)(p.a,{sx:Object(v.a)({display:"flex",direction:"row",wrap:"nowrap",alignItems:"center","& > .children":{mx:1}},t),children:[Object(T.jsx)(ue.a,{className:"children",onClick:ge(r,n<10?0:n-10),size:"large",children:Object(T.jsx)(Oe.a,{})}),Object(T.jsx)(ce.a,{className:"children",value:n,"aria-labelledby":"continuous-slider",onChange:function(e,t){r(t)}}),Object(T.jsx)(ue.a,{className:"children",onClick:ge(r,n>90?100:n+10),size:"large",children:Object(T.jsx)(ye.a,{})})]})}var ke=a(95),Se=a(202),Te=a(203),Ee=a(204),Re=a(205),Ce=a(206),Ae=a(207),Le=a(219),Me=a(227),Pe=a(112),Ie=a.n(Pe),ze=a(200),De=a(201),Ne=function(e){Object(M.a)(a,e);var t=Object(P.a)(a);function a(e){var r;return Object(A.a)(this,a),(r=t.call(this,e)).props=e,r}return Object(L.a)(a,[{key:"handleSelect",value:function(){var e=this.props.commonProps,t=this.props.item;e.onTrackSelect(e.listOfID.indexOf(t.ID))}},{key:"render",value:function(){var e=this.props,t=e.item,a=e.dragHandleProps,r=e.commonProps,n=e.itemSelected;return Object(T.jsxs)(p.a,{sx:{maxHeight:"100%",display:"flex",flexDirection:"row",alignItems:"center",flexWrap:"nowrap",border:1,borderColor:"divider",borderRadius:1,boxSizing:"border-box",padding:.5,boxShadow:n>0?16:0},children:[Object(T.jsxs)(p.a,{sx:{display:"flex",flexGrow:1,alignItems:"center"},onClick:ge(this.handleSelect.bind(this)),children:[r.currentTrackID===t.ID?Object(T.jsx)(ze.a,{}):Object(T.jsx)(p.a,{sx:{width:"24px",height:"24px"}}),Object(T.jsx)(R,{src:t.coverArt,sx:{height:"48px",width:"48px"}}),Object(T.jsxs)(p.a,{sx:{flexGrow:1,mx:1},children:[Object(T.jsx)(p.a,{sx:{typography:"subtitl3"},children:t.title}),Object(T.jsx)(p.a,{sx:{typography:"subtitle2"},children:t.artist})]})]}),Object(T.jsx)(De.a,Object(v.a)(Object(v.a)({sx:{mx:1}},a),{},{onClick:function(e){e.stopPropagation()}}))]})}}]),a}(n.a.Component);function Be(e){var t=e.sx,a=Object(O.d)((function(e){return{playlist:e.playlist,currentTrack:e.currentTrack}}),O.b),r=a.playlist,i=a.currentTrack,c=Object(O.c)(),o=n.a.createRef();return Object(T.jsx)(p.a,{ref:o,sx:Object(v.a)({margin:function(e){return e.spacing()},width:"10vw",height:"10vh"},t),children:Object(T.jsx)(Ie.a,{list:r,itemKey:"ID",template:Ne,onMoveEnd:function(e){return c(ie.updatePlaylist(e))},container:function(){return o.current},commonProps:{listOfID:r.map((function(e){return e.ID})),currentTrackID:r[i].ID,onTrackSelect:function(e){c(ie.changeTrack(e)),c(ie.play())}}})})}var _e=["value"],Ge=["value"],He={button:"".concat("PlaylistControl","-button")},Fe=Object(y.a)(p.a)((function(){return{display:"flex",flexDirection:"column-reverse",alignItems:"center"}})),Ve=Object(y.a)(p.a)((function(e){var t=e.theme;return Object(o.a)({width:"100%",display:"flex",flexDirection:"row"},"& .".concat(He.button),{margin:"auto ".concat(t.spacing(1)),flexGrow:1})}));function We(e){var t=e.value,a=Object(ke.a)(e,_e);return Object(T.jsx)(j.a,Object(v.a)(Object(v.a)({value:"repeat",selected:t!==_},a),{},{children:t===_?Object(T.jsx)(Se.a,{}):t===G?Object(T.jsx)(Te.a,{}):Object(T.jsx)(Ee.a,{})}))}function Ue(e){var t=e.value,a=Object(ke.a)(e,Ge);return Object(T.jsx)(j.a,Object(v.a)(Object(v.a)({value:"shuffle",selected:t},a),{},{children:t?Object(T.jsx)(Re.a,{}):Object(T.jsx)(Ce.a,{})}))}function Ye(e){var t=e.sx,a=e.playlistViewMode,n=Object(O.d)((function(e){return e.shuffled})),i=Object(O.d)((function(e){return e.repeatMode})),c=Object(r.useState)(!1),o=Object(s.a)(c,2),l=o[0],u=o[1],d=Object(r.useState)(null),p=Object(s.a)(d,2),h=p[0],b=p[1],f=Object(O.c)();return Object(T.jsxs)(Fe,{sx:Object(v.a)({},t),children:[Object(T.jsxs)(Ve,{children:[Object(T.jsx)(We,{value:i,className:He.button,onClick:function(){f(ie.setRepeatMode())}}),Object(T.jsx)(Ue,{value:n,className:He.button,onClick:function(){var e;e=!n,f(ie.shuffle(e))}}),Object(T.jsx)(j.a,{className:He.button,value:"show playlist",selected:l,onChange:function(e){b(e.target.parentElement.parentElement.parentElement.parentElement),u(!l)},children:Object(T.jsx)(Ae.a,{})})]}),"popover"===a?Object(T.jsx)(Le.a,{open:Boolean(h),anchorEl:h,onClose:function(){u(!1),b(null)},sx:{boxShadow:8},anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"bottom",horizontal:"right"},children:Object(T.jsx)(Be,{sx:{width:"400px",height:"60vh"}})}):Object(T.jsx)(Me.a,{collapsedSize:"0",in:l,children:Object(T.jsx)(Be,{sx:{height:"60vh",width:"90vw"}})})]})}var Ke="Player",qe=Object(y.a)(k.a)((function(e){var t=e.theme;return{width:"100vw",position:"fixed",bottom:0,boxSizing:"border-box",borderRadius:"".concat(t.shape.borderRadius," ").concat(t.shape.borderRadius," 0 0"),paddingRight:t.spacing(1),paddingLeft:t.spacing(1),overflow:"hidden",transition:t.transitions.create(["all"])}})),Je=Object(y.a)(p.a)((function(e){var t=e.theme;return Object(o.a)({height:"80vh",marginTop:t.spacing(6),padding:t.spacing(1),overflow:"hidden"},"& > .".concat(Ke,"-swipeable-puller"),{width:30,height:t.spacing(1),backgroundColor:t.palette.action.disabled,borderRadius:3,position:"absolute",top:t.spacing(3),left:"calc(50% - 15px)"})})),Xe=Object(y.a)(p.a)((function(){return{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",flexWrap:"nowrap"}})),$e=Object(y.a)(p.a)((function(){return{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"end",alignItems:"stretch",flexWrap:"nowrap"}})),Qe=Object(y.a)(p.a)((function(){return{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",flexWrap:"nowrap"}}));function Ze(e){var t=e.sx,a=e.disableDrawer,i=Object(w.a)(),c=Object(r.useState)(!1),o=Object(s.a)(c,2),l=o[0],u=o[1],d=Object(r.useState)(!1),h=Object(s.a)(d,2),b=h[0],j=h[1],f=function(){var e=Object(r.useState)(0),t=Object(s.a)(e,2)[1];return function(){return t((function(e){return e+1}))}}(),x=Object(O.d)((function(e){return{currentTrack:e.currentTrack,playlist:e.playlist}}),O.b),m=x.currentTrack,g=x.playlist,v=function(){a||b||u(!0)},y=function(){l&&u(!1)},k=n.a.useRef();return Object(r.useEffect)((function(){k.current.clientWidth>i.breakpoints.values.md?b||j(!0):b&&(j(!1),l&&u(!1))})),Object(r.useEffect)((function(){window.onresize=function(){f()}}),[]),Object(T.jsxs)(qe,{ref:k,sx:t,elevation:4,children:[l?null:Object(T.jsxs)(Xe,{onClick:v,children:[Object(T.jsx)(R,{src:g[m].coverArt,sx:{height:"48px",width:"48px",flexShrink:0}}),Object(T.jsx)(C,{sx:{width:"120px",flexGrow:b?0:1,textAlign:"left",margin:1,flexShrink:0}}),Object(T.jsx)(ve,{size:b?"large":"small"}),b?Object(T.jsxs)(T.Fragment,{children:[Object(T.jsx)(le,{sx:{flexGrow:6}}),Object(T.jsx)(we,{sx:{flexGrow:2}}),Object(T.jsx)(Ye,{playlistViewMode:"popover"})]}):null]}),!a&&!b&&Object(T.jsx)(S.a,{open:l,anchor:"bottom",onClose:y,onOpen:v,children:Object(T.jsxs)(Je,{children:[Object(T.jsx)(p.a,{className:"".concat(Ke,"-swipeable-puller"),onClick:y}),Object(T.jsxs)($e,{children:[Object(T.jsxs)(Qe,{sx:{flexGrow:1},children:[Object(T.jsx)(R,{className:"children",src:g[m].coverArt,sx:{height:"300px",width:"300px",boxShadow:4}}),Object(T.jsx)(C,{sx:{mt:1,textAlign:"center"}})]}),Object(T.jsx)(le,{}),Object(T.jsx)(ve,{}),Object(T.jsx)(we,{}),Object(T.jsx)(Ye,{playlistViewMode:"expand"})]})]})})]})}var et={play:function(e){var t=new CustomEvent(F,{detail:e});window.dispatchEvent(t)},playNext:function(e){var t=new CustomEvent(W,{detail:e});window.dispatchEvent(t)},playLater:function(e){var t=new CustomEvent(V,{detail:e});window.dispatchEvent(t)}},tt=a(114),at=a(28);var rt=Object(at.b)({mediaState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case K:return N;case q:return B;case J:return D;default:return e}},playlist:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[new z("","","","","")],t=arguments.length>1?arguments[1]:void 0;return t.type===$?t.payload.playlist:e},currentTrack:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;return t.type===Y?t.payload.index:e},shuffled:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;return t.type===X?t.payload.shuffle:e},currentTime:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;return t.type===Z?t.payload.currentTime:e},timeLeft:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;return t.type===ee?t.payload.timeLeft:e},volume:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;return t.type===Q?t.payload.volume:e},repeatMode:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1?arguments[1]:void 0;if(t.type!==ae)return e;switch(e){case _:return G;case G:return H;case H:return _;default:return e}}}),nt=new U,it=function(e){return nt.addEventListener("timeupdate",(function(){e.dispatch(ie.setCurrentTime(Math.floor(nt.currentTime))),e.dispatch(ie.setTimeLeft(Math.floor(isNaN(nt.duration)?0:nt.duration-nt.currentTime)))})),nt.addEventListener("error",(function(){e.dispatch(ie.stop())})),nt.addEventListener("canplay",(function(){e.getState().mediaState===N&&nt.play().catch((function(){return e.dispatch(ie.stop())}))})),nt.addEventListener("ended",(function(){var t=e.getState(),a=t.currentTrack,r=a===t.playlist.length-1;switch(t.repeatMode){case G:r?e.dispatch(ie.changeTrack(0)):e.dispatch(ie.changeTrack(++a));break;case H:nt.play();break;default:r?e.dispatch(ie.stop()):e.dispatch(ie.changeTrack(++a))}})),nt.volume=e.getState().volume/100,function(t){return function(a){var r=e.getState();switch(a.type){case Y:var n=r.playlist[a.payload.index];nt.setSrc(n);break;case K:nt.setSrc(r.playlist[r.currentTrack]),nt.play().catch((function(){return e.dispatch(ie.stop())}));break;case q:nt.pause();break;case J:nt.clear();break;case te:nt.currentTime=a.payload.time;break;case Q:nt.volume=a.payload.volume/100;break;case ne:if(nt.currentTime>3)return void e.dispatch(ie.seek(0))}return t(a)}}},ct=a(14);var ot=function(e){return function(t){return function(a){var r=e.getState();if(a.type===X&&r.shuffled!==a.payload.shuffle){var n=r.playlist,i=r.currentTrack,c=n[r.currentTrack],o=n.slice(0,i),s=n.slice(i+1,n.lenth),l=o.concat(s);l=a.payload.shuffle?function(e){for(var t=e.slice(),a=0;a<Math.ceil(e.length/2);a++){var r=Math.round(Math.random()*(e.length-1)),n=Math.round(Math.random()*(e.length-1)),i=t[r];t[r]=t[n],t[n]=i}return t}(l):l.sort((function(e,t){return e.ID<t.ID})),e.dispatch(ie.updatePlaylist([c].concat(Object(ct.a)(l)))),e.dispatch(ie.changeTrack(0))}return t(a)}}};var st=function(e){return function(t){return function(a){var r=e.getState();if(a.type===Y&&(a.payload.index>=r.playlist.length||a.payload.index<0)){if(r.repeatMode!==G)return;a.payload.index=0}return t(a)}}},lt=function(e){return function(t){return function(a){if(a.type!==$)return t(a);var r=e.getState(),n=r.playlist,i=r.currentTrack,c=a.payload.playlist,o=t(a),s=!1;if(c.length!==n.length)s=!0;else for(var l=0;l<n.length;l++)if(c[l].ID!==n[l].ID){s=!0;break}if(s){for(var u=-1,d=0;d<c.length;d++)if(c[d].ID===n[i].ID){u=d;break}-1===u?e.dispatch(ie.changeTrack(0)):e.dispatch(ie.changeTrack(u))}return o}}},ut=function(e){return navigator.mediaSession.setActionHandler("play",(function(){return e.dispatch(ie.play())})),navigator.mediaSession.setActionHandler("pause",(function(){return e.dispatch(ie.pause())})),navigator.mediaSession.setActionHandler("nexttrack",(function(){return e.dispatch(ie.skipNext())})),navigator.mediaSession.setActionHandler("previoustrack",(function(){return e.dispatch(ie.skipPrev())})),function(e){return function(t){return e(t)}}},dt=function(e){return function(t){return function(a){var r=e.getState().currentTrack;return a.type===re?e.dispatch(ie.changeTrack(r+1)):a.type===ne&&e.dispatch(ie.changeTrack(r-1)),t(a)}}},pt=Object(tt.a)({reducer:rt,middleware:[function(e){window.addEventListener(F,(function(t){var a=t.detail;a.length<1&&a.push(new z("","","","","")),e.dispatch(ie.stop()),e.dispatch(ie.changeTrack(0)),e.dispatch(ie.updatePlaylist(a)),e.dispatch(ie.play())}));var t=function(t){var a=e.getState().playlist,r=e.getState().currentTrack,n=[];t.type===W?n=a.reduce((function(e,a,n){return n===r?[].concat(Object(ct.a)(e),[a],Object(ct.a)(t.detail)):[].concat(Object(ct.a)(e),[a])}),[]):t.type===V&&(n=a.concat(t.detail)),e.dispatch(ie.updatePlaylist(n))};return window.addEventListener(W,t),window.addEventListener(V,t),function(e){return function(t){return e(t)}}},ot,lt,ut,st,it,dt],preloadedState:{mediaState:D,currentTrack:0,shuffled:!1,playlist:[new z("","","","","")],volume:25,repeatMode:_}});var ht=function(e){return Object(T.jsx)(O.a,{store:pt,children:Object(T.jsx)(Ze,Object(v.a)({},e))})},bt=z,jt=a(113),ft=a(192),xt=a(97);var mt="https://raw.githubusercontent.com/the-maazu/react-material-music-player/master/sample_media/";et.play([new bt("1",mt+"bach.jpg","68 Choral","Bach",mt+"Bach%20--%20BWV%20245%20--%2068%20Choral.mp3")]),window.setTimeout((function(){return et.playLater([new bt("2",mt+"emerson.jpeg","All through the night","Emerson",mt+"Emerson%20--%20All%20through%20the%20Night%20(Ar%20Hyd%20y%20Nos).mp3")])}),3e3),window.setTimeout((function(){return et.playNext([new bt("3",mt+"guido.jpg","Ut queant laxis","Guido von Arezzo",mt+"Guido%20von%20Arezzo%20--%20Ut%20queant%20laxis.mp3")])}),6e3);var gt=function(){var e=n.a.useState("system"),t=Object(s.a)(e,2),a=t[0],r=t[1],i=Object(d.a)("(prefers-color-scheme: dark)"),c=function(e){var t=Object(jt.a)({palette:Object(v.a)({mode:e},"light"===e?{primary:{main:"#007FFF"},secondary:{main:"#9c27b0"},divider:"#E5E8EC",action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08},text:{disabled:"rgba(0, 0, 0, 0.38)",icon:"rgba(255, 255, 255, 0.5)",primary:"#20262D",secondary:"#2F3A45"}}:{primary:{main:"#5090D3"},secondary:{main:"#ce93d8"},background:{paper:"#0A1929"},action:{active:"#fff",hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16},text:{disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)",primary:"#fff",secondary:"#AAB4BE"}})}),a={MuiPaper:{styleOverrides:{root:{borderRadius:"10px 10px 0 0",backgroundColor:Object(ft.a)(t.palette.background.paper,.8),backdropFilter:"blur(40px)"}}},MuiToggleButton:{defaultProps:{color:"primary"}},MuiSlider:{styleOverrides:{thumb:{width:8,height:8,transition:"0.3s cubic-bezier(.47,1.64,.41,.8)","&:before":{boxShadow:"0 2px 1px 0 rgba(0,0,0,0.4)"},":hover, &.Mui-focusVisible":{height:15,width:15,boxShadow:"0px 0px 0px 8px rgb(0 0 0 / 16%)"},"&.Mui-active":{width:20,height:20}}}}},r="light"===e?Object(xt.a)({components:a},{components:{MuiIconButton:{defaultProps:{color:"primary"}},MuiSlider:{styleOverrides:{root:{color:"black"},thumb:{color:"gray"}}}}}):Object(xt.a)({components:a},{components:{MuiSlider:{styleOverrides:{root:{color:"white"},thumb:{color:"white",width:8,height:8,transition:"0.3s cubic-bezier(.47,1.64,.41,.8)"}}}}});return Object(jt.a)(t,r)}("system"===a?i?"dark":"light":a),O=n.a.useState({width:"100vw",position:"fixed",bottom:0,boxShadow:8,borderRadiusTL:1,borderRadiusTR:1,borderRadiusBL:0,borderRadiusBR:0}),y=Object(s.a)(O,2),w=y[0],k=w.width,S=w.position,E=w.bottom,R=w.boxShadow,C=w.borderRadiusTL,A=w.borderRadiusTR,L=w.borderRadiusBL,M=w.borderRadiusBR,P=y[1],I=function(e){var t=e.target.id,a=e.target.value;P(Object(o.a)({width:k,position:S,bottom:E,boxShadow:R,borderRadiusTL:C,borderRadiusTR:A,borderRadiusBL:L,borderRadiusBR:M},"".concat(t),a))};return Object(T.jsx)(u.a,{theme:c,children:Object(T.jsxs)(p.a,{sx:{width:"100vw",height:"100vh",bgcolor:"background.paper",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",color:"text.primary",textAlign:"center"},children:[Object(T.jsx)("img",{src:l,className:"App-logo",alt:"logo"}),Object(T.jsx)(p.a,{sx:{typography:"h6"},children:"react-material-music-player"}),Object(T.jsxs)("div",{children:[Object(T.jsx)(h.a,{href:"https://www.npmjs.com/package/react-material-music-player",target:"_blank",rel:"noopener noreferrer",children:"npm"}),Object(T.jsx)("br",{}),Object(T.jsx)(h.a,{href:"https://github.com/the-maazu/react-material-music-player",target:"_blank",rel:"noopener noreferrer",children:"github"}),Object(T.jsx)("br",{}),Object(T.jsx)(h.a,{href:"https://liberapay.com/the-maazu/donate",target:"_blank",rel:"noopener noreferrer",children:"donate"})]}),Object(T.jsxs)(p.a,{sx:{typography:"body3",margin:2},children:["Resize window to enter mobile mode, if on bigger screen device device. ",Object(T.jsx)("br",{}),"Swipe up or tap player to expand in mobile mode"]}),Object(T.jsxs)(b.a,{value:a,exclusive:!0,onChange:function(e,t){t&&r(t)},children:[Object(T.jsx)(j.a,{value:"light",children:Object(T.jsx)(x.a,{})}),Object(T.jsx)(j.a,{value:"system",children:Object(T.jsx)(m.a,{})}),Object(T.jsx)(j.a,{value:"dark",children:Object(T.jsx)(g.a,{})})]}),Object(T.jsxs)(p.a,{sx:{display:"flex",margin:2},children:[Object(T.jsxs)(p.a,{sx:{margin:1},children:[Object(T.jsx)(f.a,{sx:{display:"block"},margin:"dense",size:"small",id:"width",label:"width",value:k,onChange:I}),Object(T.jsx)(f.a,{sx:{display:"block"},margin:"dense",size:"small",id:"position",label:"position",value:S,onChange:I,type:"text"}),Object(T.jsx)(f.a,{sx:{display:"block"},margin:"dense",size:"small",id:"bottom",label:"bottom",value:E,onChange:I,type:"text"}),Object(T.jsx)(f.a,{sx:{display:"block"},margin:"dense",size:"small",id:"boxShadow",label:"boxShadow",value:R,onChange:I,type:"number"})]}),Object(T.jsxs)(p.a,{sx:{margin:1},children:[Object(T.jsx)(f.a,{sx:{display:"block"},margin:"dense",size:"small",id:"borderRadiusTL",label:"borderRadiusTL",value:C,onChange:I,type:"number"}),Object(T.jsx)(f.a,{sx:{display:"block"},margin:"dense",size:"small",id:"borderRadiusTR",label:"borderRadiusTR",value:A,onChange:I,type:"number"}),Object(T.jsx)(f.a,{sx:{display:"block"},margin:"dense",size:"small",id:"borderRadiusBL",label:"borderRadiusBL",value:L,onChange:I,type:"number"}),Object(T.jsx)(f.a,{sx:{display:"block"},margin:"dense",size:"small",id:"borderRadiusBR",label:"borderRadiusBR",value:M,onChange:I,type:"number"})]})]}),Object(T.jsx)(ht,{sx:{width:k,position:S,bottom:E,boxShadow:R,borderRadius:"".concat(C,"px ").concat(A,"px ").concat(L,"px ").concat(M,"px")}})]})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(Object(T.jsx)(n.a.StrictMode,{children:Object(T.jsx)(gt,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[154,1,2]]]);
//# sourceMappingURL=main.21b00724.chunk.js.map
