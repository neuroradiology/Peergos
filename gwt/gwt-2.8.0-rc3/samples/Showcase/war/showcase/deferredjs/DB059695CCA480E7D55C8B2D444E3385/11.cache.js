$wnd.showcase.runAsyncCallback11("function _ic(){}\nfunction bjc(){}\nfunction Wic(a,b){a.b=b}\nfunction Xic(a){if(a==Mic){return true}uB();return a==Pic}\nfunction Yic(a){if(a==Lic){return true}uB();return a==Kic}\nfunction ajc(a){this.b=(Fkc(),Akc).a;this.e=(Kkc(),Jkc).a;this.a=a}\nfunction Vic(a,b){var c;c=kfb(a.fb,179);c.e=b.a;!!c.d&&Qdc(c.d,b)}\nfunction Uic(a,b){var c;c=kfb(a.fb,179);c.b=b.a;!!c.d&&Odc(c.d,b)}\nfunction Qic(){Qic=uCb;Jic=new _ic;Mic=new _ic;Lic=new _ic;Kic=new _ic;Nic=new _ic;Oic=new _ic;Pic=new _ic}\nfunction Zic(){Qic();Sdc.call(this);this.b=(Fkc(),Akc);this.c=(Kkc(),Jkc);(Gac(),this.e)[FRc]=0;this.e[GRc]=0}\nfunction Ric(a,b,c){var d;if(c==Jic){if(b==a.a){return}else if(a.a){throw QBb(new JBc('Only one CENTER widget may be added'))}}Rh(b);Quc(a.j,b);c==Jic&&(a.a=b);d=new ajc(c);b.fb=d;Uic(b,a.b);Vic(b,a.c);Tic(a);Th(b,a)}\nfunction Sic(a){var b,c,d,e,f,g,h;xuc((Gac(),a.hb),'',xTc);g=new yJc;h=new $uc(a.j);while(h.b<h.c.c){b=Yuc(h);f=kfb(b.fb,179).a;d=kfb(GEc(QJc(g.d,f)),112);c=!d?1:d.a;e=f==Nic?'north'+c:f==Oic?'south'+c:f==Pic?'west'+c:f==Kic?'east'+c:f==Mic?'linestart'+c:f==Lic?'lineend'+c:jQc;xuc(Qo(b.hb),xTc,e);SEc(g,f,ZBc(c+1))}}\nfunction Tic(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;b=(Gac(),a.d);while(icc(b)>0){wo(b,hcc(b,0))}o=1;e=1;for(i=new $uc(a.j);i.b<i.c.c;){d=Yuc(i);f=kfb(d.fb,179).a;f==Nic||f==Oic?++o:(f==Kic||f==Pic||f==Mic||f==Lic)&&++e}p=teb(lwb,dNc,289,o,0,1);for(g=0;g<o;++g){p[g]=new bjc;p[g].b=$doc.createElement(DRc);so(b,Nac(p[g].b))}k=0;l=e-1;m=0;q=o-1;c=null;for(h=new $uc(a.j);h.b<h.c.c;){d=Yuc(h);j=kfb(d.fb,179);r=$doc.createElement(ERc);j.d=r;j.d[rRc]=j.b;j.d.style[sRc]=j.e;j.d[vNc]=j.f;j.d[uNc]=j.c;if(j.a==Nic){Jac(p[m].b,r,p[m].a);so(r,Nac(d.hb));r[NSc]=l-k+1;++m}else if(j.a==Oic){Jac(p[q].b,r,p[q].a);so(r,Nac(d.hb));r[NSc]=l-k+1;--q}else if(j.a==Jic){c=r}else if(Xic(j.a)){n=p[m];Jac(n.b,r,n.a++);so(r,Nac(d.hb));r[yTc]=q-m+1;++k}else if(Yic(j.a)){n=p[m];Jac(n.b,r,n.a);so(r,Nac(d.hb));r[yTc]=q-m+1;--l}}if(a.a){n=p[m];Jac(n.b,c,n.a);so(c,Nac(eh(a.a)))}}\nvar xTc='cwDockPanel';tCb(444,1,iQc);_.Bc=function hVb(){var a,b,c;JEb(this.a,(a=new Zic,(Gac(),a.hb).className='cw-DockPanel',a.e[FRc]=4,Wic(a,(Fkc(),zkc)),Ric(a,new whc('This is the first north component'),(Qic(),Nic)),Ric(a,new whc('This is the first south component'),Oic),Ric(a,new whc('This is the east component'),Kic),Ric(a,new whc('This is the west component'),Pic),Ric(a,new whc('This is the second north component'),Nic),Ric(a,new whc('This is the second south component'),Oic),b=new whc(\"This is a <code>ScrollPanel<\\/code> contained at the center of a <code>DockPanel<\\/code>.  By putting some fairly large contents in the middle and setting its size explicitly, it becomes a scrollable area within the page, but without requiring the use of an IFRAME.<br><br>Here's quite a bit more meaningless text that will serve primarily to make this thing scroll off the bottom of its visible area.  Otherwise, you might have to make it really, really small in order to see the nifty scroll bars!\"),c=new Rec(b),c.hb.style[vNc]='400px',c.hb.style[uNc]='100px',Ric(a,c,Jic),Sic(a),a))};tCb(900,281,ANc,Zic);_.gc=function $ic(a){var b;b=Kcc(this,a);if(b){a==this.a&&(this.a=null);Tic(this)}return b};var Jic,Kic,Lic,Mic,Nic,Oic,Pic;var mwb=sBc(yNc,'DockPanel',900);tCb(178,1,{},_ic);var jwb=sBc(yNc,'DockPanel/DockLayoutConstant',178);tCb(179,1,{179:1},ajc);_.c='';_.f='';var kwb=sBc(yNc,'DockPanel/LayoutData',179);tCb(289,1,{289:1},bjc);_.a=0;var lwb=sBc(yNc,'DockPanel/TmpRow',289);KMc(zl)(11);\n//# sourceURL=showcase-11.js\n")