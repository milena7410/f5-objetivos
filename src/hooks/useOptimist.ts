import * as React from "react";

const useOptimist = <T>(value: T, cb: (value: T) => Promise<any>) => {
  const [optimist, setOptimist] = React.useState<T | null>(null);

  const handleChange = async (newValue: T) => {
    setOptimist(newValue);
    return cb(newValue).finally(() => {
      setOptimist(null);
    });
  };
  const result: [T, typeof handleChange] = [optimist ?? value, handleChange];
  return result;
};

export { useOptimist };
