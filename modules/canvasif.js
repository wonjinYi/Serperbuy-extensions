import { getElementByXpath } from '../tools/getElementByXpath.js';
import { showMessage } from '../tools/showMessage.js';
import { parseBool } from '../tools/parseBool.js';

const LOCAL_STORAGE_KEYS = {
    isActive: 'Serperbuy_Canvasif_isActive',
};

const canvasif = () => {
    const selectBtn = getElementByXpath('/html/body/div[1]/div/div[2]/div[1]/div/div[1]/div[1]');
    const drawBtn = getElementByXpath('/html/body/div[1]/div/div[2]/div[1]/div/div[1]/div[2]');
    const drawer = getElementByXpath('/html/body/div[1]/div/div[2]/div[1]/div/div[2]');
    const el = getElementByXpath('/html/body/div[1]/div/div[2]/div[2]/div/div/canvas[1]');
    const ctx = el.getContext('2d');

    let br = 100;
    let co = 100;

    let isCtrl = false;
    let isAlt = false;

    checkLocalStorage();
    let isActive = parseBool(localStorage.getItem(LOCAL_STORAGE_KEYS.isActive));


    const refresh = () => {
        (br === 100 && co === 100)
            ? ctx.filter = `none`
            : ctx.filter = `brightness(${br}%) contrast(${co}%)`;

        const status = drawer.getAttribute('visibility');
        if (status == 'hidden') {
            drawBtn.click(); selectBtn.click();
        } else if (status == 'visible') {
            selectBtn.click(); drawBtn.click();
        }
    };

    const handleKeyup = (e) => {
        if (e.key === 'Control') { isCtrl = false; }
        if (e.key == 'Alt') { isAlt = false; }
    }

    const handleKeydown = (e) => {
        if (e.key === 'Control') { isCtrl = true; }
        if (e.key == 'Alt') { isAlt = true; }

        if ((isCtrl == true && isAlt == true) && (e.key === `'`)) { // activate, deactivate
            br = 100; co = 100;
            refresh();

            localStorage.setItem(LOCAL_STORAGE_KEYS.isActive, String(!isActive));
            isActive = parseBool(localStorage.getItem(LOCAL_STORAGE_KEYS.isActive));
            showMessage(`${isActive ? 'Activate' : 'Deactivate'} - Adjust Brightness / Contrast`)
        }


        if (!isActive) {
            return;
        }

        if ((isCtrl == true && isAlt == true) && (e.key === `;`)) {// reset
            br = 100; co = 100;
            refresh();
        } else if (isCtrl == false) { // brightness
            if (e.key === `;` && br > 0) {
                br -= 10;
                refresh();
            } else if (e.key === `'`) {
                br += 10;
                refresh();
            }
        } else if (isCtrl == true && isAlt == false) { // contrast
            if (e.key === `;` && co > 0) {
                co -= 10;
                refresh();
            } else if (e.key === `'`) {
                co += 10;
                refresh();
            }
        }
    }

    document.body.addEventListener('keyup', handleKeyup);
    document.body.addEventListener('keydown', handleKeydown);
}

const checkLocalStorage = () => {
    const checklist = [{
        item: LOCAL_STORAGE_KEYS.isActive,
        defaultValue: 'true',
    }];

    for (let i = 0; i < checklist.length; i++) {
        const item = localStorage.getItem(checklist[i].item);
        if (!item) {
            localStorage.setItem(checklist[i].item, checklist[i].defaultValue);
        }
    }
}

export { canvasif };