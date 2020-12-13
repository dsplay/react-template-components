import React from 'react';
import './GridGallery.sass';
interface InputImage {
    src: string;
    width: number;
    height: number;
}
interface GridGalleryProps {
    images: Array<InputImage | string>;
    margin: number;
    containerClassName: string;
    imageClassName: string;
}
export declare const GridGallery: React.FC<GridGalleryProps>;
export {};
