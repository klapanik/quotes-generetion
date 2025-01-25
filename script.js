document.addEventListener('DOMContentLoaded', () => {
    let quot = document.querySelector('#quotes');
    let author = document.querySelector('#author');
    let buttonElement = document.querySelector('.generate-button');
    let loadingQuotes = document.querySelector('.loading-quotes');
    let quotesDataContent = document.querySelector('.quotes');

    let quoteList = [{
        name: 'Bjarne Stroustrup',
        quot: 'Ive always dreamed that my computer could be used as easily as a telephone; my dream has come true: I can no longer figure out how to use my phone.'
    },
    {
        name: 'Eric S. Raymond',
        quot: 'Learning to code cannot teach you to be an expert, any more than learning brushes and paints can turn someone into an artist.'
    },
    {
        name: 'Mosher’s Law of Software Engineering',
        quot: 'Dont worry if something doesnt work. If everything worked, you would be fired.'
    },
    {
        name: 'Oktal',
        quot: 'I think Microsoft named the technology .Net so it wouldnt show up in Unix directory listings.'
    },
    {
        name: 'Thomas C. Gale',
        quot: 'In good design, adding a thing costs less than the thing itself.'
    },
    {
        name: 'Martin Golding',
        quot: 'Always write code as if it would be accompanied by a violent psychopath who knows where you live.'
    },
    {
        name: 'Alan J. Perlis.',
        quot: 'A low-level language is when attention is required to things that have nothing to do with programs in that language.'
    }]

    const dbName = 'QuotesDB';
    const dbVersion = 5;
    const request = window.indexedDB.open(dbName, dbVersion);
    let objectStore;
    let db;

    request.onerror = (event) => {
        console.warn('Error in request: ', event.target.error)
    }

    request.onsuccess = (event) => {
        db = event.target.result;
        console.log('request onsuccess')

        const transaction = makeNewTX('quotesStore', 'readonly')
        const store = transaction.objectStore('quotesStore')

        // let getReq = store.getAll()

        // getReq.onsuccess = (event) => {
        //     let request = event.target;

        //     quot.innerText = request.result[0].quot;
        //     author.innerText = request.result[0].name;
        // }

        let getReq = store.get(1) // тут вопросик есть у меня 

        getReq.onsuccess = (event) => {
            console.log('getRequest was succassfully done')
            let request = event.target;

            quot.innerText = request.result.quot;
            author.innerText = request.result.name;
        }
        getReq.onerror = (event) => {
            console.warn('Error in getRequest: ', event.target.error)
        }
    }

    request.onupgradeneeded = (event) => {
        db = event.target.result;
        console.log('request onupgradeneeded')

        if (!db.objectStoreNames.contains('quotesStore')) {
            objectStore = db.createObjectStore('quotesStore', { keyPath: 'id' });
        }

        quoteList.forEach((quote) => {
            objectStore.add(quote);
        });
    };

    function generateNewQuot() {
        const transaction = makeNewTX('quotesStore', 'readonly');
        const store = transaction.objectStore('quotesStore');

        const request = store.count(); // я тут чуть-чуть не понял 

        console.log(request);

        request.onsuccess = (event) => {
            const count = event.target.result;
            const randomIndex = Math.floor(Math.random() * count)
            console.log(randomIndex)

            let getReq = store.get(randomIndex + 1)

            getReq.onsuccess = (event) => {
                console.log('generateNewQuot getRequest was succassfully done')
                let request = event.target;

                loadingQuotes.style.display = 'block'
                quotesDataContent.replaceWith(loadingQuotes)

                setTimeout(() => {
                    quot.innerText = request.result.quot;
                    author.innerText = request.result.name;

                    loadingQuotes.replaceWith(quotesDataContent)
                    loadingQuotes.style.display = 'none'
                }, 1500)
            }
            getReq.onerror = (event) => {
                console.warn('Error in generateNewQuot getRequest: ', event.target.error)
            }
        }

        request.onerror = (event) => {
            console.warn('Error in generateNewQuot request: ', event.target.error)
        }
    }

    function makeNewTX(storeName, mode) {
        let tx = db.transaction(storeName, mode)

        tx.oncomplete = () => {
            console.log('transaction oncomplete')
        }
        tx.onerror = (event) => {
            console.warn('Error in transaction: ', event.target.error)
        }

        return tx
    }

    buttonElement.addEventListener('click', generateNewQuot)
})