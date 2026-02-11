// Removed undici dependency

// Mocking the environment for local testing
global.addEventListener = (type, handler) => {
    if (type === 'fetch') {
        global.fetchHandler = handler;
    }
};

global.Response = class Response {
    static redirect(url, status) {
        return { url, status, type: 'redirect' };
    }
};

require('./worker.js');

async function testRedirect(inputUrl, expectedUrl) {
    const request = { url: inputUrl };
    const event = {
        request,
        respondWith: (promise) => {
            promise.then(response => {
                if (response.url === expectedUrl && response.status === 301) {
                    console.log(`PASS: ${inputUrl} -> ${expectedUrl}`);
                } else {
                    console.error(`FAIL: ${inputUrl} -> ${response.url} (expected ${expectedUrl})`);
                }
            });
        }
    };
    global.fetchHandler(event);
}

// Test cases
testRedirect('http://foo.oaklandpride.org/', 'https://oaklandprideofficial.org/');
testRedirect('https://bar.oaklandpride.org/some/path', 'https://oaklandprideofficial.org/some/path');
testRedirect('http://oaklandpride.org/?query=param', 'https://oaklandprideofficial.org/?query=param');
