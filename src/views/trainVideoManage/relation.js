// 接口字段名称与文字之间的对应关系
export function getRelation(resData = {}) {
    let arr = [];
    for(let key in resData) {
        switch (key) {
            case 'leftShoulerMin':
                arr.push({name: '左肩最小', value: resData[key]});
                break;
            case 'leftShoulerMax':
                arr.push({name: '左肩最大', value: resData[key]});
                break;
            case 'rightShoulerMin':
                arr.push({name: '右肩最小', value: resData[key]});
                break;
            case 'rightShoulerMax':
                arr.push({name: '右肩最大', value: resData[key]});
                break;
            case 'leftElbowMin':
                arr.push({name: '左肘最小', value: resData[key]});
                break;
            case 'leftElbowMax':
                arr.push({name: '左肘最大', value: resData[key]});
                break;
            case 'rightElbowMin':
                arr.push({name: '右肘最小', value: resData[key]});
                break;
            case 'rightElbowMax':
                arr.push({name: '右肘最大', value: resData[key]});
                break;
            case 'leftHipMin':
                arr.push({name: '左胯最小', value: resData[key]});
                break;
            case 'leftHipMax':
                arr.push({name: '左胯最大', value: resData[key]});
                break;
            case 'rightHipMin':
                arr.push({name: '右胯最小', value: resData[key]});
                break;
            case 'rightHipMax':
                arr.push({name: '右胯最大', value: resData[key]});
                break;
            case 'leftKneeMin':
                arr.push({name: '左膝最小', value: resData[key]});
                break;
            case 'leftKneeMax':
                arr.push({name: '左膝最大', value: resData[key]});
                break;
            case 'rightKneeMin':
                arr.push({name: '右膝最小', value: resData[key]});
                break;
            case 'rightKneeMax':
                arr.push({name: '右膝最大', value: resData[key]});
                break;
            case 'leftAnkleMin':
                arr.push({name: '左踝最小', value: resData[key]});
                break;
            case 'leftAnkleMax':
                arr.push({name: '左踝最大', value: resData[key]});
                break;
            case 'rightAnkleMin':
                arr.push({name: '右踝最小', value: resData[key]});
                break;
            case 'rightAnkleMax':
                arr.push({name: '右踝最大', value: resData[key]});
                break;
        }
    }
    return arr;
}