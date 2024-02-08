const sleep = async(ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

exports.delay = async (min, max) => {
    const randomTime = (min, max) => Math.random() * (max - min) + min;
    const randomDuration = randomTime(min, max) * 1000;
    console.log("DELAY SERVICE:")
    console.log("DELAY SERVICE: Delay from " + min + " to " + max + " => " + (randomDuration / 1000) + " sec...")
    console.log("DELAY SERVICE:")
    await sleep(randomDuration);
}
