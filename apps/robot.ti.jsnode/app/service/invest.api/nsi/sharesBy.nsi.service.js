exports.getSharesBy = async (orderTicker) => {

    const Shares = await require('../../../nsi/shares.invest.api.nsi').getShares();

    let foundObject;
    let tickers = Shares.map(obj => obj.ticker);

    tickers.forEach(ticker => {
        if (ticker === orderTicker) {
            foundObject = Shares.find(obj => obj.ticker === ticker);
        }
    });

    return foundObject

}
