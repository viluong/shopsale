--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2 (Debian 13.2-1.pgdg100+1)
-- Dumped by pg_dump version 13.2 (Debian 13.2-1.pgdg100+1)

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
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: authentication_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authentication_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    email character varying(254) NOT NULL,
    is_google boolean NOT NULL
);


ALTER TABLE public.authentication_user OWNER TO postgres;

--
-- Name: authentication_user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authentication_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.authentication_user_groups OWNER TO postgres;

--
-- Name: authentication_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.authentication_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.authentication_user_groups_id_seq OWNER TO postgres;

--
-- Name: authentication_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.authentication_user_groups_id_seq OWNED BY public.authentication_user_groups.id;


--
-- Name: authentication_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.authentication_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.authentication_user_id_seq OWNER TO postgres;

--
-- Name: authentication_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.authentication_user_id_seq OWNED BY public.authentication_user.id;


--
-- Name: authentication_user_user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authentication_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.authentication_user_user_permissions OWNER TO postgres;

--
-- Name: authentication_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.authentication_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.authentication_user_user_permissions_id_seq OWNER TO postgres;

--
-- Name: authentication_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.authentication_user_user_permissions_id_seq OWNED BY public.authentication_user_user_permissions.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_celery_results_chordcounter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_celery_results_chordcounter (
    id integer NOT NULL,
    group_id character varying(255) NOT NULL,
    sub_tasks text NOT NULL,
    count integer NOT NULL,
    CONSTRAINT django_celery_results_chordcounter_count_check CHECK ((count >= 0))
);


ALTER TABLE public.django_celery_results_chordcounter OWNER TO postgres;

--
-- Name: django_celery_results_chordcounter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_celery_results_chordcounter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_celery_results_chordcounter_id_seq OWNER TO postgres;

--
-- Name: django_celery_results_chordcounter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_celery_results_chordcounter_id_seq OWNED BY public.django_celery_results_chordcounter.id;


--
-- Name: django_celery_results_taskresult; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_celery_results_taskresult (
    id integer NOT NULL,
    task_id character varying(255) NOT NULL,
    status character varying(50) NOT NULL,
    content_type character varying(128) NOT NULL,
    content_encoding character varying(64) NOT NULL,
    result text,
    date_done timestamp with time zone NOT NULL,
    traceback text,
    meta text,
    task_args text,
    task_kwargs text,
    task_name character varying(255),
    worker character varying(100),
    date_created timestamp with time zone NOT NULL
);


ALTER TABLE public.django_celery_results_taskresult OWNER TO postgres;

--
-- Name: django_celery_results_taskresult_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_celery_results_taskresult_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_celery_results_taskresult_id_seq OWNER TO postgres;

--
-- Name: django_celery_results_taskresult_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_celery_results_taskresult_id_seq OWNED BY public.django_celery_results_taskresult.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: shop_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shop_category (
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id uuid NOT NULL,
    name character varying(250) NOT NULL,
    image character varying(200),
    description text
);


ALTER TABLE public.shop_category OWNER TO postgres;

--
-- Name: shop_order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shop_order (
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id integer NOT NULL,
    ship_name character varying(100) NOT NULL,
    ship_email character varying(254),
    ship_phone character varying(100) NOT NULL,
    ship_address character varying(150) NOT NULL,
    ship_city character varying(100) NOT NULL,
    ship_district character varying(50) NOT NULL,
    payment_method character varying(10) NOT NULL,
    delivery_fee double precision NOT NULL,
    user_id integer
);


ALTER TABLE public.shop_order OWNER TO postgres;

--
-- Name: shop_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shop_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shop_order_id_seq OWNER TO postgres;

--
-- Name: shop_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shop_order_id_seq OWNED BY public.shop_order.id;


--
-- Name: shop_orderline; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shop_orderline (
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id uuid NOT NULL,
    price double precision NOT NULL,
    quantity integer NOT NULL,
    order_id integer NOT NULL,
    product_id uuid NOT NULL
);


ALTER TABLE public.shop_orderline OWNER TO postgres;

--
-- Name: shop_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shop_product (
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id uuid NOT NULL,
    name character varying(250) NOT NULL,
    image character varying(200),
    description text,
    price double precision NOT NULL,
    quantity integer NOT NULL,
    is_public boolean NOT NULL,
    category_id uuid NOT NULL
);


ALTER TABLE public.shop_product OWNER TO postgres;

--
-- Name: token_blacklist_blacklistedtoken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.token_blacklist_blacklistedtoken (
    id integer NOT NULL,
    blacklisted_at timestamp with time zone NOT NULL,
    token_id integer NOT NULL
);


ALTER TABLE public.token_blacklist_blacklistedtoken OWNER TO postgres;

--
-- Name: token_blacklist_blacklistedtoken_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.token_blacklist_blacklistedtoken_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.token_blacklist_blacklistedtoken_id_seq OWNER TO postgres;

--
-- Name: token_blacklist_blacklistedtoken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.token_blacklist_blacklistedtoken_id_seq OWNED BY public.token_blacklist_blacklistedtoken.id;


