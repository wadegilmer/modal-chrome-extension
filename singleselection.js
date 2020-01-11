// WORKING REPLACES INNER SPAN!!!!!!
if (!a.classList.contains('highlight')) {
    a.innerHTML = a.innerHTML
        .replace(new RegExp(`(${selectionRegex})`, 'g'), '<span class=highlight>$1</span>');
} else {
    a = a.parentElement;
    a.innerHTML = a.innerHTML
        .replace(new RegExp(`(${selectionRegex})`, 'g'), '<span class=highlight>$1</span>');
    
    a.innerHTML = a.innerHTML
        .replace(new RegExp(`(.*)(<span class="highlight">.*)(?:<span class="highlight">)(.*)(?:<\/span>)(.*<\/span>)(.*)`, 'g'), '$1$2$3$4$5')
}
//////////////////////


// SINGLE SELECTION
// let selectionArray = selectionText.split('');

// for (let i = 0; i < selectionArray.length; i++) {
//     // Escape special characters
//     if (escapeCharacters.indexOf(selectionArray[i]) > -1) {
//         selectionArray[i] = '\\'.concat('', selectionArray[i])
//     }

//     // Insert regex for every odd index
//     if (i % 2 != 0) {
//         selectionArray.splice(i, 0, regexInjection);
//     } 
// }

// let selectionRegex = selectionArray.join('');

// // Change styles
// if (a.classList.contains('highlight')) {
//     a = a.parentElement;
// }

// a.innerHTML = a.innerHTML.replace(
//     new RegExp(`(${selectionRegex})`, 'g')
//     , `<span id=${UI.getScrollingPosition()} class=highlight>$1</span>`);

// a.innerHTML = a.innerHTML.replace(
//     new RegExp(`(.*)(<span id=".*" class="highlight">.*)(?:<span (?:id=".*") class="highlight">)(.*)(?:<\/span>)(.*<\/span>)(.*)`, 'g')
//     , '$1$2$3$4$5')
///////////////////////////////////////////////////////////

// MULTI SELECTION

// // Split by new line if there is one
// let selectionsArray = selectionText.split(/\r|.\n/)

// // Array to hold regex expression strings of each text selection
// let selectionsRegex = []

// // Turn text selection into a regular expression
// selectionsArray.forEach((selectionText) => {
//     // Split up every character
//     let selectionArray = selectionText.split('');

//     for (let i = 0; i < selectionArray.length; i++) {

//         // Escape special characters
//         if (escapeCharacters.indexOf(selectionArray[i]) > -1) {
//             selectionArray[i] = '\\'.concat('', selectionArray[i])
//         }
        
//         // Insert regex for every odd index
//         if (i % 2 != 0) {
//             selectionArray.splice(i, 0, regexInjection);
//         } 
//     }
//     // Push the regular expression back into a string
//     let selectionRegex = selectionArray.join('');

//     // Push regular expression into an array
//     selectionsRegex.push(selectionRegex);
// });

// selectionsRegex.forEach((regex, index, array) => {
//     if (a != z) {
//         console.log('this is the first or middle selection');
//         console.log(a.innerHTML);
//         // console.log(regex);
//     } else {
//         console.log('this is the first or last selection');
//         console.log(a.innerHTML);
//         // console.log(regex);
//     }

//     if (a.classList.contains('highlight')) {
//         a = a.parentElement;
//     }

//     a.innerHTML = a.innerHTML.replace(
//         new RegExp(`(${regex})`, 'g'), `<span id=${UI.getScrollingPosition()} class=highlight>$1</span>`);
    
//     a.innerHTML = a.innerHTML.replace(
//         new RegExp(`(.*)(<span id=".*" class="highlight">.*)(?:<span (?:id=".*") class="highlight">)(.*)(?:<\/span>)(.*<\/span>)(.*)`, 'g'), '$1$2$3$4$5')

//     a = a.nextElementSibling;
// });