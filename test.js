const time = (time) => {
    const hour = parseInt(time / 3600);
    const remainingSecond = time % 3600;
    const min = parseInt(remainingSecond / 60);
    const second = remainingSecond % 60;
    return (`${hour} hour ${min} min ${second} second ago`);
}




