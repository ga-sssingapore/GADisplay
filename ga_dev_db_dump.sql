--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-06-10 16:53:51

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3398 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 16709)
-- Name: AdHocs; Type: TABLE; Schema: public; Owner: ga_admin
--

CREATE TABLE public."AdHocs" (
    num integer NOT NULL,
    name character varying(100) NOT NULL,
    starts timestamp with time zone NOT NULL,
    ends timestamp with time zone NOT NULL,
    purpose character varying(30),
    active boolean DEFAULT true,
    room integer NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE public."AdHocs" OWNER TO ga_admin;

--
-- TOC entry 222 (class 1259 OID 16708)
-- Name: AdHocs_num_seq; Type: SEQUENCE; Schema: public; Owner: ga_admin
--

CREATE SEQUENCE public."AdHocs_num_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."AdHocs_num_seq" OWNER TO ga_admin;

--
-- TOC entry 3400 (class 0 OID 0)
-- Dependencies: 222
-- Name: AdHocs_num_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ga_admin
--

ALTER SEQUENCE public."AdHocs_num_seq" OWNED BY public."AdHocs".num;


--
-- TOC entry 221 (class 1259 OID 16638)
-- Name: Cohorts; Type: TABLE; Schema: public; Owner: ga_admin
--

CREATE TABLE public."Cohorts" (
    name character varying(20) NOT NULL,
    active boolean DEFAULT true,
    starts timestamp with time zone NOT NULL,
    ends timestamp with time zone NOT NULL,
    course_type character varying(4) NOT NULL,
    schedule character varying(20) NOT NULL,
    room integer NOT NULL
);


ALTER TABLE public."Cohorts" OWNER TO ga_admin;

--
-- TOC entry 219 (class 1259 OID 16565)
-- Name: Course_Types; Type: TABLE; Schema: public; Owner: ga_admin
--

CREATE TABLE public."Course_Types" (
    type character varying(4) NOT NULL
);


ALTER TABLE public."Course_Types" OWNER TO ga_admin;

--
-- TOC entry 220 (class 1259 OID 16625)
-- Name: Days_Schedules; Type: TABLE; Schema: public; Owner: ga_admin
--

CREATE TABLE public."Days_Schedules" (
    combi character varying(20) NOT NULL,
    mon boolean DEFAULT false,
    tue boolean DEFAULT false,
    wed boolean DEFAULT false,
    thu boolean DEFAULT false,
    fri boolean DEFAULT false,
    sat_o boolean DEFAULT false,
    sat_e boolean DEFAULT false,
    sun boolean DEFAULT false
);


ALTER TABLE public."Days_Schedules" OWNER TO ga_admin;

--
-- TOC entry 217 (class 1259 OID 16544)
-- Name: Logins; Type: TABLE; Schema: public; Owner: ga_admin
--

CREATE TABLE public."Logins" (
    jti uuid NOT NULL,
    refresh boolean DEFAULT false NOT NULL,
    access_parent uuid,
    id uuid NOT NULL
);


ALTER TABLE public."Logins" OWNER TO ga_admin;

--
-- TOC entry 215 (class 1259 OID 16525)
-- Name: Roles; Type: TABLE; Schema: public; Owner: ga_admin
--

CREATE TABLE public."Roles" (
    role character varying(10) NOT NULL
);


ALTER TABLE public."Roles" OWNER TO ga_admin;

--
-- TOC entry 218 (class 1259 OID 16560)
-- Name: Rooms; Type: TABLE; Schema: public; Owner: ga_admin
--

CREATE TABLE public."Rooms" (
    room integer NOT NULL
);


ALTER TABLE public."Rooms" OWNER TO ga_admin;

--
-- TOC entry 216 (class 1259 OID 16530)
-- Name: Users; Type: TABLE; Schema: public; Owner: ga_admin
--

CREATE TABLE public."Users" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    hash character varying(255) NOT NULL,
    role character varying(10)
);


ALTER TABLE public."Users" OWNER TO ga_admin;

--
-- TOC entry 3223 (class 2604 OID 16712)
-- Name: AdHocs num; Type: DEFAULT; Schema: public; Owner: ga_admin
--

ALTER TABLE ONLY public."AdHocs" ALTER COLUMN num SET DEFAULT nextval('public."AdHocs_num_seq"'::regclass);


--
-- TOC entry 3242 (class 2606 OID 16715)
-- Name: AdHocs AdHocs_pkey; Type: CONSTRAINT; Schema: public; Owner: ga_admin
--

