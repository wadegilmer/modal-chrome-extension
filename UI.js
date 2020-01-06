class UI {
    static ruleIndex = [];

    //#region Insert Menu
    static modalMenu(){

        const modal = document.createElement('div');
        modal.setAttribute("id", "modalMenu");
        modal.classList.add("modal");
        modal.style.cssText = `
            all: unset;
            font-family: Helvetica Neue;
            font-size: 12px;
            margin: 0;
            padding: 0;
            display: block;
            position: fixed;
            z-index: 100000;
            right: 0;
            top: 0;
            width: 220px;
            height: 280px;
            overflow: auto;
            background-color: rgba(0,0,0, 0);
            animation-name: modalopen;
            animation-duration: 0.5s;
        `;

        const modalContent = document.createElement('div');
        modalContent.classList.add("modal-content");
        modalContent.style.cssText = `
            all: unset;
            background-color: #f4f4f4;
            margin-top: 5%;
            margin-right: 10%;
            position: relative;
            float: right;
            padding: 20px;
            width: 140px;
            height: 220px;
            max-width: 140px !important;
            max-height: 220px !important;
            box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.1), 0 3px 5px 0 rgba(0, 0, 0, 0.17);
            border-radius: 5px;
        `;
        modalContent.innerHTML = `
            <div class="form-field" style="all: unset;">
                <form class="form" style="all: unset;">
                    <input id="addTag" class="u-full-width" type="text" placeholder="Add tag" autocomplete="off" style="all: unset; border-radius: 25px; border: 1px solid #EAEAEA; height: 25px;">
                </form>
            </div>

            <div class="tags"></div>
        `;

        // const div = document.createElement('div');
        // div.classList.add('form-field');
        // const form = document.createElement('form');
        // form.classList.add('form');
        // const input = document.createElement('input');
        // input.setAttribute('id', 'addTag');
        // input.setAttribute('type', 'text');
        // input.setAttribute('autocomplete', 'off');
        // input.setAttribute('placeholder', 'Add Tag');
        
        // form.appendChild(input);
        // div.appendChild(form)
        // modalContent.appendChild(div);


        // Highlight Button
        const highlightBtn = document.createElement('div');
        highlightBtn.setAttribute('id', 'hlBtn');
        highlightBtn.innerText = 'Hightlights Off';
        highlightBtn.style.cssText = `
            all: unset;
            position: absolute;
            bottom: 1;
            left: 0;
            margin: 3%;
            width: 80%;
            padding: 10px;
            height: 15px;
            font-size: 11px;
            border-radius: 25px;
            background-color: #EAEAEA;
            text-align: center;
            vertical-align: center;
        `;
        modalContent.appendChild(highlightBtn);

        // Send Tag Button
        const tagBtn = document.createElement('div');
        tagBtn.setAttribute('id', 'tagBtn');
        tagBtn.innerText = 'Send Tags';
        tagBtn.style.cssText = `
            all: unset;
            position: absolute;
            bottom: 0;
            left: 0;
            margin: 3%;
            width: 80%;
            padding: 10px;
            height: 15px;
            font-size: 11px;
            border-radius: 25px;
            background-color: #EAEAEA;
            text-align: center;
            vertical-align: center;
        `;
        
        modalContent.appendChild(tagBtn);
        modal.appendChild(modalContent)

        let body = document.querySelector('body');
        body.insertBefore(modal, body.firstChild);
    }
    //#endregion

    //#region Remove Modal
    static closeMenu() {
        let body = document.querySelector('body');
        body.firstChild.remove();
    }

    //#endregion

    //#region Insert Tag
    static addTag(e) {

        // if the target is on the input of the modal and if enter is pressed
        if (e.target.id == 'addTag' && e.which == 13 || e.keyCode == 13) {

            if (e.target.value != '') {

                let tag = e.target.value;

                // Get rid of trailing white space
                tag = tag.replace(/\s*$/,"");

                // Create the tag div
                let chip = document.createElement('div');
                chip.className = 'chip';
                chip.innerHTML = `${tag}<span class="closebtn";>&times;</span>`;
                
                // verify tag doesn't already exit and if it does replace it with an updated case version
                document.querySelectorAll('.chip').forEach(function(t) {
                    if(t.textContent.toLowerCase() === (tag.toLowerCase() + '×')) {
                        t.remove();
                    }
                });

                // append div to menu
                document.querySelector('.tags').appendChild(chip);

                // clear input field
                e.target.value = '';
            }
            e.preventDefault();
        }
        
    }
    //#endregion

    //#region Turn On Highlight Settings
    static turnHighlightOn(button) {

        // Change the button to display on
        button.innerText = 'Highlights On';

        // Add selection rule to change color of selected texts // TODO: put in separate function call
        const style = document.createElement('style');

        try {
            let stylesheet = style.sheet;
            let selectionIndex = document.styleSheets[0].insertRule(`
                ::selection {
                    background: rgb(252, 243, 127);
                }
            `, 0);
            let curserIndex = document.styleSheets[0].insertRule(`
                .highlight:hover {
                    cursor: pointer;
                    background-color: rgb(252, 243, 127);
                }
            `, 1);
            let anchorIndex = document.styleSheets[0].insertRule(`
                a:link {
                    pointer-events: none;
                    cursor: default;
                }
            `, 2);
            // So we can have access the index to delete the rule later
            this.ruleIndex.push(selectionIndex);
            this.ruleIndex.push(curserIndex);
            this.ruleIndex.push(anchorIndex);
        } catch(DOMException) {
            console.log(`Ugh Ugh Ugh, You Didn't Say the Magic Word`);
            document.head.appendChild(style);
            let stylesheet = style.sheet;
            stylesheet.insertRule(`
                ::selection {
                    background: rgb(252, 243, 127);
                }
            `, stylesheet.cssRules.length);
            stylesheet.insertRule(`
                .highlight:hover {
                    cursor: pointer;
                    background-color: rgb(255, 249, 160) !important;
                }
            `, stylesheet.cssRules.length);
            stylesheet.insertRule(`
                a:link {
                    pointer-events: none;
                    cursor: default;
                }
            `);
        }
    }
    //#endregion

    //#region Turn Off Highlight Settings
    static turnHighlightOff(button) {

        // Change the button to display off
        button.innerText = 'Highlights Off';

        // Delete the selection css changes
        try {
            document.styleSheets[0].deleteRule(this.ruleIndex[2])
            document.styleSheets[0].deleteRule(this.ruleIndex[1])
            document.styleSheets[0].deleteRule(this.ruleIndex[0])
        } catch(DOMException) {
            // TODO: try to delete all the rules
            document.styleSheets[document.styleSheets.length - 1].deleteRule(0);
        }
    }
    //#endregion

    //#region Highlight Selection
    static highlightSelection() {

        let selected = window.getSelection(); // The selected content

        if(selected.toString() != '') {

            let selectionText = selected.toString(); // The selected text
            let range = selected.getRangeAt(0); // The Range Object of the selection
            let clone = range.cloneRange(); // The Range Object clone of the selection

            let a = range.startContainer.parentElement; // Parent element of the start
            // let c = clone.startContainer.parentElement;
            let n = range.startContainer.parentElement.nextElementSibling;
            let z = range.endContainer.parentElement; // Parent element of the end

            const regexInjection = "((<\/span>)?|(<span class=.highlight.>)?)?";
            // const reInj = "((<\/\w+\d?>)?|(<\w+\d?.*?>)?)?"
            // const reInj = "((?:<\/\w+\d?>)?|(?:<\w+\d?=?.*?>)?)?"
            const reInj = "(<[^>]*>)?";
            // const reInj = `((?:<\/\w+\d?>)?|(?:<\w+\d?.?=?"?.*?"?>)?)?`;
            const escapeCharacters = ['(', ')', '+', '*', '?', '[', ']', '{', '}', '^', '$', '.', '|', '\\','\\a', '\\b', '\\B', '\\d', '\\D', '\\e', '\\f', '\\n','\\r', '\\s', '\\S', '\\t', '\\v', '\\w', '\\W']

            // START
            // INSERT SINGLE SELECTION
            // END

            // Split by new line if their is one
            let selectionsArray = selectionText.split(/\r|.\n/)

            // Array to hold regex expression strings of each text selection
            let selectionsRegex = []
            
            // Turn text selection into a regular expression
            selectionsArray.forEach((selectionText) => {
                // Split up every character
                let selectionArray = selectionText.split('');

                for (let i = 0; i < selectionArray.length; i++) {

                    // Escape special characters
                    if (escapeCharacters.indexOf(selectionArray[i]) > -1) {
                        selectionArray[i] = '\\'.concat('', selectionArray[i])
                    }
                    
                    // Insert regex for every odd index
                    if (i % 2 != 0) {
                        selectionArray.splice(i, 0, reInj);
                    } 
                }
                // Push the regular expression back into a string
                let selectionRegex = selectionArray.join('');

                // Push regular expression into an array
                selectionsRegex.push(selectionRegex);
            });

            // console.log(selectionsRegex);

            // UI.replaceHTML(a, n, z, selectionsRegex);

            selectionsRegex.forEach((regex, index, array) => {
                if (a != z) {
                    console.log('this is the first or middle selection');
                    console.log(a.innerHTML);
                    console.log(regex);
                } else {
                    console.log('this is the first or last selection');
                    console.log(a.innerHTML);
                    console.log(regex);
                }

                if (a.classList.contains('highlight')) {
                    a = a.parentElement;
                    console.log('this contains a span.highlight');
                }

                a.innerHTML = a.innerHTML.replace(
                    new RegExp(`(${regex})`, 'g'), '<span class=highlight>$1</span>');
                
                a.innerHTML = a.innerHTML.replace(
                    new RegExp(`(.*)(<span class="highlight">.*)(?:<span class="highlight">)(.*)(?:<\/span>)(.*<\/span>)(.*)`, 'g'), '$1$2$3$4$5')

                a = a.nextElementSibling;
            });
        }
    }
    //#endregion

    //#region Delete Selection
    static deleteSelection(e) {

        // replace the element with the plain text
        if (e.target.classList.contains('highlight')) {
            
            // Get the plain text
            let text = e.target.textContent;

            // Get the html conent of the selection element
            let html = e.target.outerHTML;
            
            // Get the parents inner html
            let parentHtml = e.target.parentElement.innerHTML;

            // Replace the inner html with the 
            e.target.parentElement.innerHTML = parentHtml.replace(new RegExp(`(${html})`, 'g'), text);
        }
    }
    //#endregion

    static replaceHTML(a, n, z, regex) {
        let i = 0;

        if (a.classList.contains('highlight')) {
            a = a.parentElement;
            console.log('this contains a span.highlight');
        }

        a.innerHTML = a.innerHTML.replace(
            new RegExp(`(${regex[i]})`, 'g'), '<span class=highlight>$1</span>');
        
        a.innerHTML = a.innerHTML.replace(
            new RegExp(`(.*)(<span class="highlight">.*)(?:<span class="highlight">)(.*)(?:<\/span>)(.*<\/span>)(.*)`, 'g'), '$1$2$3$4$5')

        if (z != a) {
            while (n != z) {
                i++;

                if (n.classList.contains('highlight')) {
                    n = n.parentElement;
                    console.log('this contains a span.highlight');
                }
        
                n.innerHTML = n.innerHTML.replace(
                    new RegExp(`(${regex[i]})`, 'g'), '<span class=highlight>$1</span>');
                
                n.innerHTML = n.innerHTML.replace(
                    new RegExp(`(.*)(<span class="highlight">.*)(?:<span class="highlight">)(.*)(?:<\/span>)(.*<\/span>)(.*)`, 'g'), '$1$2$3$4$5')
    
                n = n.nextElementSibling;
            }
            i++;

            if (z.classList.contains('highlight')) {
                z = z.parentElement;
                console.log('this contains a span.highlight');
            }
    
            z.innerHTML = z.innerHTML.replace(
                new RegExp(`(${regex[i]})`, 'g'), '<span class=highlight>$1</span>');
            
            z.innerHTML = z.innerHTML.replace(
                new RegExp(`(.*)(<span class="highlight">.*)(?:<span class="highlight">)(.*)(?:<\/span>)(.*<\/span>)(.*)`, 'g'), '$1$2$3$4$5')
        }
    }

}


