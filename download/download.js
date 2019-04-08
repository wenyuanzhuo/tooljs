// 利用blob  <a> download 实现 下载
export function download(data, filename, mime) {
    const blob = new blob([data], { type: mime || "application/octet-stream" })
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, filename) 
    } else {
        const blobUrl = window.URL.createObjectURL(blob)
        const element = document.createElement('a')
        element.style.display = 'none'
        element.herf = blobUrl
        element.setAttribute('download', filename)
        if('download' in element || element.hasOwnProperty('download')) {
            element.setAttribute('target', '_blank') // 打开新页面
        }
        document.body.appendChild('element')
        element.click()
        document.body.removeChild('element')
        window.URL.revokeObjectURL()
    }
}

// 图片转base64地址
// var canvas = document.createElement('canvas');
// var context = canvas.getContext('2d');
// var width = domImg.naturalWidth;
// var height = domImg.naturalHeight;    context.drawImage(domImg, 0, 0);
// eleLink.href = canvas.toDataURL('image/jpeg');