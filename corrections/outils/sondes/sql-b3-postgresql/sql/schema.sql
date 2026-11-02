CREATE TABLE commandes (client_id integer, total_ttc numeric, date_cmd date);
INSERT INTO commandes VALUES (1, 10, '2025-01-01'), (2, 20, '2025-01-02');

CREATE TABLE comptes (id integer PRIMARY KEY, solde numeric);

CREATE TABLE departements (code text PRIMARY KEY);
INSERT INTO departements VALUES ('IT'), ('RH');
CREATE TABLE employes (
    id integer PRIMARY KEY,
    nom text,
    manager_id integer,
    departement text,
    salaire numeric,
    date_embauche date,
    CONSTRAINT employes_departement_fk FOREIGN KEY (departement)
        REFERENCES departements(code) DEFERRABLE INITIALLY DEFERRED
);
INSERT INTO employes VALUES
    (1, 'A', NULL, 'IT', 100, '2020-01-01'),
    (2, 'B', 1, 'IT', 200, '2021-01-01'),
    (3, 'C', 1, 'RH', 300, '2022-01-01');
CREATE TABLE audit_log (table_name text, op text, row_id integer, old_val json,
                        new_val json, modifie_par text, modifie_le timestamptz);

CREATE ROLE audit_owner NOLOGIN;
ALTER TABLE audit_log OWNER TO audit_owner;
CREATE ROLE rls_owner NOLOGIN;
CREATE ROLE bypass_actor NOLOGIN BYPASSRLS;
CREATE ROLE app_user NOLOGIN;
CREATE TABLE documents (id integer PRIMARY KEY, tenant_id uuid NOT NULL);
GRANT SELECT ON documents TO app_user;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
