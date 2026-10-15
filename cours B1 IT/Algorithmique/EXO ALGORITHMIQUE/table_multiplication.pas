program table_multi;
uses crt;
var 
    i,nombre: integer;
begin
    writeln('Veuillez saisir le nombre : ');
    readln(nombre);
    i:=1;

    while i<= 10 do
    begin
        writeln(nombre, 'X', i, '=', nombre * i);
        i:= i + 1;
    end;
end.