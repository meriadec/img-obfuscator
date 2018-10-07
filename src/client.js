import swap from './swap'

// DOM nodes & canvas contexts
const amount = document.getElementById('amount')
const amountDisplay = document.getElementById('amountDisplay')
const originalCanvas = document.getElementById('original')
const encodedCanvas = document.getElementById('encoded')
const decodedCanvas = document.getElementById('decoded')
const originalCtx = originalCanvas.getContext('2d')
const encodedCtx = encodedCanvas.getContext('2d')
const decodedCtx = decodedCanvas.getContext('2d')

loadImg(require('./assets/images/tesla-2.jpg')).then(img => {
  resizeCanvas([originalCanvas, encodedCanvas, decodedCanvas], img.width, img.height)

  // draw original image
  originalCtx.drawImage(img, 0, 0)

  // draw encoded / decoded
  refresh()
  amount.addEventListener('input', refresh)

  function refresh() {
    amountDisplay.innerHTML = `amount: ${amount.value}`
    const originalData = originalCtx.getImageData(0, 0, img.width, img.height)
    encodedCtx.putImageData(swap(originalData, amount.value), 0, 0)
    const encodedData = encodedCtx.getImageData(0, 0, img.width, img.height)
    decodedCtx.putImageData(swap(encodedData, amount.value), 0, 0)
  }
})

function loadImg(imgSrc) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = imgSrc
  })
}

function resizeCanvas(canvasList, width, height) {
  canvasList.forEach(canvas => {
    canvas.width = width
    canvas.height = height
  })
}

// hot module replacement
if (module.hot) {
  module.hot.accept()
}
