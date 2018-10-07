export default function swap(imgData, nbChunks = 50) {
  const map = {}
  const paddedLength = imgData.data.length + (imgData.data.length % 4)
  const chunkSize = Math.ceil(paddedLength / nbChunks / 4) * 4
  for (let i = 0; i < imgData.data.length; i += 4) {
    const chunkIndex = Math.floor(i / chunkSize)
    const oppositeChunkIndex = nbChunks - 1 - chunkIndex
    const indexInChunk = i - chunkIndex * chunkSize
    const swapIndex = oppositeChunkIndex * chunkSize + indexInChunk
    if (map[swapIndex]) {
      imgData.data[i + 0] = map[swapIndex][0]
      imgData.data[i + 1] = map[swapIndex][1]
      imgData.data[i + 2] = map[swapIndex][2]
      imgData.data[i + 3] = map[swapIndex][3]
    } else {
      map[i] = imgData.data.slice(i, i + 4)
      imgData.data[i + 0] = imgData.data[swapIndex + 0]
      imgData.data[i + 1] = imgData.data[swapIndex + 1]
      imgData.data[i + 2] = imgData.data[swapIndex + 2]
      imgData.data[i + 3] = imgData.data[swapIndex + 3]
    }
  }
  return imgData
}
