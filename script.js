/* formSubmit() */
function formSubmit()
{
    let userInput = document.getElementById("input").value;
    console.log("Suggesting... "+userInput);
    generateSuggestions(userInput);
    return false;
}

/* generateSuggestions() */
function generateSuggestions(userInput)
{
    console.log("generateSuggestions '"+userInput+"'");

    //let doc = nlp(userInput);

    //you can see the text has no tags
    //console.log(doc.has('#Noun')) //false
  
    //but the whole api still works
    //console.log(doc.has('my .* is .? named /^b[oa]rt/')) //true    


    /*
    let doc = nlp.tokenize(userInput);

    console.log(doc);
    console.log( (doc.out('tags')[0]) );

    let arr = doc.json().map(o=> o.text)
    console.log(arr);

    let yourNewWord = arr[0];

    console.log(yourNewWord);

    addSuggestion(yourNewWord);
    */


    //Settings
    applySettings();

    //remove stop words
    userInput = removeStopwords(userInput);

    //parse input
    let doc = nlp(userInput);

    //output
    console.log( doc.text() );

    //Full parsed information
    //console.log( doc.json() );

    //
    //console.log( doc.out('tags') );

    //let docPeople= doc.people()
    //console.log( docPeople );

    //console.log( doc.terms() );


    // Reduce text
    //  https://observablehq.com/@spencermountain/compromise-text
    // parser does the following actions to text:
    //  normalized whitespace, case, unicode, punctuation, lowercase, trimmed whitespace, contractions expanded
    //doc.text('root');
    doc.normalize({
                    case:true, 
                    trim:true,
                    whitespace:true, 
                    possessives:false,
                    contractions:true,
                    plurals: false,
                    verbs: false,
                });

   

    // Convert numbers to text
    //doc.numbers().toNumber();
//    doc.numbers().toOrdinal();
    //doc.values();

    //
    //doc.normalize({case:true, whitespace:true, possessives:false});


    //output final text
//    console.log( doc.text() );

    //console.log( doc.sentences().toPastTense().text() );

    //parse out each word
    console.log( doc.terms() );

    //let arr = doc.terms()
    //console.log(arr);


    parsedText = doc.text();
    console.log( parsedText );

    let letters = parsedText.match(/\b(\w)/g); // ['J','S','O','N']

    console.log( letters );
    
    let acronym = letters.join(''); // JSON
    
    console.log(acronym);    


    //generateCombinations(letters);

    generateCombinations2(letters);

}

/* Apply NLP Settings */
function applySettings(){
    
    //declare new tags in a plugin,
    const myPlugin = (doc, world)=>{
        world.addTags({
            OCTRU:{isA: 'Organization'},
            NDORMS:{isA: 'Organization'}            
        });
    }
    nlp.extend(myPlugin);  

    //Add numbers package
    //const nlp = require('compromise');
    //nlp.extend(require('compromise-numbers'));    

}

function removeStopwords(str)
{
    stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']
    
    res = []
    words = str.split(' ')
    for(i=0;i<words.length;i++) {
        word_clean = words[i].split(".").join("")
        if(!stopwords.includes(word_clean)) {
            res.push(word_clean)
        }
    }
    return(res.join(' '));
}

function generateCombinations(array)
{
    //var array = ["apple", "banana", "lemon", "mango"];
    var results = [];
    
    // Since you only want pairs, there's no reason
    // to iterate over the last element directly
    for (var i = 0; i < array.length - 1; i++) {
      // This is where you'll capture that last value
      for (var j = i + 1; j < array.length; j++) {
        results.push(array[i] + ' ' + array[j]);
      }
    }
    
    console.log(results);    
}

function generateCombinations2(input)
{
    const result = [];
    start = 0;
   
    len=1;
    combine(input, len, start);

    //len input length
}

function combine(input, len, start) {
    if(len === 0) {
      console.log( result.join(" ") ); //process here the result
      return;
    }
    for (let i = start; i <= input.length - len; i++) {
      result[result.length - len] = input[i];
      combine(input, len-1, i+1 );
    }
  }





/* addSuggestion() */
function addSuggestion(suggestedWord)
{
    document.getElementById('suggestions').innerHTML += '<li>' + suggestedWord + '</li>';
}