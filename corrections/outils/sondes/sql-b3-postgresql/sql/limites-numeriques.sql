SET client_min_messages = warning;
SELECT 'COMPARAISON_NUMERIC|NaN=NaN:' || ('NaN'::numeric = 'NaN'::numeric)
       || '|NaN>Infinity:' || ('NaN'::numeric > 'Infinity'::numeric)
       || '|100<NaN:' || (100::numeric < 'NaN'::numeric)
       || '|NaN<30:' || ('NaN'::numeric < 30::numeric)
       || '|NaN<=0:' || ('NaN'::numeric <= 0::numeric);
CREATE TEMP TABLE resultats_numeriques (
    ordre integer, cas text, resultat text, source_apres text, destination_apres text, sqlstate text
);

DO $sonde$
DECLARE
    scenario record;
    resultat text;
    code_erreur text;
BEGIN
    FOR scenario IN SELECT * FROM (VALUES
        (1, 'montant_NaN_source_finie', 100::numeric, 10::numeric, 'NaN'::numeric),
        (2, 'montant_Infinity_source_finie', 100::numeric, 10::numeric, 'Infinity'::numeric),
        (3, 'montant_moins_Infinity_source_finie', 100::numeric, 10::numeric, '-Infinity'::numeric),
        (4, 'solde_source_NaN', 'NaN'::numeric, 10::numeric, 30::numeric),
        (5, 'solde_destination_NaN', 100::numeric, 'NaN'::numeric, 30::numeric),
        (6, 'solde_source_Infinity', 'Infinity'::numeric, 10::numeric, 30::numeric),
        (7, 'montant_Infinity_source_Infinity', 'Infinity'::numeric, 10::numeric, 'Infinity'::numeric),
        (8, 'montant_NaN_source_NaN', 'NaN'::numeric, 10::numeric, 'NaN'::numeric),
        (9, 'solde_destination_Infinity', 100::numeric, 'Infinity'::numeric, 30::numeric),
        (10, 'solde_source_moins_Infinity', '-Infinity'::numeric, 10::numeric, 30::numeric)
    ) AS scenarios(ordre, cas, initial_source, initial_destination, montant)
    LOOP
        TRUNCATE comptes;
        INSERT INTO comptes VALUES (1, scenario.initial_source), (2, scenario.initial_destination);
        resultat := 'ACCEPTE';
        code_erreur := '';
        BEGIN
            PERFORM virer_fonds(1, 2, scenario.montant);
        EXCEPTION WHEN OTHERS THEN
            resultat := 'REFUSE';
            code_erreur := SQLSTATE;
        END;
        INSERT INTO resultats_numeriques VALUES (
            scenario.ordre, scenario.cas, resultat,
            (SELECT solde::text FROM comptes WHERE id = 1),
            (SELECT solde::text FROM comptes WHERE id = 2), code_erreur
        );
    END LOOP;
END;
$sonde$;

SELECT 'NUMERIQUE|' || cas || '|' || resultat || '|source=' || source_apres
       || '|destination=' || destination_apres || '|sqlstate=' || sqlstate
FROM resultats_numeriques ORDER BY ordre;
SELECT 'NON_FINIS_ACCEPTES|' || count(*) FROM resultats_numeriques WHERE resultat = 'ACCEPTE';

CREATE TEMP TABLE numeric_precision (valeur numeric(12,2));
INSERT INTO numeric_precision VALUES ('NaN'::numeric);
DO $sonde$
BEGIN
    BEGIN
        INSERT INTO numeric_precision VALUES ('Infinity'::numeric);
        RAISE NOTICE 'Infinity a été accepté par numeric(12,2)';
    EXCEPTION WHEN numeric_value_out_of_range THEN
        INSERT INTO resultats_numeriques VALUES (11, 'typmod_Infinity', 'REFUSE', '', '', SQLSTATE);
    END;
END;
$sonde$;
SELECT 'NUMERIC_12_2|NaN=' || (SELECT valeur::text FROM numeric_precision LIMIT 1)
       || '|Infinity=' || CASE WHEN EXISTS (SELECT FROM resultats_numeriques WHERE cas = 'typmod_Infinity')
                               THEN 'REFUSE' ELSE 'ACCEPTE' END;
