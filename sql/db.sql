-- codalyze with password codalyze
do
$body$
declare
  num_users integer;
begin
   SELECT count(*)
     into num_users
   FROM pg_user
   WHERE usename = 'rakesh';

   IF num_users = 0 THEN
      CREATE ROLE rakesh LOGIN PASSWORD 'rakesh';
   END IF;
end
$body$
;
ALTER ROLE rakesh SUPERUSER;

-- create casinobooking with owner codalyze
CREATE DATABASE helpdesk WITH OWNER=rakesh;
GRANT ALL PRIVILEGES ON DATABASE helpdesk TO rakesh;
GRANT ALL PRIVILEGES ON DATABASE helpdesk TO rakesh;

