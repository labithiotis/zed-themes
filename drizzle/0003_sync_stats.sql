CREATE TABLE `sync_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`syncedAt` integer NOT NULL,
	`themesCount` integer NOT NULL,
	`extensionsCount` integer NOT NULL,
	`durationMs` integer,
	`status` text NOT NULL,
	`errorMessage` text
);
