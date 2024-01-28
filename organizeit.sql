--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 16.1

-- Started on 2024-01-28 16:19:11

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16399)
-- Name: todos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.todos (
    id character varying(255) NOT NULL,
    user_email character varying(255),
    title character varying(30),
    progress integer,
    date character varying(300)
);


ALTER TABLE public.todos OWNER TO postgres;

--
-- TOC entry 3316 (class 0 OID 16399)
-- Dependencies: 214
-- Data for Name: todos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.todos VALUES ('0', 'iva@gmail.com', 'Clean room', 20, '30-01-2024');
INSERT INTO public.todos VALUES ('1', 'jana@gmail.com', 'Do the dishes', 60, '20-02-2024');


--
-- TOC entry 3173 (class 2606 OID 16405)
-- Name: todos todos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (id);


-- Completed on 2024-01-28 16:19:12

--
-- PostgreSQL database dump complete
--

