-- Tables
CREATE TABLE IF NOT EXISTS public.posts (
    id bigint NOT NULL,
    title character varying(255),
    content character varying(255),
    image character varying(255),
    date timestamp without time zone default current_timestamp
);

ALTER TABLE public.posts OWNER TO postgres;

-- Add identity/sequence if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.sequences
        WHERE sequence_schema = 'public'
          AND sequence_name = 'posts_id_seq'
    ) THEN
        ALTER TABLE public.posts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
            SEQUENCE NAME public.posts_id_seq
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1
        );
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS public.users (
    id bigint NOT NULL,
    username character varying(255),
    password character varying(255)
);

ALTER TABLE public.users OWNER TO postgres;

-- Sequence for users
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.sequences
        WHERE sequence_schema = 'public'
          AND sequence_name = 'users_id_seq'
    ) THEN
        ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
            SEQUENCE NAME public.users_id_seq
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1
        );
    END IF;
END$$;

-- Primary keys
ALTER TABLE ONLY public.posts
    ADD CONSTRAINT IF NOT EXISTS posts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT IF NOT EXISTS users_pkey PRIMARY KEY (id);

-- Data insertion (users)
COPY public.users (id, username, password) FROM stdin;
1	anze	$2b$10$pFziCqR2SdVlDJJUDejsrOl4MViE76LSV8kCAIbv6Ws2Xw2oRybnC
2	anzedolenc	$2b$10$Y.zusx2YSlgV.2Kxz6ywDOsWJd3S36RXoJnLmWyI.UJaHPTTvNUk.
\.

-- Set sequences
SELECT pg_catalog.setval('public.posts_id_seq', 6, true);
SELECT pg_catalog.setval('public.users_id_seq', 2, true);
