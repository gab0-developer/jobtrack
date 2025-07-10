// src/types/express.d.ts
import { User } from "../models/auth"; // Ajusta la ruta según tu estructura

declare global {
  namespace Express {
    interface Request {
      user_id?: number;  // El mismo tipo que el ID en tu modelo User
    }
  }
}