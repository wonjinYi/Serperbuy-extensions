import { crossLine } from './modules/crossLine.js';
import { canvasif } from './modules/canvasif.js';
import { fixCab } from './modules/fixCab.js';
import { getElementByXpath } from './tools/getElementByXpath.js';

const launchTemp = () => {
    let canvasifCnt = 5;
    let fixCabCnt = 5;
    
    const launchFixCab = setInterval(() => {
        const upperCanvas = getElementByXpath('/html/body/div[1]/div/div[2]/div[2]/div/div/canvas[2]');

        if (upperCanvas) {
            fixCab();
            clearInterval(launchFixCab);
        } else {
            fixCabCnt--;
            if (fixCabCnt <= 0) {
                clearInterval(launchFixCab);
            }
        }
    }, 1000)

    const launchCanvasif = setInterval(() => {
        const lowerCanvas = getElementByXpath('/html/body/div[1]/div/div[2]/div[2]/div/div/canvas[1]');

        if (lowerCanvas) {
            canvasif();
            clearInterval(launchCanvasif);
        } else {
            canvasifCnt--;
            if (canvasifCnt <= 0) {
                clearInterval(launchCanvasif);
            }
        }
    }, 1000)
}

export const main = () => {
    crossLine();
    launchTemp();
}