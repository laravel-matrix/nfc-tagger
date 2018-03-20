var p = require('pcsclite')();
const EventEmitter =require('events');
class NFCEmitter extends EventEmitter{}
let b=new NFCEmitter();
p.on('reader',r=>{
	r.on('error',e=>{});
	r.on('status', function(s) {
		let c=this.state^s.state;
		if(c){
			if((c&this.SCARD_STATE_EMPTY)&&(s.state&this.SCARD_STATE_EMPTY))r.disconnect(r.SCARD_LEAVE_CARD, e=>{});
			else if((c&this.SCARD_STATE_PRESENT)&&(s.state&this.SCARD_STATE_PRESENT)){
				r.connect({share_mode:this.SCARD_SHARE_SHARED},(e,o)=>{
					if (!e)r.transmit(new Buffer([0xFF,0xCA,0x00,0x00,0x04]),40,o,(a,d)=>{if(!a)b.emit('read',d.toString('hex'))});
				});}}});
	r.on('end',()=>{});});
p.on('error',e=>{});
module.exports=b;