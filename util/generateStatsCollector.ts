
import JavaScriptObfuscator from 'javascript-obfuscator';
import { config } from './config';

const generateStatsCollector = (collectorId: string) => {
    // const url = config.APP_URL;
    const url= "http://localhost:3000"

    const js = `
    "use strict"

    console.log("zzzzzzzz")
    function init(){
        console.log("INIT") 
        document.addEventListener('click', function(event) {
            console.log("CLICK")
            if (event.target.tagName === 'a') {
                const target = event.target.getAttribute('target');
                const href = event.target.getAttribute('href');
                
                if (target === '_blank') {
                    collect('external_link_click');
                } else {
                    collect('link_click');
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

        url.searchParams.set('originatorId', '${collectorId}')
        url.searchParams.set('type', type)
        url.searchParams.set('url', window.location.href)
        console.log(url)

        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log("📼", data)
        })
        .catch(rejected => {
            console.log("📼", "failed to collect")
        });
    }

    async function collect(type) {
        await send(type)
    }

    window.collectStats = collect

    console.log("LOADING");
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

export default generateStatsCollector;