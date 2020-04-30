import request from '@/utils/common/request'

/**
 * exportDataLink
 * @param Object
 * @returns {Q.Promise<any>}
 * @author john
 * @date 2020-02-27
 */

export function exportDataLink(url, params, query, filename = 'export.csv') {
    return request
        .post(url, query, {
            params,
            responseType: 'blob',
        })
        .then(res => {
            createBlob(res, filename)
        })
}

export function createBlob(data, filename) {
    var blob = new Blob([data])
    let dom = document.createElement('a')
    dom.download = filename
    dom.style.display = 'none'
    dom.href = URL.createObjectURL(blob)
    document.body.appendChild(dom)
    dom.click()
    setTimeout(() => {
        document.body.removeChild(dom)
    }, 1000)
}
