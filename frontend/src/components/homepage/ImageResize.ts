interface IResizeImageOptions {
  maxSize: number;
  file: File;
}

// 이미지 리이이이사이징
const imageResize = (settings: IResizeImageOptions) => {
  const file = settings.file;
  const maxSize = settings.maxSize;
  const reader = new FileReader();
  const image = new Image();
  const canvas = document.createElement('canvas');
  // 이미지 uri를 반환 주석 처리는 본래 blob타입 객체를 반환하도록 하지만 지금은 필요없음
  const dataURItoBlob = (dataURI: string) => {
    // console.log(dataURI);
    // return dataURI;
    const bytes =
      dataURI.split(',')[0].indexOf('base64') >= 0
        ? atob(dataURI.split(',')[1])
        : unescape(dataURI.split(',')[1]);
    const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const max = bytes.length;
    const ia = new Uint8Array(max);
    for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
    const iblob = new Blob([ia], { type: mime });
    return [
      new File([iblob], '카스테라.jpg', {
        type: 'image/jpeg',
      }),
      dataURI,
    ];
  };

  const resize = () => {
    let width = image.width;
    let height = image.height;

    // 가로 세로 중 더 큰 길이를 판단해 사이즈 변경 + 본래 사진 비율은 유지
    if (width > height) {
      if (width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      }
    } else {
      if (height > maxSize) {
        width *= maxSize / height;
        height = maxSize;
      }
    }

    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d')?.drawImage(image, 0, 0, width, height);

    // 리사이징 된 (이미지)데이터를 이미지/jpeg 형식의 사진url로 변환
    const dataUrl = canvas.toDataURL('image/jpeg');
    return dataURItoBlob(dataUrl);
  };

  return new Promise((ok, no) => {
    if (!file.type.match(/image.*/)) {
      no(new Error('Not an image'));
      return;
    }

    reader.onload = (readerEvent: any) => {
      image.onload = () => ok(resize());
      image.src = readerEvent.target.result;
    };

    reader.readAsDataURL(file);
  });
};

export default imageResize;
