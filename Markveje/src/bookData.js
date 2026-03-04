const books = [
    {
        title: 'Hvordan de ser ud',
        author: 'Jørgen Leth',
        id: 1,
        price: 200,
        image: ['/images/hvordan-leth.png'],
        genre: 'Fiction',
        description: `Hft. med orig. omslag. Gyldendal, 1987. 1. udg., 1. opl.
        Pænt eksemplar. Lette brugsspor på omslag. Ejernavn med pen på titelblad.`
    },

    {
        title: 'Kanal',
        author: 'Jørgen Leth',
        id: 2,
        price: 300,
        image: ['/images/kanal-leth.png'],
        genre: 'Fiction',
        description: `Hft. med orig. omslag. Gyldendal, 1964. 1. udg., 1. opl.
        Pænt eksemplar.`
    },

    {
        title: 'Asfaltens sange',
        author: 'Emil Bønnelycke',
        id: 3,
        price: 300,
        image: ['/images/asfaltens-boennelycke.png'],
        genre: 'Fiction',
        description: `Sort halvlæder. Nordiske forfatteres forlag, 1918.
        1. udg., 1. opl. Pænt eksemplar. Let kantslid. Guldtitel på ryg. Løftede bånd.`
    },

    {
        title: 'Fragments of a City. Chicago Photographs',
        author: 'Keld Helmer-Petersen',
        id: 4,
        price: 800,
        image: ['/images/fragments-1.png',
                '/images/fragments-2.jpeg',
                '/images/fragments-3.jpeg'],
        genre: 'Art',
        description: `Hft. med orig. omslag. Hans Reitzel 1960. 1. udg., 1. opl. 
        Pænt eksemplar. Omslag med lette brugsspor`
    },

    {
        title: 'De Conivratione Catilinae, et de Bello Ivgvrthino Historiae',
        author: 'C.Salustii Crispi (Sallust)',
        id: 5,
        price: 2500,
        image: ['/images/sallust-1.png',
                '/images/sallust-2.jpeg'],
        genre: 'History',
        description: `Marbled boards. Later binding. 4to. Venetiis, Apud Ioannem Mariam Bonellum,
        MDLXV. Gilt title to leather plate to spine. Very good condition considering age. Light
        wear to edges of boards.`
    },

    {
        title: 'Dionysos-dityramber',
        author: 'Friedrich Nietzsche',
        id: 6,
        price: 100,
        image: ['/images/nietzsche.png'],
        genre: 'Philosophy',
        description: `Hft. med orig. omslag. Pænt eksemplar. Husets Forlag/S.O.L., 1995.`
    },

    {
        title: 'Filosofiske undersøgelser',
        author: 'Ludwig Wittgenstein',
        id: 7,
        price: 200,
        image: ['/images/wittgenstein.png'],
        genre: 'Philosophy',
        description: `Hft. med orig. omslag. Pænt eksemplar. Lette brugsspor.
        Gyldendals bogklubber, 1971.`
    },

    {
        title: 'The Air is on Fire',
        author: 'David Lynch',
        id: 8,
        price: 1000,
        image: ['/images/lynch-1.png',
                '/images/lynch-2.jpeg',
                '/images/lynch-3.jpeg',
                '/images/lynch-4.jpeg'],
        genre: 'Art',
        description: `Publisher's illustrated boards. Large 4to. Good copy. Light wear to cover.
        With 2 CD's. Richly illustrated in b/w and colour. 2nd ed. Fondation Cartier pour l'art
        contemporain, Editions Xavier Barral / Steidl, 2007.`
    },

    {
        title: 'Ansel Adams',
        author: 'Ansel Adams - Liliane De Cock (ed.)',
        id: 9,
        price: 200,
        image: ['/images/ansel-1.png',
                '/images/ansel-2.jpeg',
                '/images/ansel-3.jpeg'],
        genre: 'Art',
        description: `Publisher's boards in dust jacket. 4to. Near good. Light wear and a few
        chips to edges of dust jacket. Richly illustrated with b/w photos. 2nd printing.
        Morgan & Morgan, 1972.`
    },

    {
        title: 'Travels in Greece and Turkey, Comprehending a Particular Account of the Morea, Albania &c.',
        author: 'F. C. H. L. Pouqueville',
        id: 10,
        price: 2500,
        image: ['/images/pouqueville-1.png',
                '/images/pouqueville-2.jpeg',
                '/images/pouqueville-3.jpeg'],
        genre: 'Travel',
        description: `A comparison between the ancient and present state of Greece,
        and an historical and geographical description of the ancient Epirus.
        Contemporary half leather. Marbled boards. Gilt title to spine. Raised
        bands. Near good. Light wear to cover. Some foxing to pages. With engravings and
        foldable maps. 2nd ed. Henry Colburn and Co., London, 1820.`
    },

    {
        title: 'Hvad vil tænkning sige?',
        author: 'Martin Heidegger',
        id: 11,
        price: 150,
        image: ['/images/heidegger-tænkning.png'],
        genre: 'Philosophy',
        description: `Hft. med orig. omslag. Pænt eksemplar. Klim, 2012.`
    },

    {
        title: 'Væren og tid',
        author: 'Martin Heidegger',
        id: 12,
        price: 200,
        image: ['/images/heidegger-væren.png'],
        genre: 'Philosophy',
        description: `Hft. med orig. omslag. Pænt eksemplar. Omslag med lette brugsspor.
        Klim, 2007.`
    },

    {
        title: 'Form: Horst',
        author: 'Horst P. Horst',
        id: 13,
        price: 400,
        image: ['/images/horst-1.png',
                '/images/horst-2.jpeg',
                '/images/horst-3.jpeg',
                '/images/horst-4.jpeg'],
        genre: 'Art',
        description: `Publisher's cloth in dust jacket. Folio. Good copy. Light wear to 
        dust jacket. Illustr. with b/w photography. 1st ed. Twin Palms Publishers, 1992.`
    },

    {
        title: 'David Lynch: Beautiful Dark',
        author: 'David Lynch - Greg Olson',
        id: 14,
        price: 500,
        image: ['/images/olson-lynch.png'],
        genre: 'Art',
        description: `Publisher's fablea in dust jacket. 8vo. Good copy. Scarecrow Press, 2008.`
    },

    {
        title: 'Giacomo Joyce',
        author: 'James Joyce',
        id: 15,
        price: 150,
        image: ['/images/giacomo.png'],
        genre: 'Fiction',
        description: `Publisher's cloth in dust jacket. 8vo. Good copy. Spine of dj
        lightly sunned. Faber & Faber, 1969, reprint.`
    },

    {
        title: 'Troldkarlens hat',
        author: 'Tove Jansson',
        id: 16,
        price: 200,
        image: ['/images/jansson-hat-1.png',
                '/images/jansson-hat-2.jpeg',
                '/images/jansson-hat-3.jpeg'],
        genre: `Children's Books`,
        description: `Orig. illustr. kartonbind. Omslag med lette brugsspor, ellers pæn. Illustr.
        s/h af forfatteren. Carlsen, 1968, 2. opl.`
    },

    {
        title: 'Sent i november',
        author: 'Tove Jansson',
        id: 17,
        price: 800,
        image: ['/images/jansson-november-1.png',
                '/images/jansson-november-2.jpeg',
                '/images/jansson-november-3.jpeg'],
        genre: `Children's Books`,
        description: `Orig. illustr. kartonbind. Meget pænt eksemplar. Illustr.
        s/h af forfatteren. Carlsen, 2002, 1. udg., 1. opl.`
    },

    {
        title: 'Ceremonial Magic. A Guide to the Mechanisms of Ritual ',
        author: 'Israel Regardie',
        id: 18,
        price: 150,
        image: ['/images/regardie.png'],
        genre: `Occultism`,
        description: `Publisher's softcover. 8vo. Cover with light wear and stainage.
        Insides good. Aquarian Press, 1985.`
    },

    {
        title: `A True and Faithful Relation of What Passed for Many Years Between Dr. John
        Dee and Some Spirits`,
        author: 'John Dee',
        id: 19,
        price: 150,
        image: ['/images/dee.png'],
        genre: `Occultism`,
        description: `Publisher's paperback. Good copy. Photographic reprint. Golem Media, 2008.`
    },

    {
        title: `Jakob Bøhmes Theosophi. En religionsphilosophisk og dogmatisk Undersøgelse`,
        author: 'Henrik Scharling',
        id: 20,
        price: 200,
        image: ['/images/boehme-1.png',
                '/images/boehme-2.jpeg'],
        genre: `Occultism`,
        description: `Halvshirting. Guldtitel på ryg. Udmærket udført amatørbind.
        Pænt eksemplar. Papiret lidt brunplettet. G. E. C. Gad, 1879.`
    },

    {
        title: `Manden uden egenskaber 1-3`,
        author: 'Robert Musil',
        id: 21,
        price: 400,
        image: ['/images/musil.png'],
        genre: `Fiction`,
        description: `Hft. med smudsomslag. Pænt sæt. Smudsomslag med let kantslid. Gyldendal, 1971.`
    },

    {
        title: `Sommerfugledalen. Et requiem`,
        author: 'Inger Christensen',
        id: 22,
        price: 100,
        image: ['/images/inger-sommerfugl.png'],
        genre: `Fiction`,
        description: `Hft. med orig. omslag. Pænt eksemplar. Gyldendal, 2014, 3. udg., 8. opl.`
    },

    {
        title: `Det`,
        author: 'Inger Christensen',
        id: 23,
        price: 100,
        image: ['/images/inger-det.png'],
        genre: `Fiction`,
        description: `Hft. med orig. omslag. Pænt eksemplar. Gyldendal, 1997, 5. udg.`
    },

    {
        title: `Alfabet`,
        author: 'Inger Christensen',
        id: 24,
        price: 150,
        image: ['/images/inger-alfabet.png'],
        genre: `Fiction`,
        description: `Hft. med orig. omslag. Pænt eksemplar. Gyldendal, 1982, 2. opl.`
    },

    {
        title: `Klange. Digte 1912 / Klänge. Gedichte 1912`,
        author: 'Wassily Kandinsky',
        id: 25,
        price: 150,
        image: ['/images/kandinsky.png'],
        genre: `Fiction`,
        description: `Hft. med smudsomslag. Pænt eksemplar. Dansk-tysk paralleltekst. Illustr.
        s/h med træsnit af forfatteren. Brøndum, 1989.`
    },
];

export default books;