# CC-NewsletterApp-Back

# Introducere
Pentru realizarea proiectului, am ales sa creez o aplicatie de Newsletter, deoarece este o functionalitate des intalnita in zilele noastre. Astfel, am creat 2 repositories, unul pentru partea de backend si unul pentru partea de frontend. Link-urile catre acestea sunt urmatoarele:

- backend: https://github.com/Octavia0402/CC-NewsletterApp-Back.git
- frontend: https://github.com/Octavia0402/CC-NewsletterApp-Front.git

Publicarea aplicatiei a fost realizata prin Heroku:
https://radiant-lake-37722.herokuapp.com/

De asemenea, prezentarea proiectului poate fi gasita pe urmatorul link:
https://youtu.be/8AJl-nYqRGM

# Descriere problema
Aplicatia are ca functionalitate trimiterea de mail-uri catre utilizatorii care s-au abonat la newsletter, in romana, engleza sau ambele limbi. Un utilizator se poate abona la newsletter prin completarea numelui si mail-ului in formularul existent. Exista, de asemenea, si un tabel in care se afla toti abonatii la newsletter pana in momentul curent.

Pentru crearea bazei de date am folosit Google Cloud Platform in care am creat instanta si am realizat conexiunea catre ca baza de date din MySQL Workbench. In cadrul acesteia, am creat tabela Subscribers, cu campurile entryID, subscriberName si subscriberMail. Pentru realizarea functionalitatii, am folosit Translate API din Google Cloud si API-ul oferit de Sendgrid pentru transmiterea mail-urilor. La final, am deployat aplicatia folosind Heroku.

# Descriere API

1. Add a subscriber
Am creat un POST api pentru a adauga abonatii in baza de date dupa completarea formularului (adaugarea numelui si mail-ului). 
Path-ul folosit este "/subscribers", in request se trimite un obiect ce contine numele si mail-ului abonatului, iar reponse-ul returneaza statusul reqestului si, daca adaugarea s-a facut cu succes, numarul de randuri adaugate in tabela.

2. Get all subscribers
Am creat un GET api pentru a primi toti abonatii care se afla in baza de date la momentul actual si pentru a popula tabelul din UI. 
Path-ul folosit este "/subscribers", in request nu se trimite nimic, iar response-ul returneaza o lista cu toti abonatii la newsletter.

3. Detect a language
Pentru a testa Translate API, oferit de Google Cloud am creat un GET api pentru a detecta limba in care este trimis un anumit text. 
Path-ul folosit este "/utlis/detect", in request se trimite textul caruia dorim sa ii aflam limba, iar response-ul returneaza limba respectivului text.

4. Translate a language
Tot pentru a testa Translate API, oferit de Google Cloud am creat un GET api pentru a traduce un anumit text trimis din UI.
Path-ul folosit este "/utlis/translate", in request se trimite textul pe care dorim sa il traducem si limba in care dorim, iar response-ul returneaza textul tradus in limba dorita.

5. Send a mail
Pentru a testa API-ul de trimitere de mail-uri oferit de Sendgrid, am creat un POST api pentru a trimite mail-uri catre abonati.
Path-ul folosit este "/utlis/send", in request se trimit valori pentru senderName, senderMail, receiverMail si messageContent, iar response-ul returneaza un status OK daca trimiterea s-a realizat cu succes sau unul KO in caz contrar.

6. Get all mails
Am creat un GET api care returneaza toate mail-urile tuturor abonatilor care exista in prezent in aplicatie.
Path-ul folosit este "/subscribers/allMails", in request nu se trimite nimic, iar response-ul returneaza o lista cu toate mail-urile.

7. Send a translated mail
Pentru a trimite mesajul in limba dorita catre toti abonatii newsletter-ului, am creat un POST api.
Path-ul folosit este "subscribers/sendNewsletter", in request se trimit valori pentru senderName, senderMail, receiverMail, messageContent si language, iar response-ul returneaza un status OK daca trimiterea s-a realizat cu succes sau unul KO in caz contrar.

Pentru partea de autentificare, am creat un fisier .env in care am stocat valorile necesare. 
Astfel, pentru backend am introdus in .env valorile pentru host-ul instantei, port, numele userului, parola, numele bazei de date, credentialele pentru google si un API key. Fisierul translateKey.json a fost utilizat pentru autorizarea serviciului de Translate din Google Cloud, iar API key-ul pentru autorizarea serviciului din Sendgrid.
De asemenea, pentru frontend am introdus in .env valoarea pentru API url-ul folosit pentru accesarea aplicatiei si pentru realizarea request-urilor.
