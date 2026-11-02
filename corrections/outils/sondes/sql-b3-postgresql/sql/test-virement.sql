SET client_min_messages = warning;
CREATE TEMP TABLE resultats_virement (cas text, resultat text);

DO $test$
DECLARE
    scenario record;
    refuse boolean;
BEGIN
    FOR scenario IN SELECT * FROM (VALUES
        ('source_absente', 99, 2, 30::numeric, 100::numeric, 10::numeric),
        ('destination_absente', 1, 99, 30::numeric, 100::numeric, 10::numeric),
        ('montant_negatif', 1, 2, -30::numeric, 100::numeric, 10::numeric),
        ('montant_zero', 1, 2, 0::numeric, 100::numeric, 10::numeric),
        ('montant_null', 1, 2, NULL::numeric, 100::numeric, 10::numeric),
        ('fonds_insuffisants', 1, 2, 101::numeric, 100::numeric, 10::numeric),
        ('solde_source_null', 1, 2, 30::numeric, NULL::numeric, 10::numeric),
        ('solde_destination_null', 1, 2, 30::numeric, 100::numeric, NULL::numeric)
    ) AS scenarios(cas, source, destination, montant, initial_source, initial_destination)
    LOOP
        TRUNCATE comptes;
        INSERT INTO comptes VALUES (1, scenario.initial_source), (2, scenario.initial_destination);
        refuse := false;
        BEGIN
            PERFORM virer_fonds(scenario.source, scenario.destination, scenario.montant);
        EXCEPTION WHEN OTHERS THEN
            refuse := true;
        END;
        IF NOT refuse OR (SELECT count(*) FROM comptes) <> 2
           OR (SELECT solde FROM comptes WHERE id = 1) IS DISTINCT FROM scenario.initial_source
           OR (SELECT solde FROM comptes WHERE id = 2) IS DISTINCT FROM scenario.initial_destination THEN
            RAISE EXCEPTION 'Cas % : refus ou conservation des soldes non vérifié', scenario.cas;
        END IF;
        INSERT INTO resultats_virement VALUES (scenario.cas, 'refus et soldes inchangés');
    END LOOP;

    TRUNCATE comptes;
    INSERT INTO comptes VALUES (1, 100), (2, 10);
    PERFORM virer_fonds(1, 2, 20);
    IF (SELECT solde FROM comptes WHERE id = 1) IS DISTINCT FROM 80::numeric
       OR (SELECT solde FROM comptes WHERE id = 2) IS DISTINCT FROM 30::numeric THEN
        RAISE EXCEPTION 'Virement nominal incorrect';
    END IF;
    INSERT INTO resultats_virement VALUES ('nominal', '80 et 30');
END;
$test$;

SELECT 'VIREMENT|' || cas || '|' || resultat FROM resultats_virement ORDER BY cas;
