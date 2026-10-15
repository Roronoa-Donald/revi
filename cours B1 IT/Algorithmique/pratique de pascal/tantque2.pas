program puissance;
uses crt;
var
    N,p,R,i:integer;
begin
    writeln('veuillez entrer la base N : ');
    readln(N);
    writeln('veuillez entrer l esposant p : ');
    readln(p);
    R:=1;
    i:=1;
    while i<=p do
    begin
        R := R * N;
        i := i + 1;
    end;
        writeln(N,'^',p,'=',R);
end.