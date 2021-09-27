const getElementByXpath = path => document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

//

/*
210628_kinect_mixed_top_000093.png : 1920 * 1080
210707_kinect_mixed_side_000000.png : 1920 * 1080
210702_kinect_mixed_quarter_000116.png : 1920 * 1080

realsense 192 96 
210702_realsense_mixed_side_000015.png : 1280 * 720p

zed2
210705_zed2_mixed_side_000127.png : 2200 * 1240
210713_zed2_mixed_top_000153.png

88
*/

const container = document.createElement('div');
container.setAttribute('id', 'realSize');
container.style.position = "fixed";
document.body.appendChild(container);

let ctrl = false;
let shift = false;
let isRunning = false;
let target = null;

const SIZE = {
    kinect : {
        w : 1920,
        h : 1080,
    },
    realsense : {
        w : 1280,
        h : 720,
    },
    zed2 : {
        w : 2200,
        h : 1240,
    },
};

const handleKeyup = e => {
    if(isRunning){

    } else {
        if (e.key === 'Control') { ctrl = false; }
        if (e.key === 'Shift') { shift = false; }
    }
    
}

const handleKeydown = e => {
    if(isRunning){
        if(e.key === 'Escape') {
            stopSizeDetector();
        }
    } else {
        
        if (e.key === 'Control') { ctrl = true; }
        if (e.key === 'Shift') { shift = true; }
    
        if ((ctrl && shift) && (e.key === 'x' || e.key === 'X')) {
            const datakey = getElementByXpath('/html/body/div[1]/div/div[1]/div/div[1]/p').textContent;
    
            if (datakey.includes('kinect')) { target = 'kinect'; } 
            else if (datakey.includes('realsense')) { target = 'realsense'; } 
            else if (datakey.includes('zed2')) { target = 'zed2'; }
    
            if(target) { runSizeDetector(); }
        }
    }
    
}

const runSizeDetector = () => {
    isRunning = true;

    const bg = document.createElement('div');
    container.setAttribute('id', 'realSizeBg');
    bg.style.width = '100vw';
    bg.style.height = '100vh';
    bg.style.position = 'fixed';
    bg.style.backgroundColor = "#00000010";
    bg.style.top = '0px';
    bg.style.left = '0px';

    const msg = document.createElement('h3');
    msg.style.backgroundColor = "#00000080";
    msg.style.color = "#FFFFFF";
    msg.textContent = '(위이잉) 진짜크기 판별기 작동중 (위이잉)';
    msg.style.textAlign = 'center';
    msg.style.padding = "8px";
    msg.style.left = '0px';
    msg.style.top = '0px';

    const msg2 = document.createElement('h4');
    msg2.style.backgroundColor = "#00000080";
    msg2.style.color = "#FFFFFF";
    msg2.textContent = '마우스 따라다니는 사각형이 32*32px 입니다. 클릭 또는 Esc를 누르면 종료합니다.';
    msg2.style.textAlign = 'center';
    msg2.style.padding = "8px";
    msg2.style.left = '0px';
    msg2.style.top = '0px';

    const rect = document.createElement('div');
    rect.style.backgroundColor = "#00000080";
    rect.style.border = "1px solid green";
    rect

    bg.appendChild(msg);
    bg.appendChild(msg2);
    container.appendChild(bg);
}

const stopSizeDetector = () => {
    isRunning = false;
    const el = document.getElementById('realSizeBg');
    el.parentNode.removeChild(el);
}

window.addEventListener('keydown', handleKeydown);
window.addEventListener('keyup', handleKeyup);