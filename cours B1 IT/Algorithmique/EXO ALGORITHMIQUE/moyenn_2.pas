program moyenne_bac;

uses crt;

var
    moyenne: real;
    reponse: string;

begin
    reponse := 'oui';
    
    while reponse = 'oui' do
    begin
        writeln('Entrer votre moyenne : ');
        readln(moyenne);

        
        while (moyenne < 0) or (moyenne > 20) do
        begin
            writeln('Moyenne invalide. Entrer une moyenne entre 0 et 20 :');
            readln(moyenne);
        end;

        
        if moyenne < 10 then
            writeln('Non admis')
        else
        begin
    
            if moyenne < 12 then
                writeln('Admis avec mention passable')
            else if (moyenne >= 12) and (moyenne < 14) then
                writeln('Admis avec mention assez bien')
            else if (moyenne >= 14) and (moyenne < 16) then
                writeln('Admis avec mention bien')
            else if (moyenne >= 16) and (moyenne < 18) then
                writeln('Admis avec mention tres bien')
            else
                writeln('Admis avec mention excellence');
        end;

        writeln('');
        writeln('Voulez-vous continuer ? (oui/non)');
        readln(reponse);
    end;
end.