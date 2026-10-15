program somme_n;
uses crt;
var
    i,n,sum : integer;
begin
    writeln('Veuillez saisir la valeur de n :');
    readln(n);

    i:= 1;
    sum:= 0;

    while i<= n do
    begin
       i:= i + 1;
       sum:= sum + i; 
    end;
        writeln('La somme de ',n,'premiers entiers est : ',sum);
end.