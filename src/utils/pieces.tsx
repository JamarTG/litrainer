export const Bishop = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">
      <path
        fill="#7f7f7f"
        stroke="#7f7f7f"
        d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.94 3-2 3-2zm6-4c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2zM25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"
      />
    </svg>
  );
};

export const Knight = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">
      <g
        fill="#7f7f7f"
        fillRule="evenodd"
        stroke="#7f7f7f"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" />
        <path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.04-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-1-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-2 2.5-3c1 0 1 3 1 3" />
      </g>
    </svg>
  );
};

export const Pawn = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">
      <path
        fill="#7f7f7f"
        stroke="#7f7f7f"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M22 9a4 4 0 0 0-3.22 6.38 6.48 6.48 0 0 0-.87 10.65c-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47a6.46 6.46 0 0 0-.87-10.65A4.01 4.01 0 0 0 22 9z"
      />
    </svg>
  );
};

export const Queen = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">
      <g fill="#7f7f7f" fillRule="evenodd" stroke="#7f7f7f" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M9 39h27v-3H9v3zm3.5-7 1.5-2.5h17l1.5 2.5h-20zm-.5 4v-4h21v4H12z" />
        <path strokeLinejoin="miter" d="M14 29.5v-13h17v13H14z" />
        <path d="M14 16.5 11 14h23l-3 2.5H14zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z" />
      </g>
    </svg>
  );
};

export const Rook = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">
      <g fill="#7f7f7f" fillRule="evenodd" stroke="#7f7f7f" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M9 39h27v-3H9v3zm3.5-7 1.5-2.5h17l1.5 2.5h-20zm-.5 4v-4h21v4H12z" />
        <path strokeLinejoin="miter" d="M14 29.5v-13h17v13H14z" />
        <path d="M14 16.5 11 14h23l-3 2.5H14zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z" />
      </g>
    </svg>
  );
};
