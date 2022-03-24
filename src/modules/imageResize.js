export const imageResize = (image) => {
  let canvas = document.createElement("canvas"),
    max_size = 1280,
    width = image.width,
    height = image.height;

  if (width > height) {
    if (width > max_size) {
      height *= max_size / width;
      width = max_size;
    }
  } else {
    if (height > max_size) {
      width *= max_size / height;
      height = max_size;
    }
  }

  const dataURItoBlob = (dataURI) => {
    const bytes =
      dataURI.split(",")[0].indexOf("base64") >= 0
        ? atob(dataURI.split(",")[1])
        : unescape(dataURI.split(",")[1]);
    const mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const max = bytes.length;
    const ia = new Uint8Array(max);
    for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
    return new Blob([ia], { type: mime });
  };

  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(image, 0, 0, width, height);
  const dataUrl = canvas.toDataURL("image/jpeg", 0.5);

  return dataURItoBlob(dataUrl);
};
