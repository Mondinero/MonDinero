const counter = () => {
  let counter = 11111;
  return () => {
    return counter++;
  };
};

export const uid = counter();
