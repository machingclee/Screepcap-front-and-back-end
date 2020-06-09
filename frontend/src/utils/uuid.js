function uuid() {
  const date = new Date().getTime();
  return (date + Math.random().toString()).replace(".", "");
}

export default uuid;
