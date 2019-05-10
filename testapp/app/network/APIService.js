import Api from '../utility/Api';
import normalizeArticles from '../normalizers/article'
import normalizeArticlesDetail from '../normalizers/articleDetail'


export function getArticles() {
    return new Promise((resolve, reject) => {
        Api.get(`posts?page=1&per_page=5`,false).then(response => {
            if (response.isError) {
                reject(response);
            } else {
                const store = normalizeArticles(response);
                resolve(store);
            }
            })
            .catch(e => {
            reject({ status: -1 });
            });
    });
}

export function getArticleDetail(id) {
    return new Promise((resolve, reject) => {
        Api.get(`posts/${id}`,false).then(response => {
            if (response.isError) {
                reject(response);
            } else {
                const store = normalizeArticlesDetail(response);
                resolve(store);
            }
            })
            .catch(e => {
            reject({ status: -1 });
            });
    });
}