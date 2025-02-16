var i=e=>{throw new Error("Not initialized yet")},c=typeof window>"u"&&typeof globalThis.WebSocketPair>"u";typeof Deno>"u"&&(self.Deno={args:[],build:{arch:"x86_64"},env:{get(){}}});var l=new Map,d=0;c&&(globalThis.syscall=async(e,...t)=>await new Promise((n,s)=>{d++,l.set(d,{resolve:n,reject:s}),i({type:"sys",id:d,name:e,args:t})}));function u(e,t,n){c&&(i=n,self.addEventListener("message",s=>{(async()=>{let r=s.data;switch(r.type){case"inv":{let a=e[r.name];if(!a)throw new Error(`Function not loaded: ${r.name}`);try{let o=await Promise.resolve(a(...r.args||[]));i({type:"invr",id:r.id,result:o})}catch(o){console.error("An exception was thrown as a result of invoking function",r.name,"error:",o.message),i({type:"invr",id:r.id,error:o.message})}}break;case"sysr":{let a=r.id,o=l.get(a);if(!o)throw Error("Invalid request id");l.delete(a),r.error?o.reject(new Error(r.error)):o.resolve(r.result)}break}})().catch(console.error)}),i({type:"manifest",manifest:t}))}function m(e){let t=atob(e),n=t.length,s=new Uint8Array(n);for(let r=0;r<n;r++)s[r]=t.charCodeAt(r);return s}function g(e){typeof e=="string"&&(e=new TextEncoder().encode(e));let t="",n=e.byteLength;for(let s=0;s<n;s++)t+=String.fromCharCode(e[s]);return btoa(t)}async function p(e,t){if(typeof e!="string"){let n=new Uint8Array(await e.arrayBuffer()),s=n.length>0?g(n):void 0;t={method:e.method,headers:Object.fromEntries(e.headers.entries()),base64Body:s},e=e.url}return syscall("sandboxFetch.fetch",e,t)}globalThis.nativeFetch=globalThis.fetch;function b(){globalThis.fetch=async function(e,t){let n=t&&t.body?g(new Uint8Array(await new Response(t.body).arrayBuffer())):void 0,s=await p(e,t&&{method:t.method,headers:t.headers,base64Body:n});return new Response(s.base64Body?m(s.base64Body):null,{status:s.status,headers:s.headers})}}c&&b();async function y(){return{html:`
            <h1>Texteditor</h1>
            <textarea id="editor" rows="10" cols="80"></textarea>
        `,script:`
            globalThis.silverbullet.addEventListener("file-open", (event) => {
                document.getElementById("editor").value = new TextDecoder().decode(event.detail.data);
            });

            globalThis.silverbullet.addEventListener("file-update", (event) => {
                document.getElementById("editor").value = new TextDecoder().decode(event.detail.data);
            });

            globalThis.silverbullet.addEventListener("request-save", () => {
                globalThis.silverbullet.sendMessage("file-saved", { data: new TextEncoder().encode(document.getElementById("editor").value) });
            });

            globalThis.silverbullet.addEventListener("focus", () => {
                document.getElementById("editor").focus();
            });

            document.getElementById("editor").addEventListener("input", () => {
                globalThis.silverbullet.sendMessage("file-changed", {});
            });
        `}}var h={TXTEditor:y},f={name:"txteditor",functions:{TXTEditor:{path:"./editor.ts:editor",editor:["txt"]}},assets:{}},T={manifest:f,functionMapping:h};u(h,f,self.postMessage);export{T as plug};
