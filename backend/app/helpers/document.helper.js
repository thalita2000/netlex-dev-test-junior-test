module.exports = {
    wordFrequency: function(doc, word){
        const regex = new RegExp(word, 'gi')
        const frequencies = doc.match(regex)

        return !!frequencies ? frequencies.length : 0;
    },

    wordSentences: function(doc, word){
        const regex = new RegExp(`(?<=[ \d\.]*)(?=[A-Za-z])(((?!\n *\n *)[^.?!])*?${word}.*?[.?!\r\n])(?=[\n ])`, 'gim')

        const sentence = doc.match(regex)
        return !!sentence ? [...sentence] : null;
    },

    topWords: function(doc, count, minWordLength){
        const allWords = doc.split(/[ \n]/).map(w => {
            const clearedWord = w.toLowerCase().trim().match(/[\wà-ú]+/)

            return !!clearedWord ? clearedWord[0] : null
        }).filter(Boolean)

        const objCount = allWords.reduce((obj, word) => {
            if (word.length < minWordLength) return obj;

            obj[word] = (obj[word] || 0) + 1
            return obj
        }, {})

        const formatedCountWords = Object.entries(objCount).map(([word, count]) => ({ word, count }))

        const countWordsSorted = formatedCountWords.sort((a, b) => {
            if (a.count > b.count) return -1;
            if (a.count < b.count) return 1;
            return 0
        })

        const pastedCount = countWordsSorted.slice(0, count)

        return pastedCount
    },

    stringToWordsArray: function(text) {
        return text.match(/[a-zÀ-ú]+/gmui);
    }
}


