(self.webpackChunkweb=self.webpackChunkweb||[]).push([[230],{473:function(i,l,n){"use strict";n(2791);l.Z=n.p+"static/media/audio-spinner.c903c7c74b37cccf746ed0700eabd28e.svg"},9401:function(i,l,n){"use strict";n(2791);l.Z=n.p+"static/media/loading-spinner.63623cd63cd5d02d2228bd2db215718e.svg"},7418:function(i,l,n){"use strict";n(2791);l.Z=n.p+"static/media/pause.adf29ed4dbef48364d3bce5241dce5ca.svg"},5404:function(i,l,n){"use strict";n(2791);l.Z=n.p+"static/media/play.38880997e9b1fec46b84257d72668cbf.svg"},5341:function(i,l,n){"use strict";n.d(l,{Z:function(){return a}});var d=n(2791),e=n(5946),s=n(9401),o=n(184),a=function(){var i=(0,d.useContext)(e.K7).showPlayer?"loading-container player-open":"loading-container";return(0,o.jsx)("div",{className:i,children:(0,o.jsx)("img",{src:s.Z,alt:"Loading"})})}},1571:function(i,l,n){"use strict";n.r(l),n.d(l,{default:function(){return j}});var d=n(2982),e=n(4270),s=n(2791),o=n(7689),a=n(7826),t=n(4777),c=n(5946),u=n(8093),r=n(3417),v=n(5404),f=n(7418),m=n(473),p=n(9401),_=n(5341),x=n(184),C=function(){var i,l,n,C,j,h,T,E,N,g,S=(0,o.UO)().playlistId,y=(0,s.useContext)(c.K7),P=y.currentTrack,b=(y.tracks,(0,s.useContext)(c.pC)),L=(0,a.a)([S],(function(){return r.Z.getEntry(S).then((function(i){return i}))})),Z=L.isLoading,k=L.error,A=L.data;return(0,x.jsxs)("div",{className:"playlist",children:[(0,x.jsxs)(e.q,{children:[(0,x.jsx)("title",{children:null!==A&&void 0!==A&&null!==(i=A.fields)&&void 0!==i&&i.name?"".concat(null===A||void 0===A||null===(l=A.fields)||void 0===l?void 0:l.name," | UnMusic"):"UnMusic"}),(0,x.jsx)("meta",{name:"description",content:null===A||void 0===A||null===(n=A.fields)||void 0===n?void 0:n.description})]}),Z&&!A&&(0,x.jsx)(_.Z,{}),!Z&&k&&(0,x.jsx)("p",{children:k}),!Z&&A&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("div",{className:"playlist-cover",children:(0,x.jsx)("img",{src:null===A||void 0===A||null===(C=A.fields)||void 0===C||null===(j=C.cover)||void 0===j||null===(h=j.fields)||void 0===h||null===(T=h.file)||void 0===T?void 0:T.url,alt:"Cover"})}),(0,x.jsxs)("div",{className:"playlist-header",children:[(0,x.jsx)("h1",{children:null===A||void 0===A||null===(E=A.fields)||void 0===E?void 0:E.name}),(0,x.jsx)("button",{className:"button",onClick:function(){if(P.isPlaying)(0,c.Lc)(b,!1);else{var i,l,n,e=null===A||void 0===A||null===(i=A.fields)||void 0===i||null===(l=i.tracks)||void 0===l?void 0:l.map((function(i){var l=i.fields;return{id:i.sys.id,name:null===l||void 0===l?void 0:l.title,fileUrl:null===l||void 0===l?void 0:l.trackURL}})),s=(0,d.Z)(e);(0,c.us)(b,s,0,!0),(0,t.Kz)(u.Z.PLAYLIST_PLAY_CLICK,{playlistId:S,playlistName:null===A||void 0===A||null===(n=A.fields)||void 0===n?void 0:n.name})}},children:(0,x.jsx)("img",{src:null!==P&&void 0!==P&&P.isPlaying?f.Z:v.Z,alt:"Play"})})]}),(0,x.jsx)("ul",{children:null===A||void 0===A||null===(N=A.fields)||void 0===N||null===(g=N.tracks)||void 0===g?void 0:g.map((function(i,l){var n,e,s,o=i.fields,a=i.sys,r=(null===P||void 0===P?void 0:P.id)===(null===a||void 0===a?void 0:a.id)&&(null===P||void 0===P?void 0:P.isPlaying),_=(null===P||void 0===P?void 0:P.id)===(null===a||void 0===a?void 0:a.id)&&(null===P||void 0===P?void 0:P.isLoading);return(0,x.jsxs)("li",{children:[(0,x.jsxs)("div",{className:"track-thumb",children:[(0,x.jsx)("img",{className:"album-art",src:null===o||void 0===o||null===(n=o.albumArt)||void 0===n||null===(e=n.fields)||void 0===e||null===(s=e.file)||void 0===s?void 0:s.url}),_&&(0,x.jsx)("img",{className:"equalizer",src:p.Z,alt:"Equalizer"}),!_&&r&&(0,x.jsx)("img",{className:"equalizer",src:m.Z,alt:"Equalizer"})]}),(0,x.jsx)("h4",{className:"track-name",children:null===o||void 0===o?void 0:o.title}),(0,x.jsx)("div",{className:"action",children:(0,x.jsx)("button",{className:"button",onClick:function(){return function(i,l,n,e){var s,o,a,r=null===A||void 0===A||null===(s=A.fields)||void 0===s||null===(o=s.tracks)||void 0===o?void 0:o.map((function(i){var l=i.fields;return{id:i.sys.id,name:null===l||void 0===l?void 0:l.title,fileUrl:null===l||void 0===l?void 0:l.trackURL}})),v=(0,d.Z)(r);(0,c.us)(b,v,n,e),(0,t.Kz)(u.Z.PLAYLIST_TRACK_PLAY_CLICK,{trackId:i,trackName:l,playlistId:S,playlistName:null===A||void 0===A||null===(a=A.fields)||void 0===a?void 0:a.name})}(null===a||void 0===a?void 0:a.id,null===o||void 0===o?void 0:o.title,l,!r)},children:(0,x.jsx)("img",{src:r?f.Z:v.Z,alt:"Play"})})})]},null===a||void 0===a?void 0:a.id)}))})]})]})},j=function(){return(0,x.jsx)("div",{id:"playlist-page",children:(0,x.jsx)(C,{})})}},3417:function(i,l,n){"use strict";var d=n(7703).createClient({space:{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_CONTENTFUL_SPACE_ID,accessToken:{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_CONTENTFUL_ACCESS_TOKEN});l.Z=d},4654:function(){}}]);
//# sourceMappingURL=230.dfb321af.chunk.js.map