/* Small interactive learning labs; all calculations happen on the device. */
function courseLab(g){
const conf={
'T2A':{title:'Repeater offset lab',desc:'Watch the transmit frequency change when you choose a repeater offset.',fields:[['rx','Receive frequency (MHz)',145,148,.005,146.94],['offset','Offset (MHz)',-.6,.6,.6,-.6]]},
'T3B':{title:'Wave explorer',desc:'Move the frequency slider and watch the wavelength and band change.',fields:[['f','Frequency (MHz)',3,500,1,146]]},
'T5B':{title:'Decibel power lab',desc:'Compare two power levels. Every doubling is approximately +3 dB.',fields:[['p1','Starting power (W)',1,100,1,5],['p2','Final power (W)',1,200,1,10]]},
'T5C':{title:'Power calculator',desc:'Move voltage and current to see the relationship P = V × I.',fields:[['v','Voltage (V)',1,24,.1,13.8],['i','Current (A)',.5,20,.5,10]]},
'T5D':{title:'Ohm’s law calculator',desc:'Change voltage or resistance. Current is V ÷ R, power is V × I.',fields:[['v','Voltage (V)',1,240,1,12],['r','Resistance (Ω)',1,200,1,6]]},
'T9A':{title:'Antenna length lab',desc:'Estimate a dipole or quarter-wave antenna, then remember that real antennas need measuring and trimming.',fields:[['f','Frequency (MHz)',28,450,1,146]]},
'T0C':{title:'Duty-cycle explorer',desc:'Compare average transmitter power at different duty cycles. This is NOT an RF-exposure compliance evaluation.',fields:[['p','Transmitter power (W)',5,100,5,50],['d','Duty cycle (%)',5,100,5,50]]}
}[g];if(!conf)return '';
return '<section class="course-lab" data-lab="'+g+'"><p class="eyebrow">HANDS-ON LAB</p><h2>'+conf.title+'</h2><p>'+conf.desc+'</p>'+conf.fields.map(([id,name,min,max,step,val])=>'<label class="lab-input"><span>'+name+' <strong data-value-label="'+id+'">'+val+'</strong></span><input type="range" data-lab-field="'+id+'" min="'+min+'" max="'+max+'" step="'+step+'" value="'+val+'"></label>').join('')+'<div class="lab-output">'+courseLabCalculate(g,Object.fromEntries(conf.fields.map(f=>[f[0],f[5]])))+'</div></section>'
}
function courseLabCalculate(g,v){const f=n=>Number(n.toFixed(3)).toLocaleString('en-US');switch(g){
case 'T2A':return 'Transmit on '+f(v.rx+v.offset)+' MHz · Listen on '+f(v.rx)+' MHz. The repeater receives at your transmit frequency.';
case 'T3B':return 'Wavelength ≈ '+f(300/v.f)+' meters ('+f(30000/v.f)+' cm). This is '+(v.f<30?'HF':v.f<300?'VHF':'UHF')+'. A quarter wave is about '+f(75/v.f)+' meters.';
case 'T5B':return f(v.p2/v.p1)+'× the original power = '+(10*Math.log10(v.p2/v.p1)>=0?'+':'')+f(10*Math.log10(v.p2/v.p1))+' dB.';
case 'T5C':return f(v.v)+' volts × '+f(v.i)+' amperes = '+f(v.v*v.i)+' watts of electrical power.';
case 'T5D':return 'I = '+f(v.v)+' V ÷ '+f(v.r)+' Ω = '+f(v.v/v.r)+' A. Power = '+f(v.v*v.v/v.r)+' W.';
case 'T9A':return 'At '+f(v.f)+' MHz, half-wave dipole ≈ '+f(468/v.f)+' feet total. Quarter-wave element ≈ '+f(75/v.f*39.3701)+' inches.';
case 'T0C':return 'Time-averaged power = '+f(v.p*v.d/100)+' W. Transmitting power stays '+f(v.p)+' W while keyed; average depends on duty cycle.';
default:return ''}
}
document.addEventListener('input',event=>{const el=event.target;if(!el?.matches?.('[data-lab-field]'))return;const card=el.closest('[data-lab]');if(!card)return;const inputs=[...card.querySelectorAll('[data-lab-field]')];const vars=Object.fromEntries(inputs.map(x=>[x.dataset.labField,Number(x.value)]));card.querySelector('[data-value-label="'+el.dataset.labField+'"]').textContent=el.value;card.querySelector('.lab-output').textContent=courseLabCalculate(card.dataset.lab,vars)});
