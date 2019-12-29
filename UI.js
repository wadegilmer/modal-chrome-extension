class UI {

    //#region Modal Menu Static Method
    static modalMenu(){

        const modal = document.createElement('div');
        modal.setAttribute("id", "modalMenu");
        modal.classList.add("modal");
        modal.style.cssText = `
            all: unset;
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
            <div class="form-field">
                <form class="form">
                    <input id="addTag" class="u-full-width" type="text" placeholder="Add tag" autocomplete="off">
                </form>
            </div>

            <div class="tags"></div>
        `;

        modal.appendChild(modalContent)

        return modal;
    }
    //#endregion

    //#region Add Tag Static Method
    static addTag(e, tag) {

        // Get rid of trailing white space
        tag = tag.replace(/\s*$/,"");

        // create tag div
        let chip = document.createElement('div');
        chip.className = 'chip';
        chip.innerHTML = `${tag}<span class="closebtn";>&times;</span>`;
        
        // verify tag doesn't already exit
        document.querySelectorAll('.chip').forEach(function(t) {
            if(t.textContent === (tag + '×')) {
                t.remove();
            }
        });
        
        // verify input field has content
        if(tag != '') {

            // append div to menu
            return chip;
        }
    }
    //#endregion

}