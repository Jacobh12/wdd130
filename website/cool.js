
// <![CDATA[
var speed=33; // lower number for faster
var flakes=100; // number of flakes
var colour="#ffffff"; // colour of flakes
var slush=20; // set to '0' for no slush or otherwise set to height at which slush melts
var over_or_under="under"; // set to "over" for snow to always be on top, or "under" to allow it to float behind other objects

/***************************\
*     Let It Snow Effect    *
*(c)2004-13 mf2fm web-design*
*  http://www.mf2fm.com/rv  *
* DON'T EDIT BELOW THIS BOX *
\***************************/
var flks=new Array();
var flkx=new Array();
var flky=new Array();
var fldy=new Array();
var slss=new Array();
var slsh=new Array();
var swide, shigh, boddie;

function addLoadEvent(funky) {
  var oldonload=window.onload;
  if (typeof(oldonload)!='function') window.onload=funky;
  else window.onload=function() {
    if (oldonload) oldonload();
    funky();
  }
}

addLoadEvent(baby_its_cold_outside);

function baby_its_cold_outside() { if (document.getElementById) {
  var i;
  boddie=document.createElement("div");
  i=boddie.style;
  i.position="fixed";
  i.top="0px";
  i.left="0px";
  i.overflow="visible";
  i.width="1px";
  i.height="1px";
  i.backgroundColor="transparent";
  document.body.appendChild(boddie);
  set_width();
  for (var i=0; i<flakes; i++) {
    flks[i]=createDiv(3, 3, colour);
    flkx[i]=3*Math.floor(Math.random()*swide/3);
    flky[i]=Math.floor(Math.random()*shigh);
    fldy[i]=2+Math.floor(Math.random()*4);
    flks[i].style.left=flkx[i]+"px";
    flks[i].style.top=flky[i]+"px";
	flks[i].style.zIndex=(over_or_under=="over")?"1001":"0";
    boddie.appendChild(flks[i]);
  }
  setInterval("let_it_snow()", speed);
}}

function createDiv(height, width, colour) {
  var div=document.createElement("div");
  div.style.position="absolute";
  div.style.height=height+"px";
  div.style.width=width+"px";
  div.style.overflow="hidden";
  div.style.backgroundColor=colour;
  return (div);
}

window.onresize=set_width;
function set_width() {
  var sw_min=999999;
  var sh_min=999999;
  if (document.documentElement && document.documentElement.clientWidth) {
    if (document.documentElement.clientWidth>0) sw_min=document.documentElement.clientWidth;
    if (document.documentElement.clientHeight>0) sh_min=document.documentElement.clientHeight;
  }
  if (typeof(self.innerWidth)=='number' && self.innerWidth) {
    if (self.innerWidth>0 && self.innerWidth<sw_min) sw_min=self.innerWidth;
    if (self.innerHeight>0 && self.innerHeight<sh_min) sh_min=self.innerHeight;
  }
  if (document.body.clientWidth) {
    if (document.body.clientWidth>0 && document.body.clientWidth<sw_min) sw_min=document.body.clientWidth;
    if (document.body.clientHeight>0 && document.body.clientHeight<sh_min) sh_min=document.body.clientHeight;
  }
  if (sw_min==999999 || sh_min==999999) {
    sw_min=800;
    sh_min=600;
  }
  swide=sw_min-3;
  shigh=sh_min;
  if (slush) {
    if (swide/3>slss.length) for (i=slss.length; i<swide/3; i++) {
      if (!slsh[i]) slsh[i]=3;
      slss[i]=createDiv(slsh[i], 3, colour);
      boddie.appendChild(slss[i]);
    }
    for (i=0; i<swide/3; i++) {
      slss[i].style.height=slsh[i]+"px";
      slss[i].style.top=shigh-slsh[i]+"px";
      slss[i].style.left=3*i+"px";
    }
    if (i<slss.length && slss[i].style.left!="-3px") for (; i<slss.length; i++) slss[i].style.left="-3px";
  }
}

