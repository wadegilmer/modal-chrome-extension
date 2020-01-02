class UI {

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
        document.head.appendChild(style);
        let stylesheet = style.sheet;
        stylesheet.insertRule(`
            ::selection {
                background: rgb(252, 243, 127);
            }
        `, stylesheet.cssRules.length);
    }
    //#endregion

    //#region Turn Off Highlight Settings
    static turnHighlightOff(button) {

        // Change the button to display off
        button.innerText = 'Highlights Off';

        // Delete the selection css changes
        document.styleSheets[document.styleSheets.length - 1].deleteRule(0);
    }
    //#endregion

    //#region Highlight Selection
    static addHighlight() {
        console.log('Inside the add highlight function');
        

        if(window.getSelection().toString() != '') {

            let selection = window.getSelection(); // The selected content
            console.log(selection.toString());
    
            let range = selection.getRangeAt(0); // The Range Object of the selection
            let clone = range.cloneRange(); // The Range Object clone of the selection
    
            let a = range.startContainer.parentElement; // Parent element of the start
            let n = a; // Parent element of the middle
            let z = range.endContainer.parentElement; // Parent element of the end

            let ai = a.innerHTML; // Inner html of first parent
            let ni; // Inner html of middle parent
            let zi = z.innerHTML; // Inner html of last parent

            let ax = selection.anchorOffset; // Start index of selection
            let ay = ai.length; // End index of first parent

            let nx = 0; // Start index of middle parent
            let ny; // End index of middle parent

            let my; // End index of middle parent alternative

            let zx = 0; // Start index of last parent
            let zy = selection.focusOffset; // End index of selection
    
            // If the selection is within the same parent
            if (a == z) {
                ai = `
                    ${ai.substring(0, ax)}
                    <span class="highlight">
                    ${ai.substring(ax, zy)}
                    </span>
                    ${ai.substring(zy, ay)}
                `;
            }

            // If the selection crosses over multiple parents
            while (n != z) {
                n = n.nextElementSibling;
                ni = n.innerHTML;
                ny = ni.length;
                my = ni.length;

                // If parent is the last parent
                if (n == z) { my = zy }

                ni = `
                    <span class="highlight">
                    ${ni.substring(nx, my)}
                    </span>
                    ${ai.substring(my, ny)}
                `;
            }
    
        }
    }
    //#endregion
}
