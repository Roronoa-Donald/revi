program copteur_div;
uses crt;
var
    n1,n2,d,i: integer;
begin
    writeln('Veuiller saisir le premier nombre');
    readln(n1);

    writeln('Veuillez saisir le deuxieme nombre');
    readln(n2);

    writeln('Veuillez saisir le diviseur');
    readln(d);

    for i:= n1 to n2 do
    if (i mod d = 0) then
        writeln('Les resultats sont :', i);
        readln(i);
end.