CREATE TABLE "Roles" (
	role VARCHAR(10) NOT NULL PRIMARY KEY
);

CREATE TABLE "Users" (
    id uuid NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hash VARCHAR(255) NOT NULL,
    role VARCHAR(10),
	FOREIGN KEY (role) REFERENCES "Roles"(role)
);

CREATE TABLE "Logins" (
	jti uuid NOT NULL PRIMARY KEY,
	refresh boolean NOT NULL DEFAULT false,
	access_parent uuid,
	id uuid NOT NULL,
	FOREIGN KEY (access_parent) REFERENCES "Logins"(jti),
	FOREIGN KEY (id) REFERENCES "Users"(id)
);

CREATE TABLE "Rooms" (
	room int NOT NULL PRIMARY KEY
);

CREATE TABLE "Course_Types" (
	type VARCHAR(4) NOT NULL PRIMARY KEY
);

CREATE TABLE "Days_Schedules" (
	combi VARCHAR(20) NOT NULL PRIMARY KEY,
	mon boolean DEFAULT false,
	tue boolean DEFAULT false,
	wed boolean DEFAULT false,
	thu boolean DEFAULT false,
	fri boolean DEFAULT false,
	sat_o boolean DEFAULT false,
	sat_e boolean DEFAULT false,
	sun boolean DEFAULT false
);

CREATE TABLE "AdHocs" (
	num SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	starts TIMESTAMP NOT NULL,
	ends TIMESTAMP NOT NULL,
	purpose TEXT,
	active boolean DEFAULT true,
	room int NOT NULL,
	id uuid NOT NULL,
	FOREIGN KEY (room) REFERENCES "Rooms"(room),
	FOREIGN KEY (id) REFERENCES "Users"(id)
);

CREATE TABLE "Cohorts" (
	name VARCHAR(20) NOT NULL PRIMARY KEY,
	active boolean DEFAULT true,
	starts TIMESTAMP NOT NULL,
	ends TIMESTAMP NOT NULL,
	course_type VARCHAR(4) NOT NULL,
	schedule VARCHAR(8) NOT NULL,
	room int NOT NULL,
	FOREIGN KEY (course_type) REFERENCES "Course_Types"(type),
	FOREIGN KEY (schedule) REFERENCES "Days_Schedules"(combi),
	FOREIGN KEY (room) REFERENCES "Rooms"(room)
);

