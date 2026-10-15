program ite_somme2;
uses crt;

var
  nombre_n, k: integer;
  somme: real;

begin
  writeln('Entrer la valeur de n (nombre de termes) : ');
  readln(nombre_n);

  if nombre_n <= 0 then
  begin
    writeln('n doit etre un entier positif.');
    exit;
  end;

  somme := 0.0;

  for k := 1 to nombre_n do
    somme := somme + (k / (k + 1));

  writeln('La somme est : ', somme:0:2);
end.