--
-- Name: token_blacklist_outstandingtoken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.token_blacklist_outstandingtoken (
    id integer NOT NULL,
    token text NOT NULL,
    created_at timestamp with time zone,
    expires_at timestamp with time zone NOT NULL,
    user_id integer,
    jti character varying(255) NOT NULL
);


ALTER TABLE public.token_blacklist_outstandingtoken OWNER TO postgres;

--
-- Name: token_blacklist_outstandingtoken_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.token_blacklist_outstandingtoken_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.token_blacklist_outstandingtoken_id_seq OWNER TO postgres;

--
-- Name: token_blacklist_outstandingtoken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.token_blacklist_outstandingtoken_id_seq OWNED BY public.token_blacklist_outstandingtoken.id;


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: authentication_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authentication_user ALTER COLUMN id SET DEFAULT nextval('public.authentication_user_id_seq'::regclass);


--
-- Name: authentication_user_groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authentication_user_groups ALTER COLUMN id SET DEFAULT nextval('public.authentication_user_groups_id_seq'::regclass);


--
-- Name: authentication_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authentication_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.authentication_user_user_permissions_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_celery_results_chordcounter id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_celery_results_chordcounter ALTER COLUMN id SET DEFAULT nextval('public.django_celery_results_chordcounter_id_seq'::regclass);


