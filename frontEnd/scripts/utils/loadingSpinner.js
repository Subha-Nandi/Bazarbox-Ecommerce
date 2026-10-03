let activeRequests = 0;

export function showLoading() {
    activeRequests++;

    const spinner = document.querySelector('.js-loading-spinner');

    if (spinner) {
        spinner.classList.add('is-loading');
    }
}

export function hideLoading() {
    activeRequests--;

    if (activeRequests <= 0) {
        activeRequests = 0;

        const spinner = document.querySelector('.js-loading-spinner');

        if (spinner) {
            spinner.classList.remove('is-loading');
        }
    }
}