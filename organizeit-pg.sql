toc.dat                                                                                             0000600 0004000 0002000 00000003101 14555473224 0014445 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP       -                 |         
   organizeit    15.5    16.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         �           1262    16398 
   organizeit    DATABASE     �   CREATE DATABASE organizeit WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Serbian (Latin)_Serbia.1252';
    DROP DATABASE organizeit;
                postgres    false         �            1259    16399    todos    TABLE     �   CREATE TABLE public.todos (
    id character varying(255) NOT NULL,
    user_email character varying(255),
    title character varying(30),
    progress integer,
    date character varying(300)
);
    DROP TABLE public.todos;
       public         heap    postgres    false         �          0    16399    todos 
   TABLE DATA                 public          postgres    false    214       3316.dat e           2606    16405    todos todos_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.todos DROP CONSTRAINT todos_pkey;
       public            postgres    false    214                                                                                                                                                                                                                                                                                                                                                                                                                                                                       3316.dat                                                                                            0000600 0004000 0002000 00000000266 14555473224 0014265 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        INSERT INTO public.todos VALUES ('0', 'iva@gmail.com', 'Clean room', 20, '30-01-2024');
INSERT INTO public.todos VALUES ('1', 'jana@gmail.com', 'Do the dishes', 60, '20-02-2024');


                                                                                                                                                                                                                                                                                                                                          restore.sql                                                                                         0000600 0004000 0002000 00000003622 14555473224 0015402 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 16.1

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

DROP DATABASE organizeit;
--
-- Name: organizeit; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE organizeit WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Serbian (Latin)_Serbia.1252';


ALTER DATABASE organizeit OWNER TO postgres;

\connect organizeit

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
-- Data for Name: todos; Type: TABLE DATA; Schema: public; Owner: postgres
--

\i $$PATH$$/3316.dat

--
-- Name: todos todos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              