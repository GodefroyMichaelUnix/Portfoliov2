import { relations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Define the 'users' table.
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  supabaseId: text('supabase_id').notNull().unique(), // Supabase Auth UUID
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Example table for automation workflows requested by user
export const workflows = pgTable('workflows', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});
