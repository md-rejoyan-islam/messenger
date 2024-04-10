const isEmail = (email) => {
  const pattern = /^[^\.-/][a-z0-9-_\.]{1,}@[a-z0-9-]{1,}\.[a-z\.]{2,}$/;
  return pattern.test(email);
};

export default isEmail;
