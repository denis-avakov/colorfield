import { useState, useCallback, Fragment } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { getOrientation } from 'get-orientation/browser';

import ImgDialog from './ImgDialog';
import { getCroppedImg, getRotatedImage } from './canvasUtils';
import { styles } from './styles';

import Spinner from 'components/Spinner';
import classNames from 'utils/classNames';

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90
};

const Demo = ({ classes, colorScheme = [] }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const processImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);

      const formData = new FormData();
      formData.append('image', croppedImage, 'image.jpg');
      formData.append('colorScheme', colorScheme);

      setIsLoading(true);

      const result = await fetch('http://84.38.180.139:8080/upload', {
        method: 'POST',
        body: formData
      }).then((response) => response.json());

      setIsLoading(false);
      setCroppedImage(result.preview);
    } catch (error) {
      console.error(error);
    }
  }, [imageSrc, croppedAreaPixels, rotation, colorScheme]);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      console.log('donee', { croppedImage });
      setCroppedImage(croppedImage);
    } catch (error) {
      console.error(error);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const onFileChange = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      let imageDataUrl = await readFile(file);

      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];

      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      setImageSrc(imageDataUrl);
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="mb-4 flex items-center justify-center bg-slate-100">
          <Spinner />
        </div>
      )}

      <div className={classNames(isLoading && 'pointer-events-none opacity-50')}>
        {imageSrc ? (
          <Fragment>
            <div className={classes.cropContainer}>
              <Cropper
                image={imageSrc}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                zoomWithScroll={false}
              />
            </div>

            <div className={classes.controls}>
              <div className={classes.sliderContainer}>
                <Typography variant="overline">Приближение</Typography>

                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  classes={{ root: classes.slider }}
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </div>

              <div className={classes.sliderContainer}>
                <Typography variant="overline">Поворот</Typography>

                <Slider
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  aria-labelledby="Rotation"
                  classes={{ root: classes.slider }}
                  onChange={(e, rotation) => setRotation(rotation)}
                />
              </div>

              <Button
                onClick={processImage}
                variant="contained"
                color="primary"
                classes={{ root: classes.cropButton }}
              >
                Сгенерировать
              </Button>
            </div>

            <ImgDialog img={croppedImage} onClose={onClose} />
          </Fragment>
        ) : (
          <div className="flex items-center justify-center">
            <label
              htmlFor="file-upload"
              className="flex w-full max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-9 pb-10 hover:cursor-pointer hover:border-gray-500"
            >
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className="text-sm text-gray-600">Загрузите изображение</p>
                <p className="text-xs text-gray-500">PNG, JPG, максимум 10MB</p>
              </div>

              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="sr-only"
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

const StyledDemo = withStyles(styles)(Demo);
export default StyledDemo;
