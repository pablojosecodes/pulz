
const origin = 'default'
const originatorId = await createOriginator(origin);


function init() {
    document.addEventListener('click', function (event) {
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
        collect('exit')
    });

    collect('init')
}

async function send(type = "pageview") {
    let url = new URL("${url}/api/collect")

    url.searchParams.set('originatorId', originatorId)
    url.searchParams.set('type', type)
    url.searchParams.set('url', window.location.href)

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

collect('loaded')

window.addEventListener('load', function () {
    init()
});

