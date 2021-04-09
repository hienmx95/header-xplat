import React from 'react';

const Folder = props => (
  <svg width={32} height={32} viewBox="0 0 32 32" {...props}>
    <defs>
      <linearGradient
        id="a"
        y1={0.5}
        x2={1}
        y2={0.5}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#d31d00" />
        <stop offset={1} stopColor="#fa7522" />
      </linearGradient>
    </defs>
    <g data-name="Group 4205" transform="translate(-264 -76)">
      <circle
        data-name="Ellipse 32"
        cx={16}
        cy={16}
        r={16}
        transform="translate(264 76)"
        fill="url(#a)"
      />
      <g data-name="Group 97 Copy" transform="translate(272 84)">
        <path data-name="Rectangle 38" fill="none" d="M0 0H16V16H0z" />
        <g data-name="Group 96">
          <path
            data-name="Rectangle 38 Copy"
            transform="translate(.014)"
            fill="none"
            d="M0 0H15.984V15.984H0z"
          />
          <path
            d="M13.426 13.359H1.013a.011.011 0 00-.008 0 1.089 1.089 0 01-.507-.19l-.011-.008-.028-.021H.453l-.021-.018-.017-.022-.009-.007-.006-.007-.019-.016-.022-.02-.014-.014a1.142 1.142 0 01-.281-.453l-.016-.052v-.083a.021.021 0 010-.006v-.007-.021-.028-.006A1.2 1.2 0 010 12.211V1.156A1.142 1.142 0 011.124 0h5.049a1.124 1.124 0 011.071.8l.39 1.251h6.229a1.142 1.142 0 011.125 1.156v1.939a1.119 1.119 0 01.8.49 1.18 1.18 0 01.169.937l-1.436 5.91a1.132 1.132 0 01-1.095.876zM2.561 6.3l-1.437 5.91h12.3l1.438-5.91zM1.124 1.156v6.285l.345-1.426a1.132 1.132 0 011.092-.875h11.3V3.212H6.813L6.17 1.156z"
            fill="#fff"
            transform="translate(0 1.311)"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default Folder;
