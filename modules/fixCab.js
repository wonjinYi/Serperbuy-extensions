import { getElementByXpath } from '../tools/getElementByXpath.js';
import { showMessage } from '../tools/showMessage.js';

const fixCab = () => {
    let upperCanvas = getElementByXpath('/html/body/div[1]/div/div[2]/div[2]/div/div/canvas[2]');

    const getCabinet = (task) => {
        let repeatCnt = 3;

        let cabinet_top = getElementByXpath('/html/body/div[1]/div/div[2]/div[3]/div[2]');
        let cabinet_mid;
        let cabinet_bot;

        if (!cabinet_top) { // 임시 - 비디오 워크앱인 경우 초장부터 비활성화 먹여버림
            upperCanvas.removeEventListener('click', inactiveHandler);
        }

        if (upperCanvas) {
            const repeat = setInterval(() => {
                const el = getElementByXpath('/html/body/div[1]/div/div[2]/div[3]');
                let childLength;
                if (el) {
                    childLength = el.childNodes.length;
                } else { // 비디오 워크앱인 경우 그냥 함수를 죽여버림
                    repeatCnt--;
                    if (repeatCnt <= 0) {
                        clearInterval(repeat);
                        return;
                    }
                }

                // 이미지워크앱인 경우만 아래 내용 실행.

                if (childLength == 5) { // 객체 선택되어있는 경우
                    clearInterval(repeat);
                    cabinet_mid = getElementByXpath('/html/body/div[1]/div/div[2]/div[3]/div[3]');
                    cabinet_bot = getElementByXpath('/html/body/div[1]/div/div[2]/div[3]/div[4]');

                    if (task == 'action') {
                        const cabSize = cabinetSize.split(' ');
                        cabinet_top.style.height = `${cabSize[0]}px`;
                        cabinet_mid.style.height = `${cabSize[1]}px`;
                        cabinet_bot.style.height = `${cabSize[2]}px`;
                    } else if (task == 'inactive') {
                        cabinet_top.style.height = ``;
                        cabinet_mid.style.height = ``;
                        cabinet_bot.style.height = ``;
                        upperCanvas.removeEventListener('click', inactiveHandler);
                    } else if (task == 'save') {
                        localStorage.setItem('cabinetSize', `${cabinet_top.getAttribute('height')} ${cabinet_mid.getAttribute('height')} ${cabinet_bot.getAttribute('height')}`)
                        showMessage('Saved Cabinet Height');
                    }
                } else { // 객체 선택되어있지 않은 경우
                    repeatCnt--;
                    if (repeatCnt <= 0) {
                        clearInterval(repeat);
                        cabinet_top.style.height = ``;
                    }
                }
            }, 10);
        }
    }

    let actionHandler = () => { getCabinet('action'); };
    let inactiveHandler = () => { getCabinet('inactive'); };

    let cabinetSize = localStorage.getItem('cabinetSize');

    let isActive = localStorage.getItem('fixcabActive');
    if (!isActive) {
        isActive = "false";
    } else if (isActive == "true" && cabinetSize) {
        upperCanvas.addEventListener('click', actionHandler);
    }

    let isCtrl = false;

    window.onkeyup = function (e) {
        if (e.key === 'Control') { isCtrl = false; }
    };
    window.onkeydown = function (e) {
        if (e.key === 'Control') { isCtrl = true; }

        if (isCtrl == true && (e.key === '[')) {
            if (isActive == "true") {
                isActive = "false";
                localStorage.setItem('fixcabActive', "false");
                upperCanvas.removeEventListener('click', actionHandler);
                upperCanvas.addEventListener('click', inactiveHandler);
                showMessage(`Deactivated - Fix Cabinet Height`);
            } else if (isActive == "false") {
                isActive = "true";
                localStorage.setItem('fixcabActive', "true");
                isActive = localStorage.getItem('fixcabActive');
                cabinetSize = localStorage.getItem('cabinetSize');
                getCabinet('action');
                if (isActive == "true" && cabinetSize) {
                    upperCanvas.addEventListener('click', actionHandler);
                }
                showMessage(`Activate - Fix Cabinet Height`);
            }
        } else if (isCtrl == true && (e.key === ']')) {
            getCabinet('save');
        }
    }
}

export { fixCab };