--
-- Name: django_celery_results_taskresult id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_celery_results_taskresult ALTER COLUMN id SET DEFAULT nextval('public.django_celery_results_taskresult_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: shop_order id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_order ALTER COLUMN id SET DEFAULT nextval('public.shop_order_id_seq'::regclass);


--
-- Name: token_blacklist_blacklistedtoken id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blacklist_blacklistedtoken ALTER COLUMN id SET DEFAULT nextval('public.token_blacklist_blacklistedtoken_id_seq'::regclass);


--
-- Name: token_blacklist_outstandingtoken id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blacklist_outstandingtoken ALTER COLUMN id SET DEFAULT nextval('public.token_blacklist_outstandingtoken_id_seq'::regclass);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add task result	6	add_taskresult
22	Can change task result	6	change_taskresult
23	Can delete task result	6	delete_taskresult
24	Can view task result	6	view_taskresult
25	Can add chord counter	7	add_chordcounter
26	Can change chord counter	7	change_chordcounter
27	Can delete chord counter	7	delete_chordcounter
28	Can view chord counter	7	view_chordcounter
29	Can add blacklisted token	8	add_blacklistedtoken
30	Can change blacklisted token	8	change_blacklistedtoken
31	Can delete blacklisted token	8	delete_blacklistedtoken
32	Can view blacklisted token	8	view_blacklistedtoken
33	Can add outstanding token	9	add_outstandingtoken
34	Can change outstanding token	9	change_outstandingtoken
35	Can delete outstanding token	9	delete_outstandingtoken
36	Can view outstanding token	9	view_outstandingtoken
37	Can add user	10	add_user
38	Can change user	10	change_user
39	Can delete user	10	delete_user
40	Can view user	10	view_user
41	Can add category	11	add_category
42	Can change category	11	change_category
43	Can delete category	11	delete_category
44	Can view category	11	view_category
45	Can add order	12	add_order
46	Can change order	12	change_order
47	Can delete order	12	delete_order
48	Can view order	12	view_order
49	Can add product	13	add_product
50	Can change product	13	change_product
51	Can delete product	13	delete_product
52	Can view product	13	view_product
53	Can add order line	14	add_orderline
54	Can change order line	14	change_orderline
55	Can delete order line	14	delete_orderline
56	Can view order line	14	view_orderline
\.


--
-- Data for Name: authentication_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.authentication_user (id, password, last_login, is_superuser, first_name, last_name, is_staff, is_active, date_joined, email, is_google) FROM stdin;
1	pbkdf2_sha256$260000$Mns7EFE7HCAusbPOr7es44$zh/wmWadDJgoDWIARzKwjDR1/VWMSHmmRohj1V20m5Y=	2021-04-21 05:17:00.469557+00	t			t	t	2021-04-21 05:16:50.197967+00	admin@admin.com	f
\.


--
-- Data for Name: authentication_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.authentication_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: authentication_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.authentication_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2021-04-21 07:18:39.268879+00	60513dbd-a3f1-4f53-9641-927298ba8a3b	Shoes	1	[{"added": {}}]	11	1
2	2021-04-21 07:30:40.206037+00	ef6b9835-8ee7-4ba3-9d18-61200ab63224	Nike Air Max 97	1	[{"added": {}}]	13	1
3	2021-04-21 07:30:49.350789+00	ef6b9835-8ee7-4ba3-9d18-61200ab63224	Nike Air Max 97	2	[]	13	1
4	2021-04-21 07:31:39.89551+00	6dc0475e-e020-40cb-9cf4-f32f557ebb36	ADIDAS YEEZY BOOST 350 V2 SESAME	1	[{"added": {}}]	13	1
5	2021-04-21 07:34:54.924976+00	aba4e3f8-3088-4f67-bd9a-aa846a6ab44a	ULTRA BOOST 20 ALLBLACK SILVER	1	[{"added": {}}]	13	1
6	2021-04-21 07:36:01.820635+00	aba4e3f8-3088-4f67-bd9a-aa846a6ab44a	ULTRA BOOST 20 ALLBLACK SILVER	2	[]	13	1
7	2021-04-21 07:42:08.093983+00	aba4e3f8-3088-4f67-bd9a-aa846a6ab44a	ULTRA BOOST 20 ALLBLACK SILVER	2	[]	13	1
8	2021-04-21 07:48:23.835867+00	3afb5bd4-c4d6-4c0d-8f07-87772a2faa7a	[EG0691] ULTRA BOOST 20 ALLBLACK	1	[{"added": {}}]	13	1
9	2021-04-21 07:55:29.545363+00	080c592f-e091-4e6c-a86c-5308367e3d10	ULTRA BOOST 20 GREY BOOST BLUE VIOLET	1	[{"added": {}}]	13	1
10	2021-04-21 07:56:22.157188+00	274557f1-f152-4977-93f4-0bc57fee542e	DOMBA MOONLAKE BEIGE	1	[{"added": {}}]	13	1
11	2021-04-21 07:57:04.605921+00	af6f81a8-8888-44c2-9750-de7d22d65c82	NIKE AIR FORCE 1 KSA	1	[{"added": {}}]	13	1
12	2021-04-21 07:57:33.79457+00	d971cf73-acab-47e2-bf1a-7b5c7a830bb7	DOMBA HIGHPOINT SP WHITE BLACK	1	[{"added": {}}]	13	1
13	2021-04-21 07:57:46.95968+00	d971cf73-acab-47e2-bf1a-7b5c7a830bb7	DOMBA HIGHPOINT SP WHITE BLACK	2	[{"changed": {"fields": ["Is public"]}}]	13	1
14	2021-04-21 07:59:01.937967+00	a62e11d5-afc8-42c4-bd74-85588a6d4a14	MLB MULE MONO DENIM ĐẬM	1	[{"added": {}}]	13	1
15	2021-04-21 07:59:35.982695+00	3b56916f-816b-48e7-a7db-bc95c542b22c	DOMBA HIGHPOINT SP WHITE BLACK	1	[{"added": {}}]	13	1
16	2021-04-21 08:00:18.099084+00	274557f1-f152-4977-93f4-0bc57fee542e	DOMBA MOONLAKE BEIGE	2	[{"changed": {"fields": ["Quantity"]}}]	13	1
\.


--
-- Data for Name: django_celery_results_chordcounter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_celery_results_chordcounter (id, group_id, sub_tasks, count) FROM stdin;
\.


--
-- Data for Name: django_celery_results_taskresult; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_celery_results_taskresult (id, task_id, status, content_type, content_encoding, result, date_done, traceback, meta, task_args, task_kwargs, task_name, worker, date_created) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	contenttypes	contenttype
5	sessions	session
6	django_celery_results	taskresult
7	django_celery_results	chordcounter
8	token_blacklist	blacklistedtoken
9	token_blacklist	outstandingtoken
10	authentication	user
11	shop	category
12	shop	order
13	shop	product
14	shop	orderline
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2021-04-21 05:10:14.32843+00
2	contenttypes	0002_remove_content_type_name	2021-04-21 05:10:14.341766+00
3	auth	0001_initial	2021-04-21 05:10:14.461372+00
4	auth	0002_alter_permission_name_max_length	2021-04-21 05:10:14.47061+00
5	auth	0003_alter_user_email_max_length	2021-04-21 05:10:14.480814+00
6	auth	0004_alter_user_username_opts	2021-04-21 05:10:14.492302+00
7	auth	0005_alter_user_last_login_null	2021-04-21 05:10:14.501934+00
8	auth	0006_require_contenttypes_0002	2021-04-21 05:10:14.507808+00
9	auth	0007_alter_validators_add_error_messages	2021-04-21 05:10:14.518162+00
10	auth	0008_alter_user_username_max_length	2021-04-21 05:10:14.527832+00
11	auth	0009_alter_user_last_name_max_length	2021-04-21 05:10:14.53749+00
12	auth	0010_alter_group_name_max_length	2021-04-21 05:10:14.552227+00
13	auth	0011_update_proxy_permissions	2021-04-21 05:10:14.563464+00
14	authentication	0001_initial	2021-04-21 05:10:14.699181+00
15	admin	0001_initial	2021-04-21 05:10:14.754325+00
16	admin	0002_logentry_remove_auto_add	2021-04-21 05:10:14.765576+00
17	admin	0003_logentry_add_action_flag_choices	2021-04-21 05:10:14.779564+00
18	auth	0012_alter_user_first_name_max_length	2021-04-21 05:10:14.791581+00
19	authentication	0002_auto_20201219_1409	2021-04-21 05:10:14.804573+00
20	authentication	0003_user_is_google	2021-04-21 05:10:14.818095+00
21	django_celery_results	0001_initial	2021-04-21 05:10:14.873633+00
22	django_celery_results	0002_add_task_name_args_kwargs	2021-04-21 05:10:14.886858+00
23	django_celery_results	0003_auto_20181106_1101	2021-04-21 05:10:14.895552+00
24	django_celery_results	0004_auto_20190516_0412	2021-04-21 05:10:14.982457+00
25	django_celery_results	0005_taskresult_worker	2021-04-21 05:10:15.016818+00
26	django_celery_results	0006_taskresult_date_created	2021-04-21 05:10:15.055966+00
27	django_celery_results	0007_remove_taskresult_hidden	2021-04-21 05:10:15.064792+00
28	django_celery_results	0008_chordcounter	2021-04-21 05:10:15.112015+00
29	sessions	0001_initial	2021-04-21 05:10:15.155314+00
30	shop	0001_initial	2021-04-21 05:10:15.282195+00
31	shop	0002_auto_20201221_0930	2021-04-21 05:10:15.313459+00
32	shop	0003_auto_20201222_0322	2021-04-21 05:10:15.349032+00
33	token_blacklist	0001_initial	2021-04-21 05:10:15.436182+00
34	token_blacklist	0002_outstandingtoken_jti_hex	2021-04-21 05:10:15.44957+00
35	token_blacklist	0003_auto_20171017_2007	2021-04-21 05:10:15.470333+00
36	token_blacklist	0004_auto_20171017_2013	2021-04-21 05:10:15.501985+00
37	token_blacklist	0005_remove_outstandingtoken_jti	2021-04-21 05:10:15.51577+00
38	token_blacklist	0006_auto_20171017_2113	2021-04-21 05:10:15.530573+00
39	token_blacklist	0007_auto_20171017_2214	2021-04-21 05:10:15.561988+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
kzifs9clrooupqys22tr47b00aqkrxuw	.eJxVjMsOwiAQRf-FtSE8ykBduvcbyDADUjU0Ke3K-O_apAvd3nPOfYmI21rj1vMSJxZnocXpd0tIj9x2wHdst1nS3NZlSnJX5EG7vM6cn5fD_Tuo2Ou3tgoKQ8khmQLJolNI2o8DB03EYTDkURNkCx7IjZyCK2AwgAZlIYB4fwDytTex:1lZ5ES:rN4hFyMxLfS5Y5VTv09Mpmpo7dq43XH-VzdJtKYDXZo	2021-05-05 05:17:00.475087+00
\.


--
-- Data for Name: shop_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shop_category (created_at, updated_at, id, name, image, description) FROM stdin;
2021-04-21 07:18:39.266843+00	2021-04-21 07:18:39.266861+00	60513dbd-a3f1-4f53-9641-927298ba8a3b	Shoes	\N	
\.


--
-- Data for Name: shop_order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shop_order (created_at, updated_at, id, ship_name, ship_email, ship_phone, ship_address, ship_city, ship_district, payment_method, delivery_fee, user_id) FROM stdin;
\.


--
-- Data for Name: shop_orderline; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shop_orderline (created_at, updated_at, id, price, quantity, order_id, product_id) FROM stdin;
\.


--
-- Data for Name: shop_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shop_product (created_at, updated_at, id, name, image, description, price, quantity, is_public, category_id) FROM stdin;
2021-04-21 07:30:40.196163+00	2021-04-21 07:30:49.348395+00	ef6b9835-8ee7-4ba3-9d18-61200ab63224	Nike Air Max 97	https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/60eeccfe-4192-4e63-8d58-b7adc2c541e9/air-max-97-shoe-C1Xtkx.jpg	- Giày Air Max 97 Trắng có thiết kế lấy cảm hứng từ chiếc tàu siêu tốc – bullet train của Nhật và cấu tạo từ chất liệu mesh được xếp từng lớp rất lã lướt.\r\n- Tạo cho người nhìn cảm giác tự tin, sảng khoái và năng động khi mang đôi giày.\r\n- Air Max 97 hồngmang một màu sắc sang trọng nhưng không kém phần trẻ trung.\r\n - Công nghệ air trải dọc toàn bộ đế giày. Hỗ trợ từng chuyển động của bàn chân một cách êm ái. \r\n- Đế giày hỗ trợ tăng chiều cao. Thiết kế dạng sock, dễ dàng mang với 1 lần xỏ.\r\n- Vẻ đẹp vừa cổ điển vừa hiện đại, năng động sáng tạo. Thiết kế thời trang, kiểu dáng phong cách và dễ phối đồ. \r\n- Phù hợp với các bạn nữ.	10	250000	t	60513dbd-a3f1-4f53-9641-927298ba8a3b
2021-04-21 07:31:39.89321+00	2021-04-21 07:31:39.893232+00	6dc0475e-e020-40cb-9cf4-f32f557ebb36	ADIDAS YEEZY BOOST 350 V2 SESAME	https://swagger.com.vn/wp-content/uploads/2020/03/adidas-yeezy-350-v2-sesame.jpg	- Yeezy được thiết kế độc đáo với chất riêng. \r\n- Đôi Yeezy này được kết hợp từ nhiều sắc thái màu xám khác nhau, tạo ra một kết cấu hỗn loạn hơn giống như của Yeshaya, hay Lundmark.\r\n- Điểm thay đổi dễ nhận thấy nhất ở phiên bản mới này là phần dây buộc thay vì thắt nút lại với nhau thì adidas đã cắt 2 đầu dây và nối chúng lại với nhau , cuối cùng là bọc lại để che đi đoạn nối đó bằng một ống cao su.\r\n- Công nghệ Boost siêu êm tạo nên một đôi giày hội đủ yếu tố đẳng cấp, thời thượng, thời trang, êm ái ...\r\n- Chất vải primeknit co dãn linh hoạt, siêu nhẹ, siêu êm. Outfit mang đậm vẻ hiện đại, cuốn hút. \r\n- Đế boost tạo độ nảy cao, đàn hồi tốt, bước đi nhẹ nhàng. Việc cân bằng lực tương tác ổn định giúp bạn cảm thấy thoải mái, bước đi nhanh hơn, nhẹ nhàng hơn ngay trong lần đầu On-feet sản phẩm này. Phù hợp cả đi học lẫn đi chơi.	300000	14	t	60513dbd-a3f1-4f53-9641-927298ba8a3b
2021-04-21 07:57:33.791536+00	2021-04-21 07:57:46.95368+00	d971cf73-acab-47e2-bf1a-7b5c7a830bb7	DOMBA HIGHPOINT SP WHITE BLACK	https://product.hstatic.net/1000383440/product/0d91d994-0359-4876-ac63-4a4fccd747c5_90c0ff21ba4b44898545c5be4be8a4ca_master.jpg	-Hàng chính hãng\r\n\r\n-Giao hàng Toàn Quốc\r\n\r\n-Thanh Toán khi nhận hàng\r\n\r\n-Bảo hành chính hãng trọn đời sản phẩm\r\n\r\n-Bảo hành keo , chỉ trọn đời sản phẩm\r\n\r\n-Giao hàng Nhanh 60p tại Sài Gòn	10000	12	t	60513dbd-a3f1-4f53-9641-927298ba8a3b
2021-04-21 07:34:54.807202+00	2021-04-21 07:42:07.970783+00	aba4e3f8-3088-4f67-bd9a-aa846a6ab44a	ULTRA BOOST 20 ALLBLACK SILVER	https://product.hstatic.net/1000383440/product/123535791_2377362309074335_6056133020760722065_o_f02f3d402fb14f81a6fa14a94a8880d9_master.jpg	- Đây là mẫu giày bán chạy nhất của Adidas. Với đế boost, đôi giày cực kì êm. Có vải upper co giãn Primenkit phía trên, lồng TPU (hệ thống khung nhựa cage), đế giữa Boost tăng cường và nhãn hiệu trên tab gót. \r\n- Chất liệu vải Primeknit 360 có độ co dãn tối đa, khả năng thoáng khí cực chuẩn, đảm bảo cho bạn hoạt động một cách thoải mái và khỏe khoắn nhất.\r\n- Đế giày được thiết kế theo dạng lưới gồm những gai tròn đang xen nhau giúp hỗ trợ tối đa khả năng hoàn trả năng lượng của bộ đệm, đồng thời tăng thêm vẻ ngoài khỏe khoắn, bắt mắt cho đôi giày.\r\n- Bộ đệm Boost với hàng ngàn viên nang năng lượng, nay được bổ sung 20% vật liệu Boost.\r\n- Kết cấu bên ngoài vững chãi, cứng cáp cùng với lớp dệt kĩ thuật cao.\r\n- Không chỉ là một đôi giày chạy bộ, Ultra Boost còn có thể được xem như một đôi sneaker hoàn hảo, dễ dàng phối với các phong cách street style khác nhau.	260000	12	t	60513dbd-a3f1-4f53-9641-927298ba8a3b
2021-04-21 07:48:23.828601+00	2021-04-21 07:48:23.828624+00	3afb5bd4-c4d6-4c0d-8f07-87772a2faa7a	[EG0691] ULTRA BOOST 20 ALLBLACK	https://product.hstatic.net/1000383440/product/b10b6f1f-a4f3-4b0f-a143-1811bbab5ad3_41336a2a03f549968ab18dec0604855d_master.jpg	Mô tả\r\n-Hàng chính hãng\r\n\r\n-Giao hàng Toàn Quốc\r\n\r\n-Thanh Toán khi nhận hàng\r\n\r\n-Bảo hành chính hãng trọn đời sản phẩm\r\n\r\n-Bảo hành keo , chỉ trọn đời sản phẩm\r\n\r\n-Giao hàng Nhanh 60p tại Sài Gòn	300000	23	t	60513dbd-a3f1-4f53-9641-927298ba8a3b
2021-04-21 07:55:29.540652+00	2021-04-21 07:55:29.540671+00	080c592f-e091-4e6c-a86c-5308367e3d10	ULTRA BOOST 20 GREY BOOST BLUE VIOLET	https://product.hstatic.net/1000383440/product/eed036d1-caf1-4dbf-83f1-25d4ee9eab6c_4e8edf0b42444d018c2b5381ef961fd2_master.jpeg	-Hàng chính hãng\r\n\r\n-Giao hàng Toàn Quốc\r\n\r\n-Thanh Toán khi nhận hàng\r\n\r\n-Bảo hành chính hãng trọn đời sản phẩm\r\n\r\n-Bảo hành keo , chỉ trọn đời sản phẩm\r\n\r\n-Giao hàng Nhanh 60p tại Sài Gòn	150000	10	t	60513dbd-a3f1-4f53-9641-927298ba8a3b
2021-04-21 07:57:04.602237+00	2021-04-21 07:57:04.602257+00	af6f81a8-8888-44c2-9750-de7d22d65c82	NIKE AIR FORCE 1 KSA	https://product.hstatic.net/1000383440/product/ec1829ac-2df0-4991-9f61-a3f5abdf57e8_5116451414414d9ea7868c66670c1996_master.jpg	-Hàng chính hãng\r\n\r\n-Giao hàng Toàn Quốc\r\n\r\n-Thanh Toán khi nhận hàng\r\n\r\n-Bảo hành chính hãng trọn đời sản phẩm\r\n\r\n-Bảo hành keo , chỉ trọn đời sản phẩm\r\n\r\n-Giao hàng Nhanh 60p tại Sài Gòn	200000	12	t	60513dbd-a3f1-4f53-9641-927298ba8a3b
2021-04-21 07:59:01.934039+00	2021-04-21 07:59:01.934123+00	a62e11d5-afc8-42c4-bd74-85588a6d4a14	MLB MULE MONO DENIM ĐẬM	https://product.hstatic.net/1000383440/product/c124b13c-2211-4ffe-98b6-15bd5f8375c3_d1b9fbb7193445378deb62cafe9a715e_master.jpg	-Hàng chính hãng\r\n\r\n-Giao hàng Toàn Quốc\r\n\r\n-Thanh Toán khi nhận hàng\r\n\r\n-Bảo hành chính hãng trọn đời sản phẩm\r\n\r\n-Bảo hành keo , chỉ trọn đời sản phẩm\r\n\r\n-Giao hàng Nhanh 60p tại Sài Gòn	120000	12	t	60513dbd-a3f1-4f53-9641-927298ba8a3b
2021-04-21 07:59:35.979417+00	2021-04-21 07:59:35.979434+00	3b56916f-816b-48e7-a7db-bc95c542b22c	DOMBA HIGHPOINT SP WHITE BLACK	https://product.hstatic.net/1000383440/product/0d91d994-0359-4876-ac63-4a4fccd747c5_90c0ff21ba4b44898545c5be4be8a4ca_master.jpg	-Hàng chính hãng\r\n\r\n-Giao hàng Toàn Quốc\r\n\r\n-Thanh Toán khi nhận hàng\r\n\r\n-Bảo hành chính hãng trọn đời sản phẩm\r\n\r\n-Bảo hành keo , chỉ trọn đời sản phẩm\r\n\r\n-Giao hàng Nhanh 60p tại Sài Gòn	200000	10	t	60513dbd-a3f1-4f53-9641-927298ba8a3b
2021-04-21 07:56:22.153356+00	2021-04-21 08:00:18.094724+00	274557f1-f152-4977-93f4-0bc57fee542e	DOMBA MOONLAKE BEIGE	https://product.hstatic.net/1000383440/product/d8c4f6ed-841c-4496-baeb-1dc264737852_67c5e78f9ce649c6b156e49901b30a3f_master.jpg	-Hàng chính hãng\r\n\r\n-Giao hàng Toàn Quốc\r\n\r\n-Thanh Toán khi nhận hàng\r\n\r\n-Bảo hành chính hãng trọn đời sản phẩm\r\n\r\n-Bảo hành keo , chỉ trọn đời sản phẩm\r\n\r\n-Giao hàng Nhanh 60p tại Sài Gòn	200000	2	t	60513dbd-a3f1-4f53-9641-927298ba8a3b
\.


--
-- Data for Name: token_blacklist_blacklistedtoken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.token_blacklist_blacklistedtoken (id, blacklisted_at, token_id) FROM stdin;
\.


--
-- Data for Name: token_blacklist_outstandingtoken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 56, true);


