// Type declarations for modules without types
declare module 'react-helmet' {
  import { ComponentType } from 'react';
  interface HelmetProps {
    base?: Record<string, string>;
    defaultTitle?: string;
    defer?: boolean;
    encodeSpecialCharacters?: boolean;
    onChangeClientState?: (c: unknown, s: unknown, t: unknown) => void;
    title?: string;
    titleTemplate?: string;
    children?: import('react').ReactNode;
    meta?: Array<{ charset?: string; content?: string; 'http-equiv'?: string; name?: string; property?: string; [key: string]: string | undefined }>;
    link?: Array<{ charset?: string; crossOrigin?: string; href?: string; hrefLang?: string; media?: string; rel?: string; rev?: string; sizes?: string; type?: string; [key: string]: string | undefined }>;
    script?: Array<{ type?: string; src?: string; async?: boolean; defer?: boolean; [key: string]: string | undefined }>;
    style?: Array<{ cssText?: string; [key: string]: string | undefined }>;
  }
  export const Helmet: ComponentType<HelmetProps>;
  export const peek: () => unknown;
  export const renderStatic: () => string;
}

declare module 'react-custom-scrollbars' {
  import { ComponentType, ReactNode, Ref } from 'react';

  export interface ScrollbarProps {
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    autoHide?: boolean;
    autoHideTimeout?: number;
    autoHideDuration?: number;
  }

  export interface ScrollbarValues {
    scrollLeft: number;
    scrollTop: number;
    scrollWidth: number;
    scrollHeight: number;
    clientWidth: number;
    clientHeight: number;
    left: number;
    top: number;
  }

  export const Scrollbars: ComponentType<ScrollbarProps>;
}
