import { parseBool } from '../tools/parseBool.js';

const LOCAL_STORAGE_KEYS = {
    visible: 'Serperbuy_CrossLine_lineVisible',
    color: 'Serperbuy_CrossLine_lineColor',
    width: 'Serperbuy_CrossLine_lineWidth',
};

const crossLine = () => {

    //initialize variables
    checkLocalStorage();
    let lineVisible = parseBool(localStorage.getItem(LOCAL_STORAGE_KEYS.visible));
    let lineColor = localStorage.getItem(LOCAL_STORAGE_KEYS.color);
    let lineWidth = parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.width));
    let BORDER_STYLE_STRING = `${lineWidth}px solid rgba(${lineColor},0.5)`;


    //draw dom elements
    const popper = document.getElementById('popper');
    const container = document.createElement('div');
    const garo = document.createElement('div');
    const sero = document.createElement('div');
    container.style.position = "fixed";
    container.style.pointerEvents = "none";
    container.style.visibility = lineVisible ? 'visible' : 'hidden';
    garo.style.width = "100vw";
    garo.style.borderBottom = BORDER_STYLE_STRING;
    garo.style.position = "fixed";
    garo.style.left = "0px";
    sero.style.height = "100vh";
    sero.style.borderLeft = BORDER_STYLE_STRING;
    sero.style.position = "fixed";
    sero.style.top = "0px";

    container.appendChild(sero);
    container.appendChild(garo);
    document.body.insertBefore(container, popper);


    // declare functions
    const updateAndRefreshLineVisible = () => {
        const newVisible = !lineVisible;
        localStorage.setItem(LOCAL_STORAGE_KEYS.visible, String(newVisible));

        lineVisible = parseBool(localStorage.getItem(LOCAL_STORAGE_KEYS.visible));
        container.style.visibility = lineVisible ? 'visible' : 'hidden';
    }

    const updateLineWidth = ({ action }) => {
        let newWidth;
        switch (action) {
            case 'decrease':
                newWidth = lineWidth - 1;
                break;
            case 'increase':
                newWidth = lineWidth + 1;
                break;
            default:
                console.log('이게뭐누');
        }
        localStorage.setItem(LOCAL_STORAGE_KEYS.width, String(newWidth));

        lineWidth = parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.width));
    }

    const updateLineColor = () => {
        let newColor;
        switch (lineColor) {
            case '0,0,0':
                newColor = '255,255,255';
                break;
            case '255,255,255':
                newColor = '0,0,0';
                break;
            default:
                console.log('이게머지');
        }
        localStorage.setItem(LOCAL_STORAGE_KEYS.color, newColor);

        lineColor = localStorage.getItem(LOCAL_STORAGE_KEYS.color);
    }

    const refreshLineStyle = () => {
        BORDER_STYLE_STRING = `${lineWidth}px solid rgba(${lineColor},0.5)`;
        garo.style.borderBottom = BORDER_STYLE_STRING;
        sero.style.borderLeft = BORDER_STYLE_STRING;
    };


    //set event handlers
    const handleMousemove = (e) => {
        garo.style.top = `${e.clientY - parseInt((lineWidth / 2))}px`;
        sero.style.left = `${e.clientX - parseInt((lineWidth / 2))}px`;
    };

    let isCtrl = false;
    let isShift = false;
    const handleKeyup = (e) => {
        if (e.key === 'Control') { isCtrl = false; }
        else if(e.key === 'Shift') { isShift = false; }
    }
    const handleKeydown = (e) => {
        if (e.key === 'Control') { isCtrl = true; }
        else if(e.key === 'Shift') {isShift = true;}

        if (!isCtrl || !isShift) {
            if (e.key === 'A' || e.key === 'a') {
                updateAndRefreshLineVisible();
                lineVisible
                    ? window.addEventListener('mousemove', handleMousemove)
                    : window.removeEventListener('mousemove', handleMousemove);
            }
            else if (e.key === 'X' || e.key === 'x') {
                updateLineColor();
                refreshLineStyle();
            }
            else if (e.key === 'V' || e.key === 'v') {
                if (lineWidth > 1) {
                    updateLineWidth({ action: 'decrease' });
                    refreshLineStyle();
                }
            }
            else if (e.key === 'B' || e.key === 'b') {
                updateLineWidth({ action: 'increase' });
                refreshLineStyle();
            }
        }

    }

    window.addEventListener('mousemove', handleMousemove);
    window.addEventListener('keyup', handleKeyup);
    window.addEventListener('keydown', handleKeydown);
}

const checkLocalStorage = () => {
    const checklist = [{
        item: LOCAL_STORAGE_KEYS.visible,
        defaultValue: 'true',
    }, {
        item: LOCAL_STORAGE_KEYS.color,
        defaultValue: '255,255,255',
    }, {
        item: LOCAL_STORAGE_KEYS.width,
        defaultValue: '2',
    }];

    for (let i = 0; i < checklist.length; i++) {
        const item = localStorage.getItem(checklist[i].item);
        if (!item) {
            localStorage.setItem(checklist[i].item, checklist[i].defaultValue);
        }
    }
}



export { crossLine };