ALTER TABLE ONLY public."AdHocs"
    ADD CONSTRAINT "AdHocs_pkey" PRIMARY KEY (num);


--
-- TOC entry 3240 (class 2606 OID 16643)
-- Name: Cohorts Cohorts_pkey; Type: CONSTRAINT; Schema: public; Owner: ga_admin
--

ALTER TABLE ONLY public."Cohorts"
    ADD CONSTRAINT "Cohorts_pkey" PRIMARY KEY (name);


--
-- TOC entry 3236 (class 2606 OID 16569)
-- Name: Course_Types Course_Types_pkey; Type: CONSTRAINT; Schema: public; Owner: ga_admin
--

ALTER TABLE ONLY public."Course_Types"
    ADD CONSTRAINT "Course_Types_pkey" PRIMARY KEY (type);


--
-- TOC entry 3238 (class 2606 OID 16637)
-- Name: Days_Schedules Days_Schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: ga_admin
--

ALTER TABLE ONLY public."Days_Schedules"
    ADD CONSTRAINT "Days_Schedules_pkey" PRIMARY KEY (combi);


--
-- TOC entry 3232 (class 2606 OID 16549)
-- Name: Logins Logins_pkey; Type: CONSTRAINT; Schema: public; Owner: ga_admin
--

ALTER TABLE ONLY public."Logins"
    ADD CONSTRAINT "Logins_pkey" PRIMARY KEY (jti);


--
-- TOC entry 3226 (class 2606 OID 16529)
-- Name: Roles Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: ga_admin
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (role);


--
-- TOC entry 3234 (class 2606 OID 16564)
-- Name: Rooms Rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: ga_admin
--

ALTER TABLE ONLY public."Rooms"
    ADD CONSTRAINT "Rooms_pkey" PRIMARY KEY (room);


--
-- TOC entry 3228 (class 2606 OID 16538)
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: ga_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- TOC entry 3230 (class 2606 OID 16536)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: ga_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 3249 (class 2606 OID 16721)
-- Name: AdHocs AdHocs_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ga_admin
--

ALTER TABLE ONLY public."AdHocs"
    ADD CONSTRAINT "AdHocs_id_fkey" FOREIGN KEY (id) REFERENCES public."Users"(id);


--
-- TOC entry 3250 (class 2606 OID 16716)
-- Name: AdHocs AdHocs_room_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ga_admin
--

ALTER TABLE ONLY public."AdHocs"
    ADD CONSTRAINT "AdHocs_room_fkey" FOREIGN KEY (room) REFERENCES public."Rooms"(room);


--
-- TOC entry 3246 (class 2606 OID 16644)
-- Name: Cohorts Cohorts_course_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ga_admin
--

ALTER TABLE ONLY public."Cohorts"
    ADD CONSTRAINT "Cohorts_course_type_fkey" FOREIGN KEY (course_type) REFERENCES public."Course_Types"(type);


--
-- TOC entry 3247 (class 2606 OID 16654)
-- Name: Cohorts Cohorts_room_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ga_admin
--

ALTER TABLE ONLY public."Cohorts"
    ADD CONSTRAINT "Cohorts_room_fkey" FOREIGN KEY (room) REFERENCES public."Rooms"(room);


--
-- TOC entry 3248 (class 2606 OID 16671)
-- Name: Cohorts Cohorts_schedule_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ga_admin
--

ALTER TABLE ONLY public."Cohorts"
    ADD CONSTRAINT "Cohorts_schedule_fkey" FOREIGN KEY (schedule) REFERENCES public."Days_Schedules"(combi);


--
-- TOC entry 3244 (class 2606 OID 16550)
-- Name: Logins Logins_access_parent_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ga_admin
--

ALTER TABLE ONLY public."Logins"
    ADD CONSTRAINT "Logins_access_parent_fkey" FOREIGN KEY (access_parent) REFERENCES public."Logins"(jti);


--
-- TOC entry 3245 (class 2606 OID 16555)
-- Name: Logins Logins_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ga_admin
--

ALTER TABLE ONLY public."Logins"
    ADD CONSTRAINT "Logins_id_fkey" FOREIGN KEY (id) REFERENCES public."Users"(id);


--
-- TOC entry 3243 (class 2606 OID 16539)
-- Name: Users Users_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ga_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_role_fkey" FOREIGN KEY (role) REFERENCES public."Roles"(role);


--
-- TOC entry 3399 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO ga_admin;


-- Completed on 2023-06-10 16:53:51

--
-- PostgreSQL database dump complete
--

