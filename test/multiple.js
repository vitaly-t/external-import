const {externalImport} = require('../external-import')

const libs =
    /*{url: 'https://unpkg.com/iter-ops@2.1.1/dist/web/iter-ops.min.js', exports: 'iterOps'},*/
    {url:'https://unpkg.com/path-value@0.9.5/dist/web/path-value.min.js', exports: 'pathValue'}
;

externalImport(libs, bla => {
    /*
    const {from, reduce} = rxjs;
    from([1, 2, 3, 4]).pipe(reduce((a, b) => a + b))
        .subscribe(res => {
            console.log(res); //=> 10
        });*/

    console.log(bla);
});
