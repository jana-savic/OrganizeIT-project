# OrganizeIT-project
Povlačenje veb aplikacije za praćenje sopstvenih obaveza na lokalnoj mašini može se izvršiti na sledeći način:
1. U terminalu se pozicionirati u direktorijum u kom želite da sačuvate projekat pomoću komande "cd"
2. git clone https://github.com/jana-savic/OrganizeIT-project.git
3. Za povlačenje najnovijih promena sa Github-a koristiti komandu "git pull"

Pokretanje veb aplikacije za praćenje sopstvenih obaveza na lokalnoj mašini može se izvršiti na sledeći način:
1. U terminalu se pozicionirati u folder "server" - cd server
2. npm run start
3. U novom terminalu se pozicionirati u folder "client" - cd client
4. npm run start

Na ovaj način pristupili ste stranici nelogovanog korisnika koja za vas izlistava motivacione citate ili vas vodi do stranice za logovanje i registraciju. Korisnik se može registrovati, što ga odmah upisuje u bazu i dodeljuje mu rolu "USER". Takodje, ukoliko ste se prethodno registrovali, sada se možete ulogovati na svoj već postojeći profil. Svaki "USER" naše aplikacije ima mogućnost da unosi, menja i briše svoje zadatke, a svakom zadatku može dodati naziv, trenutni procenat napretka i jednu od tri kategorije. Sve ovo u bilo kom trenutku može izmeniti kako bi bolje pratio svoj napredak. Po dodavanju prve obaveze korisniku se prikazuje i piechart prikaz - koje obaveze su samo započete, koje su u izradi i koje su završene, tako da procentualno može meriti svoju produktivnost. Nakon dodatih 5 obaveza, svaka sledeća obaveza korisnika će se smestiti na novoj stranici, zarad boljeg praćenja. Takođe, korisnik može svoje obaveze filtrirati po kategoriji. Ukoliko je prijavljeni korisnik u našoj bazi zabeležen sa ulogom "ADMIN" on će na svojoj glavnoj stranici imati prikaz svih postojećih korisnika sa rolom "USER" u sistemu. Obezbeđena je i funkcionalnost promene šifre u slučaju da ju je korisnik zaboravio. Kroz ovu aplikaciju, korisnici mogu jednostavno, lako i pregledno pratiti svoju produktivnost i svakodnevne obaveze. 
