import { Router } from 'vue-router';

export const goBack = (router: Router) => {
    window.history.length > 1 ? router.go(-1) : router.push('/');
};

export const goHome = (router: Router) => {
    router.push('/');
};

export const openTab = (url: string) => {
    window.open(url, '_blank');
};

export const onHref = (path: string, router: Router) => {
    if (path.startsWith('http')) {
        window.open(path);
    } else {
        router.push(path);
    }
};
