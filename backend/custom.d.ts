// custom.d.ts (or you can name it something else like 'express.d.ts')
import { DecodedIdToken } from 'firebase-admin/auth'; // Import the correct type from Firebase Admin SDK

declare global {
  namespace Express {
    interface Request {
      user?: DecodedIdToken;  // Add the user property here
    }
  }
}