--
-- Name: authentication_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.authentication_user_groups_id_seq', 1, false);


--
-- Name: authentication_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.authentication_user_id_seq', 1, true);


--
-- Name: authentication_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.authentication_user_user_permissions_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 16, true);


--
-- Name: django_celery_results_chordcounter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_celery_results_chordcounter_id_seq', 1, false);


--
-- Name: django_celery_results_taskresult_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_celery_results_taskresult_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 14, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 39, true);


--
-- Name: shop_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shop_order_id_seq', 1, false);


--
-- Name: token_blacklist_blacklistedtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.token_blacklist_blacklistedtoken_id_seq', 1, false);


--
-- Name: token_blacklist_outstandingtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.token_blacklist_outstandingtoken_id_seq', 1, false);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: authentication_user authentication_user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authentication_user
    ADD CONSTRAINT authentication_user_email_key UNIQUE (email);


--
-- Name: authentication_user_groups authentication_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authentication_user_groups
    ADD CONSTRAINT authentication_user_groups_pkey PRIMARY KEY (id);


--
-- Name: authentication_user_groups authentication_user_groups_user_id_group_id_8af031ac_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authentication_user_groups
    ADD CONSTRAINT authentication_user_groups_user_id_group_id_8af031ac_uniq UNIQUE (user_id, group_id);


