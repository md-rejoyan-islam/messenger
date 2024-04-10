const isBdMobile = (mobile) => {
  const pattern = /^(\+)?(88)?01[0-9]{9}$/;
  return pattern.test(mobile);
};

export default isBdMobile;