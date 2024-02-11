

// const origin = 'default'
// const originatorId = await createOriginator(origin);
const originatorId = 'dummy-id'

function init() {
    document.addEventListener('click', function (event) {
        console.log("CLICK")
        collect('click')

        if (event.target.tagName === 'A') {
            const target = event.target.getAttribute('target');
            const href = event.target.getAttribute('href');

            if (target === '_blank') {
                collect('external_link_click');
            } else {
                collect('link_click');
            }
        }
    });

    window.addEventListener("beforeunload", function (event) {
        console.log("BYE")
        collect('exit')
    });

    collect('init')
}
const baseUrl = "http://localhost:3000";

async function send(type = "pageview") {
    console.log(`${baseUrl}/api/collect`)
    let url = new URL(`${baseUrl}/api/collect`)

    // console.log("CLLETING")
    // console.log(url)
    url.searchParams.set('originatorId', originatorId)
    url.searchParams.set('type', type)
    url.searchParams.set('url', window.location.href)

    fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log("📼", data)
        })
        .catch(rejected => {
            console.log("📼", "failed to collect")
        });
}
console.log("HI")

async function collect(type) {
    await send(type)
}

window.collectStats = collect

collect('loaded')

window.addEventListener('load', function () {
    console.log("LOADED")
    init()
});