--
-- Name: authentication_user authentication_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authentication_user
    ADD CONSTRAINT authentication_user_pkey PRIMARY KEY (id);


--
-- Name: authentication_user_user_permissions authentication_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authentication_user_user_permissions
    ADD CONSTRAINT authentication_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: authentication_user_user_permissions authentication_user_user_user_id_permission_id_ec51b09f_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authentication_user_user_permissions
    ADD CONSTRAINT authentication_user_user_user_id_permission_id_ec51b09f_uniq UNIQUE (user_id, permission_id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_celery_results_chordcounter django_celery_results_chordcounter_group_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_celery_results_chordcounter
    ADD CONSTRAINT django_celery_results_chordcounter_group_id_key UNIQUE (group_id);


--
-- Name: django_celery_results_chordcounter django_celery_results_chordcounter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_celery_results_chordcounter
    ADD CONSTRAINT django_celery_results_chordcounter_pkey PRIMARY KEY (id);


--
-- Name: django_celery_results_taskresult django_celery_results_taskresult_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_celery_results_taskresult
    ADD CONSTRAINT django_celery_results_taskresult_pkey PRIMARY KEY (id);


--
-- Name: django_celery_results_taskresult django_celery_results_taskresult_task_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_celery_results_taskresult
    ADD CONSTRAINT django_celery_results_taskresult_task_id_key UNIQUE (task_id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: shop_category shop_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_category
    ADD CONSTRAINT shop_category_pkey PRIMARY KEY (id);


--
-- Name: shop_order shop_order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_order
    ADD CONSTRAINT shop_order_pkey PRIMARY KEY (id);


--
-- Name: shop_orderline shop_orderline_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_orderline
    ADD CONSTRAINT shop_orderline_pkey PRIMARY KEY (id);


--
-- Name: shop_product shop_product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_product
    ADD CONSTRAINT shop_product_pkey PRIMARY KEY (id);


--
-- Name: token_blacklist_blacklistedtoken token_blacklist_blacklistedtoken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blacklist_blacklistedtoken
    ADD CONSTRAINT token_blacklist_blacklistedtoken_pkey PRIMARY KEY (id);


--
-- Name: token_blacklist_blacklistedtoken token_blacklist_blacklistedtoken_token_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blacklist_blacklistedtoken
    ADD CONSTRAINT token_blacklist_blacklistedtoken_token_id_key UNIQUE (token_id);


--
-- Name: token_blacklist_outstandingtoken token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blacklist_outstandingtoken
    ADD CONSTRAINT token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq UNIQUE (jti);


--
-- Name: token_blacklist_outstandingtoken token_blacklist_outstandingtoken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blacklist_outstandingtoken
    ADD CONSTRAINT token_blacklist_outstandingtoken_pkey PRIMARY KEY (id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: authentication_user_email_2220eff5_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX authentication_user_email_2220eff5_like ON public.authentication_user USING btree (email varchar_pattern_ops);


--
-- Name: authentication_user_groups_group_id_6b5c44b7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX authentication_user_groups_group_id_6b5c44b7 ON public.authentication_user_groups USING btree (group_id);


--
-- Name: authentication_user_groups_user_id_30868577; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX authentication_user_groups_user_id_30868577 ON public.authentication_user_groups USING btree (user_id);


--
-- Name: authentication_user_user_permissions_permission_id_ea6be19a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX authentication_user_user_permissions_permission_id_ea6be19a ON public.authentication_user_user_permissions USING btree (permission_id);


--
-- Name: authentication_user_user_permissions_user_id_736ebf7e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX authentication_user_user_permissions_user_id_736ebf7e ON public.authentication_user_user_permissions USING btree (user_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_celery_results_chordcounter_group_id_1f70858c_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_celery_results_chordcounter_group_id_1f70858c_like ON public.django_celery_results_chordcounter USING btree (group_id varchar_pattern_ops);


--
-- Name: django_celery_results_taskresult_date_created_099f3424; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_celery_results_taskresult_date_created_099f3424 ON public.django_celery_results_taskresult USING btree (date_created);


--
-- Name: django_celery_results_taskresult_date_done_49edada6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_celery_results_taskresult_date_done_49edada6 ON public.django_celery_results_taskresult USING btree (date_done);


--
-- Name: django_celery_results_taskresult_status_cbbed23a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_celery_results_taskresult_status_cbbed23a ON public.django_celery_results_taskresult USING btree (status);


--
-- Name: django_celery_results_taskresult_status_cbbed23a_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_celery_results_taskresult_status_cbbed23a_like ON public.django_celery_results_taskresult USING btree (status varchar_pattern_ops);


--
-- Name: django_celery_results_taskresult_task_id_de0d95bf_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_celery_results_taskresult_task_id_de0d95bf_like ON public.django_celery_results_taskresult USING btree (task_id varchar_pattern_ops);


--
-- Name: django_celery_results_taskresult_task_name_90987df3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_celery_results_taskresult_task_name_90987df3 ON public.django_celery_results_taskresult USING btree (task_name);


--
-- Name: django_celery_results_taskresult_task_name_90987df3_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_celery_results_taskresult_task_name_90987df3_like ON public.django_celery_results_taskresult USING btree (task_name varchar_pattern_ops);


--
-- Name: django_celery_results_taskresult_worker_f8711389; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_celery_results_taskresult_worker_f8711389 ON public.django_celery_results_taskresult USING btree (worker);


--
-- Name: django_celery_results_taskresult_worker_f8711389_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_celery_results_taskresult_worker_f8711389_like ON public.django_celery_results_taskresult USING btree (worker varchar_pattern_ops);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: shop_order_user_id_00aba627; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX shop_order_user_id_00aba627 ON public.shop_order USING btree (user_id);


--
-- Name: shop_orderline_order_id_8ad562c5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX shop_orderline_order_id_8ad562c5 ON public.shop_orderline USING btree (order_id);


--
-- Name: shop_orderline_product_id_3f3985f6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX shop_orderline_product_id_3f3985f6 ON public.shop_orderline USING btree (product_id);


--
-- Name: shop_product_category_id_14d7eea8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX shop_product_category_id_14d7eea8 ON public.shop_product USING btree (category_id);


--
-- Name: token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_like ON public.token_blacklist_outstandingtoken USING btree (jti varchar_pattern_ops);


--
-- Name: token_blacklist_outstandingtoken_user_id_83bc629a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX token_blacklist_outstandingtoken_user_id_83bc629a ON public.token_blacklist_outstandingtoken USING btree (user_id);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: authentication_user_user_permissions authentication_user__permission_id_ea6be19a_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authentication_user_user_permissions
    ADD CONSTRAINT authentication_user__permission_id_ea6be19a_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: authentication_user_groups authentication_user__user_id_30868577_fk_authentic; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authentication_user_groups
    ADD CONSTRAINT authentication_user__user_id_30868577_fk_authentic FOREIGN KEY (user_id) REFERENCES public.authentication_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: authentication_user_user_permissions authentication_user__user_id_736ebf7e_fk_authentic; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authentication_user_user_permissions
    ADD CONSTRAINT authentication_user__user_id_736ebf7e_fk_authentic FOREIGN KEY (user_id) REFERENCES public.authentication_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: authentication_user_groups authentication_user_groups_group_id_6b5c44b7_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authentication_user_groups
    ADD CONSTRAINT authentication_user_groups_group_id_6b5c44b7_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_authentication_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_authentication_user_id FOREIGN KEY (user_id) REFERENCES public.authentication_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: shop_order shop_order_user_id_00aba627_fk_authentication_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_order
    ADD CONSTRAINT shop_order_user_id_00aba627_fk_authentication_user_id FOREIGN KEY (user_id) REFERENCES public.authentication_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: shop_orderline shop_orderline_order_id_8ad562c5_fk_shop_order_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_orderline
    ADD CONSTRAINT shop_orderline_order_id_8ad562c5_fk_shop_order_id FOREIGN KEY (order_id) REFERENCES public.shop_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: shop_orderline shop_orderline_product_id_3f3985f6_fk_shop_product_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_orderline
    ADD CONSTRAINT shop_orderline_product_id_3f3985f6_fk_shop_product_id FOREIGN KEY (product_id) REFERENCES public.shop_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: shop_product shop_product_category_id_14d7eea8_fk_shop_category_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_product
    ADD CONSTRAINT shop_product_category_id_14d7eea8_fk_shop_category_id FOREIGN KEY (category_id) REFERENCES public.shop_category(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: token_blacklist_blacklistedtoken token_blacklist_blac_token_id_3cc7fe56_fk_token_bla; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blacklist_blacklistedtoken
    ADD CONSTRAINT token_blacklist_blac_token_id_3cc7fe56_fk_token_bla FOREIGN KEY (token_id) REFERENCES public.token_blacklist_outstandingtoken(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: token_blacklist_outstandingtoken token_blacklist_outs_user_id_83bc629a_fk_authentic; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blacklist_outstandingtoken
    ADD CONSTRAINT token_blacklist_outs_user_id_83bc629a_fk_authentic FOREIGN KEY (user_id) REFERENCES public.authentication_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

