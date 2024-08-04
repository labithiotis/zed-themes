CREATE TABLE `themes` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`author` text NOT NULL,
	`updatedDate` integer NOT NULL,
	`versionHash` text NOT NULL,
	`bundled` integer NOT NULL,
	`userId` text,
	`theme` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idIdx` ON `themes` (`id`);--> statement-breakpoint
CREATE INDEX `nameIdx` ON `themes` (`name`);--> statement-breakpoint
CREATE INDEX `authorIdx` ON `themes` (`author`);--> statement-breakpoint
CREATE INDEX `updatedDateIdx` ON `themes` (`updatedDate`);--> statement-breakpoint
CREATE INDEX `bundledIdx` ON `themes` (`bundled`);--> statement-breakpoint
CREATE INDEX `userIdIdx` ON `themes` (`userId`);