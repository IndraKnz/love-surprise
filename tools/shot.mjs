/**
 * shot.mjs — screenshot via Chrome DevTools Protocol (real-time waits + interactions).
 *
 * Usage:
 *   node tools/shot.mjs '{"url":"http://127.0.0.1:8123/index.html#choose","out":"shots/choose.png","w":1440,"h":900,"wait":1500}'
 *
 * Optional:
 *   "actions":[{"js":"document.querySelector('#envelope').click()","wait":1200}]
 *   "dpr":2
 */
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const cfg = JSON.parse(process.argv[2]);
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9333 + Math.floor(Math.random() * 300);
const profile = `C:/Users/asus/AppData/Local/Temp/cdp-${Date.now()}`;

const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-extensions',
  '--hide-scrollbars',
  '--mute-audio',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-renderer-backgrounding',
  '--disable-features=CalculateNativeWinOcclusion',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  'about:blank'
], { stdio: 'ignore' });

async function getTarget() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await r.json();
      const page = list.find(t => t.type === 'page');
      if (page && page.webSocketDebuggerUrl) return page;
    } catch {}
    await sleep(200);
  }
  throw new Error('CDP target not found');
}

const target = await getTarget();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let id = 0;
const pending = new Map();
const problems = [];
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.method === 'Runtime.exceptionThrown') {
    problems.push('EXCEPTION: ' + (msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text));
  }
  if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
    problems.push('LOG: ' + msg.params.entry.text);
  }
  if (msg.id && pending.has(msg.id)) {
    const { res, rej } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result);
  }
};

function send(method, params = {}) {
  const mid = ++id;
  ws.send(JSON.stringify({ id: mid, method, params }));
  return new Promise((res, rej) => pending.set(mid, { res, rej }));
}

const w = cfg.w || 1440;
const h = cfg.h || 900;

await send('Page.enable');
await send('Page.bringToFront');
await send('Runtime.enable');
await send('Log.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: w, height: h, deviceScaleFactor: cfg.dpr || 1, mobile: !!cfg.mobile
});
await send('Page.navigate', { url: cfg.url });
await sleep(cfg.wait || 1800);

for (const a of cfg.actions || []) {
  if (a.js) {
    await send('Runtime.evaluate', { expression: a.js, awaitPromise: true, returnByValue: true });
  }
  if (a.click) {
    const box = await send('Runtime.evaluate', {
      expression: `(()=>{const e=document.querySelector(${JSON.stringify(a.click)});if(!e)return null;const r=e.getBoundingClientRect();return JSON.stringify({x:r.left+r.width/2,y:r.top+r.height/2})})()`,
      returnByValue: true
    });
    if (box.result.value) {
      const { x, y } = JSON.parse(box.result.value);
      await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
      await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
      await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
    }
  }
  await sleep(a.wait || 600);
}

const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
const out = resolve(cfg.out);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, Buffer.from(shot.data, 'base64'));

const logs = await send('Runtime.evaluate', {
  expression: `JSON.stringify({title:document.title, screen:(document.querySelector('.screen.is-active')||{}).id, err:window.__err||null})`,
  returnByValue: true
});
console.log('saved', out, logs.result.value);
if (problems.length) console.log('PROBLEMS:', JSON.stringify(problems, null, 1));

ws.close();
chrome.kill();
process.exit(0);
