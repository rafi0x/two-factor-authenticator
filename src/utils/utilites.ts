const otpGen = (strlength: number): number => {
  const newlngth = strlength > 0 ? strlength : false;
  let output: string = "";
  if (newlngth) {
    const numberStorage = "9183726450";

    for (let i = 1; i <= newlngth; i += 1) {
      output += numberStorage.charAt(Math.floor(Math.random() * newlngth));
    }
  }
  let code: number = output ? parseInt(output) : 0;
  return code;
};

const removeArrayItem = (arr: Array<any>, value: any): Array<any> => {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

export default { otpGen, removeArrayItem };