function let_it_snow(c) {
  var i, x, o=0, z=0;
  for (i=0; i<flakes; i++) {
    flky[i]+=fldy[i];
	x=Math.floor(flkx[i]/3);
    if (slush) {
      o+=slsh[x];
      if (flky[i]>=shigh-slsh[x]) {
        if (x<swide && slsh[x]>slsh[x+1]+3) x++;
        else if (x>0 && slsh[x]>slsh[x-1]+3) x--;
        slss[x].style.top=shigh-(slsh[x]+=3)+"px";
        slss[x].style.height=slsh[x]+"px";
		flky[i]=shigh;
	  }
    }
    if (flky[i]>=shigh || flkx[i]>swide) {
	  flky[i]=0;
	  fldy[i]=2+Math.floor(Math.random()*4);
	  flkx[i]=3*Math.floor(Math.random()*swide/3);
	  flks[i].style.left=flkx[i]+"px";
	  z++;
	}
	flks[i].style.top=flky[i]+"px";
  }
  if (o>flakes*slush) for (i=0; i<slsh.length; i++) if (slsh[i]>3) slsh[i]--;
  if (z || o>flakes*slush) set_width();
}
// ]]>



// <![CDATA[
// all colours must be in format '#NNNNNN', not 'red' or 'rgb(7,8,9)'
var fgcolour="#6600cc"; // foreground colour
var hlcolour="#aa77ff"; // highlight colour
var bgcolour="#ffffff"; // background colour
var glcolour="#cc99ff"; // colour of glow around letters
var speed=66; // speed colours change, 1 second = 1000
var delay=50; // how long to wait between wipes
var alink="./secret.html"; // page to link text to (set to ="" for no link)

/****************************
*Multi-Wipe Neon Text Effect*
*(c)2003-13 mf2fm web-design*
*  http://www.mf2fm.com/rv  *
* DON'T EDIT BELOW THIS BOX *
****************************/
var w_txt, w_txl;
var w_flp=bgcolour;
var w_sty=Math.floor(Math.random()*8);
var w_cnt=-1;
var wipes=new Array();
var wrand=new Array();

function addLoadEvent(funky) {
  var oldonload=window.onload;
  if (typeof(oldonload)!='function') window.onload=funky;
  else window.onload=function() {
    if (oldonload) oldonload();
    funky();
  }
}

addLoadEvent(fzzz);

function fzzz() { if (document.getElementById) {
  var i, wiper, wipei;
  wiper=document.getElementById("wipe");
  w_txt=wiper.firstChild.nodeValue;
  w_txl=w_txt.length;
  while (wiper.childNodes.length) wiper.removeChild(wiper.childNodes[0]);
  for (i=0; i<w_txl; i++) {
    wipei=document.createElement("span");
    wipei.appendChild(document.createTextNode(w_txt.charAt(i)));
    wipes[i]=wipei.style;
    wipes[i].textShadow=glcolour+" 0px 0px 5px";
    wipes[i].color=fgcolour;
    wiper.appendChild(wipei);
  }
  if (alink) {
    wiper.style.cursor="pointer";
    wiper.onclick=function() { top.location.href=alink; }
  }
  for (i=0; i<w_txl; i++) wrand[i]=i;
  wiper=setInterval("randwipe()", speed);
}}

function c(i, shade) {
  if (shade==bgcolour) wipes[i].textShadow="none";
  else wipes[i].textShadow=glcolour+" 0px 0px 5px";
  wipes[i].color=shade;
}

function randwipe() {
  var w_old;
  if (w_cnt++<w_txl+2+delay*(w_flp==fgcolour)) eval("wipe"+w_sty+"();");
  else {
    w_cnt=-1;
    w_flp=(w_flp==fgcolour)?bgcolour:fgcolour;
    w_old=w_sty;
    while (w_old==w_sty) w_sty=Math.floor(Math.random()*9);
  }
}

function dechex(dec) { return ((dec<16)?"0":"")+dec.toString(16); }

