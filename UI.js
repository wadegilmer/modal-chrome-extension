class UI {

    //#region Insert Menu Static Method
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

    //#region Remove Modal Static Method
    static closeMenu() {
        let body = document.querySelector('body');
        body.firstChild.remove();
    }

    //#endregion

    //#region Insert Tag Static Method
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

}
