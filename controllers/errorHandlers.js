export const onError = (err, req, res, next) => {
  res.status(500).end(err.toString());
  // OR: you may want to continue
  //   next();
};

export const onNoMatch = (req, res) => {
  // Handle any other HTTP method
  res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
};