function wipe0() { // full curtains
  var half=Math.floor(w_txl/2);
  if (w_cnt<w_txl) {
    c(w_cnt, (w_cnt<half)?hlcolour:w_flp);
    c(w_txl-w_cnt-1, (w_cnt<half)?hlcolour:w_flp);
  }
}

function wipe1() { // random
  var i, rand, temp;
  if (w_cnt==0) {
    for (i=0; i<w_txl; i++) {
      rand=Math.floor(Math.random()*w_txl);
      temp=wrand[i];
      wrand[i]=wrand[rand];
      wrand[rand]=temp;
    }
  }
  if (w_cnt<w_txl) c(wrand[w_cnt], hlcolour);
  if (w_cnt>0 && w_cnt<w_txl+1) c(wrand[w_cnt-1], w_flp);
}

function wipe2() { // forwards
  if (w_cnt<w_txl) c(w_cnt, hlcolour);
  if (w_cnt>0 && w_cnt<w_txl+1) c(w_cnt-1, w_flp);
}

function wipe3() { // backwards
  if (w_cnt<w_txl) c(w_txl-(w_cnt+1), hlcolour);
  if (w_cnt>0 && w_cnt<w_txl+1) c(w_txl-w_cnt, w_flp);
}

function wipe4() { // searchlight
  if (w_cnt<w_txl) c(w_cnt, hlcolour);
  if (w_cnt>0 && w_cnt<w_txl+1) c(w_cnt-1, w_flp);
  if (w_cnt>1 && w_cnt<w_txl+2) c(w_cnt-2, hlcolour);
  if (w_cnt>2 && w_cnt<w_txl+3) c(w_cnt-3, (w_flp==fgcolour)?bgcolour:fgcolour);
  if (w_cnt==w_txl+2) w_flp=(w_flp==fgcolour)?bgcolour:fgcolour;
}

function wipe5() { // fade
  var i;
  if (w_cnt<w_txl+3) {
    var start=(w_flp==fgcolour)?bgcolour:fgcolour;
    var temp="#";
    for (i=1; i<6; i+=2) {
      var hex1=parseInt(start.substring(i,i+2),16);
      var hex2=parseInt(w_flp.substring(i,i+2),16);
      temp+=dechex(Math.floor(hex1+(hex2-hex1)*(w_cnt/(w_txl+2))));
    }
    for (i=0; i<w_txl; i++) c(i, temp);
  }
}

function wipe6() { // flash
  var i;
  if (w_cnt<6*Math.floor(w_txl/6)+3) {
    if (w_cnt%6==0 || w_cnt%6==3) for (i=0; i<w_txl; i++) c(i, hlcolour);
    else if (w_cnt%6==1) for (i=0; i<w_txl; i++) c(i, w_flp);
    else if (w_cnt%6==4) for (i=0; i<w_txl; i++) c(i, (w_flp==fgcolour)?bgcolour:fgcolour);
  }
}

function wipe7() { // checkerboard
  var qtr=Math.floor(w_txl/4);
  if (w_cnt<qtr) {
    c(w_cnt, hlcolour);
    c(w_cnt+2*qtr, hlcolour);
  }
  else if (w_cnt<2*qtr) {
    c(w_cnt-qtr, w_flp);
    c(w_cnt+qtr, w_flp);
  }
  else if (w_cnt<3*qtr) {
    c(w_cnt-qtr, hlcolour);
    c(w_cnt+qtr, hlcolour);
  }
  else if (w_cnt<w_txl) {
    c(w_cnt-2*qtr, w_flp);
    c(w_cnt, w_flp);
  }
}

function wipe8() { // half curtains
  var half=Math.floor(w_txl/2);
  if (w_cnt<half) {
    c(w_cnt, hlcolour);
    c(w_txl-w_cnt-1, hlcolour);
  }
  else if (w_cnt<w_txl) {
    c(w_cnt-half, w_flp);
    c(w_txl+half-w_cnt-1, w_flp);
  }
}
// ]]>

