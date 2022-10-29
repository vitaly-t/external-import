const http = require('http'); // NodeJS internals
const https = require('https'); // NodeJS internals

// url: - a url string | {url: string, exports?:string} | an array of
// cb: - optional (module, err) callback with one module or an array of,
//       according to the input. Without callback, a promise is returned.
function externalImport(url, cb) {
    const r = Array.isArray(url) ? Promise.all(url.map(a => load(a))) : load(url);
    if (typeof cb !== 'function') {
        return r; // no callback, just return the promise
    }
    r.then(cb).catch(err => cb(null, err));
}

function load(input) {
    const t = typeof input === 'string';
    const url = t ? input : input.url;
    const exp = (!t && input.exports) || 'exports';
    return fetch(url).then(code => {
        return eval(`(function hello(){eval(${code})})()`); // evaluate the code
        // return eval(exp); // evaluate the exports
    });
}

function fetch(url) {
    return new Promise((resolve, reject) => {
        const data = [];
        const client = url.startsWith('https') ? https : http;
        client.request(url, res => {
            res.on('data', chunk => data.push(chunk));
            res.on('end', () => resolve(Buffer.concat(data).toString('utf8')));
            res.on(`error`, (e) => reject(e));
        }).end();
    });
}

module.exports = {externalImport};
