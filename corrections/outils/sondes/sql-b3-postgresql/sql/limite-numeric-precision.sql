SET client_min_messages = warning;
CREATE TEMP TABLE comptes (id integer PRIMARY KEY, solde numeric(12,2));
CREATE TEMP TABLE resultats_precision (ordre integer, cas text, resultat text, source_apres text, destination_apres text);

DO $sonde$
DECLARE
    scenario record;
    resultat text;
BEGIN
    INSERT INTO comptes VALUES (1, 100), (2, 10);
    PERFORM virer_fonds(1, 2, 20);
    IF (SELECT solde FROM comptes WHERE id = 1) IS DISTINCT FROM 80::numeric
       OR (SELECT solde FROM comptes WHERE id = 2) IS DISTINCT FROM 30::numeric THEN
        RAISE EXCEPTION 'La fonction ne vise pas la table temporaire numeric(12,2) de la sonde';
    END IF;
    FOR scenario IN SELECT * FROM (VALUES
        (1, 'solde_source_NaN', 'NaN'::numeric, 10::numeric, 30::numeric),
        (2, 'solde_destination_NaN', 100::numeric, 'NaN'::numeric, 30::numeric),
        (3, 'montant_NaN_source_NaN', 'NaN'::numeric, 10::numeric, 'NaN'::numeric)
    ) AS scenarios(ordre, cas, initial_source, initial_destination, montant)
    LOOP
        TRUNCATE comptes;
        INSERT INTO comptes VALUES (1, scenario.initial_source), (2, scenario.initial_destination);
        resultat := 'ACCEPTE';
        BEGIN
            PERFORM virer_fonds(1, 2, scenario.montant);
        EXCEPTION WHEN OTHERS THEN
            resultat := 'REFUSE';
        END;
        INSERT INTO resultats_precision VALUES (
            scenario.ordre, scenario.cas, resultat,
            (SELECT solde::text FROM comptes WHERE id = 1),
            (SELECT solde::text FROM comptes WHERE id = 2)
        );
    END LOOP;
END;
$sonde$;

SELECT 'NUMERIC_12_2_VIREMENT|' || cas || '|' || resultat || '|source=' || source_apres
       || '|destination=' || destination_apres FROM resultats_precision ORDER BY ordre;
SELECT 'TYP12_NON_FINIS_ACCEPTES|' || count(*) FROM resultats_precision WHERE resultat = 'ACCEPTE';
