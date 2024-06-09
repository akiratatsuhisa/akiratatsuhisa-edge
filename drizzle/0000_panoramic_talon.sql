CREATE TABLE `contacts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`message` text NOT NULL,
	`isCancelled` integer DEFAULT false NOT NULL,
	`ipAddress` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `projectLocalizations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`projectId` integer,
	`languageCode` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`client` text,
	`website` text,
	`source` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sort` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'initialize' NOT NULL,
	`isPublished` integer DEFAULT false NOT NULL,
	`startDate` integer,
	`endDate` integer,
	`thumbSrc` text,
	`imageSrcs` text DEFAULT '[]' NOT NULL,
	`languages` text DEFAULT '[]' NOT NULL,
	`frameworks` text DEFAULT '[]' NOT NULL,
	`databases` text DEFAULT '[]' NOT NULL,
	`technologies` text DEFAULT '[]' NOT NULL,
	`others` text DEFAULT '[]' NOT NULL,
	`views` integer DEFAULT 0 NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `projectLocalizations_slug_languageCode_unique` ON `projectLocalizations` (`slug`,`languageCode`);--> statement-breakpoint
CREATE UNIQUE INDEX `projectLocalizations_projectId_languageCode_unique` ON `projectLocalizations` (`projectId`,`languageCode`);