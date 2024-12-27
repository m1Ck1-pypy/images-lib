declare module '*.svg';

declare module '*.png' {
  const src: string;
  export default src;
}
