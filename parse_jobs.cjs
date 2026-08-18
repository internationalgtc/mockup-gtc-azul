const fs = require('fs');
const content = fs.readFileSync(process.env.TEMP + '/jobs_bundle.js', 'utf8');

// Find the jobs array
const marker = 'a=[{id:';
const startIdx = content.indexOf(marker);
const arrayStart = startIdx + 2;
let depth = 0, end = arrayStart;
for(let i = arrayStart; i < content.length; i++) {
  if(content[i] === '[') depth++;
  else if(content[i] === ']') { depth--; if(depth===0){end=i;break;} }
}
const arrStr = content.slice(arrayStart, end+1);

// Split into individual top-level job objects
const jobs = [];
let jDepth = 0, jStart = -1;
for(let i = 0; i < arrStr.length; i++) {
  if(arrStr[i] === '{') { if(jDepth===0) jStart=i; jDepth++; }
  else if(arrStr[i] === '}') { jDepth--; if(jDepth===0&&jStart>=0){jobs.push(arrStr.slice(jStart,i+1));jStart=-1;} }
}

// Extract string field value - handles escaped quotes
function getStr(obj, field) {
  const re = new RegExp(field + ':"');
  const m = re.exec(obj);
  if(!m) return null;
  let start = m.index + m[0].length;
  let result = '';
  for(let i = start; i < obj.length; i++) {
    if(obj[i] === '"' && obj[i-1] !== '\\') break;
    result += obj[i];
  }
  return result;
}

function getBool(obj, field) {
  const re = new RegExp(',' + field + ':(![01])');
  const m = obj.match(re);
  if(!m) return null;
  return m[1] === '!0';
}

// Extract array field as raw string
function getArrayStr(obj, field) {
  const startMarker = ',' + field + ':[';
  const si = obj.indexOf(startMarker);
  if(si < 0) return '[]';
  let d = 0, start = si + startMarker.length - 1;
  let e2 = start;
  for(let i = start; i < obj.length; i++) {
    if(obj[i]==='[') d++;
    else if(obj[i]===']') { d--; if(d===0){e2=i;break;} }
  }
  return obj.slice(start, e2+1);
}

// Parse string list from JS array literal
function parseStrList(arrS) {
  const items = [];
  let inStr = false, cur = '', escaped = false;
  for(let i = 0; i < arrS.length; i++) {
    const ch = arrS[i];
    if(escaped) { cur += ch; escaped = false; continue; }
    if(ch === '\\') { escaped = true; cur += ch; continue; }
    if(!inStr && ch === '"') { inStr = true; cur = ''; continue; }
    if(inStr && ch === '"') { items.push(cur); inStr = false; cur = ''; continue; }
    if(inStr) cur += ch;
  }
  return items;
}

// Parse titulo objects
function parseTituloList(arrS) {
  const items = [];
  const re = /titulo:"((?:[^"\\]|\\.)*)"/g;
  let m;
  while((m = re.exec(arrS)) !== null) items.push(m[1]);
  return items;
}

const targetKeywords = [
  'marketing digital', 'growth manager', 'lider de gestión', 'sdr',
  'odoo', 'juguetes', 'diseñador web', 'paid media', 'bim',
  'inmobiliario', 'administrativo bilingüe', 'marketing operations',
  'seo', 'social media manager', 'marketing digital integral',
  'marketing lead', 'asistente líder', 'ventas e-commerce'
];

const results = [];

jobs.forEach(job => {
  const active = getBool(job, 'active');
  const id = getStr(job, 'id');
  const title = getStr(job, 'title');
  const dept = getStr(job, 'department');
  const loc = getStr(job, 'location');
  const type = getStr(job, 'type');
  const desc = getStr(job, 'description');
  const titleLower = (title||'').toLowerCase();
  const isTarget = targetKeywords.some(k => titleLower.includes(k.toLowerCase()));

  if(active || isTarget) {
    const respArr = getArrayStr(job, 'responsibilities');
    const reqArr = getArrayStr(job, 'requirements');
    const benArr = getArrayStr(job, 'benefits');
    const softArr = getArrayStr(job, 'softSkills');
    const eduArr = getArrayStr(job, 'education');

    results.push({
      id, active, title, dept, loc, type, desc,
      responsibilities: parseTituloList(respArr),
      requirements: parseStrList(reqArr),
      benefits: parseStrList(benArr),
      softSkills: parseTituloList(softArr).length ? parseTituloList(softArr) : parseStrList(softArr),
      education: parseStrList(eduArr),
      isTarget
    });
  }
});

// Output as readable text
results.forEach(j => {
  console.log('\n' + '#'.repeat(80));
  console.log('# JOB ID:', j.id, '| ACTIVE:', j.active, '| TARGET MATCH:', j.isTarget);
  console.log('# TITLE:', j.title);
  console.log('#'.repeat(80));
  console.log('Department:', j.dept);
  console.log('Location:', j.loc);
  console.log('Type:', j.type);
  console.log('\nDESCRIPTION:');
  console.log(j.desc);
  if(j.responsibilities.length) {
    console.log('\nRESPONSIBILITIES:');
    j.responsibilities.forEach((r,i) => console.log((i+1)+'.', r));
  }
  if(j.requirements.length) {
    console.log('\nREQUIREMENTS:');
    j.requirements.forEach(r => console.log('-', r));
  }
  if(j.education.length) {
    console.log('\nEDUCATION:');
    j.education.forEach(r => console.log('-', r));
  }
  if(j.softSkills.length) {
    console.log('\nSOFT SKILLS:');
    j.softSkills.forEach(r => console.log('-', r));
  }
  if(j.benefits.length) {
    console.log('\nBENEFITS:');
    j.benefits.forEach(r => console.log('-', r));
  }
});

console.log('\n\nTOTAL JOBS SHOWN:', results.length, '(active:', results.filter(j=>j.active).length, ', target-only:', results.filter(j=>!j.active&&j.isTarget).length, ')');
