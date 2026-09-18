import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase client for backend verification
// Note: You will need to provide SUPABASE_URL and SUPABASE_ANON_KEY in your environment variables
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient(supabaseUrl, supabaseKey);

export interface AuthRequest extends Request {
  user?: any; // To be typed properly with Supabase User type
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing token' });
    return;
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    // Verify the JWT token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      throw error;
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Error verifying Supabase token:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
    return;
  }
};
