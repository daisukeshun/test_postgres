const errorHandler = (err, req, res, next) => {
  //по-хорошему, не использовать консоль, так как в node она довольно медленная, но пока оставлю так
  console.error(err);
  res.status(400).json({ error: err.message });
};
export default errorHandler;
