import crypto from 'node:crypto';

export const sendErr = (res: any, error: any, status = 400) => {
  res.status(status).json({ error });
};

export const generateRandomBytes = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(50, (err, buff) => {
      if (err) reject(err);
      resolve(buff.toString('hex'));
    });
  });
};

// @ts-ignore
export const parseActorData = (req, res, next) => {
  const actorInfo = JSON.parse(req.body.actorInfo);
  req.body.name = actorInfo.name;
  req.body.gender = actorInfo.gender;
  req.body.about = actorInfo.about;
  next();
};

// @ts-ignore
export const parseMovieData = (req, res, next) => {
  console.log('req.body:', req.body);
  // const movieTitle = JSON.parse(req.body.movieTitle);
  // req.body.movieId = movieTitle.id;

  // req.body.name = actorInfo.name;
  // req.body.gender = actorInfo.gender;
  // req.body.about = actorInfo.about;
  next();
};

export const formateActor = (actor: any) => {
  const { name, gender, _id, avatar } = actor;
  return {
    id: _id,
    name,
    gender,
    avatar: avatar?.name,
  };
};

export const formatMovie = (movie: any) => {
  const { title, _id } = movie;
  return {
    id: _id,
    title,
  };
};

export const handleNotFound = (req: any, res: any) => {
  sendErr(res, 'Not Found!', 404);
};
