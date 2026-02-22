const translations = {
    hu: {
        nav: {
            home: 'Főoldal',
            minecraft: 'Minecraft',
            history: 'Történelem',
            politics: 'Politika',
            culture: 'Kultúra',
            other: 'Egyéb',
            language: 'Nyelv'
        },
        hero: {
            welcome: 'Üdvözöljük Furnovskyföldön!',
            discover: 'Fedezze fel nemzetünk gazdag történelmét és kultúráját',
            learnMore: 'Tudj meg többet'
        },
        intro: {
            title: 'Bemutatkozás',
            description: 'Üdvözlünk Furnovskyföld Nemzetszövetségi Birodalmának hivatalos oldalán! Itt megtudhatod, hogyan csatlakozhatsz Discord, illetve Minecraft szervereinkhez, valamint tanulhatsz a történelmünkről, kultúránkról, politikánkról és még sok egyébről!',
            stats: {
                population: 'Lakosság',
                area: 'Terület',
                areaValue: '200 Chunk'
            }
        },
        join: {
            title: 'Csatlakozz Közösségünkhöz',
            discord: {
                title: 'Discord Szerver',
                description: 'Csatlakozz aktív közösségünkhöz',
                button: 'Csatlakozás'
            },
            minecraft: {
                title: 'Minecraft Szerver',
                description: 'Építsd velünk városainkat',
                button: 'Kapcsolódás'
            }
        },
        history: {
            pageTitle: 'Történelem',
            pageSubtitle: 'Fedezze fel Furnovskyföld gazdag történelmi örökségét',
            welcome: 'Üdvözöljük Birodalmunkban! Ha érdekli, kérjük olvassa el ezt az üzenetet!',
            sections: {
                foundation: {
                    title: 'Alapítás',
                    content: 'Furnovskyföld Királyságát 2018. október 31-én délután 3 órakor (GMT+2) alapították meg a koronázásommal. Kezdetben egy apró városállam volt, Furnokisfaludi városa.'
                },
                expansion: {
                    title: 'Terjeszkedés és Háborúk',
                    content: 'Sok területet szereztünk egy közel egy hónapig tartó háborús időszak alatt. 2019 januárjában megnyertük a Nagy Havas Világháborút, és megszereztük a délkeleti sarkot, valamint néhány keleti, északi és délnyugati területet a szomszédoktól. Ezután nagyon jó partneri kapcsolatot alakítottunk ki a szomszédos Német-Magyar Monarchiával, amely ma már Német-Szlovák. 2020-tól jó kapcsolatban állunk a The Diamondboy birtokkal (ma Land of the Deadbringers) is, és megszereztük szigetük nyugati részét Furnovskyföld számára.'
                },
                modernEra: {
                    title: 'Modern Korszak',
                    content: 'Egy nagyon szerencsés évet kezdtünk. Bár volt COVID-19, most nagyon gazdagok vagyunk, és a gazdaság növekszik. 2021. április 15-én a Nemzetközösség zászlajára való tekintettel úgy döntöttem, hogy az országot átnevezem Furnovskyföld Nemzetközösségi Birodalomra, a következő kormányt pedig Furnovskyföld I. Szövetségi Kormányára.'
                },
                geography: {
                    title: 'Földrajz',
                    content: 'Nagyon gazdagok vagyunk, de szükségünk van az export növelésére. Csak kis mennyiségű dombunk van, egyetlen hegyünk a délkeleti országhatáron található a Német-Szlovák Monarchiával.'
                },
                government: {
                    title: 'Kormányzás',
                    content: 'Nagy kerületi rendszerünk van, jelenleg 36 kerülettel és 2 határrégióval, amelyek a térképen láthatók. Minden nagyváros 9 részre van osztva. Az irányítószámaink így néznek ki: 1019. Ez a főváros központjának irányítószáma. Az első 1 az 1. kerület. A 01 a kerület legfontosabb városa, a 9 pedig a város 9. régiója.'
                },
                flag: {
                    title: 'Zászló',
                    content: 'Az eredeti egy magyar zászló volt (piros-fehér-zöld trikolór) egy narancssárga ponttal középen. Később ezt sárgára cserélték.'
                }
            }
        },
        politics: {
            pageTitle: 'Politika',
            pageSubtitle: 'Ismerje meg Furnovskyföld politikai rendszerét',
            state_structure: {
                title: 'Államszerkezet',
                content: 'Az állam a Furnovskyföldi NEMZETSZÖVETSÉG, egy alkotmányos monarchia, 4 tagrésszel (Furnovskyföld az egyik) a Nemzetszövetségben, ez itt nem fontos mostanában. Van jelenleg Kormány, Szenátus (a kettő vegyesen törvényhozó és végrehajtó is) és bíróság, Legfelsőbb Bíróság. Parlament még nincs, az fogja funkcióiban a Szenátust cserélni, amikor az Alkotmány át lesz dolgozva.'
            },
            legislative_process: {
                title: 'Törvényhozási folyamat',
                intro: 'A törvényhozás szakaszai a következők:',
                organic_law: '<strong>Organikus Törvény:</strong> Fontos szerv vagy intézmény létrehozása, működésének részletes leírása.',
                bill: '<strong>Törvényjavaslat:</strong> Kevésbé fontos intézmény vagy koncepció, kisebb működési leírással.',
                act: '<strong>Törvény:</strong> Egy specifikus, egyszeri helyzetet szabályoz.',
                decree: '<strong>Rendelet:</strong> Csak a császártól vagy a kormánytól eredhet, bármelyik fentebbi törvénytípus formájában, szavazás nélkül. A Szenátus azonban bármikor dönthet annak hatályon kívül helyezéséről.',
                act_submit: 'Csak törvényt nyújthat be bármely lakos, a felette lévő kettőt csak a hatalmi ágak egyikébe választott személy nyújthatja be.',
                step1: 'A Szenátus megkapja a törvényjavaslatot, ami után a Szenátor kiír egy 24 órás megbeszélési időt, majd annak vége után egy (remélhetőleg) 24 órás szavazást, amely a törvények nagy részében általában egyszerű többséggel kell, hogy végződjön a továbbjutáshoz.',
                step2: 'Ha a Szenátus elfogadja, a Kormányhoz kerül, ahol ha nem fogadják el egyszerű többséggel, visszakerül a Szenátushoz átdolgozásra vagy elfogadásra egy bizonyos időn belül (nem tudom most mennyi, az Alkotmányban benne van).',
                step3: 'Ha a Kormány elfogadja, hozzám kerül, hogy vagy megvétózzam és visszakerül a Kormányhoz, vagy aláírom és törvénybe lép.'
            },
            senate: {
                title: 'A Szenátus',
                p1: 'A Szenátust 3 hónapra, minden évszak végén választjuk, Single Transferable Vote rendszerrel, a top 3 jelölt kerül be, az 1. helyezett lesz a Szenátor, a maradék 2 hely a szavazati arányok lehető legközelebbi tartásával vannak elosztva. Minden új évszak első teljes hetében lépnek hivatalba. A Legfelsőbb Bíró nem indulhat. A Szenátus basically a legelső "akadály", amin át kell mennie egy törvénynek, meg a saját működésükről szóló törvényeket szavazzák meg, azok egyértelműen nem mennek át máshova, valamint szavaz a kormánylistának az elfogadásáról. 5 tagos, mindegyikük egy-egy Megfigyelő (a Szenátor is, ő alapértelmezetten Discord belügyes) a jelenleg elérhető pozíciókkal:',
                affairs: {
                    internal: 'Discord belügy (Szenátor alapértelmezetten)',
                    foreign: 'Discord külügy',
                    minecraft: 'Minecraft ügy',
                    constitutional: 'Alkotmányügy',
                    recruitment: 'Toborzási ügy (tagok behozása a szerverre stb)'
                },
                p2: 'A Szenátor az, aki kiírja a megbeszélési és szavazási időket (tud szavazni is), rögzíti a megszavazott törvényeket egy adott fórumcsatornába, hivatalosan ő rendezi el, ki milyen Megfigyelő lesz (a sajátján kívül), kinevez helyettest és képviseli a Szenátust az államfőnél vagy a kormánynál. Egy consecutive ciklusra újraválasztható, utána 6 hónapig nem választható Szenátornak. A Megfigyelők tudnak hozzászólni egy beterjesztett törvényhez a megbeszélési időben, szavazni róluk, és a hozzájuk legközelebb álló minisztériumokkal együttműködnek.'
            },
            government: {
                title: 'A Kormány',
                p1: 'A Kormányt 6 hónapra, február és augusztus közepe fele választjuk, sima simple majoritys vote rendszerrel (FPTP), a nyertesnek viszont el kell érnie a 2/3-os többséghez, vagy koalíciós kormányt kell alakítania. Március és szeptember első teljes hetében lép hivatalba. A Legfelsőbb Bíró és párttól Független személy nem indulhat. A Kormány szavaz a saját vagy eléjük beterjesztett törvényekről. A miniszterelnök alakítja úgy a Kormányt és a Minisztériumokat, ahogyan akarja, csak azt a Szenátusnak is el kell fogadnia. Egyszer újraválasztható, utána 6 hó szünet.'
            },
            supreme_court: {
                title: 'A Legfelsőbb Bíróság',
                content: 'A Legfelsőbb Bíróság dönt az Alkotmányosság dolgairól, meg ilyenek, érted. A tagjai a Miniszterelnök, az igazságügyi miniszter, az alkotmányügyekért felelős megfigyelő és egy 4. személy, az épp létező bírák listájából a miniszterelnök által választva, általam kinevezve, és a Szenátus által 2/3-os többséggel elfogadva.'
            },
            current_gov: {
                title: 'Jelenlegi Kormány',
                table: {
                    role: 'Szerepkör',
                    name: 'Név',
                    responsibilities: 'Feladatkörök'
                }
            },
            current_senate: {
                title: 'Jelenlegi Szenátus',
                table: {
                    role: 'Szerepkör',
                    name: 'Név'
                }
            },
            current_supreme_court: {
                title: 'Jelenlegi Legfelsőbb Bíróság',
                content: 'Nincs'
            },
            government: {
                title: 'Kormányzati rendszer',
                executive: {
                    title: 'Végrehajtó hatalom',
                    description: 'A végrehajtó hatalom felépítése és működése.'
                },
                judicial: {
                    title: 'Bírói hatalom',
                    description: 'Az igazságszolgáltatás rendszere.'
                },
                legislative: {
                    title: 'Törvényhozás',
                    description: 'A törvényhozás folyamata és szervezete.'
                }
            },
            structure: {
                title: 'Politikai felépítés',
                federation: {
                    title: 'Nemzetszövetségi rendszer',
                    description: 'A Nemzetszövetség felépítése és működési elvei.'
                },
                local: {
                    title: 'Helyi önkormányzatok',
                    description: 'A helyi közigazgatás rendszere és feladatai.'
                }
            },
            foreign: {
                title: 'Külkapcsolatok',
                allies: {
                    title: 'Szövetségesek',
                    description: 'Diplomáciai kapcsolataink és szövetségeseink.'
                },
                international: {
                    title: 'Nemzetközi kapcsolatok',
                    description: 'Részvételünk a nemzetközi közösségben.'
                }
            }
        },
        culture: {
            pageTitle: 'Kultúra',
            pageSubtitle: 'Fedezze fel Furnovskyföld gazdag kulturális örökségét',
            traditions: {
                title: 'Hagyományok',
                festivals: {
                    title: 'Fesztiválok',
                    description: 'Éves rendezvényeink és ünnepségeink.'
                },
                music: {
                    title: 'Zene',
                    description: 'Zenei hagyományaink és modern interpretációk.'
                },
                cuisine: {
                    title: 'Gasztronómia',
                    description: 'Jellegzetes ételek és italok.'
                }
            },
            arts: {
                title: 'Művészetek',
                visual: {
                    title: 'Vizuális művészetek',
                    description: 'Festészet, szobrászat és modern művészeti formák.'
                },
                literature: {
                    title: 'Irodalom',
                    description: 'Költészet, próza és dráma.'
                }
            },
            modern: {
                title: 'Modern kultúra',
                gaming: {
                    title: 'Gaming',
                    description: 'E-sport és gaming közösségek.'
                },
                media: {
                    title: 'Média',
                    description: 'Film, televízió és digitális tartalom.'
                }
            }
        },
        culturalDays: {
            pageTitle: 'Kultúrnapok és Ünnepek',
            pageSubtitle: 'Fedezze fel Furnovskyföld gazdag kulturális naptárát',
            months: {
                january: 'Január',
                february: 'Február',
                march: 'Március',
                april: 'Április',
                may: 'Május',
                june: 'Június',
                july: 'Július',
                august: 'Augusztus',
                september: 'Szeptember',
                october: 'Október',
                november: 'November',
                december: 'December'
            },
            months: {
                january: 'Január',
                february: 'Február',
                march: 'Március',
                april: 'Április',
                may: 'Május',
                june: 'Június',
                july: 'Július',
                august: 'Augusztus',
                september: 'Szeptember',
                october: 'Október',
                november: 'November',
                december: 'December'
            },
            jan: {
                '1': { name: 'Jan. 1.', desc: 'Újév (ünnep, látogatási nap)' },
                '6': { name: 'Jan. 6.', desc: 'Vízkereszt' },
                '7-13': { name: 'Jan. 7-13.', desc: 'Januári Party Hét (ünnep)' }
            },
            feb: {
                movable: { name: 'Mozgó ünnep', desc: 'Karnevál, jelmezbál (ünnep)' },
                '26-28': { name: 'Febr. 26-28.', desc: 'Februári Party Napok (ünnep)' }
            },
            mar: {
                '1': { name: 'Már. 1.', desc: 'Tavasz és Szent Dávid napja (ünnep brit többségű területeken, látogatási nap)' },
                '15': { name: 'Már. 15.', desc: '1848-as Forradalom Ünnepe (ünnep magyar többségű területeken, látogatási nap)' },
                '17': { name: 'Már. 17.', desc: 'Szent Patrik napja' },
                '23': { name: 'Már. 23.', desc: 'A Virágok Napja (látogatási nap)' }
            },
            'mar-apr': {
                movable: { name: 'Mozgó ünnep', desc: 'Nagypéntek, Húsvétvasárnap, Húsvéthétfő (ünnep, látogatási nap)' }
            },
            apr: {
                '15': { name: 'Ápr. 15.', desc: 'Nemzeti Föderáció Napja (ünnep, látogatási nap, NEMZETI ÜNNEP)' },
                '23': { name: 'Ápr. 23.', desc: 'Szent György napja (ünnep brit többségű területeken)' }
            },
            may: {
                mothers: { name: 'Mozgó ünnep', desc: 'Anyák napja (május első vasárnapja)' },
                '1': { name: 'Máj. 1.', desc: 'Munka ünnepe (ünnep, látogatási nap)' },
                '8': { name: 'Máj. 8.', desc: 'Szlovákia Győzelme a Fasizmus Felett (ünnep szlovák többségű területeken, látogatási nap)' },
                '17-23': { name: 'Máj. 17-23.', desc: 'Gyermekhét (iskolai szünnap)' },
                '24-30': { name: 'Máj. 24-30.', desc: 'Szülői Hét (munkaszüneti nap, látogatási nap)' },
                '31': { name: 'Máj. 31.', desc: 'A Fák Napja (látogatási nap)' }
            },
            'may-jun': {
                movable: { name: 'Mozgó ünnep', desc: 'Pünkösdvasárnap, Pünkösdhétfő (ünnep, látogatási nap)' }
            },
            jun: {
                '1': { name: 'Jún. 1.', desc: 'Nyár napja, nyári szünet kezdete (látogatási nap)' },
                '4': { name: 'Jún. 4.', desc: 'Nemzeti Összetartozás Napja (ünnep magyar többségű területeken, látogatási nap)' },
                '15': { name: 'Jún. 15.', desc: 'Parlament Napja (ünnep, látogatási nap, NEMZETI ÜNNEP)' },
                fathers: { name: 'Mozgó ünnep', desc: 'Apák napja (június harmadik vasárnapja)' }
            },
            jul: {
                '4': { name: 'Júl. 4.', desc: 'Amerikai Függetlenség Napja (ünnep amerikai többségű területeken, látogatási nap)' },
                '5': { name: 'Júl. 5.', desc: 'Szent Cirill és Metód napja (ünnep szlovák többségű területeken)' },
                festival: { name: 'Mozgó ünnep', desc: 'Fesztivál napja (július utolsó vasárnapja, ünnep, látogatási nap)' }
            },
            aug: {
                '5': { name: 'Aug. 5.', desc: 'Himnusz Napja (ünnep, látogatási nap, NEMZETI ÜNNEP)' },
                '20': { name: 'Aug. 20.', desc: 'Szent István napja (ünnep magyar többségű területeken)' },
                '23': { name: 'Aug. 23.', desc: 'I. Furnovsky Napja (születésnapi ünnep, látogatási nap, NEMZETI ÜNNEP)' },
                '29': { name: 'Aug. 29.', desc: 'Szlovák Nemzeti Felkelés Évfordulója (ünnep szlovák többségű területeken, látogatási nap)' }
            },
            sep: {
                '1': { name: 'Szept. 1.', desc: 'Ősz, Iskola és a Szlovák Köztársaság Alkotmányának Napja (ünnep szlovák többségű területeken, látogatási nap)' },
                '15': { name: 'Szept. 15.', desc: 'Fájdalmas Szűzanya Napja (ünnep szlovák többségű területeken)' }
            },
            oct: {
                '3': { name: 'Okt. 3.', desc: 'Német Egység Napja (ünnep német többségű területeken, látogatási nap)' },
                '6': { name: 'Okt. 6.', desc: 'Aradi Vértanúk Emléknapja (ünnep magyar többségű területeken, látogatási nap)' },
                '23': { name: 'Okt. 23.', desc: '1956-os Magyar Forradalom és a Harmadik Magyar Köztársaság Kikiáltásának Évfordulója (ünnep magyar többségű területeken, születésnapi ünnep, látogatási nap)' },
                '31': { name: 'Okt. 31.', desc: 'Halloween és Államalapítás Napja (ünnep, látogatási nap, NEMZETI ÜNNEP)' }
            },
            nov: {
                '1': { name: 'Nov. 1.', desc: 'Mindenszentek (ünnep, látogatási nap)' },
                '11': { name: 'Nov. 11.', desc: 'Veteránok Napja (ünnep, látogatási nap)' },
                '17': { name: 'Nov. 17.', desc: 'Szlovákia Szabadságért és Demokráciáért Vívoott Harcának Napja (ünnep szlovák többségű területeken, látogatási nap)' },
                '30': { name: 'Nov. 30.', desc: 'Szent András napja (ünnep brit többségű területeken)' },
                thanksgiving: { name: 'Mozgó ünnep', desc: 'Hálaadás napja (november utolsó csütörtökje, ünnep amerikai többségű területeken, látogatási nap)' }
            },
            'nov-dec': {
                advent: { name: 'Mozgó ünnep', desc: '1.-4. Advent (Szent András napja utáni 1. és 4. vasárnap)' }
            },
            dec: {
                '1': { name: 'Dec. 1.', desc: 'Tél Napja (látogatási nap)' },
                '16': { name: 'Dec. 16.', desc: 'Születésnapi ünnep (születésnapi ünnep, látogatási nap)' },
                '24': { name: 'Dec. 24.', desc: 'Szenteste (látogatási nap)' },
                '25-26': { name: 'Dec. 25-26.', desc: 'Karácsony (ünnep, látogatási nap)' },
                '31': { name: 'Dec. 31.', desc: 'Szilveszter (látogatási nap)' }
            }
        },
        other: {
            pageTitle: 'Egyéb információk',
            pageSubtitle: 'További hasznos információk Furnovskyföldről',
            faq: {
                title: 'Gyakran Ismételt Kérdések',
                join: {
                    question: 'Hogyan csatlakozhatok Furnovskyföldhez?',
                    answer: 'Részletes információk a csatlakozási folyamatról és követelményekről.'
                },
                citizenship: {
                    question: 'Hogyan szerezhetek állampolgárságot?',
                    answer: 'Az állampolgárság megszerzésének feltételei és folyamata.'
                },
                visit: {
                    question: 'Hogyan látogathatok el Furnovskyföldre?',
                    answer: 'Információk a látogatásról és a szükséges engedélyekről.'
                }
            },
            resources: {
                title: 'Hasznos források',
                documents: {
                    title: 'Dokumentumok',
                    description: 'Hivatalos dokumentumok és űrlapok.',
                    link: 'Letöltés'
                },
                guides: {
                    title: 'Útmutatók',
                    description: 'Részletes útmutatók és kézikönyvek.',
                    link: 'Olvasás'
                }
            },
            contact: {
                title: 'Kapcsolatfelvétel',
                form: {
                    name: 'Név:',
                    email: 'E-mail:',
                    subject: 'Tárgy:',
                    message: 'Üzenet:',
                    submit: 'Küldés'
                }
            }
        },
        minecraft: {
            pageTitle: 'Minecraft Szerver',
            pageSubtitle: 'Csatlakozz Minecraft szerverünkhöz és építs velünk!',
            description: {
                title: 'Leírás',
                content: 'Minecraft szerverünk egy hely, ahol építhetsz, felfedezhetsz és szórakozhatsz közösségünkkel. Különféle bővítményeink és barátságos személyzetünk van, hogy segítsen a kezdésben. Akár tapasztalt játékos vagy, akár új vagy a játékban, szerverünkön otthonra találsz.'
            },
            status: {
                title: 'Szerver állapot',
                ip: 'Szerver IP:',
                version: 'Verzió:',
                status: 'Állapot:',
                players: 'Játékosok:'
            },
            gallery: {
                title: 'Galéria'
            }
        },
        footer: {
            contact: {
                title: 'Kapcsolat',
                email: 'info@furnovskyland.com',
                discord: '@furnovsky963',
                facebook: 'bence.bagosi.666'
            },
            quickLinks: {
                title: 'Gyorslinkek',
                privacy: 'Adatvédelem',
                imprint: 'Impresszum',
                contact: 'Kapcsolat'
            },
            openingHours: {
                title: 'Nyitvatartás',
                weekdays: 'Hétfő - Péntek: N/A',
                saturday: 'Szombat: N/A',
                sunday: 'Vasárnap: N/A'
            },
            copyright: '© 2024 Furnovskyland Nemzetszövetségének Birodalma'
        }
    },
    en: {
        nav: {
            home: 'Home',
            minecraft: 'Minecraft',
            history: 'History',
            politics: 'Politics',
            culture: 'Culture',
            other: 'Other',
            language: 'Language'
        },
        hero: {
            welcome: 'Welcome to Furnovskyland!',
            discover: 'Discover our nation\'s rich history and culture',
            learnMore: 'Learn More'
        },
        intro: {
            title: 'Introduction',
            description: 'Welcome to the official website of the National Federation Empire of Furnovskyland! Here you can learn how to join our Discord and Minecraft servers, and learn about our history, culture, politics, and much more!',
            stats: {
                population: 'Population',
                area: 'Area',
                areaValue: '200 Chunks'
            }
        },
        join: {
            title: 'Join Our Community',
            discord: {
                title: 'Discord Server',
                description: 'Join our active community',
                button: 'Join'
            },
            minecraft: {
                title: 'Minecraft Server',
                description: 'Build our cities with us',
                button: 'Connect'
            }
        },
        history: {
            pageTitle: 'History',
            pageSubtitle: 'Discover the rich historical heritage of Furnovskyland',
            welcome: 'Welcome to our Empire! If you are interested, please read this message!',
            sections: {
                foundation: {
                    title: 'Foundation',
                    content: 'The Kingdom of Furnovskyland was founded by my coronation on October 31, 2018 at 3pm GMT+2. It was a small city-state, the city of Furnotinyvillage.'
                },
                expansion: {
                    title: 'Expansion and Wars',
                    content: 'We gained a lot of land during a war period that lasted for almost a month. In January 2019, we won the Great Snow World War and gained the south-east corner, some eastern, northern, and south-western areas from the neighbors. After that, we became very good partners with the neighboring German-Hungarian Monarchy, now German-Slovak. From 2020, we are also in a good relationship with the Diamondboy estate (now Land of the Deadbringers) and won their western part of the island for Furnovskyland.'
                },
                modernEra: {
                    title: 'Modern Era',
                    content: 'We started a very lucky year. Although we had COVID-19, we are now very rich and the economy is growing. On April 15, 2021, for the flag of the Commonwealth, I decided to rename the country to The Empire of the Commonwealth of Furnovskyland and the next government to I. Federal Government of Furnovskyland.'
                },
                geography: {
                    title: 'Geography',
                    content: 'We are very rich, but we are in dire need of exports. We have only a small number of hills, only one mountain in the south-east of the country\'s border with the German-Slovak Monarchy.'
                },
                government: {
                    title: 'Government',
                    content: 'We have a large district system, currently with 36 and 2 border regions, which are shown on the map. Every major city is divided into 9 parts. Our postcodes are as follows: 1019. This is the postcode of the city centre of the capital. The first 1 is the 1st district. The 01 is the most important city of the district, and 9 is the 9th region of the city.'
                },
                flag: {
                    title: 'Flag',
                    content: 'The original was a Hungarian flag (red-white-green tricolor) with an orange dot in the middle. Later it was replaced by a yellow one.'
                }
            }
        },
        politics: {
            pageTitle: 'Politics',
            pageSubtitle: 'Learn about the political system of Furnovskyland',
            government: {
                title: 'Government System',
                executive: {
                    title: 'Executive Power',
                    description: 'Structure and operation of the executive branch.'
                },
                judicial: {
                    title: 'Judicial Power',
                    description: 'The justice system.'
                },
                legislative: {
                    title: 'Legislature',
                    description: 'The legislative process and organization.'
                }
            },
            structure: {
                title: 'Political Structure',
                federation: {
                    title: 'Federal System',
                    description: 'Structure and principles of the Federation.'
                },
                local: {
                    title: 'Local Governments',
                    description: 'System and duties of local administration.'
                }
            },
            foreign: {
                title: 'Foreign Relations',
                allies: {
                    title: 'Allies',
                    description: 'Our diplomatic relations and allies.'
                },
                international: {
                    title: 'International Relations',
                    description: 'Our participation in the international community.'
                }
            }
        },
        culture: {
            pageTitle: 'Culture',
            pageSubtitle: 'Explore the rich cultural heritage of Furnovskyland',
            traditions: {
                title: 'Traditions',
                festivals: {
                    title: 'Festivals',
                    description: 'Our annual events and celebrations.'
                },
                music: {
                    title: 'Music',
                    description: 'Musical traditions and modern interpretations.'
                },
                cuisine: {
                    title: 'Cuisine',
                    description: 'Characteristic foods and beverages.'
                }
            },
            arts: {
                title: 'Arts',
                visual: {
                    title: 'Visual Arts',
                    description: 'Painting, sculpture, and modern art forms.'
                },
                literature: {
                    title: 'Literature',
                    description: 'Poetry, prose, and drama.'
                }
            },
            modern: {
                title: 'Modern Culture',
                gaming: {
                    title: 'Gaming',
                    description: 'E-sports and gaming communities.'
                },
                media: {
                    title: 'Media',
                    description: 'Film, television, and digital content.'
                }
            }
        },
        other: {
            pageTitle: 'Other Information',
            pageSubtitle: 'Additional useful information about Furnovskyland',
            faq: {
                title: 'Frequently Asked Questions',
                join: {
                    question: 'How can I join Furnovskyland?',
                    answer: 'Detailed information about the joining process and requirements.'
                },
                citizenship: {
                    question: 'How can I obtain citizenship?',
                    answer: 'Conditions and process for obtaining citizenship.'
                },
                visit: {
                    question: 'How can I visit Furnovskyland?',
                    answer: 'Information about visiting and required permits.'
                }
            },
            resources: {
                title: 'Useful Resources',
                documents: {
                    title: 'Documents',
                    description: 'Official documents and forms.',
                    link: 'Download'
                },
                guides: {
                    title: 'Guides',
                    description: 'Detailed guides and manuals.',
                    link: 'Read'
                }
            },
            contact: {
                title: 'Contact Us',
                form: {
                    name: 'Name:',
                    email: 'Email:',
                    subject: 'Subject:',
                    message: 'Message:',
                    submit: 'Send'
                }
            }
        },
        minecraft: {
            pageTitle: 'Minecraft Server',
            pageSubtitle: 'Join our Minecraft server and build with us!',
            description: {
                title: 'Description',
                content: 'Our Minecraft server is a place where you can build, explore, and have fun with our community. We have a variety of plugins and a friendly staff to help you get started. Whether you are a seasoned player or new to the game, you will find a home on our server.'
            },
            status: {
                title: 'Server Status',
                ip: 'Server IP:',
                version: 'Version:',
                status: 'Status:',
                players: 'Players:'
            },
            gallery: {
                title: 'Gallery'
            }
        },
        footer: {
            contact: {
                title: 'Contact',
                email: 'info@furnovskyland.com',
                discord: '@furnovsky963',
                facebook: 'bence.bagosi.666'
            },
            quickLinks: {
                title: 'Quick Links',
                privacy: 'Privacy Policy',
                imprint: 'Imprint',
                contact: 'Contact'
            },
            openingHours: {
                title: 'Opening Hours',
                weekdays: 'Monday - Friday: N/A',
                saturday: 'Saturday: N/A',
                sunday: 'Sunday: N/A'
            },
            copyright: '© 2024 National Federation Empire of Furnovskyland'
        }
    },
    de: {
        nav: {
            home: 'Startseite',
            minecraft: 'Minecraft',
            history: 'Geschichte',
            politics: 'Politik',
            culture: 'Kultur',
            other: 'Sonstiges',
            language: 'Sprache'
        },
        hero: {
            welcome: 'Willkommen in Furnovskyland!',
            discover: 'Entdecken Sie die reiche Geschichte und Kultur unserer Nation',
            learnMore: 'Mehr erfahren'
        },
        intro: {
            title: 'Einführung',
            description: 'Willkommen auf der offiziellen Website des Nationalen Föderationsreiches Furnovskyland! Hier erfahren Sie, wie Sie unseren Discord- und Minecraft-Servern beitreten können und lernen mehr über unsere Geschichte, Kultur, Politik und vieles mehr!',
            stats: {
                population: 'Bevölkerung',
                area: 'Fläche',
                areaValue: '200 Chunks'
            }
        },
        join: {
            title: 'Treten Sie unserer Gemeinschaft bei',
            discord: {
                title: 'Discord Server',
                description: 'Treten Sie unserer aktiven Gemeinschaft bei',
                button: 'Beitreten'
            },
            minecraft: {
                title: 'Minecraft Server',
                description: 'Bauen Sie mit uns unsere Städte',
                button: 'Verbinden'
            }
        },
        history: {
            pageTitle: 'Geschichte',
            pageSubtitle: 'Entdecken Sie das reiche historische Erbe von Furnovskyland',
            welcome: 'Willkommen in unserem Reich! Wenn Sie interessiert sind, lesen Sie bitte diese Nachricht!',
            sections: {
                foundation: {
                    title: 'Gründung',
                    content: 'Das Königreich Furnovskyland wurde durch meine Krönung am 31. Oktober 2018 um 15 Uhr GMT+2 gegründet. Es war ein kleiner Stadtstaat, die Stadt Furnotinyvillage.'
                },
                expansion: {
                    title: 'Expansion und Kriege',
                    content: 'Wir erhielten viele Länder während einer Kriegsperiode, die fast einen Monat dauerte. Im Januar 2019 gewannen wir den Großen Schneeweltkrieg und erhielten die südöstliche Ecke, sowie einige östliche, nördliche und südwestliche Gebiete von den Nachbarn. Danach wurden wir sehr gute Partner mit der benachbarten Deutsch-Ungarischen Monarchie, jetzt Deutsch-Slowakisch. Ab 2020 stehen wir auch in guter Beziehung zum Diamondboy-Anwesen (jetzt Land der Deadbringers) und gewannen deren westlichen Teil der Insel für Furnovskyland.'
                },
                modernEra: {
                    title: 'Moderne Ära',
                    content: 'Wir begannen ein sehr glückliches Jahr. Obwohl wir COVID-19 hatten, sind wir jetzt sehr reich und die Wirtschaft wächst. Am 15. April 2021 beschloss ich für die Flagge des Commonwealth, das Land in Das Reich des Commonwealth von Furnovskyland umzubenennen und die nächste Regierung in I. Bundesregierung von Furnovskyland.'
                },
                geography: {
                    title: 'Geographie',
                    content: 'Wir sind sehr reich, brauchen aber dringend Exporte. Wir haben nur eine kleine Anzahl von Hügeln, nur einen Berg im Südosten der Landesgrenze mit der Deutsch-Slowakischen Monarchie.'
                },
                government: {
                    title: 'Regierung',
                    content: 'Wir haben ein großes Bezirkssystem, derzeit mit 36 und 2 Grenzregionen, die auf der Karte gezeigt werden. Jede große Stadt ist in 9 Teile unterteilt. Unsere Postleitzahlen sind wie folgt: 1019. Dies ist die Postleitzahl des Stadtzentrums der Hauptstadt. Die erste 1 ist der 1. Bezirk. Die 01 ist die wichtigste Stadt des Bezirks, und 9 ist die 9. Region der Stadt.'
                },
                flag: {
                    title: 'Flagge',
                    content: 'Die ursprüngliche war eine ungarische Flagge (rot-weiß-grüne Trikolore) mit einem orangen Punkt in der Mitte. Später wurde sie durch eine gelbe ersetzt.'
                }
            }
        },
        politics: {
            pageTitle: 'Politik',
            pageSubtitle: 'Lernen Sie das politische System von Furnovskyland kennen',
            government: {
                title: 'Regierungssystem',
                executive: {
                    title: 'Exekutive',
                    description: 'Aufbau und Funktion der Exekutive.'
                },
                judicial: {
                    title: 'Judikative',
                    description: 'Das Justizsystem.'
                },
                legislative: {
                    title: 'Legislative',
                    description: 'Der Gesetzgebungsprozess und Organisation.'
                }
            },
            structure: {
                title: 'Politische Struktur',
                federation: {
                    title: 'Föderales System',
                    description: 'Aufbau und Prinzipien der Föderation.'
                },
                local: {
                    title: 'Kommunalverwaltungen',
                    description: 'System und Aufgaben der lokalen Verwaltung.'
                }
            },
            foreign: {
                title: 'Außenbeziehungen',
                allies: {
                    title: 'Verbündete',
                    description: 'Unsere diplomatischen Beziehungen und Verbündeten.'
                },
                international: {
                    title: 'Internationale Beziehungen',
                    description: 'Unsere Teilnahme an der internationalen Gemeinschaft.'
                }
            }
        },
        culture: {
            pageTitle: 'Kultur',
            pageSubtitle: 'Entdecken Sie das reiche kulturelle Erbe von Furnovskyland',
            traditions: {
                title: 'Traditionen',
                festivals: {
                    title: 'Festivals',
                    description: 'Unsere jährlichen Veranstaltungen und Feiern.'
                },
                music: {
                    title: 'Musik',
                    description: 'Musikalische Traditionen und moderne Interpretationen.'
                },
                cuisine: {
                    title: 'Küche',
                    description: 'Charakteristische Speisen und Getränke.'
                }
            },
            arts: {
                title: 'Künste',
                visual: {
                    title: 'Bildende Künste',
                    description: 'Malerei, Bildhauerei und moderne Kunstformen.'
                },
                literature: {
                    title: 'Literatur',
                    description: 'Poesie, Prosa und Drama.'
                }
            },
            modern: {
                title: 'Moderne Kultur',
                gaming: {
                    title: 'Gaming',
                    description: 'E-Sport und Gaming-Communities.'
                },
                media: {
                    title: 'Medien',
                    description: 'Film, Fernsehen und digitale Inhalte.'
                }
            }
        },
        other: {
            pageTitle: 'Weitere Informationen',
            pageSubtitle: 'Zusätzliche nützliche Informationen über Furnovskyland',
            faq: {
                title: 'Häufig gestellte Fragen',
                join: {
                    question: 'Wie kann ich Furnovskyland beitreten?',
                    answer: 'Detaillierte Informationen zum Beitrittsprozess und den Anforderungen.'
                },
                citizenship: {
                    question: 'Wie kann ich die Staatsbürgerschaft erhalten?',
                    answer: 'Bedingungen und Prozess für den Erhalt der Staatsbürgerschaft.'
                },
                visit: {
                    question: 'Wie kann ich Furnovskyland besuchen?',
                    answer: 'Informationen über Besuche und erforderliche Genehmigungen.'
                }
            },
            resources: {
                title: 'Nützliche Ressourcen',
                documents: {
                    title: 'Dokumente',
                    description: 'Offizielle Dokumente und Formulare.',
                    link: 'Herunterladen'
                },
                guides: {
                    title: 'Anleitungen',
                    description: 'Detaillierte Anleitungen und Handbücher.',
                    link: 'Lesen'
                }
            },
            contact: {
                title: 'Kontakt',
                form: {
                    name: 'Name:',
                    email: 'E-Mail:',
                    subject: 'Betreff:',
                    message: 'Nachricht:',
                    submit: 'Senden'
                }
            }
        },
        minecraft: {
            pageTitle: 'Minecraft Server',
            pageSubtitle: 'Treten Sie unserem Minecraft-Server bei und bauen Sie mit uns!',
            description: {
                title: 'Beschreibung',
                content: 'Unser Minecraft-Server ist ein Ort, an dem Sie bauen, erkunden und Spaß mit unserer Community haben können. Wir haben eine Vielzahl von Plugins und ein freundliches Personal, das Ihnen den Einstieg erleichtert. Egal, ob Sie ein erfahrener Spieler oder neu im Spiel sind, auf unserem Server finden Sie ein Zuhause.'
            },
            status: {
                title: 'Serverstatus',
                ip: 'Server-IP:',
                version: 'Version:',
                status: 'Status:',
                players: 'Spieler:'
            },
            gallery: {
                title: 'Galerie'
            }
        },
        footer: {
            contact: {
                title: 'Kontakt',
                email: 'info@furnovskyland.com',
                discord: '@furnovsky963',
                facebook: 'bence.bagosi.666'
            },
            quickLinks: {
                title: 'Schnelllinks',
                privacy: 'Datenschutz',
                imprint: 'Impressum',
                contact: 'Kontakt'
            },
            openingHours: {
                title: 'Öffnungszeiten',
                weekdays: 'Montag - Freitag: N/A',
                saturday: 'Samstag: N/A',
                sunday: 'Sonntag: N/A'
            },
            copyright: '© 2024 Nationales Föderationsreich Furnovskyland'
        }
    },
    sk: {
        nav: {
            home: 'Domov',
            minecraft: 'Minecraft',
            history: 'História',
            politics: 'Pravidlá',
            culture: 'Kultúra',
            other: 'Ostatné',
            language: 'Jazyk'
        },
        hero: {
            welcome: 'Vitajte vo Furnovskyland!',
            discover: 'Objavte bohatú históriu a kultúru nášho národa',
            learnMore: 'Zistite viac'
        },
        intro: {
            title: 'Úvod',
            description: 'Vitajte na oficiálnej webovej stránke Národnej federatívnej ríše Furnovskyland! Tu sa dozviete, ako sa pripojiť k našim serverom Discord a Minecraft, a dozviete sa o našej histórii, kultúre, politike a oveľa viac!',
            stats: {
                population: 'Obyvateľstvo',
                area: 'Rozloha',
                areaValue: '200 chunkov'
            }
        },
        join: {
            title: 'Pripojte sa k našej komunite',
            discord: {
                title: 'Discord Server',
                description: 'Pripojte sa k našej aktívnej komunite',
                button: 'Pripojiť sa'
            },
            minecraft: {
                title: 'Minecraft Server',
                description: 'Stavajte s nami naše mestá',
                button: 'Pripojiť'
            }
        },
        history: {
            pageTitle: 'História',
            pageSubtitle: 'Objavte bohaté historické dedičstvo Furnovskylandu',
            welcome: 'Vitajte v našej ríši! Ak máte záujem, prečítajte si túto správu!',
            sections: {
                foundation: {
                    title: 'Založenie',
                    content: 'Kráľovstvo Furnovskyland bolo založené mojou korunováciou 31. októbra 2018 o 15:00 GMT+2. Bol to malý mestský štát, mesto Furnotinyvillage.'
                },
                expansion: {
                    title: 'Expanzia a vojny',
                    content: 'Počas vojnového obdobia, ktoré trvalo takmer mesiac, sme získali veľa územia. V januári 2019 sme vyhrali Veľkú snehovú svetovú vojnu a od susedov sme získali juhovýchodný roh, niektoré východné, severné a juhozápadné oblasti. Potom sme sa stali veľmi dobrými partnermi so susednou Nemecko-Uhorskou monarchiou, teraz Nemecko-Slovenskou. Od roku 2020 máme tiež dobré vzťahy s panstvom Diamondboy (teraz Krajina nositeľov smrti) a pre Furnovskyland sme vyhrali ich západnú časť ostrova.'
                },
                modernEra: {
                    title: 'Moderná éra',
                    content: 'Začali sme veľmi šťastný rok. Hoci sme mali COVID-19, teraz sme veľmi bohatí a ekonomika rastie. 15. apríla 2021 som sa pre vlajku Spoločenstva rozhodol premenovať krajinu na Ríšu Spoločenstva Furnovskyland a ďalšiu vládu na I. federálnu vládu Furnovskylandu.'
                },
                geography: {
                    title: 'Geografia',
                    content: 'Sme veľmi bohatí, ale nutne potrebujeme export. Máme len malý počet kopcov, iba jednu horu na juhovýchode hranice krajiny s Nemecko-Slovenskou monarchiou.'
                },
                government: {
                    title: 'Vláda',
                    content: 'Máme veľký okresný systém, v súčasnosti s 36 a 2 hraničnými regiónmi, ktoré sú zobrazené na mape. Každé väčšie mesto je rozdelené na 9 častí. Naše poštové smerovacie čísla sú nasledovné: 1019. Toto je poštové smerovacie číslo centra hlavného mesta. Prvá 1 je 1. okres. 01 je najdôležitejšie mesto okresu a 9 je 9. región mesta.'
                },
                flag: {
                    title: 'Vlajka',
                    content: 'Pôvodná bola maďarská vlajka (červeno-bielo-zelená trikolóra) s oranžovou bodkou v strede. Neskôr bola nahradená žltou.'
                }
            }
        },
        politics: {
            pageTitle: 'Pravidlá',
            pageSubtitle: 'Zoznámte sa s politickým systémom Furnovskylandu',
            government: {
                title: 'Vládny systém',
                executive: {
                    title: 'Výkonná moc',
                    description: 'Štruktúra a fungovanie výkonnej moci.'
                },
                judicial: {
                    title: 'Súdna moc',
                    description: 'Systém súdnictva.'
                },
                legislative: {
                    title: 'Zákonodarná moc',
                    description: 'Zákonodarný proces a organizácia.'
                }
            },
            structure: {
                title: 'Politická štruktúra',
                federation: {
                    title: 'Federálny systém',
                    description: 'Štruktúra a princípy Federácie.'
                },
                local: {
                    title: 'Miestne samosprávy',
                    description: 'Systém a povinnosti miestnej správy.'
                }
            },
            foreign: {
                title: 'Zahraničné vzťahy',
                allies: {
                    title: 'Spojenci',
                    description: 'Naše diplomatické vzťahy a spojenci.'
                },
                international: {
                    title: 'Medzinárodné vzťahy',
                    description: 'Naša účasť v medzinárodnom spoločenstve.'
                }
            }
        },
        culture: {
            pageTitle: 'Kultúra',
            pageSubtitle: 'Objavte bohaté kultúrne dedičstvo Furnovskylandu',
            traditions: {
                title: 'Tradície',
                festivals: {
                    title: 'Festivaly',
                    description: 'Naše každoročné podujatia a oslavy.'
                },
                music: {
                    title: 'Hudba',
                    description: 'Hudobné tradície a moderné interpretácie.'
                },
                cuisine: {
                    title: 'Kuchyňa',
                    description: 'Charakteristické jedlá a nápoje.'
                }
            },
            arts: {
                title: 'Umenie',
                visual: {
                    title: 'Vizuálne umenie',
                    description: 'Maliarstvo, sochárstvo a moderné umelecké formy.'
                },
                literature: {
                    title: 'Literatúra',
                    description: 'Poézia, próza a dráma.'
                }
            },
            modern: {
                title: 'Moderná kultúra',
                gaming: {
                    title: 'Hranie hier',
                    description: 'E-športy a herné komunity.'
                },
                media: {
                    title: 'Médiá',
                    description: 'Film, televízia a digitálny obsah.'
                }
            }
        },
        culturalDays: {
            pageTitle: 'Kultúrne dni a sviatky',
            pageSubtitle: 'Preskúmajte bohatý kultúrny kalendár Furnovskylandu',
            jan: {
                '1': { name: '1. jan.', desc: 'Nový rok (sviatok, návštevný deň)' },
                '6': { name: '6. jan.', desc: 'Zjavenie Pána' },
                '7-13': { name: '7.-13. jan.', desc: 'Januárový týždeň večierkov (sviatok)' }
            },
            feb: {
                movable: { name: 'Pohyblivý sviatok', desc: 'Karneval, maškarný ples (sviatok)' },
                '26-28': { name: '26.-28. feb.', desc: 'Februárové dni večierkov (sviatok)' }
            },
            mar: {
                '1': { name: '1. mar.', desc: 'Deň jari a sv. Dávida (sviatok v oblastiach s britskou väčšinou, návštevný deň)' },
                '15': { name: '15. mar.', desc: 'Sviatok revolúcie 1848 (sviatok v oblastiach s maďarskou väčšinou, návštevný deň)' },
                '17': { name: '17. mar.', desc: 'Deň sv. Patrika' },
                '23': { name: '23. mar.', desc: 'Deň kvetov (návštevný deň)' }
            },
            'mar-apr': {
                movable: { name: 'Pohyblivý sviatok', desc: 'Veľký piatok, Veľkonočná nedeľa, Veľkonočný pondelok (sviatok, návštevný deň)' }
            },
            apr: {
                '15': { name: '15. apr.', desc: 'Deň Národnej federácie (sviatok, návštevný deň, NÁRODNÝ SVIATOK)' },
                '23': { name: '23. apr.', desc: 'Deň sv. Juraja (sviatok v oblastiach s britskou väčšinou)' }
            },
            may: {
                mothers: { name: 'Pohyblivý sviatok', desc: 'Deň matiek (prvá nedeľa v máji)' },
                '1': { name: '1. máj', desc: 'Sviatok práce (sviatok, návštevný deň)' },
                '8': { name: '8. máj', desc: 'Deň víťazstva nad fašizmom (sviatok v oblastiach so slovenskou väčšinou, návštevný deň)' },
                '17-23': { name: '17.-23. máj', desc: 'Týždeň detí (školské prázdniny)' },
                '24-30': { name: '24.-30. máj', desc: 'Týždeň rodičov (deň pracovného pokoja, návštevný deň)' },
                '31': { name: '31. máj', desc: 'Deň stromov (návštevný deň)' }
            },
            'may-jun': {
                movable: { name: 'Pohyblivý sviatok', desc: 'Turíčna nedeľa, Turíčne pondelok (sviatok, návštevny deň)' }
            },
            jun: {
                '1': { name: '1. jún', desc: 'Deň leta, začiatok letných prázdnin (návštevný deň)' },
                '4': { name: '4. jún', desc: 'Deň národnej súdržnosti (sviatok v oblastiach s maďarskou väčšinou, návštevný deň)' },
                '15': { name: '15. jún', desc: 'Deň parlamentu (sviatok, návštevný deň, NÁRODNÝ SVIATOK)' },
                fathers: { name: 'Pohyblivý sviatok', desc: 'Deň otcov (tretia nedeľa v júni)' }
            },
            jul: {
                '4': { name: '4. júl', desc: 'Deň nezávislosti USA (sviatok v oblastiach s americkou väčšinou, návštevný deň)' },
                '5': { name: '5. júl', desc: 'Sviatok svätého Cyrila a Metoda (sviatok v oblastiach so slovenskou väčšinou)' },
                festival: { name: 'Pohyblivý sviatok', desc: 'Deň festivalu (posledná nedeľa v júli, sviatok, návštevný deň)' }
            },
            aug: {
                '5': { name: '5. aug.', desc: 'Deň hymny (sviatok, návštevný deň, NÁRODNÝ SVIATOK)' },
                '20': { name: '20. aug.', desc: 'Deň sv. Štefana (sviatok v oblastiach s maďarskou väčšinou)' },
                '23': { name: '23. aug.', desc: 'Deň I. Furnovského (narodeninový sviatok, návštevný deň, NÁRODNÝ SVIATOK)' },
                '29': { name: '29. aug.', desc: 'Výročie Slovenského národného povstania (sviatok v oblastiach so slovenskou väčšinou, návštevný deň)' }
            },
            sep: {
                '1': { name: '1. sep.', desc: 'Deň jesene, školy a Ústavy Slovenskej republiky (sviatok v oblastiach so slovenskou väčšinou, návštevný deň)' },
                '15': { name: '15. sep.', desc: 'Sviatok Panny Márie Sedembolestnej (sviatok v oblastiach so slovenskou väčšinou)' }
            },
            oct: {
                '3': { name: '3. okt.', desc: 'Deň nemeckej jednoty (sviatok v oblastiach s nemeckou väčšinou, návštevný deň)' },
                '6': { name: '6. okt.', desc: 'Pamätný deň aradských mučeníkov (sviatok v oblastiach s maďarskou väčšinou, návštevný deň)' },
                '23': { name: '23. okt.', desc: 'Výročie maďarskej revolúcie 1956 a vyhlásenia Tretej maďarskej republiky (sviatok v oblastiach s maďarskou väčšinou, narodeninový sviatok, návštevný deň)' },
                '31': { name: '31. okt.', desc: 'Halloween a Deň založenia štátu (sviatok, návštevný deň, NÁRODNÝ SVIATOK)' }
            },
            nov: {
                '1': { name: '1. nov.', desc: 'Sviatok všetkých svätých (sviatok, návštevný deň)' },
                '11': { name: '11. nov.', desc: 'Deň veteránov (sviatok, návštevný deň)' },
                '17': { name: '17. nov.', desc: 'Deň boja za slobodu a demokraciu (sviatok v oblastiach so slovenskou väčšinou, návštevný deň)' },
                '30': { name: '30. nov.', desc: 'Deň sv. Ondreja (sviatok v oblastiach s britskou väčšinou)' },
                thanksgiving: { name: 'Pohyblivý sviatok', desc: 'Deň vďakyvzdania (posledný štvrtok v novembri, sviatok v oblastiach s americkou väčšinou, návštevný deň)' }
            },
            'nov-dec': {
                advent: { name: 'Pohyblivý sviatok', desc: '1.-4. advent (od 1. do 4. nedele po dni sv. Ondreja)' }
            },
            dec: {
                '1': { name: '1. dec.', desc: 'Deň zimy (návštevný deň)' },
                '16': { name: '16. dec.', desc: 'Narodeninový sviatok (narodeninový sviatok, návštevný deň)' },
                '24': { name: '24. dec.', desc: 'Štedrý večer (návštevný deň)' },
                '25-26': { name: '25.-26. dec.', desc: 'Vianoce (sviatok, návštevný deň)' },
                '31': { name: '31. dec.', desc: 'Silvester (návštevný deň)' }
            }
        },
        other: {
            pageTitle: 'Ostatné informácie',
            pageSubtitle: 'Ďalšie užitočné informácie o Furnovskyland',
            faq: {
                title: 'Často kladené otázky',
                join: {
                    question: 'Ako sa môžem pripojiť k Furnovskylandu?',
                    answer: 'Podrobné informácie o procese pripojenia a požiadavkách.'
                },
                citizenship: {
                    question: 'Ako môžem získať občianstvo?',
                    answer: 'Podmienky a proces získania občianstva.'
                },
                visit: {
                    question: 'Ako môžem navštíviť Furnovskyland?',
                    answer: 'Informácie o návšteve a potrebných povoleniach.'
                }
            },
            resources: {
                title: 'Užitočné zdroje',
                documents: {
                    title: 'Dokumenty',
                    description: 'Oficiálne dokumenty a formuláre.',
                    link: 'Stiahnuť'
                },
                guides: {
                    title: 'Príručky',
                    description: 'Podrobné príručky a manuály.',
                    link: 'Čítať'
                }
            },
            contact: {
                title: 'Kontaktujte nás',
                form: {
                    name: 'Meno:',
                    email: 'E-mail:',
                    subject: 'Predmet:',
                    message: 'Správa:',
                    submit: 'Odoslať'
                }
            }
        },
        minecraft: {
            pageTitle: 'Minecraft Server',
            pageSubtitle: 'Pripojte sa k nášmu Minecraft serveru a stavajte s nami!',
            description: {
                title: 'Popis',
                content: 'Náš Minecraft server je miesto, kde môžete stavať, objavovať a baviť sa s našou komunitou. Máme rôzne pluginy a priateľský personál, ktorý vám pomôže začať. Či už ste skúsený hráč alebo nový v hre, na našom serveri nájdete domov.'
            },
            status: {
                title: 'Stav servera',
                ip: 'IP servera:',
                version: 'Verzia:',
                status: 'Stav:',
                players: 'Hráči:'
            },
            gallery: {
                title: 'Galéria'
            }
        },
        footer: {
            contact: {
                title: 'Kontakt',
                email: 'info@furnovskyland.com',
                discord: '@furnovsky963',
                facebook: 'bence.bagosi.666'
            },
            quickLinks: {
                title: 'Rýchle odkazy',
                privacy: 'Ochrana osobných údajov',
                imprint: 'Impresum',
                contact: 'Kontakt'
            },
            openingHours: {
                title: 'Otváracie hodiny',
                weekdays: 'Pondelok - Piatok: N/A',
                saturday: 'Sobota: N/A',
                sunday: 'Nedeľa: N/A'
            },
            copyright: '© 2024 Národná federatívna ríša Furnovskyland'
        }
    }
};