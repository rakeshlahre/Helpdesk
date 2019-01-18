CREATE TABLE users (
  id bigserial PRIMARY KEY,
  username text NOT NULL,
  password text NOT NULL,
  email text NULL,
  twitter_user_id text NULL,
  date_joined timestamp with time zone NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX unique_username ON users USING btree (lower(username) text_pattern_ops);

CREATE INDEX users_lower_email_idx ON users USING btree(lower(email));

CREATE TABLE sessions (
  id uuid PRIMARY KEY,
  user_id bigint REFERENCES users(id),
  ip_address inet NOT NULL,
  fingerprint text NOT NULL,
  logged_out_at  timestamp with time zone  NULL,
  expired_at timestamp with time zone  NOT NULL DEFAULT NOW() + INTERVAL '15 minutes',
  created_at timestamp with time zone  NOT NULL DEFAULT NOW()
);


CREATE VIEW active_sessions AS
  SELECT *
  FROM sessions
  WHERE expired_at >= NOW()
  AND logged_out_at IS NULL;


CREATE TABLE error_logs (
  id bigserial PRIMARY KEY,
  created_at timestamp with time zone  NOT NULL DEFAULT NOW(),
  msg text NULL,
  stack text NULL,
  db_query text NULL,
  db_code text NULL,
  source text NOT NULL,
  req_id uuid NULL,
  user_id bigint NULL,
  mail_info text NULL,
  to_email text NULL
);


