Program Factorielle;
Uses crt;

Var
   N, i, fact : Integer;

Begin
   ClrScr;
   Write('Entrez un nombre entier N : ');
   ReadLn(N);

   fact := 1;   { Initialisation }
   i := 1;

   While i <= N Do
   Begin
      fact := fact * i;
      i := i + 1;
   End;

   WriteLn('La factorielle de ', N, ' est : ', fact);
End.