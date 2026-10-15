program valeur_j;
uses crt;
var
    j,n:integer;
begin
    writeln('saisir la valeur finale : ');
    readln(n);

    j:= 1;

    while j <= n do
     begin
        writeln('Nombre : ', j);
        j:= j + 1;
    end;
end.