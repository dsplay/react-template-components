import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './GridGallery.sass';

interface InputImage {
  src: string
  width: number
  height: number
}

interface Image extends InputImage {
  id: string
  marginTop: number
  marginBottom: number
  marginLeft: number
  marginRight: number
}

interface GridGalleryProps {
  images: Array<InputImage | string>
  margin: number
  containerClassName: string
  imageClassName: string
}

function makeId (length = 16): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function convertImages (images: Array<InputImage | string>): Promise<InputImage[]> {
  return await Promise.all(images.map(async (imageOrSrc): Promise<InputImage> => {
    if (typeof imageOrSrc === 'string') {
      return await new Promise<InputImage>((resolve, reject) => {
        const image = new Image();
        image.src = imageOrSrc;
        image.onload = (e) => {
          if (e.target instanceof HTMLImageElement) {
            const img = e.target;
            const {
              src,
              width,
              height,
            } = img;

            resolve({
              src,
              width,
              height,
            });
          } else {
            reject(new Error('invalid event type'));
          }
        };

        image.onerror = (e) => {
          reject(e);
        };
      });
    }

    return Promise.resolve(imageOrSrc);
  }));
}

/* eslint-disable no-console */
export const GridGallery: React.FC<GridGalleryProps> = ({
  images,
  margin = 2,
  containerClassName = '',
  imageClassName = '',
}) => {
  const [containerWidth, setContainerWidth] = useState<number>();
  const [containerHeight, setContainerHeight] = useState<number>();
  const [convertedImages, setProcessedImages] = useState<InputImage[]>();
  const element = useRef<HTMLDivElement>(null);

  useEffect((): void => {
    (async (): Promise<void> => {
      const processed = await convertImages(images);
      // console.log('converted', processed);
      setProcessedImages(processed);
    })();
  }, [images]);

  useEffect(() => {
    if (element.current !== null) {
      console.log('element:', element.current?.offsetWidth, element.current.offsetHeight);
      setContainerWidth(element.current.offsetWidth);
      setContainerHeight(element.current.offsetHeight);
    }
  }, []);

  const finalImages: Image[] | undefined = useMemo(() => {
    if (containerWidth === undefined || containerHeight === undefined || convertedImages === undefined) return undefined;

    const maxRatio = 0.5;
    const unit = Math.sqrt((containerWidth * containerHeight) / convertedImages.length);
    console.log('unit', unit);

    const rowCount = Math.min(Math.round(containerHeight / unit), convertedImages.length);
    console.log('rowCount', rowCount);
    const maxColumnCount = Math.ceil(convertedImages.length / rowCount);
    const minColumnCount = Math.floor(convertedImages.length / rowCount);
    console.log('max col count', maxColumnCount);
    const rowHeight = Math.floor((containerHeight - ((rowCount + 1) * margin)) / rowCount);
    console.log('rowHeight', rowHeight);

    let currentRowWidths: Image[] = [];
    let finalData: Image[] = [];
    let currentRowTotalWidth = margin;
    let currentRowCount = 1;
    const maxWidth = Math.floor(rowHeight * (1 + maxRatio));
    const minWidth = Math.floor(rowHeight * (1 - maxRatio));
    console.log('minWidth', minWidth, 'maxWidth', maxWidth);

    function finishRow (row: Image[]): Image[] {
      if (containerWidth === undefined) return [];
      // console.log('resizing current row', row);
      const currentSum = row.reduce((sum, { width: colWidth }) => sum + colWidth, 0);
      // console.log('currentSum', currentSum);
      const colCount = row.length;
      const availableWidth = containerWidth - (colCount * margin) - margin;
      // console.log('availableWidth', availableWidth);
      const resized = row.map(({ width: colWidth, ...image }) => ({
        ...image,
        width: Math.min(Math.floor((colWidth / currentSum) * availableWidth), containerWidth - 2 * margin),
      }));
      const resizedSum = resized.reduce((sum, { width: colWidth }) => sum + colWidth, 0);
      // console.log('resizedSum', resizedSum);
      // console.log('resized', resized);

      const remainingItemSpace = availableWidth - (resizedSum);
      // console.log('remainingItemSpace', remainingItemSpace)
      const [lastItem] = resized.slice(-1);

      const result = [
        ...resized.slice(0, -1),
        {
          ...lastItem,
          width: lastItem.width + remainingItemSpace,
        },
      ];

      // console.log('result', result);

      return result;
    }

    convertedImages.forEach((image, i) => {
      // console.log('current row', currentRowCount);
      let w = Math.floor((image.width * rowHeight) / image.height);
      w = Math.max(w, minWidth);
      w = Math.min(w, maxWidth);
      // console.log('width', w);
      currentRowWidths.push({
        src: image.src,
        height: rowHeight,
        width: w,
        marginTop: currentRowCount === 1 ? margin : 0,
        marginBottom: margin,
        marginLeft: currentRowWidths.length === 0 ? margin : 0,
        marginRight: margin,
        id: makeId(),
      });
      currentRowTotalWidth += w + margin;
      const remainingSpace = containerWidth - currentRowTotalWidth;
      // console.log('remainingSpace', remainingSpace - margin);
      const rowWidthReached = remainingSpace - margin < minWidth;
      const minColumnCountSatisfied = currentRowWidths.length >= minColumnCount;
      const maxColumnCountReached = currentRowWidths.length === maxColumnCount;
      const noRowSpace = rowWidthReached && minColumnCountSatisfied;
      // const isLastRow = currentRowCount === rowCount;
      const itemsToProcess = convertedImages.length - (i + 1);
      const remainingRows = rowCount - currentRowCount;
      const enoughItemsForNextRows = itemsToProcess > remainingRows;
      const enoughRowsForNextItems = itemsToProcess / maxColumnCount < remainingRows;
      // console.log('enoughRowsForNextItems', enoughRowsForNextItems);
      const widthOrColumnCountReached = noRowSpace || maxColumnCountReached;
      const shouldBreakLine = enoughRowsForNextItems && widthOrColumnCountReached;
      if (!enoughItemsForNextRows || shouldBreakLine) {
        finalData = [
          ...finalData,
          ...finishRow(currentRowWidths),
        ];
        currentRowWidths = [];
        currentRowTotalWidth = margin;
        currentRowCount += 1;
      }
    });

    if (currentRowWidths.length > 0) {
      finalData = [
        ...finalData,
        ...finishRow(currentRowWidths),
      ];
    }

    return finalData;
  }, [containerWidth, containerHeight, convertedImages, margin]);

  if (finalImages === undefined) {
    return (
      <div
        className={`${containerClassName}`}
        ref={element}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    );
  }

  return (
    <div
      className={`grid-gallery ${containerClassName}`}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {
        finalImages.map((image) => (
          <div
            key={image.id}
            className={`${imageClassName} gallery-item`}
            style={{
              ...image,
              backgroundImage: `url('${image.src}')`,
            }}
          />
        ))
      }
    </div>
  );
};
