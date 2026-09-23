// Resizes and JPEG-compresses an image before it's stored as a base64
// string in the Realtime Database. This matters: RTDB is optimized for
// small, fast-to-read values, and base64 encoding itself adds roughly
// 33% overhead on top of the original file size. Doing this client-side
// avoids needing Firebase Storage (and its billing requirement) for
// something as small as a profile picture.

const MAX_DIMENSION = 200;
const JPEG_QUALITY = 0.7;

export function resizeAndCompressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        let { width, height } = img;

        if (width > height && width > MAX_DIMENSION) {
          height = Math.round((height * MAX_DIMENSION) / width);
          width = MAX_DIMENSION;
        } else if (height > MAX_DIMENSION) {
          width = Math.round((width * MAX_DIMENSION) / height);
          height = MAX_DIMENSION;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
      };

      img.onerror = () => reject(new Error("Could not load the selected image."));
      img.src = event.target.result;
    };

    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.readAsDataURL(file);
  });
}