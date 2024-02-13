
import JavaScriptObfuscator from 'javascript-obfuscator';
import { global_app } from './config';


const generateScript = (originatorId: string) => {
    const url = global_app

    const js = `
    "use strict"


    function init(){
        document.addEventListener('click', function(event) {
            if (event.target.tagName === 'a') {
                const target = event.target.getAttribute('target');
                const href = event.target.getAttribute('href');
                if (target === '_blank') {
                    collect('external link');
                } else {
                    collect('internal link');
                }
            }
            collect('click');
        });
        window.addEventListener("beforeunload", function(event) {
           collect('exit')
        });
        collect('init')
    }

    async function send(type = "pageview") {
        let url = new URL("${url}/api/collect")
        url.searchParams.set('originatorId', '${originatorId}')
        url.searchParams.set('type', type)
        url.searchParams.set('url', window.location.href)
        console.log(url)

        fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
        })
        .catch(rejected => {
            console.log("failed to collect")
        });
    }

    async function collect(type) {
        await send(type)
    }

    window.collectStats = collect

    collect('loaded')

    window.addEventListener('load', function() {
        init()
    });

    `;

    const obfuscatedJs = JavaScriptObfuscator.obfuscate(js, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1,
    }).getObfuscatedCode();

    // return obfuscatedJs;
    return js;
};

export default generateScript;