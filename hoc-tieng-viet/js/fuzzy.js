/* Đoán chính tả tiếng Anh (appel → apple). Dùng danh sách dict/ew.js (tools/build_ew.py), nạp khi cần.
   Khoảng cách Damerau–Levenshtein (đảo hai chữ = 1 lỗi) + so khớp theo cách đọc (fone ≈ phone), xếp theo độ phổ biến. */
const FZ={w:[],z:[],k:[],by:{},set:new Set(),p:null};
const FZ_BAD=/^(whore|slut|fuck\w*|shit\w*|cunt|bitch\w*|nigg\w*|porn\w*|rape\w*|dick|cock|pussy)$/;
function dl(a,b,mx){const n=a.length,m=b.length;if(Math.abs(n-m)>mx)return mx+1;
let p2=null,p1=Array.from({length:m+1},(_,j)=>j);
for(let i=1;i<=n;i++){const c=[i];let lo=i;
for(let j=1;j<=m;j++){let v=Math.min(p1[j]+1,c[j-1]+1,p1[j-1]+(a[i-1]===b[j-1]?0:1));
if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])v=Math.min(v,p2[j-2]+1);
c[j]=v;if(v<lo)lo=v}
if(lo>mx)return mx+1;p2=p1;p1=c}
return p1[m]}
/* khóa phát âm gần đúng: bỏ chữ câm, gộp nguyên âm và phụ âm đôi */
const phon=s=>s.replace(/^kn/,'n').replace(/^wr/,'r').replace(/^ps/,'s').replace(/ph/g,'f').replace(/gh/g,'').replace(/ck/g,'k').replace(/c(?=[eiy])/g,'s').replace(/[cq]/g,'k').replace(/x/g,'ks').replace(/z/g,'s').replace(/y/g,'i').replace(/e$/,'').replace(/[aeiou]+/g,'a').replace(/(.)\1+/g,'$1');
function fzAdd(w,z){if(!w||FZ.set.has(w))return;FZ.set.add(w);if(FZ_BAD.test(w))return;const i=FZ.w.push(w)-1;FZ.z.push(z);FZ.k.push(phon(w));(FZ.by[w.length]=FZ.by[w.length]||[]).push(i)}
/* nạp danh sách từ (1 lần) */
function loadEW(){if(FZ.p)return FZ.p;
return FZ.p=new Promise(res=>{const done=()=>{String(DX.ew||'').split('|').forEach(t=>{const m=/^([a-z'-]+)(\d+)$/.exec(t);if(m)fzAdd(m[1],m[2]/10)});res(1)};
if(DX.ew)return done();const s=document.createElement('script');s.src='dict/ew.js';s.onload=done;s.onerror=()=>{FZ.p=null;res(0)};document.head.append(s)})}
/* các từ gần giống nhất (đã nạp danh sách) */
function fuzzySync(q,max=5){q=String(q).toLowerCase().trim();const L=q.length;if(L<3||!/^[a-z'-]+$/.test(q))return[];
const mx=L<=4?1:L<=8?2:3,pk=phon(q),qs=[...q].sort().join(''),r=[];
for(let l=Math.max(2,L-Math.max(mx,2));l<=L+Math.max(mx,2);l++)for(const i of FZ.by[l]||[]){const w=FZ.w[i];if(w===q)continue;
const ph=FZ.k[i]===pk&&FZ.z[i]>=3;let d=dl(q,w,mx),b=0;if(d>mx){if(!ph)continue;d=mx;b=.5}
if(w.length===L){b+=.5;if(d<=mx&&[...w].sort().join('')===qs)b+=2.5}/* cùng độ dài / đảo chữ: lỗi gõ rất hay gặp */
r.push([d*3-FZ.z[i]-(ph?2:0)-b+(w[0]!==q[0]&&!ph?1.5:0),w])}
return r.sort((a,b)=>a[0]-b[0]).slice(0,max).map(x=>x[1])}
async function fuzzyEn(q,max){await loadEW();return fuzzySync(q,max)}
