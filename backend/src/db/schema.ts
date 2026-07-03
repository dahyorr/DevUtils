import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const hashTypeEnum = pgEnum('HashType', ['md5', 'sha256', 'sha512', 'sha224']);
export const hashStatusEnum = pgEnum('HashStatus', ['pending', 'completed', 'failed']);

export const files = pgTable('File', {
  id: text('id').primaryKey(),
  filename: text('filename').notNull(),
  key: text('key').notNull(),
  size: integer('size').notNull(),
  mimetype: text('mimetype').notNull(),
  createdAt: timestamp('created_at', { precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { precision: 3 }).notNull(),
});

export const hashes = pgTable('Hash', {
  id: text('id').primaryKey(),
  type: hashTypeEnum('type').notNull(),
  fileId: text('file_id').notNull().references(() => files.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  hash: text('hash'),
  createdAt: timestamp('created_at', { precision: 3 }).notNull().defaultNow(),
  status: hashStatusEnum('status').notNull().default('pending'),
});

export const filesRelations = relations(files, ({ many }) => ({
  hashes: many(hashes),
}));

export const hashesRelations = relations(hashes, ({ one }) => ({
  file: one(files, { fields: [hashes.fileId], references: [files.id] }),
}));
