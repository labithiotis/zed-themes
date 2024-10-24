ALTER TABLE `themes` ADD `installCount` integer DEFAULT 0;--> statement-breakpoint
CREATE INDEX `installCountIdx` ON `themes` (`installCount`);