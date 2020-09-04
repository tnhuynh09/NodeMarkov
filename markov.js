/** Textual markov chain generator */

class MarkovMachine {

    /** build markov machine; read in text.*/

    constructor(text) {
        // console.log("MarkovMachine - text = ", text);
        let words = text.split(/[ \r\n]+/);
        // console.log("MarkovMachine - words = ", words);
        this.words = words.filter(c => c !== "");
        // console.log("MarkovMachine - this.words = ", this.words);
        this.table = {};
        this.makeChains();
    }

    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {
        // TODO
        for (var i = 0; i < this.words.length; i++) {
            // console.log("this.words[i] " + i + " = " + this.words[i]);
            if (this.table[this.words[i]] == null) {
                this.table[this.words[i]] = [this.words[i + 1]];
            } else {
                this.table[this.words[i]].push(this.words[i + 1]);
            }
            // console.log("table[this.words[i]] = " + this.table[this.words[i]]);
        }

        // console.log("MarkovMachine - 1 table = ", this.table);
        // console.log("TEST", this.table["hat"].length);
        // table["the"] = ["cat"]
        // console.log("MarkovMachine - 2 table = ", table);
        // table["the"].push("hat")
        // console.log("MarkovMachine - 3 table = ", table);
        // console.log("MarkovMachine - 4 table = ", table[this.words[0]]);
    }


    /** return random text from chains */

    // makeText(numWords = 100) {
    //     // TODO

    //     let text = [];
    //     let wordIndex = Math.floor(Math.random() * Math.floor(this.words.length));
    //     let selectedWord = this.words[wordIndex];

    //     text.push(selectedWord);

    //     while (text.length < numWords) {
    //         const wordsArray = this.table[selectedWord];
    //         wordIndex = Math.floor(Math.random() * Math.floor(wordsArray.length));
    //         selectedWord = wordsArray[wordIndex];
    //         if (selectedWord != null) {
    //             text.push(selectedWord);
    //         } else {
    //             break;
    //         }
    //     }
    //     console.log("text", text);

    //     return text.join(' ');
    // }

    makeText(numWords = 100) {
        // TODO

        let text = "";
        let wordIndex = Math.floor(Math.random() * Math.floor(this.words.length));
        let selectedWord = this.words[wordIndex];

        text = selectedWord;

        while (numWords > 0) {
            const wordsArray = this.table[selectedWord];
            wordIndex = Math.floor(Math.random() * Math.floor(wordsArray.length));
            selectedWord = wordsArray[wordIndex];
            if (selectedWord != null) {
                text = text + " " + selectedWord;
                numWords--;
            } else {
                break;
            }
        }
        // console.log("text", text);

        return text;
    }
}


module.exports = { MarkovMachine };


// const markov = new MarkovMachine("the dog resist the treat in the box");
// markov.makeText(10);
// console.log("markov.makeText(10)", markov.makeText(10));
