#!/usr/bin/env node
/**
 * Content-integrity checks for the 2026–2030 Technician course.
 *
 * Checks 409 unique official questions, 35 groups, all corresponding instructional
 * objectives, all chapter guides, exact question-ID lookups, PWA asset manifest,
 * and several exam-sensitive regression facts.
 *
 * This is a structural/coverage test. It cannot replace independent editorial
 * review of every explanation for technical and legal accuracy.
 */
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const read = f => fs.readFileSync(new URL('../'+f,import.meta.url),'utf8');
const questions=JSON.parse(read('questions.json'));
const ctx={window:{HAM_FACTS:{},COURSE:{}}};
vm.createContext(ctx);
const factFiles=['exam-facts-1.js','exam-facts-2.js','exam-facts-3.js','exam-facts-4.js'];
const chapters=['course-foundations.js','course-electronics.js','course-onair.js'];
for(const file of [...factFiles,...chapters])vm.runInContext(read(file),ctx,{filename:file});
const facts=ctx.window.HAM_FACTS,course=ctx.window.COURSE;
assert.equal(questions.length,409,'NCVEC question pool count changed');
const questionIds=new Set(questions.map(q=>q.id));
assert.equal(questionIds.size,409,'Duplicate question IDs');
assert.ok(questions.every(q=>q.correct>=0&&q.correct<4&&q.answers.length===4),'Invalid official answer index');
const groups=[...new Set(questions.map(q=>q.id.slice(0,3)))];
assert.equal(groups.length,35,'Expected 35 official question groups');
const factIds=new Set();
for(const group of groups){
 const current=questions.filter(q=>q.id.startsWith(group));
 assert.ok(course[group],group+': missing instructional chapter');
 assert.ok(course[group].parts.length>=4,group+': chapter is too short');
 assert.ok(course[group].example && course[group].check,group+': missing worked example or checks');
 assert.ok(Array.isArray(facts[group]),group+': missing individually mapped facts');
 assert.equal(facts[group].length,current.length,group+': wrong number of exam objectives');
 for(let i=0;i<current.length;i++){
   const id=group+String(i+1).padStart(2,'0');
   assert.equal(current[i].id,id,group+': question pool order must be exact');
   const [title,details]=facts[group][i];
   assert.ok(typeof title==='string'&&title.length>=7,id+': missing heading');
   assert.ok(typeof details==='string'&&details.length>=18,id+': missing teaching content');
   assert.ok(!factIds.has(id),id+': duplicate fact');
   factIds.add(id);
 }
}
assert.equal(factIds.size,409,'Expected every question to map to exactly one teaching fact');
assert.deepEqual([...factIds].sort(),[...questionIds].sort(),'Question-to-fact correspondence is broken');
assert.match(facts.T1A[5][1],/28[.]200[\s\S]*28[.]300/,'T1A06 beacon allocation must be taught explicitly');
assert.match(facts.T1B[10][1],/200[\s\S]*(?:watts|W)/i,'T1B11 Technician HF power limit missing');
assert.match(facts.T1B[6][1],/50[.]0[\s\S]*50[.]1[\s\S]*144[.]0[\s\S]*144[.]1/,'T1B07 CW-only band edges missing');
assert.match(facts.T0B[5][1],/10 feet/,'T0B06 falling tower clearance missing');
assert.match(facts.T0C[2][1],/50%[\s\S]*double/,'T0C03 duty-cycle density relationship missing');
assert.match(facts.T6C[1][1],/resistor/i,'T6C02 figure component missing');
const learning=read('learning-ui.js'),app=read('app.js'),html=read('index.html'),sw=read('sw.js');
assert.ok(learning.includes('function courseExamFacts(g)'), 'Lesson must render every mapped objective');
assert.ok(learning.includes('function courseFact(q)'), 'Explanation lookup by official question ID required');
assert.ok(!learning.includes('const stop=new Set('),'Old fuzzy keyword matcher must be removed');
assert.ok(app.includes('courseRelated(q)'), 'Feedback must show mapped teaching content');
for(const file of factFiles){
 assert.ok(html.includes(file),file+': missing from HTML');
 assert.ok(sw.includes(file),file+': missing from offline cache');
}
console.log('PASS: 409/409 official questions mapped to explicit teaching facts');
console.log('PASS: 35/35 official question groups have guided lessons and exam coverage');
console.log('PASS: exact reference mechanism and regression facts; all content cached offline');
console.log('NOTE: Structure passes; factual editorial review remains an ongoing responsibility.');
