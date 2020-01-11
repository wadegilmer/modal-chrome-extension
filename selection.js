// MY REGEX HELPERS

            // A. Find expression span.highlight where expression /span follows:
            // Find <span.highlight></span>
            // REGEX: (<span class="highlight">).*(?=<\/span>) 

            // B. Find the 1st /span (with span.highlight before it and /span after it)
            // Find middle <span.highlight></span></span>
            // REGEX: (?<=<span class="highlight">).*(<\/span>).*(?=<\/span>)

            // C. Find middle <span.highlight><span.highlight></span>
            // REGEX: (?<=<span class="highlight">).*(<span class="highlight">).*(?=<\/span>)

            // D. Find B or C
            // REGEX: (?<=<span class="highlight">).*(<span class="highlight">|<\/span>).*(?=<\/span>)

            // E. Find middle 2 <span.highlight><span.highlight></span></span>
            // REGEX: (?!<span class="highlight">).(<span class="highlight">).*(<\/span>).*(?=<\/span>)

            // F. Find first and last occurance
            // <span.highlight> ... </span>
            // REGEX: (<span class="highlight">)?.*(<\/span>)(?!.*<\/span>)
            // ... I could remove all the spans inside and wrap it in a new span ?? 

            // G. Non-Capturing-Groups
            // REGEX: (<span class="highlight">.*)(?:<span class="highlight">)(.*)(?:<\/span>)(.*<\/span>)(.*)

            // REGEX: ((?:<\/\w+\d?>)?|(?:<\w+\d?.?"?=?.*?"?>)?)?



///////////////÷÷÷÷÷÷÷÷÷/////////÷÷÷÷///÷÷///÷÷÷÷///÷////÷/
            // for (let i = 0; i < selectionsRegex.length; i++) {
                // if (a != z) {
                //     console.log('this is the first or middle selection');
                //     console.log(a);
                //     console.log(selectionsRegex[i]);
                // } else {
                //     console.log('this is the last selection');
                //     console.log(a);
                //     console.log(selectionsRegex[i]);
                // }

                // if (a.classList.contains('highlight')) {
                //     a = a.parentElement;
                //     console.log('this contains a span.highlight');
                // }

                // a.innerHTML = a.innerHTML.replace(
                //     new RegExp(`(${selectionsRegex[i]})`, 'g'), '<span class=highlight>$1</span>');
                
                // a.innerHTML = a.innerHTML.replace(
                //     new RegExp(`(.*)(<span class="highlight">.*)(?:<span class="highlight">)(.*)(?:<\/span>)(.*<\/span>)(.*)`, 'g'), '$1$2$3$4$5')

                // a = a.nextElementSibling;
            // }
///////////////÷÷÷÷÷÷÷÷÷/////////÷÷÷÷÷//÷÷÷///÷÷÷/÷÷//÷//÷÷/

let text = selection.toString(); // The selected text

let range = selection.getRangeAt(0); // The Range Object of the selection
let clone = range.cloneRange(); // The Range Object clone of the selection

let a = range.startContainer.parentElement; // Parent element of the start
let c = clone.startContainer.parentElement;
let z = clone.endContainer.parentElement; // Parent element of the end
let n = a.nextElementSibling ? a.nextElementSibling : z; // The parent of the middle

let openingspan = `<span class="highlight">`;
let closingspan = '</span>';


let ax = selection.anchorOffset; // Start index of selection
let zy = selection.focusOffset; // End index of selection

let at = a.textContent || a.innerText; // Inner text of first parent
let ai = a.innerHTML; // Inner html of first parent

// console.log(selection.anchorNode);
console.log(text[1]);


c.innerHTML = text ? at.replace(new RegExp(`(${text})`, 'ig'), '<span class=highlight>$1</span>') : ai;

console.log(a.innerHTML);
console.log(c.innerHTML);



// let extend;
// let sb = selection.setBaseAndExtent(a, 0, z, 0)

// console.log(ax);
// console.log(zy);
// console.log(ai);


// if (ai.substring(ax, zy).includes(closingspan)) {                
    
//     // if the selected string contains a closing span delete span
//     ai.replace(new RegExp(`(${closingspan})`, 'g'), '');

//     console.log('contains closing span');
    
// }


document.addEventListener('selectionchange', (params) => {

    if (ci.substring(ax, zy).includes(closingspan)) {                

        // if the selected string contains a closing span delete span
        ci.substring(ax, zy) = ci.substring(ax, zy).replace(new RegExp(`(${closingspan})`, 'g'), '');
    
        console.log('contains closing span');   
    }
    c.innerHTML.replace(new RegExp(`(${text})`, 'g'), '<span class=highlight>$1</span>');


});










// let text = selection.toString(); // The selected text
// let texts = text.split('\n'); // The selected text over multiple parents
// texts.map((text, index) => {
//     if (text.length == 0) {
//         texts.splice(index, 1)
//     }
// });

// // for (const [index, element] of texts.entries()) {
// //     console.log(index, element);
// //   }

// console.log(texts);

// in the anchorNode
// console.log(selection.anchorNode);
// // then in the focusNode
// console.log(selection.focusNode);




// let selection = window.getSelection(); // The selected content
// let text = selection.toString(); // The selected text

// let range = selection.getRangeAt(0); // The Range Object of the selection
// let clone = range.cloneRange(); // The Range Object clone of the selection

// let a = clone.startContainer.parentElement; // Parent element of the start
// let n = a; // Parent element of the middle
// let z = clone.endContainer.parentElement; // Parent element of the end

// let ai = a.innerHTML; // Inner html of first parent
// let ni; // Inner html of middle parent
// let zi = z.innerHTML; // Inner html of last parent

// let ax = selection.anchorOffset; // Start index of selection
// let ay = ai.length; // End index of first parent

// let nx = 0; // Start index of middle parent
// let ny; // End index of middle parent

// let my; // End index of middle parent alternative

// let zx = 0; // Start index of last parent
// let zy = selection.focusOffset; // End index of selection

// // If the selection is within the same parent
// if (a == z) {
//     a.innerHTML = `${a.innerHTML.substring(0, ax)}<span class="highlight">${a.innerHTML.substring(ax, zy)}</span>${a.innerHTML.substring(zy, ay)}`;}

// // If the selection crosses over multiple parents
// while (n != z) {

//     a.innerHTML = `
//         ${a.innerHTML.substring(0, ax)}
//         <span class="highlight">
//         ${a.innerHTML.substring(ax, ay)}
//         </span>
//         `;

//     n = n.nextElementSibling;
//     ni = n.innerHTML;
//     ny = ni.length;
//     my = ni.length;

//     // If parent is the last parent
//     if (n == z) 
//     { 
//         my = zy
//         n = z;
//     }

//     n.innerHTML = `
//         <span class="highlight">
//         ${n.innerHTML.substring(nx, my)}
//         </span>
//         ${n.innerHTML.substring(my, ny)}
//     `;
// }