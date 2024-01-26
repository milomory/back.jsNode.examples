const sleep = async(ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

exports.delay = async (min, max) => {
    const randomTime = (min, max) => Math.random() * (max - min) + min;
    const randomDuration = randomTime(min, max) * 1000;
    console.log("")
    console.log("Задержка от " + min + " до " + max + " => " + (randomDuration / 1000) + " sec...")
    console.log("")
    await sleep(randomDuration);
}
