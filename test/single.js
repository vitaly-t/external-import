const {externalImport} = require('../external-import')

externalImport('https://unpkg.com/rxjs@7.5.7/dist/bundles/rxjs.umd.min.js', rxjs => {
    const {from, reduce} = rxjs;
    from([1, 2, 3, 4]).pipe(reduce((a, b) => a + b))
        .subscribe(res => {
            console.log(res); //=> 10
        });
});
