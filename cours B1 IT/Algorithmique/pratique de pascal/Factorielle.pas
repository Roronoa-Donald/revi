program factorielle;
uses crt;

var
    n, i: integer;
    fact: real;

begin
    writeln('Entrer la valeur de n : ');
    readln(n);

    if n < 0 then
    begin
        writeln('n doit etre un entier positif.');
        exit;
    end;

    fact := 1;

    for i := 1 to n do
        fact := fact * i;
    writeln('Le factorielle de ', n, ' est : ', fact:0:2);
end.