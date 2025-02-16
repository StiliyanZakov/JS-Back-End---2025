import jwt from 'jsonwebtoken';
 

const SECRET = process.env.JWT_SECRET || 'BASIC_SECRET';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth-cookie'];

    if (!token) {
        return next();
    }
    
  try {
    const decodedToken = jwt.verify(token, SECRET);

    req.user = decodedToken;
    res.locals.user = decodedToken;

    next();
  } catch (error) {
    res.clearCookie('auth-cookie');
    res.redirect('/auth/login');
  }
};

export const isAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/auth/login');
  }

  next();
}
