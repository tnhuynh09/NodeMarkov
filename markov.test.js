
const { MarkovMachine } = require("./markov");

describe("test markov machine", function () {

    test("make new chains", function () {
        let mm = new MarkovMachine("the dog resist the treat in the box")

        expect(mm.table).toEqual({
            the: ['dog', 'treat', 'box'],
            dog: ['resist'],
            resist: ['the'],
            treat: ['in'],
            in: ['the'],
            box: [undefined]
        })
    });

    test("make text", function () {
        let mm = new MarkovMachine("a b c");
        let text = mm.makeText();

        expect(["a b c", "a b", "b c", "a", "b", "c"]).toContain(text);
        expect(["a b c", "a b", "b c", "a", "b", "c"]).not.toContain("d");
    });

    test("generate text", function () {
        let mm = new MarkovMachine("the cat in the hat");
        let text = mm.makeText();

        expect(text.endsWith('hat')).toBe(true);

        // textOutput is an array of the individual string separated by a comma
        let textOutput = mm.makeText().split(/[ \r\n]+/);
        console.log("textOutput", textOutput);
        let bigrams = ["the cat", "cat in", "in the", "the hat", "hat"];

        for (let i = 0; i < textOutput.length - 1; i++) {
            expect(bigrams).toContain(textOutput[i] + " " + textOutput[i + 1]);
        }
    });

    test('length of text', function () {
        let mm = new MarkovMachine("the cat in the hat");
        let text = mm.makeText(2);

        let textOutput = text.split(/[ \r\n]+/);
        expect([1, 2]).toContain(textOutput.length);
    });
});


