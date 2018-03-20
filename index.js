const n = require('./nfc.js'),
	  a = require('./auth.js'),
	  h = require('http'),
	  c = require('./config.json'),
	  t = require('terminal-kit').terminal,
	  q = require('querystring');
n.on('read', p);
t.fullscreen(true);
function p(i){
	if(i==="6300"){
		let r=t.bgBlue.bold.brightWhite;
		for(i=t.height;i>0;i--)r(" ".repeat(t.width));
		let y="ERROR: Scanfout.";
		t.moveTo((t.width/2)-(y.length/2), t.height/2);r(y);t.moveTo(0,0);
		setTimeout(()=>{for(let i = t.height;i>0;i--)t(" ".repeat(t.width));},2000);
		return;}
	return new Promise((res,rj)=>{
		a.n(h,c.r.h).then(o=>{
			a.h(o).then(s=>{
				let m=q.stringify({h:s,d:i,n:o});
				let d=h.request({host: c.r.h,path: "/perform",method: "POST",headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Content-Length': Buffer.byteLength(m)}
				},rs=>{
					let td="";
					rs.on('data',d=>td=td+d);
					rs.on('end',()=>{
						let y="";
						if(td==="NOTICE:NONEXISTANT_USER"){
							r=t.bgBlue.brightWhite.bold;
							y=`Nieuwe gebruiker (${i.substr(0,12)})`;
						}else if(td==="ERROR:AUTH_FAIL"){
							r=t.bgBlue.brightWhite.bold;
							y = "Systeem buiten gebruik. Authenticatieprobleem";
						}else if(td.substring(0,3)=="IN:"){y="Welkom, "+td.split(':')[1];r=t.bgBrightGreen.black.bold}
						else if(td.substring(0,4)=="OUT:"){y=td.split(':')[1]+" afgemeld.";r=t.bgRed.brightWhite.bold}
						for(i=t.height;i>0;i--)r(" ".repeat(t.width));
						t.moveTo((t.width/2)-(y.length/2), t.height/2);
						r(y);
						y=(new Date()).toLocaleTimeString();
						t.moveTo((t.width/2)-(y.length/2), t.height/2+1);
						r(y);
						t.moveTo(0,0);
						setTimeout(()=>{for(let i = t.height;i>0;i--)t(" ".repeat(t.width));},2000);});});
				d.write(m);
				d.end();});});});}

