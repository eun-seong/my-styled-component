import React from 'react';
// import tags from './tags';

const makeRandomClassName = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `css-${result}`;
};

const makeInnerCssText = <T extends unknown>(
  className: string,
  strs: TemplateStringsArray,
  vars: ((props: T) => string | number)[],
  props: any
) =>
  `.${className} {${strs.reduce((acc, str, idx) => {
    return vars[idx] ? acc + str + vars[idx](props) : acc + str;
  }, '')}}`;

const createElement = <T extends unknown>(
  tag: string,
  strs: TemplateStringsArray,
  vars: ((props: T) => string | number)[]
) => {
  return (props: any) => {
    const style = document.createElement('style');
    const className = makeRandomClassName();
    const css = makeInnerCssText(className, strs, vars, props);

    style.innerText = css.replace(/\s\n/g, '');
    document.head.appendChild(style);

    return React.createElement(
      tag,
      {
        onMouseEnter: props.onMouseEnter,
        onMouseLeave: props.onMouseLeave,
        onMouseMove: props.onMouseMove,
        src: props.src,
        alt: props.alt,
        className,
      },
      props.children
    );
  };
};

const passLiterals = <T extends unknown>(
  type: string,
  strs: TemplateStringsArray,
  vars: ((props: T) => string | number)[]
) => createElement(type, strs, vars);

const styled = {
  div: <T extends unknown>(strs: TemplateStringsArray, ...vars: ((props: T) => string | number)[]) =>
    passLiterals('div', strs, vars),
  img: <T extends unknown>(strs: TemplateStringsArray, ...vars: ((props: T) => string | number)[]) =>
    passLiterals('img', strs, vars),
};

export default styled;

