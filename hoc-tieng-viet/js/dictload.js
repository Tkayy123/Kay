/* Nạp từ điển mở rộng theo nhu cầu: dict/v/NN.js (Việt→nghĩa) và dict/e/NN.js (Anh→Việt), mỗi file gộp nhiều shard; DX.b ánh xạ shard → file.
   Dùng thẻ <script> (không dùng fetch) nên chạy được cả khi mở file trực tiếp. Khóa shard sk() phải khớp tools/build_dict.py. */
const DX={v:{},e:{},p:{},ix:{},keys:{v:[],e:[]},n:[0,0],sv(k,o){this.v[k]=o},se(k,o){this.e[k]=o}};
const sk=s=>(nf(s).replace(/[^a-z]/g,'_')+'__').slice(0,2);
function shard(kind,k){const key=kind+k;if(DX.p[key])return DX.p[key];
if(!DX.keys[kind].includes(k))return DX.p[key]=Promise.resolve({});
const b=DX.b[kind][k],bk='b'+kind+b;
const L=DX.p[bk]||(DX.p[bk]=new Promise(res=>{const s=document.createElement('script');s.src='dict/'+kind+'/'+b+'.js';s.onload=()=>res(1);s.onerror=()=>{delete DX.p[bk];res(0)};document.head.append(s)}));
return DX.p[key]=L.then(ok=>{if(!ok)delete DX.p[key];return DX[kind][k]||{}})}
/* danh sách từ tiếng Việt của một shard, đã chuẩn hóa để so khớp */
async function ixOf(q){const k=sk(q),sh=await shard('v',k);return DX.ix[k]||(DX.ix[k]=Object.entries(sh).map(([w,o])=>({w,n:nf(w),l:w.toLowerCase().normalize('NFC'),f:o.f,d:o.d})))}
const ixSync=q=>DX.ix[sk(q)]||[];
const ftag=f=>f>=5?['●●●','rất thông dụng · very common']:f>=4?['●●○','thông dụng · common']:f>=3?['●○○','ít gặp · less common']:['○○○','hiếm · rare'];
