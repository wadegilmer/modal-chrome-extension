let selectionArray = selectionText.split('');
console.log(selectionsArray);


for (let i = 0; i < selectionArray.length; i++) {
// Escape special characters
if (escapeCharacters.indexOf(selectionArray[i]) > -1) {
    selectionArray[i] = '\\'.concat('', selectionArray[i])
}

// Insert regex for every odd index
if (i % 2 != 0) {
    selectionArray.splice(i, 0, regexInjection);
} 
}

let selectionRegex = selectionArray.join('');

// console.log(selectionArray);
// console.log(selectionsRegex);
// console.log(selectionText);
// console.log(selectionArray);
// console.log(a.innerHTML.match(selectionRegex)[0]);

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