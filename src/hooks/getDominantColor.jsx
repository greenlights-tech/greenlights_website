export function getDominantColor(img) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const size = 30;
  canvas.width = size;
  canvas.height = size;
  ctx.drawImage(img, 0, 0, size, size);
  const data = ctx.getImageData(0, 0, size, size).data;

  let r = 0,
    g = 0,
    b = 0,
    count = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 200) continue;
    if (data[i] + data[i + 1] + data[i + 2] < 30) continue;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }
  if (!count) return "rgb(255,255,255)";
  return `rgb(${Math.round(r / count)}, ${Math.round(g / count)}, ${Math.round(
    b / count
  )})`;
}
