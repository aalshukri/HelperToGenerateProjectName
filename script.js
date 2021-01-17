/* myfunction() */
function myFunction()
{
    let userInput = document.getElementById("input").value;
    console.log("Suggesting... "+userInput);
    generateSuggestions(userInput);
}

/* generateSuggestions() */
function generateSuggestions(userInput)
{
    console.log("generateSuggestions "+userInput);

    //let doc = nlp(userInput);

    //you can see the text has no tags
    //console.log(doc.has('#Noun')) //false
  
    //but the whole api still works
    //console.log(doc.has('my .* is .? named /^b[oa]rt/')) //true    


    let doc = nlp.tokenize(userInput);

    console.log(doc);
    console.log( (doc.out('tags')[0]) );

    let arr = doc.json().map(o=> o.text)
    console.log(arr);
}  