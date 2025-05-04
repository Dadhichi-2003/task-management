import { admin } from "../firebase/firebase.ts";
import { NextFunction, Request, Response } from "express";

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Allow preflight CORS requests
  }

  try {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: "Token is missing or invalid"
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = decodedToken;

    next();
  } catch (error: any) {
    return res.status(500).json({
      message: "Token verification failed",
      error: error.message
    });
  }
};
