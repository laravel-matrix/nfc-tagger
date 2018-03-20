const c = require('crypto'),f = require('fs');

function gk() {
    return new Promise((rs,rj) => {
        f.readFile('key', 'utf8', function(e, c) {
            rs(c);
        });
    });
}
function n (h,m) {
	return new Promise((rs,rj) => {
		h.get({
			hostname:m,
			path:"/nonce",
		},r=>{
			let td="";
			r.on('data', d=>td=td+d);
			r.on('end',()=>{rs(td)});
		})
	})
}
async function h(n) {
	return new Promise((rs,rj) => {
		let g = c.createHmac('sha512', n);
			g.on('readable', () => {
				const d = g.read();
				if (d) {
					rs(d.toString('hex'));
				}
			});
		gk().then(k => {
			g.write(k);
			g.end();
		});
	});
}

module.exports = {
	h, gk,n
}