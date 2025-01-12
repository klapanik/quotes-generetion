document.addEventListener('DOMContentLoaded', () => {
    let quot = document.querySelector('#quotes');
    let author = document.querySelector('#author');
    let button = document.querySelector('.generate-button')
    let loadingQuotes = document.querySelector('.loading-quotes')
    let quotesDataContent = document.querySelector('.quotes')

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

    const DEFAULT_QOUT_VALUE = quoteList[0].quot
    const DEFAULT_AUTHOR_VALUE = quoteList[0].name

    quot.innerText = DEFAULT_QOUT_VALUE
    author.innerText = DEFAULT_AUTHOR_VALUE

    button.addEventListener('click', () => {
        loadingQuotes.style.display = 'block'
        quotesDataContent.replaceWith(loadingQuotes)

        setTimeout(() => {
            let counter = Math.floor(Math.random() * quoteList.length)
            
            quot.innerText = quoteList[counter].quot
            author.innerText = quoteList[counter].name

            loadingQuotes.replaceWith(quotesDataContent)
            loadingQuotes.style.display = 'none'
        }, 1500)
    })
})